import { useState } from 'react';
import realityIcon from '../../../assets/reality.tsx';
import actionIcon from '../../../assets/actions.tsx';
import reportIcon from '../../../assets/report.tsx';
import lookIcon from '../../../assets/look.tsx';
import configIcon from '../../../assets/config.tsx';

const NAV_ITEMS = [
  { id: 'reality', label: 'REALITY', icon: realityIcon },
  { id: 'action', label: 'ACTION', icon: actionIcon },
  { id: 'report', label: 'REPORT', icon: reportIcon },
  { id: 'look', label: 'LOOK', icon: lookIcon },
  { id: 'config', label: 'CONFIG', icon: configIcon },
];

export default function DummyBottomNav() {
  const [activeTab, setActiveTab] = useState('reality');

  return (
    <nav className="fixed bottom-0 left-0 bg-dark-maroon border-t-2 border-white flex h-20 w-full">
      {NAV_ITEMS.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="flex flex-1 items-center justify-center cursor-pointer border-none bg-transparent  "
          >
            <div
              className={`flex flex-col items-center justify-center w-13 py-1 transition-colors duration-200 ${isActive ? 'bg-acid-yellow text-red' : 'text-white hover:bg-charcoal-gray/20'}`}
            >
              <item.icon className={isActive ? 'text-red' : 'text-white'} />
              <span className="font-bebas text-xs">{item.label}</span>
            </div>
          </button>
        );
      })}
    </nav>
  );
}
