import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Terms = () => {
  const { language } = useLanguage();

  const content = {
    tr: {
      title: "Kullanım Şartları",
      lastUpdated: "Son güncelleme: 23 Aralık 2024",
      sections: [
        {
          title: "1. Hizmet Tanımı",
          content: "Sardes, finansal karar alma davranışlarını anlamaya yönelik simülasyon temelli bir deneyim sunar. Bu platform, gerçek piyasa koşullarını yansıtan senaryolarda karar verme süreçlerinizi analiz eder."
        },
        {
          title: "2. Önemli Uyarılar",
          content: "• Sardes bir oyun değildir\n• Finansal tavsiye vermez\n• Gerçek para kullanılmaz\n• Yatırım önerisi sunmaz\n• Performans garantisi vermez"
        },
        {
          title: "3. Hizmetin Amacı",
          content: "Sardes'in amacı, karar anındaki davranışlarınızı fark etmenize ve anlamanıza yardımcı olmaktır. Sunulan analizler, yatırım kararlarının doğruluğunu değil, karar alma davranışlarını inceler."
        },
        {
          title: "4. Kullanıcı Sorumlulukları",
          content: "• Platformu yalnızca kişisel gelişim amacıyla kullanmak\n• Elde edilen sonuçları finansal tavsiye olarak görmemek\n• Gerçek yatırım kararlarında bu sonuçlara dayanmamak\n• Platform kurallarına uymak"
        },
        {
          title: "5. Sorumluluk Reddi",
          content: "Sardes, platformdan elde edilen bilgilere dayanarak alınan herhangi bir finansal karar veya bunun sonuçlarından sorumlu değildir. Tüm yatırım kararları kullanıcının kendi sorumluluğundadır."
        },
        {
          title: "6. Fikri Mülkiyet",
          content: "Sardes platformundaki tüm içerik, tasarım ve teknoloji Sardes'e aittir. İzin alınmadan kopyalanamaz, dağıtılamaz veya ticari amaçla kullanılamaz."
        },
        {
          title: "7. Hizmet Değişiklikleri",
          content: "Sardes, hizmeti geliştirmek amacıyla platform özelliklerini, içeriğini veya kullanım şartlarını değiştirme hakkını saklı tutar."
        },
        {
          title: "8. Hesap Sonlandırma",
          content: "Kullanıcılar istediği zaman hesaplarını kapatabilir. Sardes, kullanım şartlarını ihlal eden hesapları sonlandırma hakkını saklı tutar."
        },
        {
          title: "9. İletişim",
          content: "Kullanım şartları hakkında sorularınız varsa, LinkedIn hesabımız üzerinden bizimle iletişime geçebilirsiniz."
        }
      ]
    },
    en: {
      title: "Terms of Service",
      lastUpdated: "Last updated: December 23, 2024",
      sections: [
        {
          title: "1. Service Description",
          content: "Sardes offers a simulation-based experience aimed at understanding financial decision-making behaviors. This platform analyzes your decision-making processes in scenarios that reflect real market conditions."
        },
        {
          title: "2. Important Warnings",
          content: "• Sardes is not a game\n• It does not provide financial advice\n• No real money is used\n• It does not offer investment recommendations\n• It does not guarantee performance"
        },
        {
          title: "3. Purpose of Service",
          content: "The purpose of Sardes is to help you notice and understand your behaviors at the moment of decision. The analyses provided examine decision-making behaviors, not the correctness of investment decisions."
        },
        {
          title: "4. User Responsibilities",
          content: "• Use the platform only for personal development purposes\n• Do not consider the results obtained as financial advice\n• Do not base real investment decisions on these results\n• Comply with platform rules"
        },
        {
          title: "5. Disclaimer",
          content: "Sardes is not responsible for any financial decision made based on information obtained from the platform or its consequences. All investment decisions are the user's own responsibility."
        },
        {
          title: "6. Intellectual Property",
          content: "All content, design, and technology on the Sardes platform belongs to Sardes. It cannot be copied, distributed, or used for commercial purposes without permission."
        },
        {
          title: "7. Service Changes",
          content: "Sardes reserves the right to change platform features, content, or terms of use in order to improve the service."
        },
        {
          title: "8. Account Termination",
          content: "Users can close their accounts at any time. Sardes reserves the right to terminate accounts that violate the terms of use."
        },
        {
          title: "9. Contact",
          content: "If you have questions about the terms of use, you can contact us through our LinkedIn account."
        }
      ]
    }
  };

  const currentContent = content[language];

  return (
    <>
      <Helmet>
        <title>Kullanım Şartları - Sardes</title>
        <meta name="description" content="Sardes kullanım şartları ve hizmet koşulları. Platform kullanımı, sorumluluklar ve önemli uyarılar hakkında detaylı bilgiler." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://getsardes.com/terms" />
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

export default Terms;