import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const About = () => {
  return (
    <>
      <Helmet>
        <title>Hakkımızda - Sardes</title>
        <meta name="description" content="Sardes hakkında bilgi edinin. Misyonumuz, vizyonumuz ve finansal karar verme süreçlerini geliştirme hedefimiz." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://getsardes.com/about" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20">
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
              {/* Back to Home Button */}
              <div className="mb-8">
                <Link 
                  to="/"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Ana Sayfaya Dön
                </Link>
              </div>

              {/* Page Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                  Hakkımızda
                </h1>
                <p className="text-muted-foreground">
                  Bu sayfa yakında eklenecek.
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;