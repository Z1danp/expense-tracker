interface SpendingSummaryCardProps {
  totalSpending: number;
  budget: number;
  remaining: number;
  currency?: string;
  deadline: number;
}

export default function SpendingSummaryCard({
  totalSpending,
  budget,
  remaining,
  currency = 'IDR',
  deadline,
}: SpendingSummaryCardProps) {
  const usagePercent = Math.min((totalSpending / budget) * 100, 100);
  const isHighUsage = usagePercent >= 80;

  const formatAmount = (amount: number) => {
    if (amount >= 10_000_000) return `${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000) return `${Math.round(amount / 1_000)}K`;
    return amount.toString();
  };

  return (
    <div className="mx-4 bg-gradient-to-br from-red to-dark-maroon border-2 border-white p-5">
      {/* Title row */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-barlow text-white/80 text-sm font-semibold uppercase tracking-wide">
          Total Spending This Month
        </span>
        <span className="bg-white text-red font-bebas text-lg px-3 py-0.5 leading-tight">
          {currency}
        </span>
      </div>

      {/* Big number */}
      <p className="font-bebas text-white text-5xl leading-none mb-4">
        {formatAmount(totalSpending)}
      </p>

      {/* Budget & remaining */}
      <div className="flex justify-between font-barlow text-xs text-white/80 mb-1.5">
        <span>Budgets: {currency} {formatAmount(budget)}</span>
        <span>Remaining: {formatAmount(remaining)}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-3 bg-charcoal-gray/50 border border-white/30 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${isHighUsage ? 'bg-acid-yellow' : 'bg-white'}`}
          style={{ width: `${usagePercent}%` }}
        />
      </div>

      {/* Alert & deadline */}
      <div className="flex justify-between font-barlow text-xs mt-2">
        <span className={`font-bold ${isHighUsage ? 'text-acid-yellow' : 'text-white/80'}`}>
          {usagePercent.toFixed(1)}% ALERT
        </span>
        <span className="text-white/80 uppercase">
          Deadline: {deadline} Days
        </span>
      </div>
    </div>
  );
}
