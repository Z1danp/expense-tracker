export type ActionTab = 'spend' | 'loot' | 'shift';

interface ActionTabsProps {
  activeTab: ActionTab;
  onTabChange: (tab: ActionTab) => void;
}

const TABS: { id: ActionTab; label: string }[] = [
  { id: 'spend', label: 'Spend' },
  { id: 'loot', label: 'Loot' },
  { id: 'shift', label: 'Shift' },
];

export default function ActionTabs({ activeTab, onTabChange }: ActionTabsProps) {
  return (
    <div className="flex items-center justify-center gap-0 pt-6 pb-2">
      <div className="flex border-4 border-acid-yellow">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-6 py-1 font-barlow font-bold text-lg cursor-pointer border-none transition-colors duration-200 ${
                isActive
                  ? 'bg-red text-white'
                  : 'bg-acid-yellow text-dark-maroon'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
