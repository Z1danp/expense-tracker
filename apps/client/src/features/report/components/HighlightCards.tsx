import DescIcon from '../../../assets/desc-tren';
import IncIcon from '../../../assets/inc-tren';

interface HighlightCardsProps {
  bestCategory: string;
  bestSavedPercent: number;
  attentionCategory: string;
  attentionOverPercent: number;
}

export default function HighlightCards({
  bestCategory,
  bestSavedPercent,
  attentionCategory,
  attentionOverPercent,
}: HighlightCardsProps) {
  return (
    <div className="mx-4 grid grid-cols-2 gap-3">
      {/* Best Category */}
      <div className="border-2 border-acid-yellow bg-dark-maroon px-4 py-4 flex flex-col items-center text-center gap-2">
        <DescIcon className="text-white w-8 h-8" />
        <span className="font-barlow text-white/60 text-xs">Best Category</span>
        <span className="font-bebas bg-red text-white text-base border-2 border-white px-2 py-0.5">
          {bestCategory}
        </span>
        <span className="font-barlow text-acid-yellow text-xs font-bold">~{bestSavedPercent}% saved</span>
      </div>

      {/* Need Attention */}
      <div className="border-2 border-acid-yellow bg-red px-4 py-4 flex flex-col items-center text-center gap-2">
        <IncIcon className="text-white w-8 h-8" />
        <span className="font-barlow text-white/60 text-xs">Need Attention</span>
        <span className="font-bebas text-white text-base border-2 border-white px-2 py-0.5 bg-red">
          {attentionCategory}
        </span>
        <span className="font-barlow text-acid-yellow text-xs font-bold">+{attentionOverPercent}% over</span>
      </div>
    </div>
  );
}
