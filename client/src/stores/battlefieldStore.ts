import { create } from 'zustand';
import type {
  Grid,
  Enemy,
  PlatformType,
  Weights,
  SimulationResults,
  PresetType,
  EditState,
  Position,
  ObstacleType,
} from '@/types/battlefield';

const GRID_WIDTH = 46;
const GRID_HEIGHT = 30;

const defaultWeights: Record<PlatformType | 'custom', Weights> = {
  artillery: {
    visibility: 0.9,
    exposure: 0.3,
    cover: 0.2,
    elevation: 0.6,
    mobility: 0.8,
    separation: 0.4,
  },
  tank: {
    visibility: 0.7,
    exposure: 0.9,
    cover: 0.8,
    elevation: 0.5,
    mobility: 0.4,
    separation: 0.5,
  },
  ugv: {
    visibility: 0.5,
    exposure: 0.6,
    cover: 0.7,
    elevation: 0.3,
    mobility: 0.9,
    separation: 0.6,
  },
  custom: {
    visibility: 0.5,
    exposure: 0.5,
    cover: 0.5,
    elevation: 0.5,
    mobility: 0.5,
    separation: 0.5,
  },
};

function createEmptyGrid(): Grid {
  const cells = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    const row = [];
    for (let x = 0; x < GRID_WIDTH; x++) {
      row.push({ x, y, elevation: 0, obstacle: 'none' as ObstacleType });
    }
    cells.push(row);
  }
  return { width: GRID_WIDTH, height: GRID_HEIGHT, cells };
}

function createDefaultEnemy(): Enemy {
  return {
    position: { x: 45, y: 15 },
    facingDirection: 180,
    threatRadius: 15,
    coneAngle: 180,
  };
}

interface BattlefieldState {
  grid: Grid;
  enemy: Enemy;
  friendlyStart: Position;
  platformType: PlatformType;
  weights: Weights;
  unitCount: number;
  samplingDensity: number;
  showLoS: boolean;
  showThreatCone: boolean;
  showDistanceAttenuation: boolean;
  editState: EditState;
  currentPreset: PresetType;
  results: SimulationResults | null;
  placedUnits: Position[];
  isRunning: boolean;
  currentStep: number;
  showTutorial: boolean;

  setGrid: (grid: Grid) => void;
  setEnemy: (enemy: Enemy) => void;
  setFriendlyStart: (pos: Position) => void;
  setPlatformType: (type: PlatformType) => void;
  setWeights: (weights: Weights) => void;
  setWeight: (key: keyof Weights, value: number) => void;
  setUnitCount: (count: number) => void;
  setSamplingDensity: (density: number) => void;
  toggleLoS: () => void;
  toggleThreatCone: () => void;
  toggleDistanceAttenuation: () => void;
  setEditState: (state: Partial<EditState>) => void;
  applyPreset: (preset: PresetType) => void;
  randomizeMap: () => void;
  setResults: (results: SimulationResults | null) => void;
  setPlacedUnits: (units: Position[]) => void;
  addPlacedUnit: (unit: Position) => void;
  setIsRunning: (running: boolean) => void;
  setCurrentStep: (step: number) => void;
  reset: () => void;
  updateCell: (x: number, y: number, obstacle: ObstacleType) => void;
  dismissTutorial: () => void;
}

export const useBattlefieldStore = create<BattlefieldState>((set, get) => ({
  grid: createEmptyGrid(),
  enemy: createDefaultEnemy(),
  friendlyStart: { x: 0, y: 15 },
  platformType: 'tank',
  weights: { ...defaultWeights.tank },
  unitCount: 3,
  samplingDensity: 0.5,
  showLoS: true,
  showThreatCone: true,
  showDistanceAttenuation: true,
  editState: {
    enabled: false,
    tool: 'brush',
    brushSize: 2,
    obstacleType: 'building',
  },
  currentPreset: 'openField',
  results: null,
  placedUnits: [],
  isRunning: false,
  currentStep: 0,
  showTutorial: !sessionStorage.getItem('tutorial-dismissed'),

  setGrid: (grid) => set({ grid }),
  setEnemy: (enemy) => set({ enemy }),
  setFriendlyStart: (pos) => set({ friendlyStart: pos }),
  setPlatformType: (type) => {
    set({ 
      platformType: type, 
      weights: { ...defaultWeights[type] } 
    });
  },
  setWeights: (weights) => set({ weights }),
  setWeight: (key, value) => set((state) => ({
    weights: { ...state.weights, [key]: value }
  })),
  setUnitCount: (count) => set({ unitCount: count }),
  setSamplingDensity: (density) => set({ samplingDensity: density }),
  toggleLoS: () => set((state) => ({ showLoS: !state.showLoS })),
  toggleThreatCone: () => set((state) => ({ showThreatCone: !state.showThreatCone })),
  toggleDistanceAttenuation: () => set((state) => ({ showDistanceAttenuation: !state.showDistanceAttenuation })),
  setEditState: (newState) => set((state) => ({
    editState: { ...state.editState, ...newState }
  })),
  applyPreset: (preset) => {
    const grid = createEmptyGrid();
    const { cells } = grid;
    
    switch (preset) {
      case 'openField':
        for (let i = 0; i < 5; i++) {
          const x = 15 + Math.floor(Math.random() * 20);
          const y = 5 + Math.floor(Math.random() * 20);
          cells[y][x].obstacle = 'forest';
        }
        break;
      
      case 'denseObstacles':
        for (let y = 0; y < GRID_HEIGHT; y++) {
          for (let x = 0; x < GRID_WIDTH; x++) {
            if (Math.random() < 0.08) {
              const types: ObstacleType[] = ['forest', 'hill'];
              cells[y][x].obstacle = types[Math.floor(Math.random() * 2)];
            }
            cells[y][x].elevation = Math.sin(x * 0.2) * Math.cos(y * 0.2) * 3;
          }
        }
        break;
      
      case 'mixed':
        for (let i = 0; i < 8; i++) {
          const cx = 10 + Math.floor(Math.random() * 30);
          const cy = 5 + Math.floor(Math.random() * 20);
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const nx = cx + dx;
              const ny = cy + dy;
              if (ny >= 0 && ny < GRID_HEIGHT && nx >= 0 && nx < GRID_WIDTH) {
                cells[ny][nx].obstacle = 'building';
              }
            }
          }
        }
        for (let i = 0; i < 12; i++) {
          const x = Math.floor(Math.random() * GRID_WIDTH);
          const y = Math.floor(Math.random() * GRID_HEIGHT);
          cells[y][x].obstacle = 'forest';
        }
        break;
      
      case 'ridgeValley':
        for (let y = 0; y < GRID_HEIGHT; y++) {
          for (let x = 0; x < GRID_WIDTH; x++) {
            const distFromCenter = Math.abs(y - GRID_HEIGHT / 2);
            cells[y][x].elevation = distFromCenter * 0.5;
            if (distFromCenter > 8 && Math.random() < 0.15) {
              cells[y][x].obstacle = 'hill';
            }
          }
        }
        break;
    }
    
    set({ 
      grid, 
      currentPreset: preset, 
      results: null, 
      placedUnits: [], 
      currentStep: 0 
    });
  },
  
  randomizeMap: () => {
    const state = get();
    const grid = { ...state.grid, cells: state.grid.cells.map(row => row.map(cell => ({ ...cell }))) };
    const { cells } = grid;
    
    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        if (cells[y][x].obstacle !== 'none') {
          const dx = Math.floor(Math.random() * 5) - 2;
          const dy = Math.floor(Math.random() * 5) - 2;
          const nx = Math.max(0, Math.min(GRID_WIDTH - 1, x + dx));
          const ny = Math.max(0, Math.min(GRID_HEIGHT - 1, y + dy));
          if (cells[ny][nx].obstacle === 'none') {
            cells[ny][nx].obstacle = cells[y][x].obstacle;
            cells[y][x].obstacle = 'none';
          }
        }
        cells[y][x].elevation += (Math.random() - 0.5) * 0.5;
      }
    }
    
    set({ grid, results: null, placedUnits: [], currentStep: 0 });
  },
  
  setResults: (results) => set({ results }),
  setPlacedUnits: (units) => set({ placedUnits: units }),
  addPlacedUnit: (unit) => set((state) => ({ placedUnits: [...state.placedUnits, unit] })),
  setIsRunning: (running) => set({ isRunning: running }),
  setCurrentStep: (step) => set({ currentStep: step }),
  
  reset: () => {
    const state = get();
    state.applyPreset(state.currentPreset);
  },
  
  updateCell: (x, y, obstacle) => {
    set((state) => {
      const newCells = state.grid.cells.map((row, rowY) =>
        row.map((cell, cellX) => {
          if (cellX === x && rowY === y) {
            return { ...cell, obstacle };
          }
          return cell;
        })
      );
      return { grid: { ...state.grid, cells: newCells } };
    });
  },
  
  dismissTutorial: () => {
    sessionStorage.setItem('tutorial-dismissed', 'true');
    set({ showTutorial: false });
  },
}));
