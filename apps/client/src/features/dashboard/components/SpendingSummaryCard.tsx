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
    <div className="mx-4 bg-red border-2 border-white p-5">
      {/* Title row */}
      <div className="flex items-center justify-between mb-3 ">
        <div className="flex flex-col gap-1">
          <p className="font-barlow text-white text-xl">
            Total Spending This Month
          </p>
          {/* Big number */}
          <p className="font-barlow uppercase font-bold text-white text-4xl leading-none ">
            {formatAmount(totalSpending)}
          </p>
        </div>
        <span className="bg-white text-red font-barlow font-bold text-5xl px-3 py-0.5 h-15">
          {currency}
        </span>
      </div>

      {/* Budget & remaining */}
      <div className="flex justify-between font-barlow text-base text-white mb-1.5">
        <span>
          Budgets: {formatAmount(budget)}
        </span>
        <span>Remaining: {formatAmount(remaining)}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-4 flex items-center bg-red border border-white overflow-hidden">
        <div
          className={`h-[80%] m-[1.5px] transition-all duration-500 ${isHighUsage ? 'bg-acid-yellow' : 'bg-white'}`}
          style={{ width: `${usagePercent}%` }}
        />
      </div>

      {/* Alert & deadline */}
      <div className="flex justify-between font-barlow text-sm mt-2">
        <span
          className={`font-bold ${isHighUsage ? 'text-acid-yellow' : 'text-white/80'}`}
        >
          {usagePercent.toFixed(1)}% ALERT
        </span>
        <span className="text-white font-bebas">
          Deadline: {deadline} Days
        </span>
      </div>
    </div>
  );
}
