import { Mail } from "lucide-react";
import { useState } from "react";
import ClubApplicationForm from "./ClubApplicationForm";
import { trackCTAClick } from "@/lib/analytics";

const ClubsInfoSection = () => {
  const [showClubForm, setShowClubForm] = useState(false);

  const handleCTAClick = () => {
    trackCTAClick('Kulüp Olarak Sardes\'i Keşfedin');
    setShowClubForm(true);
  };

  return (
    <section id="kulupler-detay" className="py-20 px-6 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">
            Kulüpler için <span className="text-primary">Sardes</span>
          </h1>
          
          {/* Sardes Tanımı */}
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed mb-8">
            Sardes, gerçek piyasa senaryolarında karar vererek yatırımcı karakterinizi keşfetmenizi sağlayan bir senaryo bazlı deneyim platformudur. 
            Kulübünüz için özel oturumlar düzenleyerek üyelerinizin finansal karar alma davranışlarını birlikte gözlemlemenizi sağlıyoruz.
          </p>

          {/* Kulüpler İçin Süreç */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 justify-center">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-xs font-bold">1</span>
                </div>
                <span className="text-muted-foreground">Özel oturum planlıyoruz</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-xs font-bold">2</span>
                </div>
                <span className="text-muted-foreground">Birlikte kararlar alırsınız</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-xs font-bold">3</span>
                </div>
                <span className="text-muted-foreground">Sonuçları tartışırsınız</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-card/20 backdrop-blur-md border border-border/30 rounded-2xl p-8 max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleCTAClick}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 text-lg"
              >
                <Mail className="w-5 h-5" />
                Kulüp Olarak Sardes'i Keşfedin
              </button>
              
              <div className="text-sm text-muted-foreground">
                veya{" "}
                <a 
                  href="mailto:kulupler@sardes.co" 
                  className="text-primary hover:text-primary/80 underline underline-offset-2"
                >
                  kulupler@sardes.co
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Club Application Form Modal */}
        {showClubForm && (
          <ClubApplicationForm onClose={() => setShowClubForm(false)} />
        )}
      </div>
    </section>
  );
};

export default ClubsInfoSection;