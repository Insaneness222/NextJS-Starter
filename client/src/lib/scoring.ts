import type {
  Grid,
  Enemy,
  Position,
  Weights,
  ScoreBreakdown,
  CandidatePosition,
  UnitResult,
  SimulationResults,
} from '@/types/battlefield';
import { calculateVisibility, isInThreatCone, calculateDistance, isValidPlacement } from './raycast';

const MIN_UNIT_DISTANCE = 3;

function getCoverScore(grid: Grid, position: Position): number {
  const { x, y } = position;
  let coverCount = 0;

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < grid.width && ny >= 0 && ny < grid.height) {
        const cell = grid.cells[ny][nx];
        if (cell.obstacle !== 'none') {
          coverCount++;
        }
      }
    }
  }

  return coverCount / 8;
}

function getElevationAdvantage(grid: Grid, position: Position, enemyPosition: Position): number {
  const posCell = grid.cells[position.y][position.x];
  const enemyCell = grid.cells[enemyPosition.y][enemyPosition.x];
  const elevationDiff = posCell.elevation - enemyCell.elevation;
  return Math.max(0, Math.min(1, (elevationDiff + 5) / 10));
}

function getMobilityScore(grid: Grid, position: Position): number {
  const { x, y } = position;
  let walkableNeighbors = 0;

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < grid.width && ny >= 0 && ny < grid.height) {
        const cell = grid.cells[ny][nx];
        if (cell.obstacle === 'none' || cell.obstacle === 'forest') {
          walkableNeighbors++;
        }
      }
    }
  }

  return walkableNeighbors / 8;
}

function getSeparationPenalty(position: Position, placedUnits: Position[]): number {
  if (placedUnits.length === 0) return 0;

  let minDist = Infinity;
  for (const unit of placedUnits) {
    const dist = calculateDistance(position, unit);
    if (dist < minDist) {
      minDist = dist;
    }
  }

  if (minDist < MIN_UNIT_DISTANCE) {
    return 1 - minDist / MIN_UNIT_DISTANCE;
  }

  return 0;
}

export function calculatePositionScore(
  grid: Grid,
  position: Position,
  enemy: Enemy,
  weights: Weights,
  placedUnits: Position[],
  useDistanceAttenuation: boolean
): ScoreBreakdown {
  const visibility = calculateVisibility(grid, position, enemy.position, useDistanceAttenuation);

  const inThreat = isInThreatCone(
    position,
    enemy.position,
    enemy.facingDirection,
    enemy.coneAngle,
    enemy.threatRadius
  );
  const enemyVisibility = calculateVisibility(grid, enemy.position, position, useDistanceAttenuation);
  const exposure = inThreat ? enemyVisibility : enemyVisibility * 0.5;

  const cover = getCoverScore(grid, position);
  const elevation = getElevationAdvantage(grid, position, enemy.position);
  const mobility = getMobilityScore(grid, position);
  const separation = getSeparationPenalty(position, placedUnits);

  const total =
    weights.visibility * visibility -
    weights.exposure * exposure +
    weights.cover * cover +
    weights.elevation * elevation +
    weights.mobility * mobility -
    weights.separation * separation;

  return {
    visibility,
    exposure,
    cover,
    elevation,
    mobility,
    separation,
    total,
  };
}

function generateCandidates(grid: Grid, enemy: Enemy, samplingDensity: number, placedUnits: Position[]): Position[] {
  const candidates: Position[] = [];

  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      const cell = grid.cells[y][x];

      if (cell.obstacle === 'building') continue;

      if (!isValidPlacement({ x, y }, enemy.position, enemy.facingDirection, enemy.threatRadius)) continue;

      if (Math.random() > samplingDensity) continue;

      const tooClose = placedUnits.some(
        (unit) => calculateDistance({ x, y }, unit) < MIN_UNIT_DISTANCE
      );
      if (tooClose) continue;

      candidates.push({ x, y });
    }
  }

  return candidates;
}

function selectBestPosition(
  grid: Grid,
  enemy: Enemy,
  weights: Weights,
  candidates: Position[],
  placedUnits: Position[],
  useDistanceAttenuation: boolean
): { best: CandidatePosition; top5: CandidatePosition[] } {
  const scored: CandidatePosition[] = candidates.map((position) => ({
    position,
    scores: calculatePositionScore(grid, position, enemy, weights, placedUnits, useDistanceAttenuation),
  }));

  scored.sort((a, b) => b.scores.total - a.scores.total);

  const top5 = scored.slice(0, 5);
  const best = top5[0] || { position: { x: 0, y: 0 }, scores: getEmptyBreakdown() };

  return { best, top5 };
}

function getEmptyBreakdown(): ScoreBreakdown {
  return {
    visibility: 0,
    exposure: 0,
    cover: 0,
    elevation: 0,
    mobility: 0,
    separation: 0,
    total: 0,
  };
}

export function runSimulation(
  grid: Grid,
  enemy: Enemy,
  weights: Weights,
  unitCount: number,
  samplingDensity: number,
  useDistanceAttenuation: boolean
): SimulationResults {
  const units: UnitResult[] = [];
  const placedUnits: Position[] = [];

  for (let i = 0; i < unitCount; i++) {
    const candidates = generateCandidates(grid, enemy, samplingDensity, placedUnits);
    if (candidates.length === 0) break;

    const { best, top5 } = selectBestPosition(
      grid,
      enemy,
      weights,
      candidates,
      placedUnits,
      useDistanceAttenuation
    );

    placedUnits.push(best.position);

    units.push({
      unitIndex: i,
      selectedPosition: best.position,
      totalScore: best.scores.total,
      breakdown: best.scores,
      top5,
    });
  }

  const avgExposure = units.length > 0
    ? units.reduce((sum, u) => sum + u.breakdown.exposure, 0) / units.length
    : 0;

  const avgVisibility = units.length > 0
    ? units.reduce((sum, u) => sum + u.breakdown.visibility, 0) / units.length
    : 0;

  let minDistance = Infinity;
  for (let i = 0; i < placedUnits.length; i++) {
    for (let j = i + 1; j < placedUnits.length; j++) {
      const dist = calculateDistance(placedUnits[i], placedUnits[j]);
      if (dist < minDistance) {
        minDistance = dist;
      }
    }
  }
  if (!isFinite(minDistance)) minDistance = 0;

  const totalScore = units.reduce((sum, u) => sum + u.totalScore, 0);

  return {
    units,
    avgExposure,
    avgVisibility,
    minDistance,
    totalScore,
  };
}

export function runSimulationStep(
  grid: Grid,
  enemy: Enemy,
  weights: Weights,
  placedUnits: Position[],
  samplingDensity: number,
  useDistanceAttenuation: boolean
): UnitResult | null {
  const candidates = generateCandidates(grid, enemy, samplingDensity, placedUnits);
  if (candidates.length === 0) return null;

  const { best, top5 } = selectBestPosition(
    grid,
    enemy,
    weights,
    candidates,
    placedUnits,
    useDistanceAttenuation
  );

  return {
    unitIndex: placedUnits.length,
    selectedPosition: best.position,
    totalScore: best.scores.total,
    breakdown: best.scores,
    top5,
  };
}
