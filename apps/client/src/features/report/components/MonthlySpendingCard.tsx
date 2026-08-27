import IncIcon from '../../../assets/inc-tren';

interface MonthlySpendingCardProps {
  changePercent: number;
  month: string;
  year: number;
}

export default function MonthlySpendingCard({ changePercent, month, year }: MonthlySpendingCardProps) {
  // Mock data points for the line chart
  const dataPoints = [30, 45, 42, 50, 38, 55, 48, 60, 52];
  const width = 300;
  const height = 120;
  const padding = 20;

  const maxVal = Math.max(...dataPoints);
  const minVal = Math.min(...dataPoints);
  const range = maxVal - minVal || 1;

  const points = dataPoints.map((val, i) => {
    const x = padding + (i / (dataPoints.length - 1)) * (width - 2 * padding);
    const y = padding + (1 - (val - minVal) / range) * (height - 2 * padding);
    return { x, y };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ');
  const isPositive = changePercent > 0;

  return (
    <div className="mx-4 border-2 border-acid-yellow bg-red">
      <div className=" px-4 pt-3 pb-2">
        <span className="font-barlow font-bold text-white text-lg">Monthly Spending</span>
      </div>

      {/* Chart area */}
      <div className="bg-white mx-4 mb-2">
        <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((frac) => (
            <line
              key={frac}
              x1={padding}
              y1={padding + frac * (height - 2 * padding)}
              x2={width - padding}
              y2={padding + frac * (height - 2 * padding)}
              stroke="rgba(0,0,0,0.08)"
              strokeWidth={0.5}
            />
          ))}

          {/* Line */}
          <polyline points={polylinePoints} fill="none" stroke="#5B5FC7" strokeWidth={2} />

          {/* Dots */}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={3} fill="#5B5FC7" />
          ))}
        </svg>
      </div>

      {/* Bottom bar */}
      <div className=" px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IncIcon className="text-white w-5 h-5" />
          <span className="font-barlow text-white text-sm font-bold">
            {isPositive ? '+' : ''}
            {changePercent}% vs. Last Month
          </span>
        </div>
        <span className="bg-acid-yellow text-charcoal-gray font-bebas text-sm px-2 py-0.5">
          {month} {year}
        </span>
      </div>
    </div>
  );
}
