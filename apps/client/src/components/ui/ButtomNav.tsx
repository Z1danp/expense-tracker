import { Link, useLocation } from 'react-router-dom';
import realityIcon from '../../assets/reality.svg';
import actionIcon from '../../assets/action.svg';
import reportIcon from '../../assets/report.svg';
import lookIcon from '../../assets/look.svg';
import configIcon from '../../assets/config.svg';

const NAV_ITEMS = [
  { path: '/', label: 'REALITY', icon: realityIcon },
  { path: '/actions', label: 'ACTION', icon: actionIcon },
  { path: '/report', label: 'REPORT', icon: reportIcon },
  { path: '/look', label: 'LOOK', icon: lookIcon },
  { path: '/config', label: 'CONFIG', icon: configIcon },
];

export default function ButtomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 bg-darkMaroon border-t-2 border-white flex h-20 w-full ">
      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-1 flex-col items-center justify-center transition-colors duration-200 ${isActive ? 'bg-acidYellow text-red' : 'text-white hover:bg-charcoalGray/20'}`}
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
          </Link>
        );
      })}
    </nav>
  );
}
