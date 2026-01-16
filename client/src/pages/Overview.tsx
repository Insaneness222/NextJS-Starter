import { Link } from 'wouter';
import { useTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ArrowRight,
  FileText,
  Target,
  Layers,
  Crosshair,
  Settings2,
  Shuffle,
  Pencil,
  SlidersHorizontal,
  BarChart3,
  Download,
  ChevronRight,
} from 'lucide-react';

export default function Overview() {
  const t = useTranslation();

  const pipelineSteps = [
    { icon: Layers, ...t.sections.coreIdea.steps.terrain },
    { icon: Target, ...t.sections.coreIdea.steps.candidates },
    { icon: SlidersHorizontal, ...t.sections.coreIdea.steps.scoring },
    { icon: Crosshair, ...t.sections.coreIdea.steps.deployment },
  ];

  const platforms = [
    { key: 'artillery', color: 'text-chart-1', ...t.sections.platforms.artillery },
    { key: 'tank', color: 'text-chart-3', ...t.sections.platforms.tank },
    { key: 'ugv', color: 'text-chart-4', ...t.sections.platforms.ugv },
  ];

  const features = [
    { icon: Settings2, ...t.sections.features.presets },
    { icon: Shuffle, ...t.sections.features.randomize },
    { icon: Pencil, ...t.sections.features.manual },
    { icon: SlidersHorizontal, ...t.sections.features.weights },
    { icon: BarChart3, ...t.sections.features.top5 },
    { icon: Download, ...t.sections.features.export },
  ];

  return (
    <div className="min-h-screen pt-16">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Crosshair className="h-4 w-4" />
            Research PoC
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            {t.hero.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/demo">
              <Button size="lg" className="gap-2" data-testid="button-go-to-demo">
                {t.hero.goToDemo}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/poc">
              <Button variant="outline" size="lg" className="gap-2" data-testid="button-view-poc">
                <FileText className="h-4 w-4" />
                {t.hero.viewPoc}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t.sections.problem.title}</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.sections.problem.description}
          </p>
        </div>
      </section>

      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t.sections.coreIdea.title}</h2>
            <p className="text-muted-foreground">{t.sections.coreIdea.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {pipelineSteps.map((step, index) => (
              <div key={step.title} className="relative">
                <Card className="h-full hover-elevate">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <step.icon className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground">0{index + 1}</span>
                    </div>
                    <h3 className="font-semibold mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </CardContent>
                </Card>
                {index < pipelineSteps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t.sections.platforms.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {platforms.map((platform) => (
            <Card key={platform.key} className="hover-elevate" data-testid={`card-platform-${platform.key}`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center ${platform.color}`}>
                    {platform.key === 'artillery' && <Target className="h-5 w-5" />}
                    {platform.key === 'tank' && <Crosshair className="h-5 w-5" />}
                    {platform.key === 'ugv' && <Settings2 className="h-5 w-5" />}
                  </div>
                  <CardTitle>{platform.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {platform.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t.sections.features.title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.title} className="hover-elevate" data-testid={`card-feature-${index}`}>
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
          Battlefield Deployment Simulator - Research PoC
        </div>
      </footer>
    </div>
  );
}
