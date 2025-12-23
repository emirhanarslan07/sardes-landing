import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  const { language } = useLanguage();

  const content = {
    tr: {
      title: "Gizlilik Politikası",
      lastUpdated: "Son güncelleme: 23 Aralık 2025",
      sections: [
        {
          title: "1. Genel Bilgiler",
          content: "Sardes olarak kullanıcılarımızın gizliliğine önem veriyoruz. Bu gizlilik politikası, hangi bilgileri topladığımızı, bu bilgileri nasıl kullandığımızı ve koruduğumuzu açıklar."
        },
        {
          title: "2. Toplanan Bilgiler",
          content: "Sardes'te şu anda yalnızca e-posta adresi topluyoruz. Bu e-posta adresi, erken erişim davetleri göndermek ve Sardes ile ilgili gelişmeleri paylaşmak için kullanılır."
        },
        {
          title: "3. Bilgilerin Kullanımı",
          content: "Toplanan e-posta adresleri yalnızca aşağıdaki amaçlarla kullanılır:\n• Erken erişim davetleri göndermek\n• Ürün güncellemeleri ve gelişmeler hakkında bilgilendirme\n• Kullanıcı deneyimini iyileştirmek için genel istatistikler"
        },
        {
          title: "4. Google Analytics ve Çerezler",
          content: "Siteyi nasıl kullandığınızı genel olarak anlayabilmek için Google Analytics kullanıyoruz. Bu bilgiler kişisel değildir, kimliğinizi belirlemek için kullanılmaz ve yalnızca deneyimi iyileştirmek amacıyla değerlendirilir."
        },
        {
          title: "5. Bilgi Paylaşımı",
          content: "Kişisel bilgilerinizi üçüncü kişilerle paylaşmayız, satmayız veya kiralamayız. E-posta adresiniz yalnızca Sardes ile ilgili iletişim için kullanılır."
        },
        {
          title: "6. Veri Güvenliği",
          content: "Kişisel bilgilerinizi korumak için endüstri standardı güvenlik önlemleri alıyoruz. Verileriniz şifrelenmiş bağlantılar üzerinden iletilir ve güvenli sunucularda saklanır."
        },
        {
          title: "7. Haklarınız",
          content: "İstediğiniz zaman:\n• E-posta iletişimlerinden çıkabilirsiniz.\n• Bizimle paylaştığınız iletişim bilgilerinin silinmesini talep edebilirsiniz.\n• Hangi temel bilgilerin (ör. e-posta adresi) bizimle paylaşıldığını öğrenebilirsiniz."
        },
        {
          title: "8. İletişim",
          content: "Gizlilik politikamız hakkında sorularınız varsa, bizimle iletişime geçebilirsiniz."
        }
      ]
    },
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: December 23, 2025",
      sections: [
        {
          title: "1. General Information",
          content: "As Sardes, we value our users' privacy. This privacy policy explains what information we collect, how we use and protect this information."
        },
        {
          title: "2. Information Collected",
          content: "Currently, we only collect email addresses on Sardes. This email address is used to send early access invitations and share developments related to Sardes."
        },
        {
          title: "3. Use of Information",
          content: "Collected email addresses are used only for the following purposes:\n• Sending early access invitations\n• Informing about product updates and developments\n• General statistics to improve user experience"
        },
        {
          title: "4. Google Analytics and Cookies",
          content: "We use Google Analytics to generally understand how the site is used. This information is not personal, is not used to identify you, and is only evaluated for the purpose of improving the experience."
        },
        {
          title: "5. Information Sharing",
          content: "We do not share, sell, or rent your personal information to third parties. Your email address is used only for Sardes-related communication."
        },
        {
          title: "6. Data Security",
          content: "We take industry-standard security measures to protect your personal information. Your data is transmitted over encrypted connections and stored on secure servers."
        },
        {
          title: "7. Your Rights",
          content: "You can at any time:\n• Unsubscribe from email communications.\n• Request deletion of your contact information shared with us.\n• Learn what basic information (e.g. email address) has been shared with us."
        },
        {
          title: "8. Contact",
          content: "If you have questions about our privacy policy, you can contact us."
        }
      ]
    }
  };

  const currentContent = content[language];

  return (
    <>
      <Helmet>
        <title>Gizlilik Politikası - Sardes</title>
        <meta name="description" content="Sardes gizlilik politikası. Kişisel verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında detaylı bilgiler." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://getsardes.com/privacy-policy" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20">
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
              {/* Page Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                  {currentContent.title}
                </h1>
                <p className="text-muted-foreground">
                  {currentContent.lastUpdated}
                </p>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                <div className="space-y-8">
                  {currentContent.sections.map((section, index) => (
                    <div key={index} className="bg-card/30 backdrop-blur-md border border-border/30 rounded-lg p-6">
                      <h2 className="text-xl font-semibold mb-4 text-foreground">
                        {section.title}
                      </h2>
                      <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {section.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;