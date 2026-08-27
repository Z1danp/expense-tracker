import QuickFilter from '../components/QuickFilter';
import LogsList from '../components/LogsList';
import DummyBottomNav from '../../dashboard/components/DummyBottomNav';

const MOCK_LOGS = [
  { id: '1', name: 'CLAUDE', category: 'Bill', account: 'BCA', date: 'August 08, 2026', amount: 350_000 },
  { id: '2', name: 'AREN LATTE COFFEE', category: 'Coffee', account: 'Gopay', date: 'August 08, 2026', amount: 30_000 },
  { id: '3', name: 'INTERNET QUOTA', category: 'Bill', account: 'Livin Mandiri', date: 'August 10, 2026', amount: 120_000 },
];

export default function Logs() {
  return (
    <div className="min-h-screen bg-charcoal-gray pb-24 flex flex-col gap-5">
      <div className="px-4 pt-6">
        <h1 className="font-bebas text-white text-3xl">LOGS</h1>
      </div>

      <QuickFilter />
      <LogsList logs={MOCK_LOGS} weeklyTotal={500_000} weeklyCount={3} />

      <DummyBottomNav />
    </div>
  );
}
