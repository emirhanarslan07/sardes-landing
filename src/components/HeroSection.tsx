import { Button } from "@/components/ui/button";
import RiskScoreCard from "./RiskScoreCard";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Main Headline */}
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          Sardes ile<br />
          <span className="text-primary">yatırımcı karakterini</span> keşfet.
        </h1>
        
        {/* Description */}
        <p 
          className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          Simülasyonu tamamla; her karar için yapay zeka destekli risk analizi al. 
          Zayıf yönlerini gör, finansal yeteneğini Sardes Card ile kanıtla.
        </p>
        
        {/* CTA Button */}
        <div 
          className="opacity-0 animate-fade-in-up mb-16"
          style={{ animationDelay: '0.5s' }}
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
          style={{ animationDelay: '0.7s' }}
        >
          <RiskScoreCard />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
