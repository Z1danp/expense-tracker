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
  Coffee: 'bg-red text-white',
  Hobbies: 'bg-red text-white',
  Food: 'bg-red text-white',
  Transport: 'bg-red text-white',
  Shopping: 'bg-red text-white',
  
};

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const formatAmount = (amount: number, currency = 'IDR') => {
    if (amount >= 10_000_000) return `-${currency} ${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000) return `-${currency} ${Math.round(amount / 1_000)}K`;
    return `-${currency} ${amount}`;
  };

  return (
    <div className="mx-4 bg-dark-maroon border-2 border-white p-5">
      <h2 className="font-barlow font-bold text-white text-xl mb-4">Recent Transactions</h2>

      <div className="flex flex-col gap-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between bg-acid-yellow px-3 py-2.5 border border-white/10"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="font-bebas text-black text-lg truncate uppercase">
                {tx.name}
              </span>
              <span
                className={`font-barlow text-sm font-bold px-1  flex-shrink-0 ${CATEGORY_COLORS[tx.category] ?? 'bg-gray text-white'}`}
              >
                {tx.category}
              </span>
              <span className="font-barlow text-dark-maroon font-bold text-sm flex-shrink-0">
                {tx.date}
              </span>
            </div>

            <span className="font-barlow font-bold text-red text-lg flex-shrink-0 ml-2">
              {formatAmount(tx.amount, tx.currency)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
