import type { Grid, Position, ObstacleType } from '@/types/battlefield';

export interface RaycastResult {
  visible: boolean;
  attenuation: number;
  blockedBy: ObstacleType | null;
  path: Position[];
}

export function bresenhamLine(x0: number, y0: number, x1: number, y1: number): Position[] {
  const points: Position[] = [];
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  let x = x0;
  let y = y0;

  while (true) {
    points.push({ x, y });

    if (x === x1 && y === y1) break;

    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }

  return points;
}

export function castRay(
  grid: Grid,
  from: Position,
  to: Position,
  useAttenuation: boolean = true
): RaycastResult {
  const path = bresenhamLine(from.x, from.y, to.x, to.y);
  let attenuation = 1.0;
  let blockedBy: ObstacleType | null = null;

  for (let i = 1; i < path.length - 1; i++) {
    const { x, y } = path[i];

    if (x < 0 || x >= grid.width || y < 0 || y >= grid.height) {
      continue;
    }

    const cell = grid.cells[y][x];

    if (cell.obstacle === 'building') {
      return {
        visible: false,
        attenuation: 0,
        blockedBy: 'building',
        path: path.slice(0, i + 1),
      };
    }

    if (cell.obstacle === 'forest' && useAttenuation) {
      attenuation *= 0.6;
    }
  }

  const visible = attenuation > 0.1;

  return {
    visible,
    attenuation,
    blockedBy,
    path,
  };
}

export function calculateVisibility(
  grid: Grid,
  from: Position,
  to: Position,
  useAttenuation: boolean = true
): number {
  const result = castRay(grid, from, to, useAttenuation);
  return result.visible ? result.attenuation : 0;
}

export function isInThreatCone(
  position: Position,
  enemyPosition: Position,
  facingDirection: number,
  coneAngle: number,
  threatRadius: number
): boolean {
  const dx = position.x - enemyPosition.x;
  const dy = position.y - enemyPosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > threatRadius) {
    return false;
  }

  const angleToPosition = (Math.atan2(dy, dx) * 180) / Math.PI;
  const normalizedFacing = ((facingDirection % 360) + 360) % 360;
  const normalizedAngle = ((angleToPosition % 360) + 360) % 360;

  let angleDiff = Math.abs(normalizedAngle - normalizedFacing);
  if (angleDiff > 180) {
    angleDiff = 360 - angleDiff;
  }

  return angleDiff <= coneAngle / 2;
}

export function calculateDistance(a: Position, b: Position): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}
