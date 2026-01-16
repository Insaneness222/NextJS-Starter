import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { useBattlefieldStore } from '@/stores/battlefieldStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, X } from 'lucide-react';

export function TutorialOverlay() {
  const t = useTranslation();
  const { showTutorial, dismissTutorial } = useBattlefieldStore();
  const [currentStep, setCurrentStep] = useState(0);

  if (!showTutorial) return null;

  const steps = t.demo.tutorial.steps;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      dismissTutorial();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    dismissTutorial();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Card className="w-full max-w-lg mx-4 animate-in fade-in-50 zoom-in-95">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={handleSkip}
            data-testid="button-tutorial-close"
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-xl">{t.demo.tutorial.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">{currentStep + 1}</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{steps[currentStep].title}</h3>
            <p className="text-muted-foreground">{steps[currentStep].desc}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={handleSkip} data-testid="button-tutorial-skip">
            {t.demo.tutorial.skip}
          </Button>
          <Button onClick={handleNext} className="gap-2" data-testid="button-tutorial-next">
            {isLastStep ? t.demo.tutorial.gotIt : t.demo.tutorial.next}
            {!isLastStep && <ChevronRight className="h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
