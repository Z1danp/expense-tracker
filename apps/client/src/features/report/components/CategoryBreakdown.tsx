interface CategoryCompare {
  name: string;
  amount: number;
  thisMonthPercent: number;
  lastMonthPercent: number;
}

interface CategoryBreakdownProps {
  categories: CategoryCompare[];
}

export default function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  const formatAmount = (amount: number) => {
    if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000) return `${Math.round(amount / 1_000)}K`;
    return amount.toString();
  };

  const getBarColor = (percent: number) => {
    if (percent >= 80) return 'bg-red';
    return 'bg-acid-yellow';
  };

  return (
    <div className="mx-4 border-2 border-white">
      <div className="bg-dark-maroon px-4 pt-4 pb-4">
        <h3 className="font-barlow font-bold text-white text-lg mb-4">Category Breakdown</h3>

        <div className="flex flex-col gap-5">
          {categories.map((cat) => (
            <div key={cat.name}>
              {/* Name + Amount */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bebas text-white text-base">{cat.name}</span>
                <span className="font-bebas text-white text-base">IDR {formatAmount(cat.amount)}</span>
              </div>

              {/* Bars */}
              <div className="grid grid-cols-2 gap-3">
                {/* This Month */}
                <div>
                  <div className="h-4 w-full transparant border border-acid-yellow overflow-hidden">
                    <div
                      className={`h-[80%] m-[1.5px] transition-all duration-500 ${getBarColor(cat.thisMonthPercent)}`}
                      style={{ width: `${cat.thisMonthPercent}%` }}
                    />
                  </div>
                  <span className="font-barlow text-white/50 text-[10px]">This Month</span>
                </div>

                {/* Last Month */}
                <div>
                  <div className="h-4 w-full transparant border border-white/30 overflow-hidden">
                    <div
                      className="h-[80%] m-[1.5px] bg-gray"
                      style={{ width: `${cat.lastMonthPercent}%` }}
                    />
                  </div>
                  <span className="font-barlow text-white/50 text-[10px]">Last Month</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
