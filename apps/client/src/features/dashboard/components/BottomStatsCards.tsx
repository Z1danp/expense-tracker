import IncIcon from '../../../assets/inc-tren.tsx'
import DescIcon from '../../../assets/desc-tren.tsx'
interface BottomStatsCardsProps {
  changePercent: number;
  deadlineDays: number;
}

export default function BottomStatsCards({
  changePercent
}: BottomStatsCardsProps) {
  const isPositive = changePercent > 0;

  return (
    <div className="mx-4 grid grid-cols-2 gap-3">
      {/* vs. Last Month */}
      <div className="bg-dark-maroon border-2 border-white p-4 flex flex-col items-center justify-center text-center">
        {isPositive ? <IncIcon className='text-white' /> : <DescIcon className='text-red' />}

        <span className="font-barlow text-white text-sm font-bold">vs. Last Month</span>
        <span
          className={`font-bebas text-lg mt-0.5 ${isPositive ? 'text-white' : 'text-emerald-400'}`}
        >
          {isPositive ? '+' : ''}{changePercent}%
        </span>
      </div>

      {/* Deadline */}
      <div className="bg-red border-2 border-white gap-2 p-4 flex flex-col items-center justify-center text-center">

        <span className="font-barlow text-red text-lg bg-white px-1 font-bold">Daily Limit</span>
        <span className="font-bebas text-red text-lg mt-0.5 bg-acid-yellow px-1">
          IDR 55.K/day
        </span>
      </div>
    </div>
  );
}
