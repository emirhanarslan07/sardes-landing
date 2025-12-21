import { useWaitlistCount } from '@/hooks/useWaitlistCount';

const TopBanner = () => {
  const { count, isLoading } = useWaitlistCount();

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-center">
          <div className="flex items-center space-x-2 text-primary">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-center">
        <div className="flex items-center space-x-3 text-sm">
          <div className="flex items-center space-x-1.5">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-secondary font-medium">Canlı</span>
          </div>
          <span className="text-primary font-bold tabular-nums">
            {count.toLocaleString('tr-TR')} kişi erken erişim aldı
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;