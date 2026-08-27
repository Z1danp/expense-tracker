interface LogEntry {
  id: string;
  name: string;
  category: string;
  account: string;
  date: string;
  amount: number;
}

interface LogsListProps {
  logs: LogEntry[];
  weeklyTotal: number;
  weeklyCount: number;
}

export default function LogsList({
  logs,
  weeklyTotal,
  weeklyCount,
}: LogsListProps) {
  const formatAmount = (amount: number) => {
    const abs = Math.abs(amount);
    if (abs >= 1_000_000) return `${(abs / 1_000_000).toFixed(1)}M`;
    if (abs >= 1_000) return `${Math.round(abs / 1_000)}K`;
    return abs.toString();
  };

  return (
    <div className="px-4 ">
      <h2 className="font-bebas text-white text-2xl mb-3">LOGS</h2>

      {/* Weekly summary header */}
      <div className="flex mb-2 overflow-hidden bg-red">
        <div className="flex-1  px-2 py-2">
          <span className="font-bebas text-white text-lg block leading-tight">
            WEEKLY LOGS
          </span>
          <span className="font-barlow text-white text-xs">
            {String(weeklyCount).padStart(2, '0')} logs this week
          </span>
        </div>
        <div className=" px-2 py-2 flex items-center">
          <span className="font-barlow font-bold text-white text-xl">
            -IDR {formatAmount(weeklyTotal)}
          </span>
        </div>
      </div>

      {/* Log items */}
      <div className="flex flex-col gap-2">
        {logs.map((log) => (
          <div className="flex flex-row items-center bg-acid-yellow justify-between px-2" >
            <div key={log.id} className="bg-acid-yellow py-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-barlow font-bold text-charcoal-gray text-sm">
                    {log.name}
                  </span>
                  <span className="bg-red text-white font-bebas text-xs px-1.5 py-0.5">
                    {log.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-dark-maroon text-white font-barlow text-xs px-1.5 py-0.5">
                  {log.account}
                </span>
                <span className="font-barlow text-black text-xs">
                  {log.date}
                </span>
              </div>
            </div>
            <span className="font-barlow font-bold text-red text-base">-IDR {formatAmount(log.amount)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
