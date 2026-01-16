# Battlefield Deployment Simulator

A research PoC (Proof of Concept) for optimal unmanned platform positioning using weighted scoring models. This 2D battlefield simulator demonstrates automated position selection for Artillery, Tank, and UGV platforms based on terrain, obstacles, and threat analysis.

## How to Run

```bash
npm install
npm run dev
```

The application will start on port 5000.

## How to Use the Demo

### 1. Select Terrain
- **Presets**: Choose from predefined terrain configurations:
  - Open Field - Minimal obstacles
  - Dense Obstacles - Heavy obstacle coverage
  - Mixed - Urban-style building clusters with forests
  - Ridge/Valley - Elevation-based terrain

- **Randomize**: Click to perturb obstacle positions while keeping the preset style

### 2. Edit Mode (Optional)
Toggle Edit Mode to manually draw obstacles:
- Select brush size (1-5 cells)
- Choose obstacle type: Building, Forest, or Hill
- Use Eraser to remove obstacles
- Draw by clicking and dragging on the canvas

### 3. Configure Weights
- **Platform Templates**: Quick presets for Artillery, Tank, or UGV
- **Custom Weights**: Fine-tune each scoring parameter (0-1):
  - Visibility: Line-of-sight to enemy
  - Exposure: Enemy's line-of-sight to friendly
  - Cover: Adjacent terrain features providing concealment
  - Elevation: Height advantage over enemy
  - Mobility: Movement options from position
  - Separation: Distance penalty from friendly units

### 4. Run Simulation
- **Run**: Compute and place all units at once
- **Step**: Place units one at a time for visualization
- **Reset**: Clear results and regenerate terrain

### 5. Analyze Results
- View selected positions with score breakdowns
- Examine Top 5 candidate positions per unit
- Check summary metrics (avg exposure, visibility, min distance)
- Export/Import configurations as JSON

## Scoring Formula

```
Score = w_vis × Visibility 
      - w_exp × Exposure 
      + w_cov × Cover 
      + w_ele × Elevation 
      + w_mob × Mobility 
      - w_sep × Separation
```

### Score Components

| Parameter | Description | Range |
|-----------|-------------|-------|
| Visibility | LoS from friendly to enemy (higher = better) | 0-1 |
| Exposure | Enemy's LoS to friendly (lower = better) | 0-1 |
| Cover | Adjacent obstacle count providing concealment | 0-1 |
| Elevation | Height advantage over enemy position | 0-1 |
| Mobility | Walkable neighbor cells for repositioning | 0-1 |
| Separation | Penalty when too close to other friendly units | 0-1 |

## Line-of-Sight Raycast Logic

The LoS system uses Bresenham's line algorithm for grid raycasting:

```pseudocode
function castRay(from, to):
    path = bresenhamLine(from.x, from.y, to.x, to.y)
    attenuation = 1.0
    
    for each cell in path (excluding start and end):
        if cell.obstacle == "building":
            return { visible: false, attenuation: 0 }
        
        if cell.obstacle == "forest":
            attenuation *= 0.6  // Forest attenuates but doesn't block
    
    return { visible: attenuation > 0.1, attenuation }
```

### Obstacle Effects
- **Building**: Completely blocks line-of-sight
- **Forest**: Attenuates LoS by 40% per cell (multiple forests compound)
- **Hill**: Provides elevation advantage for scoring (doesn't block LoS)

## Future Extensions

1. **Multi-Threat Scenarios**: Support multiple enemy positions with combined threat analysis

2. **Dynamic Repositioning**: Real-time position updates as threats move

3. **Optimization/RL Integration**: 
   - Reinforcement learning for adaptive weight tuning
   - Genetic algorithms for multi-objective optimization
   - Path planning for repositioning sequences

4. **Enhanced Terrain**:
   - Water/impassable terrain
   - Roads with mobility bonuses
   - Variable cover values

5. **Team Coordination**:
   - Fire team formations
   - Overlapping fields of fire
   - Mutual support scoring

## Tech Stack

- React with TypeScript
- Vite for development/build
- Zustand for state management
- TailwindCSS for styling
- HTML Canvas for rendering
- Bilingual support (English/Korean)
