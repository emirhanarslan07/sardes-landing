import { Card } from "@/components/ui/card";
import { TrendingUp, Clock, Search, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhyNowSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl sm:text-4xl font-bold mb-6"
            dangerouslySetInnerHTML={{ __html: t('whyNow.title') }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-card/30 backdrop-blur-md border-border/30 p-6 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">{t('whyNow.card1')}</h3>
            </div>
          </Card>

          <Card className="bg-card/30 backdrop-blur-md border-border/30 p-6 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">{t('whyNow.card2')}</h3>
            </div>
          </Card>

          <Card className="bg-card/30 backdrop-blur-md border-border/30 p-6 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">{t('whyNow.card3')}</h3>
            </div>
          </Card>

          <Card className="bg-card/30 backdrop-blur-md border-border/30 p-6 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">{t('whyNow.card4')}</h3>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-xl text-primary font-semibold">
            {t('whyNow.cta')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyNowSection;