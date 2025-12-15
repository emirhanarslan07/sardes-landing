import { Button } from "@/components/ui/button";
import RiskScoreCard from "./RiskScoreCard";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Main Headline */}
        <h1 
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          SARDES<span className="text-primary">.</span>
        </h1>
        
        {/* Sub-headline */}
        <h2 
          className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          Yatırımcı karakterini keşfet.
        </h2>
        
        {/* Description */}
        <p 
          className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          Simülasyonu tamamla; her karar için yapay zeka destekli risk analizi al. 
          Zayıf yönlerini gör, finansal yeteneğini Sardes Card ile kanıtla.
        </p>
        
        {/* CTA Button */}
        <div 
          className="opacity-0 animate-fade-in-up mb-16"
          style={{ animationDelay: '0.7s' }}
        >
          <Button 
            size="lg" 
            className="text-base font-semibold px-8 py-6 glow-primary hover:glow-primary-hover transition-all duration-300 animate-pulse-glow"
          >
            Ücretsiz Analiz İçin Sıraya Gir
          </Button>
        </div>
        
        {/* Visual Element */}
        <div 
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: '1s' }}
        >
          <RiskScoreCard />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
