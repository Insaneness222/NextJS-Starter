import { useTranslation } from '@/lib/i18n';
import { useBattlefieldStore } from '@/stores/battlefieldStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { PlatformType, Weights } from '@/types/battlefield';

export function ControlPanel() {
  const t = useTranslation();

  const {
    platformType,
    weights,
    unitCount,
    samplingDensity,
    showLoS,
    showThreatCone,
    showDistanceAttenuation,
    setPlatformType,
    setWeight,
    setUnitCount,
    setSamplingDensity,
    toggleLoS,
    toggleThreatCone,
    toggleDistanceAttenuation,
  } = useBattlefieldStore();

  const templates: { value: PlatformType | 'custom'; label: string }[] = [
    { value: 'artillery', label: t.demo.control.artillery },
    { value: 'tank', label: t.demo.control.tank },
    { value: 'ugv', label: t.demo.control.ugv },
  ];

  const weightLabels: Record<keyof Weights, string> = {
    visibility: t.demo.control.visibility,
    exposure: t.demo.control.exposure,
    cover: t.demo.control.cover,
    elevation: t.demo.control.elevation,
    mobility: t.demo.control.mobility,
    separation: t.demo.control.separation,
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4 border-b border-border">
        <CardTitle className="text-lg">{t.demo.control.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6 overflow-y-auto max-h-[calc(100vh-400px)]">
        <div className="space-y-3">
          <Label>{t.demo.control.template}</Label>
          <Select
            value={platformType}
            onValueChange={(v) => setPlatformType(v as PlatformType)}
          >
            <SelectTrigger data-testid="select-platform">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {templates.map((template) => (
                <SelectItem key={template.value} value={template.value}>
                  {template.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-semibold">{t.demo.control.weights}</Label>
          {(Object.keys(weights) as Array<keyof Weights>).map((key) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{weightLabels[key]}</span>
                <span className="text-sm font-mono">{weights[key].toFixed(2)}</span>
              </div>
              <Slider
                value={[weights[key]]}
                min={0}
                max={1}
                step={0.05}
                onValueChange={([v]) => setWeight(key, v)}
                data-testid={`slider-${key}`}
              />
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <Label>{t.demo.control.unitCount}</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[unitCount]}
              min={1}
              max={10}
              step={1}
              onValueChange={([v]) => setUnitCount(v)}
              className="flex-1"
              data-testid="slider-unit-count"
            />
            <span className="text-sm font-mono w-8 text-right">{unitCount}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label>{t.demo.control.samplingDensity}</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[samplingDensity]}
              min={0.1}
              max={1}
              step={0.1}
              onValueChange={([v]) => setSamplingDensity(v)}
              className="flex-1"
              data-testid="slider-sampling"
            />
            <span className="text-sm font-mono w-12 text-right">{(samplingDensity * 100).toFixed(0)}%</span>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border">
          <Label className="text-sm font-semibold">{t.demo.control.toggles}</Label>

          <div className="flex items-center justify-between">
            <span className="text-sm">{t.demo.control.losToggle}</span>
            <Switch
              checked={showLoS}
              onCheckedChange={toggleLoS}
              data-testid="switch-los"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">{t.demo.control.threatCone}</span>
            <Switch
              checked={showThreatCone}
              onCheckedChange={toggleThreatCone}
              data-testid="switch-threat-cone"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">{t.demo.control.distanceAtten}</span>
            <Switch
              checked={showDistanceAttenuation}
              onCheckedChange={toggleDistanceAttenuation}
              data-testid="switch-distance-atten"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
