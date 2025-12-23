import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhoIsItForSection from "@/components/WhoIsItForSection";
import WhySardesSection from "@/components/WhySardesSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import RiskScoreCard from "@/components/RiskScoreCard";
import HowItWorksSection from "@/components/HowItWorksSection";
import FinalCTASection from "@/components/FinalCTASection";
import FAQSection from "@/components/FAQSection";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Sardes - Yatırımcı Davranışınızı Keşfedin</title>
        <meta name="description" content="Sardes ile gerçekçi piyasa senaryolarında verdiğiniz kararları gözlemleyin. Risk yaklaşımınızı, stres altındaki karar verme biçiminizi ve kayıp sonrası tepkilerinizi anlayın." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://getsardes.com/" />
        <meta property="og:title" content="Sardes - Yatırımcı Davranışınızı Keşfedin" />
        <meta property="og:description" content="Gerçekçi piyasa senaryolarında karar verme davranışınızı analiz eden yapay zeka destekli platform." />
        <meta property="og:url" content="https://getsardes.com/" />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="min-h-screen bg-background text-foreground animated-bg">
      {/* Interactive Particles */}
      <div className="interactive-particles">
        <div className="particle-dot"></div>
        <div className="particle-dot"></div>
        <div className="particle-dot"></div>
        <div className="particle-dot"></div>
        <div className="particle-dot"></div>
      </div>
      
      <div className="main-content">
        <Navbar />
        
        <main>
        {/* 1. Hero (başlık + CTA) */}
        <section id="home">
          <HeroSection />
        </section>
        
        {/* 2. Yatırım Kararlarınıza Odaklanın (eski Ne Yapıyor) */}
        <WhySardesSection />
        
        {/* 3. Gerçek Verilerle Kararınızı Geliştirin (eski Neden Sardes) */}
        <ProblemSolutionSection />
        
        {/* 4. Sardes Kimler İçin? (eski Kimler İçin) */}
        <div id="kimler-icin" className="section-bg section-accent-blue">
          <WhoIsItForSection />
        </div>
        
        {/* 5. Karar Yolculuğunuz Nasıl İşliyor? (eski Nasıl Çalışır) */}
        <div id="nasil-calisir" className="section-bg section-accent-purple">
          <HowItWorksSection />
        </div>
        
        {/* 6. Analiz Örneği */}
        <section id="analiz-ornegi" className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t('analysis.title')}
            </h2>
            <p className="text-secondary mb-16 max-w-2xl mx-auto">
              {t('analysis.subtitle')}
            </p>
            <RiskScoreCard />
          </div>
        </section>
        
        {/* 7. Sık Sorulan Sorular (eski SSS) */}
        <FAQSection />
        
        {/* 8. Erken Erişim CTA (form) - En son */}
        <div id="erken-erisim">
          <FinalCTASection />
        </div>
        </main>
        
        <Footer />
        
        {/* Scroll to Top Button */}
        <ScrollToTop />
      </div>
    </div>
    </>
  );
};

export default Index;
