import type { Grid, ObstacleType } from '@/types/battlefield';

const GRID_WIDTH = 46;
const GRID_HEIGHT = 30;

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

export function generateOpenField(): Grid {
  const grid = createEmptyGrid();
  const { cells } = grid;

  for (let i = 0; i < 5; i++) {
    const x = 15 + Math.floor(Math.random() * 20);
    const y = 5 + Math.floor(Math.random() * 20);
    if (y < GRID_HEIGHT && x < GRID_WIDTH) {
      cells[y][x].obstacle = 'forest';
    }
  }

  return grid;
}

export function generateDenseObstacles(): Grid {
  const grid = createEmptyGrid();
  const { cells } = grid;

  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      if (Math.random() < 0.08) {
        const types: ObstacleType[] = ['building', 'forest', 'hill'];
        cells[y][x].obstacle = types[Math.floor(Math.random() * 3)];
      }
      cells[y][x].elevation = Math.sin(x * 0.2) * Math.cos(y * 0.2) * 3;
    }
  }

  return grid;
}

export function generateMixed(): Grid {
  const grid = createEmptyGrid();
  const { cells } = grid;

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
    if (cells[y][x].obstacle === 'none') {
      cells[y][x].obstacle = 'forest';
    }
  }

  return grid;
}

export function generateRidgeValley(): Grid {
  const grid = createEmptyGrid();
  const { cells } = grid;

  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const distFromCenter = Math.abs(y - GRID_HEIGHT / 2);
      cells[y][x].elevation = distFromCenter * 0.5;
      if (distFromCenter > 8 && Math.random() < 0.15) {
        cells[y][x].obstacle = 'hill';
      }
    }
  }

  return grid;
}
