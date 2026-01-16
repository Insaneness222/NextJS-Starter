import { useTranslation } from '@/lib/i18n';
import { useBattlefieldStore } from '@/stores/battlefieldStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BarChart3, MapPin } from 'lucide-react';

export function ResultsPanel() {
  const t = useTranslation();
  const { results } = useBattlefieldStore();

  if (!results) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-4 border-b border-border">
          <CardTitle className="text-lg">{t.demo.results.title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 flex items-center justify-center h-48 text-muted-foreground">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">{t.demo.results.noResults}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const summaryMetrics = [
    { label: t.demo.results.avgExposure, value: results.avgExposure.toFixed(2) },
    { label: t.demo.results.avgVisibility, value: results.avgVisibility.toFixed(2) },
    { label: t.demo.results.minDistance, value: results.minDistance.toFixed(1) },
    { label: t.demo.results.totalScore, value: results.totalScore.toFixed(2) },
  ];

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-4 border-b border-border">
        <CardTitle className="text-lg">{t.demo.results.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">{t.demo.results.summary}</h4>
          <div className="grid grid-cols-2 gap-3">
            {summaryMetrics.map((metric, index) => (
              <div key={metric.label} className="bg-muted/50 rounded-lg p-3" data-testid={`metric-${index}`}>
                <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                <p className="text-xl font-mono font-bold" data-testid={`text-metric-value-${index}`}>{metric.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold">{t.demo.results.positions}</h4>
          <Accordion type="multiple" className="space-y-2">
            {results.units.map((unit, index) => (
              <AccordionItem
                key={index}
                value={`unit-${index}`}
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="py-3" data-testid={`accordion-unit-${index}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                      {index + 1}
                    </div>
                    <span className="text-sm">
                      {t.demo.results.unit} {index + 1}
                    </span>
                    <Badge variant="secondary" className="ml-auto mr-2 font-mono">
                      {unit.totalScore.toFixed(2)}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-mono">
                        ({unit.selectedPosition.x}, {unit.selectedPosition.y})
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold mb-2">
                        {t.demo.results.breakdown}
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="bg-muted/30 rounded p-2">
                          <span className="text-muted-foreground">VIS</span>
                          <span className="font-mono ml-1">{unit.breakdown.visibility.toFixed(2)}</span>
                        </div>
                        <div className="bg-muted/30 rounded p-2">
                          <span className="text-muted-foreground">EXP</span>
                          <span className="font-mono ml-1">{unit.breakdown.exposure.toFixed(2)}</span>
                        </div>
                        <div className="bg-muted/30 rounded p-2">
                          <span className="text-muted-foreground">COV</span>
                          <span className="font-mono ml-1">{unit.breakdown.cover.toFixed(2)}</span>
                        </div>
                        <div className="bg-muted/30 rounded p-2">
                          <span className="text-muted-foreground">ELE</span>
                          <span className="font-mono ml-1">{unit.breakdown.elevation.toFixed(2)}</span>
                        </div>
                        <div className="bg-muted/30 rounded p-2">
                          <span className="text-muted-foreground">MOB</span>
                          <span className="font-mono ml-1">{unit.breakdown.mobility.toFixed(2)}</span>
                        </div>
                        <div className="bg-muted/30 rounded p-2">
                          <span className="text-muted-foreground">SEP</span>
                          <span className="font-mono ml-1">{unit.breakdown.separation.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold mb-2">
                        {t.demo.results.top5}
                      </p>
                      <div className="space-y-1">
                        {unit.top5.slice(0, 5).map((candidate, ci) => (
                          <div
                            key={ci}
                            className="flex items-center justify-between text-xs bg-muted/20 rounded px-2 py-1"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">#{ci + 1}</span>
                              <span className="font-mono">
                                ({candidate.position.x}, {candidate.position.y})
                              </span>
                            </div>
                            <span className="font-mono font-semibold">
                              {candidate.scores.total.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
}
