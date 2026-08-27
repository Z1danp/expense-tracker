import { useState } from 'react';

export default function Preferences() {
  const [threshold, setThreshold] = useState(80);
  const [exportFormat, setExportFormat] = useState<'CSV' | 'XLS'>('CSV');

  return (
    <>
      <div className="mx-4 border-2 border-acid-yellow">
        <div className="bg-dark-maroon px-4 pt-3 pb-4">
          <span className="font-barlow font-bold text-white text-lg block mb-3">Preferences</span>

          {/* Alert Threshold */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-barlow text-white text-sm font-bold">Alert Spending Threshold</span>
            <select
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="bg-red border-3 border-white text-white font-barlow font-bold text-sm px-2 py-0.5 outline-none cursor-pointer"
            >
              {[50, 60, 70, 80, 90].map((t) => (
                <option key={t} value={t}>
                  {t}%
                </option>
              ))}
            </select>
          </div>

          {/* Export */}
          <div className="flex items-center justify-between">
            <span className="font-barlow text-white text-sm font-bold">Export Data</span>
            <div className="flex border-3 border-white">
              <button
                onClick={() => setExportFormat('CSV')}
                className={`px-3 py-0.5 font-bebas text-sm cursor-pointer border-none ${
                  exportFormat === 'CSV' ? 'bg-red text-white' : 'bg-white text-charcoal-gray'
                }`}
              >
                CSV
              </button>
              <button
                onClick={() => setExportFormat('XLS')}
                className={`px-3 py-0.5 font-bebas text-sm cursor-pointer border-none ${
                  exportFormat === 'XLS' ? 'bg-red text-white' : 'bg-white text-charcoal-gray'
                }`}
              >
                XLS
              </button>
            </div>
          </div>

          {/* Export button */}
          <div className="flex justify-end mt-3">
            <button className="bg-red text-white font-bebas text-sm px-4 py-1 border-3 border-white cursor-pointer hover:bg-white hover:text-red hover:border-red">
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="mx-4">
        <button className="bg-red text-white font-bebas text-lg px-4 py-1.5 border-3 border-white cursor-pointer hover:bg-white hover:text-red hover:border-red">
          Logout
        </button>
      </div>
    </>
  );
}
