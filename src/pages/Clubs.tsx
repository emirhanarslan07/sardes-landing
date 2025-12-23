import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClubsInfoSection from "@/components/ClubsInfoSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Clubs = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Kulüpler İçin Sardes - Öğrenci Toplulukları</title>
        <meta name="description" content="Sardes'i kulüp etkinliklerinde, workshop'larda veya toplu kullanımda değerlendirmek isteyen öğrenci toplulukları için özel deneyim." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://getsardes.com/clubs" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20">
          {/* Back to Home Button */}
          <div className="px-6 mb-8">
            <div className="max-w-6xl mx-auto">
              <Link 
                to="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>
          
          <ClubsInfoSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Clubs;