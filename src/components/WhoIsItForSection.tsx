import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackCTAClick } from "@/lib/analytics";
import { Link } from "react-router-dom";

const WhoIsItForSection = () => {
  const { t } = useLanguage();

  const handleCTAClick = (buttonName: string) => {
    trackCTAClick(buttonName);
  };

  const scrollToEarlyAccess = () => {
    handleCTAClick('Erken Erişime Katıl');
    const element = document.getElementById('erken-erisim');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {t('who.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t('who.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Bireysel Kullanıcılar */}
          <Card className="bg-card/30 backdrop-blur-md border-border/30 p-8 card-interactive magnetic-card ripple-effect">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{t('who.individual.title')}</h3>
            </div>
            
            <h4 className="text-lg font-semibold mb-4 text-primary">{t('who.individual.title')}</h4>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{t('who.individual.item1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{t('who.individual.item2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{t('who.individual.item3')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{t('who.individual.item4')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{t('who.individual.item5')}</span>
              </li>
            </ul>
            
            {/* CTA Button for Individual Users */}
            <div className="mt-6">
              <Button 
                onClick={scrollToEarlyAccess}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Erken Erişime Katıl
              </Button>
            </div>
          </Card>

          {/* Kulüpler & Öğrenci Toplulukları */}
          <Card className="bg-card/30 backdrop-blur-md border-border/30 p-8 card-interactive magnetic-card ripple-effect">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{t('who.clubs.title')}</h3>
            </div>
            
            <h4 className="text-lg font-semibold mb-4 text-primary">{t('who.clubs.subtitle')}</h4>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{t('who.clubs.item1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{t('who.clubs.item2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{t('who.clubs.item3')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{t('who.clubs.item4')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{t('who.clubs.item5')}</span>
              </li>
            </ul>
            
            {/* CTA Button for Clubs */}
            <div className="mt-6">
              <Link to="/clubs">
                <Button 
                  onClick={() => handleCTAClick('Kulüp Olarak Sardes\'i Keşfedin')}
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  Kulüp Olarak Sardes'i Keşfedin
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhoIsItForSection;