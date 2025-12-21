import React from 'react';
import { RiskMetrics } from '@/types/sardes-card';
import { METRIC_CONFIG } from '@/constants/sardes-card';
import { Card } from '@/components/ui/card';

interface MetricsPanelProps {
  metrics: RiskMetrics;
  overallScore: number;
  className?: string;
  showOverallScore?: boolean;
}

/**
 * MetricsPanel - Displays individual risk metrics in a clean format
 * Used for metric editing and detailed view
 */
export const MetricsPanel: React.FC<MetricsPanelProps> = ({
  metrics,
  overallScore,
  className = '',
  showOverallScore = true,
}) => {
  // Format metric value with appropriate suffix
  const formatMetricValue = (key: keyof RiskMetrics, value: number): string => {
    const config = METRIC_CONFIG[key];
    return `${value}${config.suffix}`;
  };

  return (
    <div className={`metrics-panel ${className}`}>
      {/* Overall Score Display */}
      {showOverallScore && (
        <Card className="p-6 mb-6 bg-primary/5 border-primary/20">
          <div className="text-center">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Genel Skor
            </div>
            <div className="text-4xl font-bold text-primary">
              {overallScore}
            </div>
            <div className="text-sm text-muted-foreground">
              6 metriğin ortalaması
            </div>
          </div>
        </Card>
      )}

      {/* Individual Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(metrics).map(([key, value]) => {
          const metricKey = key as keyof RiskMetrics;
          const config = METRIC_CONFIG[metricKey];
          
          return (
            <Card key={key} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {config.icon}
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      {config.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {metricKey}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {config.suffix}
                  </div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-3">
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MetricsPanel;