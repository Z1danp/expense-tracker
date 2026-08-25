interface DashboardHeaderProps {
  userName: string;
  quote?: string;
}

export default function DashboardHeader({ userName, quote }: DashboardHeaderProps) {
  return (
    <header className="flex items-start justify-between px-5 pt-6 pb-4">
      <div>
        <h1 className="font-bebas text-white text-3xl leading-tight">
          Hello, {userName}!
        </h1>
        <p className="font-barlow text-gray text-sm mt-0.5">
          {quote ?? "Don't let your desires control you."}
        </p>
      </div>

      <button
        className="w-12 h-12 bg-red border-2 border-white flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-white hover:text-red transition-colors group"
        aria-label="Add expense"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          className="w-6 h-6 text-white group-hover:text-red"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </header>
  );
}
