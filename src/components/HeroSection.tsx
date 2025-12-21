
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden" style={{ paddingTop: '120px' }}>

      {/* Subtle Background Decorations */}
      <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full blur-xl float-element" style={{ background: 'linear-gradient(135deg, rgba(120, 219, 226, 0.1), rgba(59, 130, 246, 0.05))' }}></div>
      <div className="absolute top-1/3 right-16 w-32 h-32 rounded-full blur-2xl float-element" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(120, 219, 226, 0.04))', animationDelay: '-2s' }}></div>
      <div className="absolute bottom-1/4 left-1/4 w-16 h-16 rounded-full blur-lg float-element" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.06), rgba(59, 130, 246, 0.03))', animationDelay: '2s' }}></div>
      
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
        {/* Spacer for better vertical positioning */}
        <div className="mt-8 sm:mt-12"></div>
        
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
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
          dangerouslySetInnerHTML={{ __html: t('hero.title') }}
        />
        
        {/* Description */}
        <p 
          className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-12 leading-relaxed opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          {t('hero.description')}
        </p>
        
        {/* Key Features */}
        <div 
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground hero-feature stagger-fade-in">
            <svg className="w-5 h-5 text-primary transition-all duration-300 icon-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18" />
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
            <span>{t('hero.feature1')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground hero-feature stagger-fade-in">
            <svg className="w-5 h-5 text-primary transition-all duration-300 icon-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            <span>{t('hero.feature2')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground hero-feature stagger-fade-in">
            <svg className="w-5 h-5 text-primary transition-all duration-300 icon-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
            <span>{t('hero.feature3')}</span>
          </div>
        </div>
        


      </div>
    </section>
  );
};

export default HeroSection;
