import { Card } from "@/components/ui/card";
import { Target, Brain, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhySardesSection = () => {
  const { t } = useLanguage();
  
  return (
    <section id="ne-yapiyor" className="pt-20 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Sardes ne yapıyor? Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t('what.title')}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-16">
            {t('what.subtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
            <Card className="bg-card/30 backdrop-blur-md border-border/30 p-6 sm:p-8 text-center relative overflow-hidden group hover:border-primary/50 transition-all duration-300 card-hover card-hover-blue interactive">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-blue-500/20 transition-colors duration-300">
                <Target className="w-7 h-7 text-primary transition-all duration-300 icon-hover-blue" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 group-hover:text-accent-blue transition-colors duration-300">{t('what.card1.title')}</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {t('what.card1.desc')}
              </p>
            </Card>
            
            <Card className="bg-card/30 backdrop-blur-md border-border/30 p-6 sm:p-8 text-center relative overflow-hidden group hover:border-primary/50 transition-all duration-300 card-hover card-hover-purple interactive">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-purple-500/20 transition-colors duration-300">
                <Brain className="w-7 h-7 text-primary transition-all duration-300 icon-hover-purple" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 group-hover:text-accent-purple transition-colors duration-300">{t('what.card2.title')}</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {t('what.card2.desc')}
              </p>
            </Card>
            
            <Card className="bg-card/30 backdrop-blur-md border-border/30 p-6 sm:p-8 text-center relative overflow-hidden group hover:border-primary/50 transition-all duration-300 card-hover card-hover-emerald interactive">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-emerald-500/20 transition-colors duration-300">
                <Zap className="w-7 h-7 text-primary transition-all duration-300 icon-hover-emerald" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 group-hover:text-accent-emerald transition-colors duration-300">{t('what.card3.title')}</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {t('what.card3.desc')}
              </p>
            </Card>
          </div>
          
          {/* Key Message After Cards */}
          <p className="text-primary text-lg sm:text-xl font-medium max-w-2xl mx-auto text-center mb-32">
            {t('what.bottom')}
          </p>
        </div>


      </div>
    </section>
  );
};

export default WhySardesSection;