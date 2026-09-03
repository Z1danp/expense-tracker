import { Outlet } from 'react-router-dom';
import BottomNav from '../components/ui/BottomNav';

export default function AppShell() {
  return (
    <div className="min-h-screen bg-charcoal-gray flex flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
