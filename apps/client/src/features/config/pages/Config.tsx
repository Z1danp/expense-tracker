import ContractCard from '../components/ContractCard';
import CycleProtocol from '../components/CycleProtocol';
import BudgetMatrix from '../components/BudgetMatrix';
import AccountsRegistry from '../components/AccountsRegistry';
import Preferences from '../components/Preferences';
import DummyBottomNav from '../../dashboard/components/DummyBottomNav';

const MOCK_CATEGORIES = [
  { id: '1', name: 'FOOD & DRINK', limit: 1_000_000 },
  { id: '2', name: 'BILL', limit: 400_000 },
  { id: '3', name: 'HOBBIES', limit: 200_000 },
];

const MOCK_ACCOUNTS = [
  { id: '1', name: 'BCA', type: 'Bank', balance: 3_800_000 },
  { id: '2', name: 'GOPAY', type: 'E-Wallet', balance: 200_000 },
  { id: '3', name: 'CASH', type: '', balance: 200_000 },
];

export default function Config() {
  return (
    <div className="min-h-screen bg-charcoal-gray pb-24 flex flex-col gap-5">
      <div className="px-4 pt-6">
        <h1 className="font-bebas text-white text-3xl">CONFIG</h1>
      </div>

      <ContractCard signer="Zidan" currentCycle={21} totalCycles={30} />
      <CycleProtocol
        payday={25}
        cycleStart="25 Jul 2026"
        cycleEnd="24 Aug 2026"
        daysUntilReset={9}
      />
      <BudgetMatrix totalBudget={2_500_000} categories={MOCK_CATEGORIES} />
      <AccountsRegistry accounts={MOCK_ACCOUNTS} />
      <Preferences />

      <DummyBottomNav />
    </div>
  );
}
