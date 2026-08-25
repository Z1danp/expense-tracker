import { useState } from 'react';
import realityIcon from '../../../assets/reality.svg';
import actionIcon from '../../../assets/action.svg';
import reportIcon from '../../../assets/report.svg';
import lookIcon from '../../../assets/look.svg';
import configIcon from '../../../assets/config.svg';

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
    <nav className="fixed bottom-0 left-0 bg-dark-maroon border-t-2 border-white flex h-20 w-full ">
      {NAV_ITEMS.map((item) => {
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-1 flex-col items-center justify-center transition-colors duration-200 cursor-pointer border-none ${isActive ? 'bg-acid-yellow text-red' : 'text-white hover:bg-charcoal-gray/20'}`}
          >
            <div
              className="w-7 h-7 mb-1 bg-current"
              style={{
                WebkitMask: `url(${item.icon}) no-repeat center`,
                WebkitMaskSize: `contain`,
                mask: `url(${item.icon}) no-repeat center`,
                maskSize: `contain`,
              }}
            />

            <span className="font-bebas text-xs">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
