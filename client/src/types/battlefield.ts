export type ObstacleType = 'none' | 'building' | 'forest' | 'hill';

export interface Cell {
  x: number;
  y: number;
  elevation: number;
  obstacle: ObstacleType;
}

export interface Grid {
  width: number;
  height: number;
  cells: Cell[][];
}

export interface Position {
  x: number;
  y: number;
}

export interface Enemy {
  position: Position;
  facingDirection: number;
  threatRadius: number;
  coneAngle: number;
}

export type PlatformType = 'artillery' | 'tank' | 'ugv';

export interface Weights {
  visibility: number;
  exposure: number;
  cover: number;
  elevation: number;
  mobility: number;
  separation: number;
}

export interface ScoreBreakdown {
  visibility: number;
  exposure: number;
  cover: number;
  elevation: number;
  mobility: number;
  separation: number;
  total: number;
}

export interface CandidatePosition {
  position: Position;
  scores: ScoreBreakdown;
}

export interface UnitResult {
  unitIndex: number;
  selectedPosition: Position;
  totalScore: number;
  breakdown: ScoreBreakdown;
  top5: CandidatePosition[];
}

export interface SimulationResults {
  units: UnitResult[];
  avgExposure: number;
  avgVisibility: number;
  minDistance: number;
  totalScore: number;
}

export type PresetType = 'openField' | 'denseObstacles' | 'mixed' | 'ridgeValley';

export interface SimulationConfig {
  grid: Grid;
  enemy: Enemy;
  platformType: PlatformType;
  weights: Weights;
  unitCount: number;
  samplingDensity: number;
  showLoS: boolean;
  showThreatCone: boolean;
  showDistanceAttenuation: boolean;
}

export interface ExportData {
  grid: Grid;
  enemy: Enemy;
  platformType: PlatformType;
  weights: Weights;
  unitCount: number;
  results?: SimulationResults;
}

export type EditTool = 'brush' | 'eraser';

export interface EditState {
  enabled: boolean;
  tool: EditTool;
  brushSize: number;
  obstacleType: ObstacleType;
}
