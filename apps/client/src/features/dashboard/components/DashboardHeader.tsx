import AddIcon from '../../../assets/AddSvg.tsx';

interface DashboardHeaderProps {
  userName: string;
  quote?: string;
}

export default function DashboardHeader({
  userName,
  quote,
}: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 pt-6">
      <div>
        <h1 className="font-barlow text-white text-3xl leading-tight">
          Hello, {userName}!
        </h1>
        <p className="font-barlow text-white text-lg mt-0.5">
          {quote ?? "Don't let your desires control you."}
        </p>
      </div>

      <button
        className="w-14 h-14 bg-red border-3 border-white hover:border-red flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-white hover:text-red transition-colors group"
        aria-label="Add expense"
      >
        <AddIcon className="h-12 w-12 text-white hover:text-red" />
      </button>
    </header>
  );
}
