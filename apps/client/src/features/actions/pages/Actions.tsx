import { useState } from 'react';
import ActionTabs from '../components/ActionTabs';
import SpendForm from '../components/SpendForm';
import LootForm from '../components/LootForm';
import ShiftForm from '../components/ShiftForm';
import type { ActionTab } from '../components/ActionTabs';

export default function Actions() {
  const [activeTab, setActiveTab] = useState<ActionTab>('spend');

  return (
    <div className="min-h-screen bg-charcoal-gray pb-24 flex flex-col gap-4">
      <ActionTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'spend' && <SpendForm />}
      {activeTab === 'loot' && <LootForm />}
      {activeTab === 'shift' && <ShiftForm />}
    </div>
  );
}
