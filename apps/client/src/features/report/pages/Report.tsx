import { useState } from 'react';
import MonthlySpendingCard from '../components/MonthlySpendingCard';
import CategoryBreakdown from '../components/CategoryBreakdown';
import HighlightCards from '../components/HighlightCards';
import DummyBottomNav from '../../dashboard/components/DummyBottomNav';

const MOCK_CATEGORIES = [
  { name: 'FOOD & DRINK', amount: 800_000, thisMonthPercent: 60, lastMonthPercent: 45 },
  { name: 'BILL', amount: 590_000, thisMonthPercent: 70, lastMonthPercent: 50 },
  { name: 'HOBBIES', amount: 600_000, thisMonthPercent: 90, lastMonthPercent: 55 },
];

type ReportPeriod = 'month' | 'year';

export default function Report() {
  const [period, setPeriod] = useState<ReportPeriod>('month');

  return (
    <div className="min-h-screen bg-charcoal-gray pb-24 flex flex-col gap-5">
      {/* Header with period tabs */}
      <div className="flex items-center justify-between px-4 pt-6">
        <h1 className="font-bebas text-white text-3xl">REPORT</h1>
        <div className="flex border-4 border-acid-yellow">
          <button
            onClick={() => setPeriod('month')}
            className={`px-6 py-1 font-barlow font-bold text-lg cursor-pointer border-none transition-colors duration-200 ${
              period === 'month' ? 'bg-red text-white' : 'bg-acid-yellow text-dark-maroon'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setPeriod('year')}
            className={`px-6 py-1 font-barlow font-bold text-lg cursor-pointer border-none transition-colors duration-200 ${
              period === 'year' ? 'bg-red text-white' : 'bg-acid-yellow text-dark-maroon'
            }`}
          >
            Year
          </button>
        </div>
      </div>

      <MonthlySpendingCard changePercent={8.5} month="August" year={2026} />
      <CategoryBreakdown categories={MOCK_CATEGORIES} />
      <HighlightCards
        bestCategory="Bill"
        bestSavedPercent={15}
        attentionCategory="Hobbies"
        attentionOverPercent={25}
      />

      <DummyBottomNav />
    </div>
  );
}
