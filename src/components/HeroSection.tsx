
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";
import InterestModal from "@/components/InterestModal";

const HeroSection = () => {
  const { t } = useLanguage();
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);

  const handleInterestClick = () => {
    // Track CTA click
    trackCTAClick(t('hero.cta'));
    
    // Track specific interest modal open event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'interest_modal_open', {
        event_category: 'engagement',
        event_label: 'hero_cta_click'
      });
    }
    
    setIsInterestModalOpen(true);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden" style={{ paddingTop: '140px' }}>

      {/* Subtle Background Decorations */}
      <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full blur-xl float-element" style={{ background: 'linear-gradient(135deg, rgba(120, 219, 226, 0.1), rgba(59, 130, 246, 0.05))' }}></div>
      <div className="absolute top-1/3 right-16 w-32 h-32 rounded-full blur-2xl float-element" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(120, 219, 226, 0.04))', animationDelay: '-2s' }}></div>
      <div className="absolute bottom-1/4 left-1/4 w-16 h-16 rounded-full blur-lg float-element" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.06), rgba(59, 130, 246, 0.03))', animationDelay: '2s' }}></div>
      
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
        
        {/* Badge */}
        <div 
          className="inline-flex items-center bg-primary/10 backdrop-blur-md border border-primary/20 rounded-full px-4 py-2 mb-8 badge-animated badge-glow"
        >
          <div className="badge-content flex items-center">
            <svg className="w-5 h-5 text-primary mr-2 badge-icon-float" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
            </svg>
            <span className="text-primary text-sm font-medium">
              {t('hero.badge')}
            </span>
          </div>
        </div>
        
        {/* Main Headline */}
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
          dangerouslySetInnerHTML={{ __html: t('hero.title') }}
        />
        
        {/* Subtitle */}
        <h2 
          className="text-xl sm:text-2xl text-muted-foreground mb-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          {t('hero.subtitle')}
        </h2>
        
        {/* Description */}
        <p 
          className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto mb-6 leading-relaxed opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          {t('hero.description')}
        </p>
        
        {/* Disclaimer with Icons */}
        <div 
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4" />
              <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.35 0 4.48.9 6.07 2.38" />
            </svg>
            <span>{t('hero.disclaimer1')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4" />
              <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.35 0 4.48.9 6.07 2.38" />
            </svg>
            <span>{t('hero.disclaimer2')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4" />
              <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.35 0 4.48.9 6.07 2.38" />
            </svg>
            <span>{t('hero.disclaimer3')}</span>
          </div>
        </div>
        
        {/* CTA Button */}
        <div 
          className="mt-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          <Button 
            onClick={handleInterestClick}
            size="lg"
            className="text-base font-medium px-8 py-4 rounded-xl btn-badge-modern"
          >
            {t('hero.cta')}
          </Button>
        </div>
        


      </div>
      
      {/* Interest Modal */}
      <InterestModal 
        isOpen={isInterestModalOpen} 
        onClose={() => setIsInterestModalOpen(false)} 
      />
    </section>
  );
};

export default HeroSection;
