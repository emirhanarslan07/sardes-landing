import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClubsInfoSection from "@/components/ClubsInfoSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";

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
          <ClubsInfoSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Clubs;