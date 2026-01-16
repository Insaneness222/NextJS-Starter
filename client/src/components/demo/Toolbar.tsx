import { useRef } from 'react';
import { useTranslation } from '@/lib/i18n';
import { useBattlefieldStore } from '@/stores/battlefieldStore';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { runSimulation, runSimulationStep } from '@/lib/scoring';
import { exportState, importState } from '@/lib/exportImport';
import type { PresetType } from '@/types/battlefield';
import {
  Play,
  StepForward,
  RotateCcw,
  Shuffle,
  Pencil,
  Download,
  Upload,
} from 'lucide-react';

export function Toolbar() {
  const t = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    grid,
    enemy,
    weights,
    unitCount,
    samplingDensity,
    showDistanceAttenuation,
    currentPreset,
    editState,
    placedUnits,
    isRunning,
    applyPreset,
    randomizeMap,
    setEditState,
    setResults,
    setPlacedUnits,
    addPlacedUnit,
    setIsRunning,
    setCurrentStep,
    reset,
  } = useBattlefieldStore();

  const presets: { value: PresetType; label: string }[] = [
    { value: 'openField', label: t.demo.presets.openField },
    { value: 'denseObstacles', label: t.demo.presets.denseObstacles },
    { value: 'mixed', label: t.demo.presets.mixed },
    { value: 'ridgeValley', label: t.demo.presets.ridgeValley },
  ];

  const handleRun = () => {
    setIsRunning(true);
    const results = runSimulation(grid, enemy, weights, unitCount, samplingDensity, showDistanceAttenuation);
    setResults(results);
    setPlacedUnits(results.units.map((u) => u.selectedPosition));
    setCurrentStep(unitCount);
    setIsRunning(false);
  };

  const handleStep = () => {
    if (placedUnits.length >= unitCount) return;

    setIsRunning(true);
    const result = runSimulationStep(
      grid,
      enemy,
      weights,
      placedUnits,
      samplingDensity,
      showDistanceAttenuation
    );
    if (result) {
      addPlacedUnit(result.selectedPosition);
      setCurrentStep(placedUnits.length + 1);
    }
    setIsRunning(false);
  };

  const handleReset = () => {
    reset();
  };

  const handleExport = () => {
    const state = useBattlefieldStore.getState();
    exportState({
      grid: state.grid,
      enemy: state.enemy,
      platformType: state.platformType,
      weights: state.weights,
      unitCount: state.unitCount,
      results: state.results ?? undefined,
    });
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await importState(file);
      const store = useBattlefieldStore.getState();
      store.setGrid(data.grid);
      store.setEnemy(data.enemy);
      store.setPlatformType(data.platformType);
      store.setWeights(data.weights);
      store.setUnitCount(data.unitCount);
      if (data.results) {
        store.setResults(data.results);
        store.setPlacedUnits(data.results.units.map((u) => u.selectedPosition));
      }
    } catch (error) {
      console.error('Failed to import:', error);
    }

    e.target.value = '';
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 border-b border-border bg-card">
      <Button
        onClick={handleRun}
        disabled={isRunning}
        className="gap-2"
        data-testid="button-run"
      >
        <Play className="h-4 w-4" />
        {t.demo.toolbar.run}
      </Button>

      <Button
        variant="outline"
        onClick={handleStep}
        disabled={isRunning || placedUnits.length >= unitCount}
        className="gap-2"
        data-testid="button-step"
      >
        <StepForward className="h-4 w-4" />
        {t.demo.toolbar.step}
      </Button>

      <Button
        variant="outline"
        onClick={handleReset}
        className="gap-2"
        data-testid="button-reset"
      >
        <RotateCcw className="h-4 w-4" />
        {t.demo.toolbar.reset}
      </Button>

      <div className="h-6 w-px bg-border mx-2" />

      <Select value={currentPreset} onValueChange={(v) => applyPreset(v as PresetType)}>
        <SelectTrigger className="w-40" data-testid="select-preset">
          <SelectValue placeholder={t.demo.toolbar.preset} />
        </SelectTrigger>
        <SelectContent>
          {presets.map((preset) => (
            <SelectItem key={preset.value} value={preset.value}>
              {preset.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={randomizeMap}
        className="gap-2"
        data-testid="button-randomize"
      >
        <Shuffle className="h-4 w-4" />
        {t.demo.toolbar.randomize}
      </Button>

      <Button
        variant={editState.enabled ? 'default' : 'outline'}
        onClick={() => setEditState({ enabled: !editState.enabled })}
        className="gap-2"
        data-testid="button-edit-mode"
      >
        <Pencil className="h-4 w-4" />
        {t.demo.toolbar.editMode}
      </Button>

      <div className="h-6 w-px bg-border mx-2" />

      <Button
        variant="outline"
        onClick={handleExport}
        className="gap-2"
        data-testid="button-export"
      >
        <Download className="h-4 w-4" />
        {t.demo.toolbar.export}
      </Button>

      <Button
        variant="outline"
        onClick={handleImport}
        className="gap-2"
        data-testid="button-import"
      >
        <Upload className="h-4 w-4" />
        {t.demo.toolbar.import}
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
