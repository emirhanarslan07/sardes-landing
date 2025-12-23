import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Brain, 
  Target, 
  BarChart3, 
  Shield, 
  Zap, 
  Users,
  Play,
  CheckCircle,
  X
} from "lucide-react";

interface Feature {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: React.ComponentType<{ className?: string }>;
  benefits: string[];
  isPopular?: boolean;
}

const features: Feature[] = [
  {
    id: 'behavioral-analysis',
    title: 'Davranışsal Analiz',
    description: 'Gerçek karar verme süreçlerinizi analiz eder',
    longDescription: 'Sardes, geleneksel anketlerden farklı olarak gerçek yatırım senaryolarında nasıl karar verdiğinizi ölçer. Yapay zeka destekli analiz sistemi, risk alma eğiliminizi, stres altındaki davranışlarınızı ve karar verme hızınızı detaylı şekilde değerlendirir.',
    icon: Brain,
    benefits: [
      'Gerçek zamanlı karar analizi',
      'Stres altında performans ölçümü',
      'Risk alma eğilimi tespiti',
      'Davranış paternleri analizi'
    ],
    isPopular: true
  },
  {
    id: 'risk-profiling',
    title: 'Risk Profili Çıkarma',
    description: 'Kişiselleştirilmiş risk profili ve öneriler',
    longDescription: 'Detaylı risk profili analizi ile yatırım tarzınızı keşfedin. Sistem, risk toleransınızı, tutarlılığınızı ve adaptasyon kabiliyetinizi ölçerek size özel öneriler sunar.',
    icon: Target,
    benefits: [
      '6 farklı risk metriği',
      'Kişiselleştirilmiş öneriler',
      'Güçlü ve zayıf yönler analizi',
      'Gelişim alanları tespiti'
    ]
  },
  {
    id: 'simulation-engine',
    title: 'Simülasyon Motoru',
    description: 'Gerçekçi yatırım senaryoları ve simülasyonlar',
    longDescription: 'Gelişmiş simülasyon motoru ile gerçek piyasa koşullarını yansıtan senaryolarda test olun. Farklı piyasa durumlarında nasıl davrandığınızı görün ve deneyim kazanın.',
    icon: BarChart3,
    benefits: [
      'Gerçekçi piyasa senaryoları',
      'Çoklu senaryo testleri',
      'Piyasa volatilitesi simülasyonu',
      'Tarihsel veri tabanlı modeller'
    ]
  },
  {
    id: 'ai-insights',
    title: 'Yapay Zeka Öngörüleri',
    description: 'AI destekli analiz ve gelişim önerileri',
    longDescription: 'Yapay zeka algoritmaları, karar verme paternlerinizi analiz ederek gelecekteki performansınızı tahmin eder ve gelişim için özel öneriler sunar.',
    icon: Zap,
    benefits: [
      'Makine öğrenmesi tabanlı analiz',
      'Performans tahminleri',
      'Kişiselleştirilmiş gelişim planı',
      'Sürekli öğrenen sistem'
    ]
  },
  {
    id: 'secure-platform',
    title: 'Güvenli Platform',
    description: 'Verileriniz güvende, gizliliğiniz korunuyor',
    longDescription: 'Tüm verileriniz şifrelenerek saklanır ve gizliliğiniz korunur. KVKK uyumlu platform ile verileriniz güvende.',
    icon: Shield,
    benefits: [
      'End-to-end şifreleme',
      'KVKK uyumlu veri işleme',
      'Anonim analiz sistemi',
      'Güvenli veri saklama'
    ]
  },
  {
    id: 'institutional',
    title: 'Kurumsal Çözümler',
    description: 'Finans kurumları için özel analiz araçları',
    longDescription: 'Bankalar ve finans kurumları için özel geliştirilmiş analiz araçları. Müşteri davranışlarını anlayın ve risk değerlendirmelerinizi geliştirin.',
    icon: Users,
    benefits: [
      'Toplu analiz araçları',
      'Kurumsal dashboard',
      'API entegrasyonu',
      'Özelleştirilebilir raporlar'
    ]
  }
];

interface FeatureModalProps {
  feature: Feature | null;
  isOpen: boolean;
  onClose: () => void;
}

const FeatureModal = ({ feature, isOpen, onClose }: FeatureModalProps) => {
  if (!isOpen || !feature) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-background border border-border/30 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                {feature.isPopular && (
                  <Badge className="mt-1">En Popüler</Badge>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-muted-foreground mb-6 leading-relaxed">
            {feature.longDescription}
          </p>

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-4">Özellikler</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {feature.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1">
              Demo Talep Et
            </Button>
            <Button variant="outline" onClick={onClose}>
              Kapat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const { t } = useLanguage();
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFeatureClick = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeature(null);
  };

  return (
    <section id="ozellikler" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {t('features.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Sardes'in güçlü özellikleri ile yatırımcı karakterinizi keşfedin ve finansal kararlarınızı geliştirin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => (
            <Card 
              key={feature.id}
              className="bg-card/30 backdrop-blur-md border-border/30 p-6 hover:border-primary/50 transition-all duration-300 cursor-pointer group relative"
              onClick={() => handleFeatureClick(feature)}
            >
              {feature.isPopular && (
                <Badge className="absolute -top-2 -right-2">
                  En Popüler
                </Badge>
              )}
              
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {feature.description}
              </p>
              
              <div className="flex items-center text-primary text-sm font-medium">
                Detayları Gör
                <Play className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-card/30 backdrop-blur-md border border-border/30 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Demo Talep Et
            </h3>
            <p className="text-muted-foreground mb-6">
              Sardes'i deneyimlemek ve özelliklerini keşfetmek için demo talebinde bulunun. 
              Uzmanlarımız size platformu tanıtacak ve sorularınızı yanıtlayacak.
            </p>
            <Button size="lg" className="font-semibold">
              Ücretsiz Demo Talep Et
            </Button>
          </div>
        </div>
      </div>

      <FeatureModal 
        feature={selectedFeature}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default FeaturesSection;