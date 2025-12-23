import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import FAQSection from "@/components/FAQSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FinalCTASection from "@/components/FinalCTASection";
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
        
        {/* 2. Özellikler */}
        <div id="ozellikler" className="section-bg">
          <FeaturesSection />
        </div>
        
        {/* 3. SSS */}
        <FAQSection />
        
        {/* 4. Hakkımızda */}
        <div id="hakkimizda" className="section-bg section-accent-blue">
          <AboutSection />
        </div>
        
        {/* 5. İletişim */}
        <div id="iletisim" className="section-bg section-accent-purple">
          <ContactSection />
        </div>
        
        {/* 6. Erken Erişim CTA (form) - En son */}
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
