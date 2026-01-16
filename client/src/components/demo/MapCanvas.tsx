import { useRef, useEffect, useCallback } from 'react';
import { useBattlefieldStore } from '@/stores/battlefieldStore';
import type { ObstacleType, Position } from '@/types/battlefield';

const CELL_SIZE = 16;

interface MapCanvasProps {
  width: number;
  height: number;
}

export function MapCanvas({ width, height }: MapCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDragging = useRef(false);
  const lastCell = useRef<Position | null>(null);

  const {
    grid,
    enemy,
    friendlyStart,
    placedUnits,
    showLoS,
    showThreatCone,
    editState,
    updateCell,
    setEnemy,
  } = useBattlefieldStore();

  const getObstacleColor = (obstacle: ObstacleType, isDark: boolean): string => {
    switch (obstacle) {
      case 'building':
        return isDark ? '#4a4a4a' : '#6b6b6b';
      case 'forest':
        return isDark ? '#1a4d1a' : '#2d7a2d';
      case 'hill':
        return isDark ? '#8b7355' : '#a08060';
      default:
        return '';
    }
  };

  const drawGrid = useCallback((ctx: CanvasRenderingContext2D) => {
    const isDark = document.documentElement.classList.contains('dark');
    const bgColor = isDark ? '#121212' : '#f5f5f5';
    const gridLineColor = isDark ? '#2a2a2a' : '#e0e0e0';

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    for (let y = 0; y < grid.height; y++) {
      for (let x = 0; x < grid.width; x++) {
        const cell = grid.cells[y][x];
        const px = x * CELL_SIZE;
        const py = y * CELL_SIZE;

        const elevation = cell.elevation;
        const elevationShade = Math.floor(128 + elevation * 10);
        const baseGray = isDark ? Math.min(40, 20 + elevationShade / 8) : Math.min(255, 200 + elevationShade / 4);

        if (cell.obstacle === 'none') {
          ctx.fillStyle = isDark
            ? `rgb(${baseGray}, ${baseGray + 5}, ${baseGray})`
            : `rgb(${baseGray - 10}, ${baseGray}, ${baseGray - 10})`;
          ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);
        } else {
          ctx.fillStyle = getObstacleColor(cell.obstacle, isDark);
          ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);
        }

        ctx.strokeStyle = gridLineColor;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(px, py, CELL_SIZE, CELL_SIZE);
      }
    }
  }, [grid, width, height]);

  const drawThreatCone = useCallback((ctx: CanvasRenderingContext2D) => {
    if (!showThreatCone) return;

    const { position, facingDirection, threatRadius, coneAngle } = enemy;
    const cx = position.x * CELL_SIZE + CELL_SIZE / 2;
    const cy = position.y * CELL_SIZE + CELL_SIZE / 2;
    const radius = threatRadius * CELL_SIZE;

    const startAngle = ((facingDirection - coneAngle / 2) * Math.PI) / 180;
    const endAngle = ((facingDirection + coneAngle / 2) * Math.PI) / 180;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.closePath();

    ctx.fillStyle = 'rgba(255, 0, 0, 0.15)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }, [enemy, showThreatCone]);

  const drawLoSLines = useCallback((ctx: CanvasRenderingContext2D) => {
    if (!showLoS || placedUnits.length === 0) return;

    const enemyX = enemy.position.x * CELL_SIZE + CELL_SIZE / 2;
    const enemyY = enemy.position.y * CELL_SIZE + CELL_SIZE / 2;

    placedUnits.forEach((unit) => {
      const unitX = unit.x * CELL_SIZE + CELL_SIZE / 2;
      const unitY = unit.y * CELL_SIZE + CELL_SIZE / 2;

      ctx.beginPath();
      ctx.moveTo(unitX, unitY);
      ctx.lineTo(enemyX, enemyY);
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    });
  }, [enemy.position, placedUnits, showLoS]);

  const drawEntities = useCallback((ctx: CanvasRenderingContext2D) => {
    const { position: enemyPos } = enemy;
    const ex = enemyPos.x * CELL_SIZE + CELL_SIZE / 2;
    const ey = enemyPos.y * CELL_SIZE + CELL_SIZE / 2;

    ctx.beginPath();
    ctx.arc(ex, ey, CELL_SIZE / 2 + 2, 0, Math.PI * 2);
    ctx.fillStyle = '#ef4444';
    ctx.fill();
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 2;
    ctx.stroke();

    const fx = friendlyStart.x * CELL_SIZE + CELL_SIZE / 2;
    const fy = friendlyStart.y * CELL_SIZE + CELL_SIZE / 2;

    ctx.beginPath();
    ctx.arc(fx, fy, CELL_SIZE / 2 + 2, 0, Math.PI * 2);
    ctx.fillStyle = '#3b82f6';
    ctx.fill();
    ctx.strokeStyle = '#1d4ed8';
    ctx.lineWidth = 2;
    ctx.stroke();

    placedUnits.forEach((unit, index) => {
      const ux = unit.x * CELL_SIZE + CELL_SIZE / 2;
      const uy = unit.y * CELL_SIZE + CELL_SIZE / 2;

      ctx.beginPath();
      ctx.rect(ux - CELL_SIZE / 2, uy - CELL_SIZE / 2, CELL_SIZE, CELL_SIZE);
      ctx.fillStyle = '#22c55e';
      ctx.fill();
      ctx.strokeStyle = '#15803d';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(index + 1), ux, uy);
    });
  }, [enemy, friendlyStart, placedUnits]);

  const drawEditBrush = useCallback((ctx: CanvasRenderingContext2D, mousePos: Position | null) => {
    if (!editState.enabled || !mousePos) return;

    const { brushSize, tool } = editState;
    const halfSize = Math.floor(brushSize / 2);

    for (let dy = -halfSize; dy <= halfSize; dy++) {
      for (let dx = -halfSize; dx <= halfSize; dx++) {
        const cellX = mousePos.x + dx;
        const cellY = mousePos.y + dy;
        if (cellX >= 0 && cellX < grid.width && cellY >= 0 && cellY < grid.height) {
          const px = cellX * CELL_SIZE;
          const py = cellY * CELL_SIZE;
          ctx.strokeStyle = tool === 'eraser' ? '#ef4444' : '#22c55e';
          ctx.lineWidth = 2;
          ctx.strokeRect(px, py, CELL_SIZE, CELL_SIZE);
        }
      }
    }
  }, [editState, grid.width, grid.height]);

  const mousePositionRef = useRef<Position | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawGrid(ctx);
    drawThreatCone(ctx);
    drawLoSLines(ctx);
    drawEntities(ctx);
    drawEditBrush(ctx, mousePositionRef.current);
  }, [drawGrid, drawThreatCone, drawLoSLines, drawEntities, drawEditBrush]);

  useEffect(() => {
    draw();
  }, [draw]);

  const getCellFromEvent = (e: React.MouseEvent<HTMLCanvasElement>): Position | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
    const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);

    if (x >= 0 && x < grid.width && y >= 0 && y < grid.height) {
      return { x, y };
    }
    return null;
  };

  const applyBrush = useCallback((cellPos: Position) => {
    const { brushSize, tool, obstacleType } = editState;
    const halfSize = Math.floor(brushSize / 2);

    for (let dy = -halfSize; dy <= halfSize; dy++) {
      for (let dx = -halfSize; dx <= halfSize; dx++) {
        const cellX = cellPos.x + dx;
        const cellY = cellPos.y + dy;
        if (cellX >= 0 && cellX < grid.width && cellY >= 0 && cellY < grid.height) {
          const newObstacle = tool === 'eraser' ? 'none' : obstacleType;
          updateCell(cellX, cellY, newObstacle);
        }
      }
    }
  }, [editState, grid.width, grid.height, updateCell]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!editState.enabled) return;

    isDragging.current = true;
    const cell = getCellFromEvent(e);
    if (cell) {
      lastCell.current = cell;
      applyBrush(cell);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const cell = getCellFromEvent(e);
    mousePositionRef.current = cell;

    if (editState.enabled && isDragging.current && cell) {
      if (!lastCell.current || cell.x !== lastCell.current.x || cell.y !== lastCell.current.y) {
        lastCell.current = cell;
        applyBrush(cell);
      }
    }

    draw();
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    lastCell.current = null;
  };

  const handleMouseLeave = () => {
    mousePositionRef.current = null;
    isDragging.current = false;
    lastCell.current = null;
    draw();
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="border border-border rounded-lg cursor-crosshair"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      data-testid="canvas-map"
    />
  );
}
