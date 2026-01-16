import { useEffect } from 'react';
import { useBattlefieldStore } from '@/stores/battlefieldStore';
import { Toolbar } from '@/components/demo/Toolbar';
import { MapCanvas } from '@/components/demo/MapCanvas';
import { ControlPanel } from '@/components/demo/ControlPanel';
import { ResultsPanel } from '@/components/demo/ResultsPanel';
import { EditTools } from '@/components/demo/EditTools';
import { Legend } from '@/components/demo/Legend';
import { TutorialOverlay } from '@/components/demo/TutorialOverlay';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 480;

export default function Demo() {
  const { applyPreset, currentPreset } = useBattlefieldStore();

  useEffect(() => {
    applyPreset(currentPreset);
  }, []);

  return (
    <div className="min-h-screen pt-16 bg-background">
      <TutorialOverlay />

      <Toolbar />

      <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)]">
        <div className="flex-1 lg:w-[70%] p-4 flex flex-col gap-4 overflow-auto">
          <div className="flex-1 flex items-center justify-center">
            <MapCanvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[250px]">
              <EditTools />
            </div>
            <div className="w-64">
              <Legend />
            </div>
          </div>
        </div>

        <div className="lg:w-[30%] border-l border-border flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <ControlPanel />
            <ResultsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
