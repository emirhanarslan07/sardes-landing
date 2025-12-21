import { Card } from "@/components/ui/card";
import { TrendingUp, Clock, Search, Target } from "lucide-react";

const WhyNowSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Neden <span className="text-primary">Şimdi?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-card/30 backdrop-blur-md border-border/30 p-6 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Genç yatırımcı sayısı hızla artıyor</h3>
            </div>
          </Card>

          <Card className="bg-card/30 backdrop-blur-md border-border/30 p-6 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Finansal kararlar hiç bu kadar hızlı alınmamıştı</h3>
            </div>
          </Card>

          <Card className="bg-card/30 backdrop-blur-md border-border/30 p-6 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Ancak kimse nasıl karar verdiğini ölçmüyor</h3>
            </div>
          </Card>

          <Card className="bg-card/30 backdrop-blur-md border-border/30 p-6 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Sardes bu boşluğu doldurmak için geliştiriliyor</h3>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-xl text-primary font-semibold">
            → Erken erişime katıl.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyNowSection;