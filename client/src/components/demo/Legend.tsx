import { useTranslation } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Legend() {
  const t = useTranslation();

  const items = [
    { color: 'bg-red-500', label: t.demo.legend.enemy },
    { color: 'bg-blue-500', label: t.demo.legend.friendly },
    { color: 'bg-green-500', shape: 'square', label: t.demo.legend.selected },
    { color: 'bg-gray-500', label: t.demo.legend.building },
    { color: 'bg-green-700', label: t.demo.legend.forest },
    { color: 'bg-amber-600', label: t.demo.legend.hill },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">{t.demo.legend.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-xs">
              <div
                className={`w-3 h-3 ${item.color} ${item.shape === 'square' ? 'rounded-sm' : 'rounded-full'}`}
              />
              <span className="text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
