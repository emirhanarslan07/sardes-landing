import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | 'cookies' | null;
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
    type: 'privacy' | 'terms' | 'cookies' | null;
  }>({
    isOpen: false,
    type: null
  });

  const openLegalModal = (type: 'privacy' | 'terms' | 'cookies') => {
    setLegalModal({ isOpen: true, type });
  };

  const closeLegalModal = () => {
    setLegalModal({ isOpen: false, type: null });
  };

  return (
    <>
      <footer className="py-12 px-6 border-t border-border/20 bg-card/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Şirket Bilgileri */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-0.5 mb-4">
                <img 
                  src="/sardes-logo.png" 
                  alt="Sardes Logo" 
                  className="w-14 h-14"
                />
                <div className="flex items-baseline gap-4">
                  <span className="font-semibold tracking-tight font-poppins" style={{ fontSize: '1.75rem' }}>
                    Sardes
                  </span>
                  <span className="bg-primary/10 text-primary/70 px-2 py-1 rounded-full text-xs font-medium transform -translate-y-1">
                    BETA
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-md">
                {t('footer.description')}
              </p>
              <div className="text-sm text-muted-foreground">
                <p>Sardes Inc.</p>
                <p>Maslak, İstanbul, Türkiye</p>
                <p>info@sardes.com</p>
              </div>
            </div>

            {/* Yasal */}
            <div>
              <h4 className="font-semibold mb-4">{t('footer.legal')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button 
                    onClick={() => openLegalModal('privacy')}
                    className="hover:text-primary transition-colors"
                  >
                    {t('footer.privacy')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openLegalModal('terms')}
                    className="hover:text-primary transition-colors"
                  >
                    {t('footer.terms')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openLegalModal('cookies')}
                    className="hover:text-primary transition-colors"
                  >
                    {t('footer.cookies')}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Sosyal Medya ve Telif Hakkı */}
          <div className="pt-8 border-t border-border/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                {t('footer.copyright')}
              </p>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">LinkedIn</span>
                <div className="flex gap-3">
                  <a 
                    href="https://linkedin.com/company/getsardes" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
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
