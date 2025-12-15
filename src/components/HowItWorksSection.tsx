import { Card } from "@/components/ui/card";
import { Play, BarChart3, CreditCard } from "lucide-react";

const steps = [
  {
    icon: Play,
    step: "01",
    title: "Simülasyonu Tamamla",
    description: "Gerçekçi yatırım senaryolarında kararlar al. Her seçimin analiz ediliyor.",
  },
  {
    icon: BarChart3,
    step: "02",
    title: "AI Analiz Raporu Al",
    description: "Yapay zeka destekli detaylı risk profili ve davranış analizi raporunu incele.",
  },
  {
    icon: CreditCard,
    step: "03",
    title: "Sardes Card ile Kanıtla",
    description: "Finansal yeteneğini dijital kartınla dünyaya göster ve topluluğa katıl.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Nasıl <span className="text-primary">Çalışır?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Üç basit adımda yatırımcı karakterini keşfet ve finansal yeteneğini kanıtla.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <Card
              key={step.step}
              className="bg-card/30 backdrop-blur-md border-border/30 p-6 sm:p-8 text-center relative overflow-hidden group hover:border-primary/50 transition-all duration-300 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Step Number Background */}
              <span className="absolute -top-4 -right-2 text-8xl font-bold text-primary/10 select-none">
                {step.step}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <step.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
