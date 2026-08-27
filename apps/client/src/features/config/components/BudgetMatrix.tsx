import AddIcon from '../../../assets/AddSvg';
import EditIcon from '../../../assets/edit'

interface CategoryBudget {
  id: string;
  name: string;
  limit: number;
}

interface BudgetMatrixProps {
  totalBudget: number;
  categories: CategoryBudget[];
}

export default function BudgetMatrix({ totalBudget, categories }: BudgetMatrixProps) {
  const formatLimit = (amount: number) => {
    if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000) return `${Math.round(amount / 1_000)}K`;
    return amount.toString();
  };

  return (
    <div className="mx-4 border-2 border-acid-yellow">
      <div className="bg-dark-maroon px-4 pt-3 pb-4">
        <span className="font-barlow font-bold text-white text-lg block mb-3">Budget Matrix</span>

        {/* Total Budget */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-barlow text-white text-base font-bold">Total Budget Limit</span>
          <div className="bg-white border-3 border-black px-3 py-1">
            <span className="font-barlow font-bold text-black text-base">
              IDR {totalBudget.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Categories header */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-bebas text-white text-lg">CATEGORIES</span>
          <button className="w-7 h-7 bg-red border-2 border-white flex items-center justify-center cursor-pointer hover:bg-white hover:border-red group">
            <AddIcon className="w-5 h-5 text-white group-hover:text-red" />
          </button>
        </div>

        {/* Category items */}
        <div className="flex flex-col gap-1.5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-acid-yellow border-2 border-charcoal-gray/30 px-3 py-2 flex items-center justify-between"
            >
              <span className="font-bebas text-black text-lg">{cat.name}</span>
              <div className="flex items-center gap-2">
                <span className="font-barlow text-red font-bold text-base">
                  IDR {formatLimit(cat.limit)} Limit
                </span>
                <button className="w-6 h-6 bg-red border-2 border-white flex items-center justify-center cursor-pointer text-white font-bold text-xs hover:bg-white hover:text-red hover:border-red">
                  <EditIcon className='h-4'/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
