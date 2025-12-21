import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SardesCardDisplay } from '../SardesCardDisplay';
import { SardesCard } from '@/types/sardes-card';
import { DEFAULT_METRICS, DEFAULT_THEMES } from '@/constants/sardes-card';

describe('SardesCardDisplay', () => {
  const mockCard: SardesCard = {
    id: 'test-card-1',
    userId: 'test-user-1',
    userName: 'Test User',
    overallScore: 88,
    metrics: { ...DEFAULT_METRICS },
    theme: { ...DEFAULT_THEMES[0] }, // Classic Gold theme
    createdAt: new Date('2024-01-15T10:30:00Z'),
  };

  it('should render card with correct overall score in top-left', () => {
    render(<SardesCardDisplay card={mockCard} />);
    
    const overallScore = screen.getByText('88');
    expect(overallScore).toBeInTheDocument();
    expect(overallScore).toHaveClass('sardes-card-overall-score');
  });

  it('should display username prominently', () => {
    render(<SardesCardDisplay card={mockCard} />);
    
    const username = screen.getByText('Test User');
    expect(username).toBeInTheDocument();
    expect(username).toHaveClass('sardes-card-username');
  });

  it('should display all six risk metrics with correct formatting', () => {
    render(<SardesCardDisplay card={mockCard} />);
    
    // Check Risk Score with /100 suffix
    expect(screen.getByText('88/100')).toBeInTheDocument();
    
    // Check other metrics with % suffix
    expect(screen.getByText('94%')).toBeInTheDocument(); // Stress Management
    expect(screen.getByText('87%')).toBeInTheDocument(); // Consistency
    expect(screen.getByText('91%')).toBeInTheDocument(); // Post Loss Recovery
    expect(screen.getByText('76%')).toBeInTheDocument(); // Strategy Alignment
    expect(screen.getByText('92%')).toBeInTheDocument(); // Adaptation
    
    // Check metric labels
    expect(screen.getByText('Risk Skoru')).toBeInTheDocument();
    expect(screen.getByText('Stres Yönetimi')).toBeInTheDocument();
    expect(screen.getByText('Tutarlılık')).toBeInTheDocument();
    expect(screen.getByText('Kayıp Sonrası')).toBeInTheDocument();
    expect(screen.getByText('Strateji Uyumu')).toBeInTheDocument();
    expect(screen.getByText('Adaptasyon')).toBeInTheDocument();
  });

  it('should display metric icons', () => {
    render(<SardesCardDisplay card={mockCard} />);
    
    // Check that metric icons are present
    expect(screen.getByText('📊')).toBeInTheDocument(); // Risk Score icon
    expect(screen.getByText('🧘')).toBeInTheDocument(); // Stress Management icon
    expect(screen.getByText('📈')).toBeInTheDocument(); // Consistency icon
    expect(screen.getByText('💪')).toBeInTheDocument(); // Post Loss Recovery icon
    expect(screen.getByText('🎯')).toBeInTheDocument(); // Strategy Alignment icon
    expect(screen.getByText('🔄')).toBeInTheDocument(); // Adaptation icon
  });

  it('should show Sardes branding by default', () => {
    render(<SardesCardDisplay card={mockCard} />);
    
    expect(screen.getByText('SARDES')).toBeInTheDocument();
  });

  it('should show formatted date by default', () => {
    render(<SardesCardDisplay card={mockCard} />);
    
    // Date should be formatted as DD.MM.YYYY in Turkish locale
    expect(screen.getByText('15.01.2024')).toBeInTheDocument();
  });

  it('should hide branding when showBranding is false', () => {
    render(<SardesCardDisplay card={mockCard} showBranding={false} />);
    
    expect(screen.queryByText('SARDES')).not.toBeInTheDocument();
  });

  it('should hide date when showDate is false', () => {
    render(<SardesCardDisplay card={mockCard} showDate={false} />);
    
    expect(screen.queryByText('15.01.2024')).not.toBeInTheDocument();
  });

  it('should apply correct theme class', () => {
    const { container } = render(<SardesCardDisplay card={mockCard} />);
    
    const cardElement = container.querySelector('.sardes-card');
    expect(cardElement).toHaveClass('classic-gold');
  });

  it('should apply premium class for premium themes', () => {
    const premiumCard = {
      ...mockCard,
      theme: { ...DEFAULT_THEMES.find(t => t.isPremium)! },
    };
    
    const { container } = render(<SardesCardDisplay card={premiumCard} />);
    
    const cardElement = container.querySelector('.sardes-card');
    expect(cardElement).toHaveClass('premium');
  });

  it('should handle click events when onClick is provided', () => {
    const handleClick = vi.fn();
    render(<SardesCardDisplay card={mockCard} onClick={handleClick} />);
    
    const cardElement = screen.getByRole('button');
    fireEvent.click(cardElement);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should handle keyboard events when onClick is provided', () => {
    const handleClick = vi.fn();
    render(<SardesCardDisplay card={mockCard} onClick={handleClick} />);
    
    const cardElement = screen.getByRole('button');
    
    // Test Enter key
    fireEvent.keyDown(cardElement, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    // Test Space key
    fireEvent.keyDown(cardElement, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2);
    
    // Test other key (should not trigger)
    fireEvent.keyDown(cardElement, { key: 'Escape' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('should not be interactive when onClick is not provided', () => {
    render(<SardesCardDisplay card={mockCard} />);
    
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <SardesCardDisplay card={mockCard} className="custom-class" />
    );
    
    const cardElement = container.querySelector('.sardes-card');
    expect(cardElement).toHaveClass('custom-class');
  });

  it('should apply theme styles as CSS custom properties', () => {
    const { container } = render(<SardesCardDisplay card={mockCard} />);
    
    const cardElement = container.querySelector('.sardes-card') as HTMLElement;
    const styles = cardElement.style;
    
    expect(styles.getPropertyValue('--card-primary-color')).toBe(mockCard.theme.primaryColor);
    expect(styles.getPropertyValue('--card-secondary-color')).toBe(mockCard.theme.secondaryColor);
    expect(styles.getPropertyValue('--card-text-color')).toBe(mockCard.theme.textColor);
    expect(styles.getPropertyValue('--card-background-image')).toContain(mockCard.theme.backgroundImage);
  });
});