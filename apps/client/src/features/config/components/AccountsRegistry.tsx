import AddIcon from '../../../assets/AddSvg';
import EditIcon from '../../../assets/edit';

interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
}

interface AccountsRegistryProps {
  accounts: Account[];
}

export default function AccountsRegistry({ accounts }: AccountsRegistryProps) {
  const formatBalance = (amount: number) => {
    if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000) return `${Math.round(amount / 1_000)}K`;
    return amount.toString();
  };

  return (
    <div className="mx-4 border-2 border-acid-yellow">
      <div className="bg-dark-maroon px-4 pt-3 pb-4">
        <span className="font-barlow font-bold text-white text-lg block mb-3">
          Accounts Registry
        </span>

        {/* Accounts header */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-bebas text-white text-lg">
            ACCOUNTS
          </span>
          <button className="w-7 h-7 bg-red border-2 border-white flex items-center justify-center cursor-pointer hover:bg-white hover:border-red group">
            <AddIcon className="w-5 h-5 text-white group-hover:text-red" />
          </button>
        </div>

        {/* Account items */}
        <div className="flex flex-col gap-1.5">
          {accounts.map((acc) => (
            <div
              key={acc.id}
              className="bg-acid-yellow border-2 border-charcoal-gray/30 px-3 py-2 flex items-center justify-between"
            >
              <span className="font-bebas text-black text-lg">
                {acc.name}
                {acc.type ? ` (${acc.type.toUpperCase()})` : ''}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-barlow text-red font-bold text-base">
                  IDR {formatBalance(acc.balance)}
                </span>
                <button className="w-6 h-6 bg-red border-2 border-white flex items-center justify-center cursor-pointer text-white font-bold text-xs hover:bg-white hover:text-red hover:border-red">
                  <EditIcon className='h-4' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
