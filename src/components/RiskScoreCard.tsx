import { Card } from "@/components/ui/card";

const stats = [
  { title: "Risk Skoru", value: "88/100" },
  { title: "Stres Yönetimi", value: "%94" },
  { title: "Tutarlılık", value: "%87" },
  { title: "Kayıp Sonrası", value: "%91" },
  { title: "Strateji Uyumu", value: "%76" },
  { title: "Adaptasyon", value: "%92" },
];

const RiskScoreCard = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-md sm:max-w-xl">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className="bg-card/30 backdrop-blur-md border-border/30 p-4 sm:p-5 text-center animate-float"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <p className="text-xs sm:text-sm text-muted-foreground mb-1">{stat.title}</p>
          <p className="text-xl sm:text-2xl font-bold text-primary">{stat.value}</p>
        </Card>
      ))}
    </div>
  );
};

export default RiskScoreCard;
