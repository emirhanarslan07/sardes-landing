import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | 'cookies' | 'faq' | null;
  onClose: () => void;
}

const LegalModal = ({ isOpen, type, onClose }: LegalModalProps) => {
  const { t, language } = useLanguage();
  
  if (!isOpen || !type) return null;

  const content = {
    privacy: {
      title: language === 'tr' ? "Gizlilik Politikası" : "Privacy Policy",
      content: language === 'tr' ? `
        <p>Sardes olarak kullanıcılarımızın gizliliğine önem veriyoruz. Bu metin, hangi bilgileri topladığımızı ve bu bilgileri ne amaçla kullandığımızı açıklar.</p>
        
        <p>Sardes'te şu anda yalnızca e-posta adresi topluyoruz. Bu e-posta adresi, erken erişim davetleri göndermek ve Sardes ile ilgili gelişmeleri paylaşmak için kullanılır.</p>
        
        <p>Spam gönderilmez. Üçüncü kişilerle paylaşılmaz. İstediğiniz zaman listeden çıkabilirsiniz.</p>
      ` : `
        <p>As Sardes, we value our users' privacy. This text explains what information we collect and for what purpose we use this information.</p>
        
        <p>Currently, we only collect email addresses on Sardes. This email address is used to send early access invitations and share developments related to Sardes.</p>
        
        <p>No spam is sent. Not shared with third parties. You can unsubscribe from the list at any time.</p>
      `
    },
    terms: {
      title: language === 'tr' ? "Kullanım Şartları" : "Terms of Service",
      content: language === 'tr' ? `
        <p>Sardes, finansal karar alma davranışlarını anlamaya yönelik simülasyon temelli bir deneyim sunar.</p>
        
        <p>Bir oyun değildir. Finansal tavsiye vermez. Gerçek para kullanılmaz.</p>
        
        <p>Amaç, karar anındaki davranışlarınızı fark etmenize ve anlamanıza yardımcı olmaktır.</p>
      ` : `
        <p>Sardes offers a simulation-based experience aimed at understanding financial decision-making behaviors.</p>
        
        <p>It is not a game. It does not provide financial advice. No real money is used.</p>
        
        <p>The purpose is to help you notice and understand your behaviors at the moment of decision.</p>
      `
    },
    cookies: {
      title: language === 'tr' ? "Çerez Politikası" : "Cookie Policy",
      content: language === 'tr' ? `
        <p>Siteyi nasıl kullandığımızı genel olarak anlayabilmek için basit analitik araçlar kullanıyoruz.</p>
        
        <p>Bu bilgiler kişisel değildir, kimliğinizi belirlemek için kullanılmaz ve yalnızca deneyimi iyileştirmek amacıyla değerlendirilir.</p>
      ` : `
        <p>We use simple analytics tools to generally understand how the site is used.</p>
        
        <p>This information is not personal, is not used to identify you, and is only evaluated for the purpose of improving the experience.</p>
      `
    },
    faq: {
      title: language === 'tr' ? "Sıkça Sorulan Sorular" : "Frequently Asked Questions",
      content: language === 'tr' ? `
        <h3>Sardes nedir?</h3>
        <p>Sardes, finansal karar verme davranışlarınızı anlamanıza yardımcı olan simülasyon temelli bir platformdur.</p>
        
        <h3>Gerçek para kullanılıyor mu?</h3>
        <p>Hayır, Sardes tamamen simülasyon tabanlıdır. Gerçek para kullanılmaz.</p>
        
        <h3>Finansal tavsiye veriyor mu?</h3>
        <p>Hayır, Sardes finansal tavsiye vermez. Amacı davranışlarınızı anlamanıza yardımcı olmaktır.</p>
        
        <h3>Nasıl çalışır?</h3>
        <p>Gerçek piyasa senaryolarında karar vererek yatırımcı karakterinizi keşfedersiniz.</p>
      ` : `
        <h3>What is Sardes?</h3>
        <p>Sardes is a simulation-based platform that helps you understand your financial decision-making behaviors.</p>
        
        <h3>Is real money used?</h3>
        <p>No, Sardes is completely simulation-based. No real money is used.</p>
        
        <h3>Does it provide financial advice?</h3>
        <p>No, Sardes does not provide financial advice. Its purpose is to help you understand your behaviors.</p>
        
        <h3>How does it work?</h3>
        <p>You discover your investor character by making decisions in real market scenarios.</p>
      `
    }
  };

  const currentContent = content[type];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-background border border-border/30 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border/30">
          <h2 className="text-2xl font-bold">{currentContent.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div 
            className="prose prose-sm max-w-none text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: currentContent.content }}
            style={{
              color: 'hsl(var(--muted-foreground))',
            }}
          />
          <style jsx>{`
            .prose h3 {
              color: hsl(var(--foreground));
              font-weight: 600;
              margin-top: 1.5rem;
              margin-bottom: 0.5rem;
            }
            .prose h3:first-child {
              margin-top: 0;
            }
          `}</style>
        </div>
        
        <div className="p-6 border-t border-border/30">
          <Button onClick={onClose} className="w-full">
            {t('form.close')}
          </Button>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  const [legalModal, setLegalModal] = useState<{
    isOpen: boolean;
    type: 'privacy' | 'terms' | 'cookies' | 'faq' | null;
  }>({
    isOpen: false,
    type: null
  });

  const openLegalModal = (type: 'privacy' | 'terms' | 'cookies' | 'faq') => {
    setLegalModal({ isOpen: true, type });
  };

  const closeLegalModal = () => {
    setLegalModal({ isOpen: false, type: null });
  };

  return (
    <>
      <footer className="py-12 px-6 border-t border-border/20 bg-card/20">
        <div className="max-w-7xl mx-auto">
          {/* Main Content - 3 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Logo + Description + Company Info */}
            <div className="lg:col-span-4">
              {/* Logo and Sardes BETA */}
              <div className="flex items-center gap-0.5 mb-6">
                <img 
                  src="/sardes-logo.png" 
                  alt="Sardes Logo" 
                  className="w-12 h-12"
                />
                <div className="flex items-baseline gap-3">
                  <span className="font-semibold tracking-tight font-poppins" style={{ fontSize: '1.5rem' }}>
                    Sardes
                  </span>
                  <span className="bg-primary/10 text-primary/70 px-1.5 py-0.5 rounded-full text-xs font-medium transform -translate-y-1">
                    BETA
                  </span>
                </div>
              </div>
              
              {/* Description */}
              <div className="text-muted-foreground text-sm leading-relaxed mb-6">
                {/* Desktop version */}
                <div className="hidden md:block">
                  <p>Finansal karar verme süreçlerinizi analiz eden ve geliştiren</p>
                  <p>yapay zeka destekli platform. Gerçek davranış verilerine</p>
                  <p>dayalı analiz ile yatırımcı karakterinizi keşfedin.</p>
                </div>
                {/* Mobile version - natural line breaks */}
                <div className="block md:hidden max-w-[280px]">
                  <p className="leading-relaxed">
                    Finansal karar verme süreçlerinizi analiz eden ve geliştiren yapay zeka destekli platform. Gerçek davranış verilerine dayalı analiz ile yatırımcı karakterinizi keşfedin.
                  </p>
                </div>
              </div>
            </div>

            {/* Center: Contact + LinkedIn */}
            <div className="lg:col-span-4 flex flex-col lg:items-center lg:justify-center items-start justify-start">
              <h4 className="font-semibold text-sm mb-4">{t('footer.contact')}</h4>
              <a 
                href="https://linkedin.com/company/getsardes" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            {/* Right: Legal */}
            <div className="lg:col-span-4 lg:pl-12">
              <h4 className="font-semibold text-sm mb-4">{t('footer.legal')}</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => openLegalModal('privacy')}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  {t('footer.privacy')}
                </button>
                <button 
                  onClick={() => openLegalModal('terms')}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  {t('footer.terms')}
                </button>
                <button 
                  onClick={() => openLegalModal('faq')}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  SSS
                </button>
                <button 
                  onClick={() => openLegalModal('cookies')}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  {t('footer.cookies')}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="pt-8 border-t border-border/20 mt-8">
            <div className="flex justify-center">
              {/* Copyright */}
              <p className="text-sm text-muted-foreground">
                {t('footer.copyright')}
              </p>
            </div>
          </div>
        </div>
      </footer>

      <LegalModal 
        isOpen={legalModal.isOpen}
        type={legalModal.type}
        onClose={closeLegalModal}
      />
    </>
  );
};

export default Footer;
