import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const FAQ = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1')
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2')
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3')
    },
    {
      question: t('faq.q4'),
      answer: t('faq.a4')
    },
    {
      question: t('faq.q5'),
      answer: t('faq.a5')
    },
    {
      question: t('faq.q6'),
      answer: t('faq.a6')
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Sık Sorulan Sorular - Sardes</title>
        <meta name="description" content="Sardes hakkında sık sorulan sorular ve cevapları. Yatırımcı davranış analizi, finansal simülasyon ve platform kullanımı hakkında detaylı bilgiler." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://getsardes.com/faq" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20">
          <section className="py-20 px-6">
            <div className="max-w-3xl mx-auto">
              {/* Page Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                  {t('faq.title')}
                </h1>
                <p className="text-lg text-muted-foreground">
                  Sardes hakkında merak ettiğiniz her şey
                </p>
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-card/30 backdrop-blur-md border border-border/30 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/10 transition-colors"
                    >
                      <span className="font-medium text-foreground pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                          openIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    <div
                      className={`overflow-hidden transition-all duration-200 ease-in-out ${
                        openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 pb-4 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FAQ;