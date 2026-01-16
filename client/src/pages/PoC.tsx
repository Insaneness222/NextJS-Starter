import { useTranslation } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Target,
  Lightbulb,
  Settings,
  ListOrdered,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export default function PoC() {
  const t = useTranslation();

  const sections = [
    { id: 'background', icon: Lightbulb, title: t.poc.background.title },
    { id: 'objectives', icon: Target, title: t.poc.objectives.title },
    { id: 'approach', icon: Settings, title: t.poc.approach.title },
    { id: 'process', icon: ListOrdered, title: t.poc.process.title },
    { id: 'outcomes', icon: TrendingUp, title: t.poc.outcomes.title },
  ];

  return (
    <div className="min-h-screen pt-16 pb-12">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Proof of Concept
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            {t.nav.poc}
          </h1>
        </div>

        <Accordion type="multiple" defaultValue={['background', 'objectives']} className="space-y-4">
          <AccordionItem value="background" className="border rounded-lg px-6">
            <AccordionTrigger className="py-6" data-testid="accordion-background">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <span className="text-lg font-semibold">{t.poc.background.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <p className="text-muted-foreground leading-relaxed pl-[52px]">
                {t.poc.background.content}
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="objectives" className="border rounded-lg px-6">
            <AccordionTrigger className="py-6" data-testid="accordion-objectives">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Target className="h-5 w-5" />
                </div>
                <span className="text-lg font-semibold">{t.poc.objectives.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="pl-[52px]">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t.poc.objectives.content}
                </p>
                <Badge variant="outline" className="text-primary border-primary">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  {t.poc.objectives.badge}
                </Badge>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="approach" className="border rounded-lg px-6">
            <AccordionTrigger className="py-6" data-testid="accordion-approach">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Settings className="h-5 w-5" />
                </div>
                <span className="text-lg font-semibold">{t.poc.approach.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="pl-[52px] space-y-8">
                <div>
                  <h4 className="font-semibold mb-3">{t.poc.approach.criteria.title}</h4>
                  <ul className="space-y-2">
                    {t.poc.approach.criteria.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">{t.poc.approach.reward.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t.poc.approach.reward.description}
                  </p>
                  <Card className="bg-muted/50">
                    <CardContent className="py-4">
                      <code className="text-sm font-mono text-primary break-all">
                        {t.poc.approach.reward.formula}
                      </code>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">{t.poc.approach.io.title}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Inputs</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {t.poc.approach.io.inputs.map((input, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                              <ArrowRight className="h-3 w-3 text-primary" />
                              {input}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Outputs</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {t.poc.approach.io.outputs.map((output, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                              <ArrowRight className="h-3 w-3 text-primary" />
                              {output}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Badge variant="outline" className="text-primary border-primary">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  {t.poc.approach.badge}
                </Badge>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="process" className="border rounded-lg px-6">
            <AccordionTrigger className="py-6" data-testid="accordion-process">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <ListOrdered className="h-5 w-5" />
                </div>
                <span className="text-lg font-semibold">{t.poc.process.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="pl-[52px]">
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                  <div className="space-y-6">
                    {t.poc.process.steps.map((step, i) => (
                      <div key={i} className="relative flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0 z-10">
                          {i + 1}
                        </div>
                        <div className="pt-1">
                          <h5 className="font-semibold text-sm">{step.title}</h5>
                          <p className="text-sm text-muted-foreground">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="outcomes" className="border rounded-lg px-6">
            <AccordionTrigger className="py-6" data-testid="accordion-outcomes">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span className="text-lg font-semibold">{t.poc.outcomes.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="pl-[52px]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{t.poc.outcomes.tactical.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {t.poc.outcomes.tactical.items.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-chart-3 mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{t.poc.outcomes.technical.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {t.poc.outcomes.technical.items.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-chart-1 mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{t.poc.outcomes.extension.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {t.poc.outcomes.extension.items.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-chart-4 mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
