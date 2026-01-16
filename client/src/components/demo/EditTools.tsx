import { useTranslation } from '@/lib/i18n';
import { useBattlefieldStore } from '@/stores/battlefieldStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import type { ObstacleType, EditTool } from '@/types/battlefield';
import { Building2, Trees, Mountain, Eraser } from 'lucide-react';

export function EditTools() {
  const t = useTranslation();
  const { editState, setEditState } = useBattlefieldStore();

  if (!editState.enabled) return null;

  const obstacleTypes: { value: ObstacleType; label: string; icon: typeof Building2 }[] = [
    { value: 'building', label: t.demo.editMode.building, icon: Building2 },
    { value: 'forest', label: t.demo.editMode.forest, icon: Trees },
    { value: 'hill', label: t.demo.editMode.hill, icon: Mountain },
  ];

  const handleToolChange = (tool: EditTool) => {
    setEditState({ tool });
  };

  const handleObstacleChange = (obstacle: ObstacleType) => {
    setEditState({ obstacleType: obstacle, tool: 'brush' });
  };

  return (
    <Card className="border-primary/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          {t.demo.editMode.title}
        </CardTitle>
        <CardDescription className="text-sm">
          {t.demo.editMode.description}
          <br />
          <span className="text-xs opacity-70">{t.demo.editMode.optional}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm">{t.demo.editMode.brushSize}</Label>
          <div className="flex items-center gap-3">
            <Slider
              value={[editState.brushSize]}
              min={1}
              max={5}
              step={1}
              onValueChange={([v]) => setEditState({ brushSize: v })}
              className="flex-1"
              data-testid="slider-brush-size"
            />
            <span className="text-sm font-mono w-6 text-right">{editState.brushSize}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm">{t.demo.editMode.obstacleType}</Label>
          <div className="grid grid-cols-2 gap-2">
            {obstacleTypes.map((type) => (
              <Button
                key={type.value}
                variant={editState.tool === 'brush' && editState.obstacleType === type.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleObstacleChange(type.value)}
                className="gap-2 justify-start"
                data-testid={`button-obstacle-${type.value}`}
              >
                <type.icon className="h-4 w-4" />
                {type.label}
              </Button>
            ))}
            <Button
              variant={editState.tool === 'eraser' ? 'destructive' : 'outline'}
              size="sm"
              onClick={() => handleToolChange('eraser')}
              className="gap-2 justify-start col-span-2"
              data-testid="button-eraser"
            >
              <Eraser className="h-4 w-4" />
              {t.demo.editMode.eraser}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
