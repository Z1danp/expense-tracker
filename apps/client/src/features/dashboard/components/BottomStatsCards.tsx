interface BottomStatsCardsProps {
  changePercent: number;
  deadlineDays: number;
}

export default function BottomStatsCards({
  changePercent,
  deadlineDays,
}: BottomStatsCardsProps) {
  const isPositive = changePercent > 0;

  return (
    <div className="mx-4 grid grid-cols-2 gap-3">
      {/* vs. Last Month */}
      <div className="bg-charcoal-gray border-2 border-white/20 p-4 flex flex-col items-center justify-center text-center">
        {/* Mini bar chart placeholder */}
        <div className="flex items-end gap-1 mb-3 h-10">
          <div className="w-3 bg-white/20 rounded-t-sm" style={{ height: '40%' }} />
          <div className="w-3 bg-white/20 rounded-t-sm" style={{ height: '60%' }} />
          <div className="w-3 bg-white/30 rounded-t-sm" style={{ height: '50%' }} />
          <div className="w-3 bg-white rounded-t-sm" style={{ height: '80%' }} />
          <div className="w-3 bg-white/20 rounded-t-sm" style={{ height: '35%' }} />
        </div>

        <span className="font-barlow text-white text-xs font-semibold">vs. Last Month</span>
        <span
          className={`font-bebas text-lg mt-0.5 ${isPositive ? 'text-red' : 'text-emerald-400'}`}
        >
          {isPositive ? '+' : ''}{changePercent}%
        </span>
      </div>

      {/* Deadline */}
      <div className="bg-charcoal-gray border-2 border-white/20 p-4 flex flex-col items-center justify-center text-center">
        {/* Calendar-like placeholder */}
        <div className="w-8 h-10 bg-red border border-white/30 flex items-center justify-center mb-3">
          <span className="font-bebas text-white text-lg">{deadlineDays}</span>
        </div>

        <span className="font-barlow text-white text-xs font-semibold">Deadline</span>
        <span className="font-bebas text-red text-lg mt-0.5">
          {deadlineDays} Days
        </span>
      </div>
    </div>
  );
}
