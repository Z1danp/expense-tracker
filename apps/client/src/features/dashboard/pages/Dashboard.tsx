import DashboardHeader from '../components/DashboardHeader';
import SpendingSummaryCard from '../components/SpendingSummaryCard';
import SpendingByCategory from '../components/SpendingByCategory';
import RecentTransactions from '../components/RecentTransactions';
import BottomStatsCards from '../components/BottomStatsCards';

// Mock data — replace with real data from API/state
const MOCK_CATEGORIES = [
  { name: 'Skill', amount: 200_000, percentage: 10 },
  { name: 'Potential', amount: 400_000, percentage: 20 },
  { name: 'Contribution', amount: 400_000, percentage: 20 },
  { name: 'Performance', amount: 400_000, percentage: 20 },
  { name: 'Other', amount: 400_000, percentage: 20 },
];

const MOCK_TRANSACTIONS = [
  { id: '1', name: 'Claude', category: 'Bill', date: 'Today', amount: 350_000 },
  { id: '2', name: 'Aren Latte Coffee', category: 'Coffee', date: 'Today', amount: 30_000 },
  { id: '3', name: 'Internet Quota', category: 'Bill', date: 'Yesterday', amount: 120_000 },
  { id: '4', name: 'Frieren Novel', category: 'Hobbies', date: '3 Days Ago', amount: 85_000 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black pb-24 flex flex-col gap-5">
      <DashboardHeader userName="Zidan" />

      <SpendingSummaryCard
        totalSpending={2_000_000}
        budget={2_500_000}
        remaining={500_000}
        currency="IDR"
        deadline={9}
      />

      <SpendingByCategory
        categories={MOCK_CATEGORIES}
        month="August"
        year={2026}
      />

      <RecentTransactions transactions={MOCK_TRANSACTIONS} />

      <BottomStatsCards changePercent={9.5} deadlineDays={9} />
    </div>
  );
}
