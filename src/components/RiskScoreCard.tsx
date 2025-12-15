import { Card } from "@/components/ui/card";

const stats = [
  { title: "Risk Skoru", value: "88", suffix: "/100", bars: [40, 65, 45, 80, 60, 90, 75, 88] },
  { title: "Stres Yönetimi", value: "94", suffix: "%", bars: [50, 70, 85, 60, 90, 75, 88, 94] },
  { title: "Tutarlılık", value: "87", suffix: "%", bars: [60, 55, 70, 80, 75, 85, 82, 87] },
  { title: "Kayıp Sonrası", value: "91", suffix: "%", bars: [45, 60, 55, 75, 80, 85, 88, 91] },
  { title: "Strateji Uyumu", value: "76", suffix: "%", bars: [50, 65, 60, 70, 68, 72, 74, 76] },
  { title: "Adaptasyon", value: "92", suffix: "%", bars: [55, 70, 65, 80, 85, 88, 90, 92] },
];

const RiskScoreCard = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 w-full max-w-2xl sm:max-w-3xl">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className="bg-card/30 backdrop-blur-md border-border/30 p-5 sm:p-6 animate-float min-w-[140px]"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm sm:text-base text-muted-foreground font-medium whitespace-nowrap">{stat.title}</span>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse ml-2 flex-shrink-0" />
          </div>
          
          <div className="flex items-end gap-1 mb-3">
            <span className="text-3xl sm:text-4xl font-bold text-primary">{stat.value}</span>
            <span className="text-muted-foreground text-xs sm:text-sm mb-1">{stat.suffix}</span>
          </div>
          
          {/* Mini chart visualization */}
          <div className="flex items-end gap-0.5 h-8">
            {stat.bars.map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-primary/30 rounded-t transition-all duration-300"
                style={{ 
                  height: `${height}%`,
                  backgroundColor: i === stat.bars.length - 1 ? 'hsl(var(--primary))' : undefined
                }}
              />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default RiskScoreCard;
