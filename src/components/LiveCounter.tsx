import { useState, useEffect } from 'react';
import { useWaitlistCount } from '@/hooks/useWaitlistCount';

const LiveCounter = () => {
  const { count, isLoading } = useWaitlistCount();
  
  // Sayı animasyonu için counter effect
  const [displayCount, setDisplayCount] = useState(360);

  useEffect(() => {
    if (count !== displayCount) {
      const increment = count > displayCount ? 1 : -1;
      const timer = setInterval(() => {
        setDisplayCount(prev => {
          if (prev === count) {
            clearInterval(timer);
            return prev;
          }
          return prev + increment;
        });
      }, 50);

      return () => clearInterval(timer);
    }
  }, [count, displayCount]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2 text-primary">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-3 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl px-6 py-4">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
        <span className="text-sm text-secondary font-medium">Canlı</span>
      </div>
      
      <div className="h-6 w-px bg-border"></div>
      
      <div className="text-center">
        <div className="text-2xl font-bold text-primary tabular-nums">
          {displayCount.toLocaleString('tr-TR')}
        </div>
        <div className="text-xs text-secondary -mt-1">
          kişi erken erişim aldı
        </div>
      </div>
    </div>
  );
};

export default LiveCounter;