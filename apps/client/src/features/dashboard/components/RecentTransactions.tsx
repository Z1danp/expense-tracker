interface Transaction {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  currency?: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Bill: 'bg-red text-white',
  Coffee: 'bg-amber-600 text-white',
  Hobbies: 'bg-emerald-600 text-white',
  Food: 'bg-orange-500 text-white',
  Transport: 'bg-blue-600 text-white',
  Shopping: 'bg-purple-600 text-white',
};

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const formatAmount = (amount: number, currency = 'IDR') => {
    if (amount >= 10_000_000) return `-${currency} ${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000) return `-${currency} ${Math.round(amount / 1_000)}K`;
    return `-${currency} ${amount}`;
  };

  return (
    <div className="mx-4 bg-gradient-to-br from-dark-maroon to-red/80 border-2 border-white/20 p-5">
      <h2 className="font-bebas text-white text-xl mb-4">Recent Transactions</h2>

      <div className="flex flex-col gap-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between bg-charcoal-gray/30 px-3 py-2.5 border border-white/10"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="font-barlow text-white font-semibold text-sm truncate uppercase">
                {tx.name}
              </span>
              <span
                className={`font-barlow text-[10px] font-bold px-2 py-0.5 rounded-sm flex-shrink-0 uppercase ${CATEGORY_COLORS[tx.category] ?? 'bg-gray text-white'}`}
              >
                {tx.category}
              </span>
              <span className="font-barlow text-white/50 text-xs flex-shrink-0">
                {tx.date}
              </span>
            </div>

            <span className="font-bebas text-acid-yellow text-base flex-shrink-0 ml-2">
              {formatAmount(tx.amount, tx.currency)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
