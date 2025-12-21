import { Card } from "@/components/ui/card";
import { GraduationCap, Building2, TrendingUp, Target, Brain, Zap } from "lucide-react";

const TargetAudienceSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Kimler İçin */}
        <div className="text-center mb-32">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Kimler <span className="text-primary">İçin?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-16">
            Sardes, farklı seviyelerden yatırımcılar için tasarlandı.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="bg-card/30 backdrop-blur-md border-border/30 p-6 sm:p-8 text-center relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <GraduationCap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">Üniversite öğrencileri ve genç yatırımcılar</h3>
            </Card>
            
            <Card className="bg-card/30 backdrop-blur-md border-border/30 p-6 sm:p-8 text-center relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <Building2 className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">Finans kurumları ve bankalar</h3>
            </Card>
            
            <Card className="bg-card/30 backdrop-blur-md border-border/30 p-6 sm:p-8 text-center relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">Trader / analist adayları</h3>
            </Card>
          </div>
        </div>

        {/* Neden Farklı */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Neden <span className="text-primary">Sardes?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-16">
            Geleneksel anketlerden farklı olarak gerçek davranışları ölçer.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="bg-card/30 backdrop-blur-md border-border/30 p-6 sm:p-8 text-center relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">Anket değil, gerçek karar simülasyonu</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Teorik sorular yerine gerçekçi yatırım senaryoları
              </p>
            </Card>
            
            <Card className="bg-card/30 backdrop-blur-md border-border/30 p-6 sm:p-8 text-center relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <Brain className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">Bilgi değil, davranış ölçer</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Ne bildiğin değil, nasıl karar verdiğin önemli
              </p>
            </Card>
            
            <Card className="bg-card/30 backdrop-blur-md border-border/30 p-6 sm:p-8 text-center relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">Geçmiş değil, anlık refleksi analiz eder</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Gerçek zamanlı karar verme sürecinizi ölçer
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;