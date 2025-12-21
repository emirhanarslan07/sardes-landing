import React from 'react';
import { SardesCard } from '@/types/sardes-card';
import SardesCardDisplay from './SardesCardDisplay';
import { Card } from '@/components/ui/card';

interface CardPreviewProps {
  card: SardesCard;
  title?: string;
  description?: string;
  className?: string;
  scale?: number;
  showControls?: boolean;
  onEdit?: () => void;
  onShare?: () => void;
  onDownload?: () => void;
}

/**
 * CardPreview - Real-time preview component for card customization
 * Shows live preview of card changes during editing
 */
export const CardPreview: React.FC<CardPreviewProps> = ({
  card,
  title = "Kart Önizleme",
  description,
  className = '',
  scale = 1,
  showControls = false,
  onEdit,
  onShare,
  onDownload,
}) => {
  return (
    <Card className={`card-preview p-6 ${className}`}>
      {/* Preview Header */}
      <div className="mb-6 text-center">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Card Display */}
      <div className="flex justify-center mb-6">
        <div 
          style={{ 
            transform: `scale(${scale})`,
            transformOrigin: 'center',
          }}
        >
          <SardesCardDisplay 
            card={card}
            className="shadow-2xl"
          />
        </div>
      </div>

      {/* Card Info */}
      <div className="space-y-2 text-sm text-muted-foreground mb-6">
        <div className="flex justify-between">
          <span>Tema:</span>
          <span className="font-medium">{card.theme.name}</span>
        </div>
        <div className="flex justify-between">
          <span>Genel Skor:</span>
          <span className="font-medium text-primary">{card.overallScore}</span>
        </div>
        <div className="flex justify-between">
          <span>Oluşturulma:</span>
          <span className="font-medium">
            {new Intl.DateTimeFormat('tr-TR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }).format(card.createdAt)}
          </span>
        </div>
        {card.theme.isPremium && (
          <div className="flex justify-between">
            <span>Premium Tema:</span>
            <span className="font-medium text-yellow-600">👑 Aktif</span>
          </div>
        )}
      </div>

      {/* Action Controls */}
      {showControls && (
        <div className="flex gap-2 justify-center">
          {onEdit && (
            <button
              onClick={onEdit}
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Düzenle
            </button>
          )}
          {onShare && (
            <button
              onClick={onShare}
              className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
            >
              Paylaş
            </button>
          )}
          {onDownload && (
            <button
              onClick={onDownload}
              className="px-4 py-2 text-sm bg-accent text-accent-foreground rounded-md hover:bg-accent/80 transition-colors"
            >
              İndir
            </button>
          )}
        </div>
      )}
    </Card>
  );
};

export default CardPreview;