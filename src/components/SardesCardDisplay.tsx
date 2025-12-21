import React from 'react';
import { SardesCard } from '@/types/sardes-card';
import { METRIC_CONFIG } from '@/constants/sardes-card';
import { ThemeManager } from '@/services/theme-manager';
import '@/styles/card-themes.css';

interface SardesCardDisplayProps {
  card: SardesCard;
  className?: string;
  showDate?: boolean;
  showBranding?: boolean;
  onClick?: () => void;
}

/**
 * SardesCardDisplay - Main FIFA-style card rendering component
 * Displays user's financial metrics in an attractive trading card format
 */
export const SardesCardDisplay: React.FC<SardesCardDisplayProps> = ({
  card,
  className = '',
  showDate = true,
  showBranding = true,
  onClick,
}) => {
  const themeManager = new ThemeManager();
  const themeStyles = themeManager.getThemeStyles(card.theme);

  // Format date for display
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  // Get metric display configuration
  const getMetricConfig = (key: keyof typeof card.metrics) => {
    return METRIC_CONFIG[key];
  };

  // Format metric value with appropriate suffix
  const formatMetricValue = (key: keyof typeof card.metrics, value: number): string => {
    const config = getMetricConfig(key);
    return `${value}${config.suffix}`;
  };

  return (
    <div
      className={`sardes-card ${card.theme.id} ${card.theme.isPremium ? 'premium' : ''} ${className}`}
      style={themeStyles}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      <div className="sardes-card-content">
        {/* Header with overall score and username */}
        <div className="sardes-card-header">
          <div className="sardes-card-overall-score">
            {card.overallScore}
          </div>
          <div className="sardes-card-username">
            {card.userName}
          </div>
        </div>

        {/* Metrics display */}
        <div className="sardes-card-metrics">
          {Object.entries(card.metrics).map(([key, value]) => {
            const metricKey = key as keyof typeof card.metrics;
            const config = getMetricConfig(metricKey);
            
            return (
              <div key={key} className="sardes-card-metric">
                <div className="sardes-card-metric-label">
                  <span className="sardes-card-metric-icon">
                    {config.icon}
                  </span>
                  <span>{config.label}</span>
                </div>
                <div className="sardes-card-metric-value">
                  {formatMetricValue(metricKey, value)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer with branding and date */}
        {(showBranding || showDate) && (
          <div className="sardes-card-footer">
            {showBranding && (
              <div className="sardes-card-branding">
                SARDES
              </div>
            )}
            {showDate && (
              <div className="sardes-card-date">
                {formatDate(card.createdAt)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SardesCardDisplay;