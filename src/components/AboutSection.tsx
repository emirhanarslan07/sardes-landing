import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Eye, 
  Heart, 
  Lightbulb, 
  TrendingUp, 
  Users,
  Brain,
  Shield
} from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Brain,
      title: "Bilim Temelli Yaklaşım",
      description: "Davranışsal finans ve psikoloji araştırmalarına dayalı metodoloji"
    },
    {
      icon: Shield,
      title: "Güvenilirlik",
      description: "Şeffaf, etik ve güvenli veri işleme standartları"
    },
    {
      icon: Lightbulb,
      title: "İnovasyon",
      description: "Finansal teknolojide yenilikçi çözümler geliştirme"
    },
    {
      icon: Users,
      title: "Kullanıcı Odaklılık",
      description: "Her bireyin benzersiz finansal yolculuğuna saygı"
    }
  ];

  const milestones = [
    {
      year: "2024",
      title: "Sardes'in Doğuşu",
      description: "Finansal karar verme süreçlerini anlamak için yola çıktık"
    },
    {
      year: "2024 Q2",
      title: "Beta Sürüm",
      description: "İlk kullanıcılarımızla birlikte platformu geliştiriyoruz"
    },
    {
      year: "2024 Q4",
      title: "Kurumsal Çözümler",
      description: "Finans kurumları için özel analiz araçları"
    },
    {
      year: "2025",
      title: "Küresel Genişleme",
      description: "Uluslararası pazarlara açılma hedefi"
    }
  ];

  return (
    <section id="hakkimizda" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Hakkımızda
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Finansal karar verme süreçlerini anlamak ve geliştirmek için yola çıkan Sardes'in hikayesi.
          </p>
        </div>

        {/* Misyon ve Vizyon */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="bg-card/30 backdrop-blur-md border-border/30 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Misyonumuz</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Bireylerin ve kurumların finansal karar verme süreçlerini daha iyi anlamalarını sağlamak. 
              Geleneksel anketlerin ötesinde, gerçek davranış verilerine dayalı analiz sunarak 
              herkesin finansal potansiyelini keşfetmesine yardımcı olmak.
            </p>
          </Card>

          <Card className="bg-card/30 backdrop-blur-md border-border/30 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Vizyonumuz</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Finansal karar verme alanında küresel bir referans olmak. Yapay zeka ve davranışsal 
              analiz teknolojilerini birleştirerek, finansal eğitim ve değerlendirme süreçlerinde 
              yeni standartlar oluşturmak.
            </p>
          </Card>
        </div>

        {/* Sardes'in Hikayesi */}
        <div className="mb-16">
          <Card className="bg-card/30 backdrop-blur-md border-border/30 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Sardes'in Hikayesi</h3>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Sardes, finansal piyasalarda yaşanan hızlı değişimler ve genç yatırımcıların artan 
                katılımı karşısında doğdu. Geleneksel risk değerlendirme yöntemlerinin yetersiz 
                kaldığını gören ekibimiz, davranışsal finans alanındaki en son araştırmaları 
                teknoloji ile buluşturdu.
              </p>
              <p>
                Platform, "Ne bildiğin değil, nasıl karar verdiğin önemli" felsefesi üzerine kurulu. 
                Gerçek yatırım senaryolarında alınan kararları analiz ederek, bireylerin finansal 
                karakterlerini ortaya çıkarıyor ve gelişim alanlarını belirliyor.
              </p>
              <p>
                Bugün, hem bireysel kullanıcılar hem de finans kurumları için değerli içgörüler 
                sunan Sardes, finansal karar verme süreçlerinin anlaşılmasında yeni bir çağ başlatıyor.
              </p>
            </div>
          </Card>
        </div>

        {/* Değerlerimiz */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Değerlerimiz</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Sardes'i yönlendiren temel değerler ve ilkeler
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index}
                className="bg-card/30 backdrop-blur-md border-border/30 p-6 text-center hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-3">{value.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Teknoloji ve Metodoloji */}
        <div className="mb-16">
          <Card className="bg-card/30 backdrop-blur-md border-border/30 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Teknoloji ve Metodoloji</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-primary">Davranışsal Analiz</h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Gerçek karar verme süreçlerini ölçen simülasyon tabanlı değerlendirme sistemi. 
                  Geleneksel anketlerden farklı olarak, kullanıcıların gerçek davranışlarını analiz eder.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-primary">Yapay Zeka</h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Makine öğrenmesi algoritmaları ile karar paternlerini analiz eden ve 
                  kişiselleştirilmiş öneriler sunan akıllı sistem.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-primary">Veri Güvenliği</h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  KVKK uyumlu, end-to-end şifrelemeli veri işleme ve saklama sistemi. 
                  Kullanıcı gizliliği en üst düzeyde korunur.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-primary">Sürekli Gelişim</h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Kullanıcı geri bildirimlerine dayalı sürekli iyileştirme ve 
                  akademik araştırmalarla desteklenen metodoloji geliştirme.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Gelecek Hedefleri */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Gelecek Hedefleri</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Sardes'in yol haritası ve gelecek planları
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <Card 
                key={index}
                className="bg-card/30 backdrop-blur-md border-border/30 p-6 relative"
              >
                <Badge className="mb-4">{milestone.year}</Badge>
                <h4 className="font-semibold mb-3">{milestone.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {milestone.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;