import { useState } from 'react';

interface CycleProtocolProps {
  payday: number;
  cycleStart: string;
  cycleEnd: string;
  daysUntilReset: number;
}

export default function CycleProtocol({ payday, cycleStart, cycleEnd, daysUntilReset }: CycleProtocolProps) {
  const [selectedPayday, setSelectedPayday] = useState(payday);

  return (
    <div className="mx-4 border-2 border-acid-yellow">
      <div className="bg-dark-maroon px-4 pt-3 pb-4">
        <span className="font-barlow font-bold text-white text-lg block mb-3">Cycle Protocol</span>

        <div className="flex flex-col gap-2">
          {/* Payday */}
          <div className="flex items-center justify-between">
            <span className="font-barlow text-white text-base font-bold">Payday</span>
            <select
              value={selectedPayday}
              onChange={(e) => setSelectedPayday(Number(e.target.value))}
              className="bg-white border-3 border-black text-black font-barlow font-bold text-base px-2 py-0.5 outline-none cursor-pointer"
            >
              {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  {d}th
                </option>
              ))}
            </select>
          </div>

          {/* Current Cycle */}
          <div className="flex items-center justify-between">
            <span className="font-barlow text-white text-base font-bold">Current Cycle</span>
            <span className="font-barlow text-white text-base bg-black px-1 font-bold">
              {cycleStart} - {cycleEnd}
            </span>
          </div>

          {/* Deadline */}
          <div className="flex items-center justify-between">
            <span className="font-barlow text-white text-base font-bold">Deadline</span>
            <span className="font-barlow text-white text-base bg-black px-1 font-bold">{daysUntilReset} days until reset</span>
          </div>
        </div>
      </div>
    </div>
  );
}
