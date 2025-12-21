import { Button } from "@/components/ui/button";
import WaitlistForm from "./WaitlistForm";
import ClubApplicationForm from "./ClubApplicationForm";
import { useState } from "react";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FinalCTASection = () => {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [showClubForm, setShowClubForm] = useState(false);

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Card Container */}
        <div className="bg-card/30 backdrop-blur-md border-2 border-primary/30 rounded-3xl p-16 sm:p-20 text-center shadow-2xl shadow-black/20 cta-card-animated cta-border-glow animated-border relative">
          <div className="cta-dots"></div>
          <div className="cta-content">
          
          {/* Main Heading */}
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white"
            dangerouslySetInnerHTML={{ __html: t('cta.title') }}
          />
          
          {/* Subtitle */}
          <p className="text-muted-foreground text-lg sm:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('cta.subtitle')}
          </p>
          
          {/* Benefits List */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-12">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span className="text-base sm:text-lg">{t('cta.feature1')}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span className="text-base sm:text-lg">{t('cta.feature2')}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span className="text-base sm:text-lg">{t('cta.feature3')}</span>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="max-w-md mx-auto">
            {!showForm ? (
              <>
                <Button 
                  size="lg" 
                  onClick={() => setShowForm(true)}
                  className="text-base font-medium px-10 py-4 mb-6 btn-cta btn-ripple interactive-btn pulse-glow text-white rounded-xl"
                >
                  {t('cta.button')}
                </Button>
                
                {/* Club Registration Option */}
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    {t('cta.clubs')}
                  </p>
                  <button
                    onClick={() => setShowClubForm(true)}
                    className="text-primary hover:text-primary/80 text-sm font-medium underline underline-offset-4 transition-colors"
                  >
                    {t('cta.clubsLink')}
                  </button>
                </div>
              </>
            ) : (
              <WaitlistForm onBack={() => setShowForm(false)} />
            )}
          </div>
          </div>
        </div>
      </div>
      
      {/* Club Application Form Modal */}
      {showClubForm && (
        <ClubApplicationForm onClose={() => setShowClubForm(false)} />
      )}
    </section>
  );
};

export default FinalCTASection;