import { Link, useLocation } from 'wouter';
import { useTranslation, useLanguageStore } from '@/lib/i18n';
import { useThemeStore } from '@/stores/themeStore';
import { Button } from '@/components/ui/button';
import { Crosshair, Sun, Moon, Globe } from 'lucide-react';

export function TopNav() {
  const t = useTranslation();
  const { language, setLanguage } = useLanguageStore();
  const { theme, toggleTheme } = useThemeStore();
  const [location] = useLocation();

  const navItems = [
    { path: '/', label: t.nav.overview },
    { path: '/poc', label: t.nav.poc },
    { path: '/demo', label: t.nav.demo },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Crosshair className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg hidden sm:inline">BDS</span>
        </div>

        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <Button
                variant="ghost"
                className={`px-4 py-2 relative ${
                  location === item.path
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
                data-testid={`link-nav-${item.path === '/' ? 'overview' : item.path.slice(1)}`}
              >
                {item.label}
                {location === item.path && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full" />
                )}
              </Button>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === 'en' ? 'ko' : 'en')}
            data-testid="button-language-toggle"
            className="gap-1"
          >
            <Globe className="h-4 w-4" />
            <span className="text-xs font-mono">{language.toUpperCase()}</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
}
