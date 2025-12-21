import { Card } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ProblemSolutionSection = () => {
  const { t } = useLanguage();
  
  const problemSolutions = [
    {
      title: t('why.risk.title'),
      problem: t('why.risk.problemText'),
      solution: t('why.risk.approachText'),
      benefit: t('why.risk.providesText'),
    },
    {
      title: t('why.stress.title'),
      problem: t('why.stress.problemText'),
      solution: t('why.stress.approachText'),
      benefit: t('why.stress.providesText'),
    },
    {
      title: t('why.loss.title'),
      problem: t('why.loss.problemText'),
      solution: t('why.loss.approachText'),
      benefit: t('why.loss.providesText'),
    },
  ];

  return (
    <section id="neden-sardes" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Neden Sardes? Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl sm:text-4xl font-bold mb-4"
            dangerouslySetInnerHTML={{ __html: t('why.title') }}
          />
          <p className="text-lg text-muted-foreground mb-8">
            {t('why.subtitle')}
          </p>
        </div>

        {/* Problem-Solution Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problemSolutions.map((item, index) => {
            const cardColors = ['card-hover-blue', 'card-hover-purple', 'card-hover-emerald'];
            const cardColor = cardColors[index % cardColors.length];
            
            return (
            <Card
              key={index}
              className={`bg-card/30 backdrop-blur-md border-border/30 p-8 hover:border-primary/50 transition-all duration-300 card-hover ${cardColor} problem-card`}
            >
              {/* Card Title */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              </div>

              {/* Problem Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <h4 className="text-sm font-semibold text-red-400">{t('why.risk.problem')}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.problem}
                </p>
              </div>

              {/* Solution Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <h4 className="text-sm font-semibold text-primary">{t('why.risk.approach')}</h4>
                </div>
                <p className="text-sm leading-relaxed">
                  {item.solution}
                </p>
              </div>

              {/* Benefit Section */}
              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <h4 className="text-sm font-semibold text-primary">{t('why.risk.provides')}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.benefit}
                </p>
              </div>
            </Card>
          )})}
        </div>


      </div>
    </section>
  );
};

export default ProblemSolutionSection;