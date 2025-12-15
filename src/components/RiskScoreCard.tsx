const RiskScoreCard = () => {
  return (
    <div className="glass rounded-2xl p-6 w-64 animate-float">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground font-medium">Risk Skoru</span>
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
      </div>
      
      <div className="flex items-end gap-2 mb-4">
        <span className="text-5xl font-bold text-primary">88</span>
        <span className="text-muted-foreground text-sm mb-2">/100</span>
      </div>
      
      {/* Mini chart visualization */}
      <div className="flex items-end gap-1 h-12">
        {[40, 65, 45, 80, 60, 90, 75, 88].map((height, i) => (
          <div
            key={i}
            className="flex-1 bg-primary/30 rounded-t transition-all duration-300"
            style={{ 
              height: `${height}%`,
              backgroundColor: i === 7 ? 'hsl(var(--primary))' : undefined
            }}
          />
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
          <span className="text-xs text-muted-foreground">Yüksek Risk Toleransı</span>
        </div>
      </div>
    </div>
  );
};

export default RiskScoreCard;
