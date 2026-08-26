interface CategoryData {
  name: string;
  amount: number;
  percentage: number;
}

interface SpendingByCategoryProps {
  categories: CategoryData[];
  month: string;
  year: number;
}

export default function SpendingByCategory({
  categories,
  month,
  year,
}: SpendingByCategoryProps) {
  const formatAmount = (amount: number) => {
    if (amount >= 10_000_000) return `${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000) return `${Math.round(amount / 1_000)}K`;
    return amount.toString();
  };

  return (
    <div className="mx-4 bg-dark-maroon border-2 border-white p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-barlow font-bold text-white text-xl">Spending by Categories</h2>
        <span className="bg-acid-yellow text-black font-bebas text-sm px-3 py-0.5 leading-tight uppercase">
          {month} {year}
        </span>
      </div>

      {/* Content: radar chart + legend */}
      <div className="flex items-center gap-4">
        {/* Radar chart placeholder */}
        <div className="w-40 h-40 flex-shrink-0 flex items-center justify-center">
          <RadarChartPlaceholder categories={categories} />
        </div>

        {/* Category legend */}
        <div className="flex flex-col gap-2.5 flex-1">
          {categories.map((cat) => (
            <div key={cat.name} className="flex items-baseline justify-between">
              <span className="font-barlow text-white/70 text-sm">{cat.name}</span>
              <div className="text-right">
                <span className="font-bebas text-white text-base leading-none block">
                  {formatAmount(cat.amount)}
                </span>
                <span className="font-barlow text-white/50 text-[10px]">
                  {cat.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** SVG-based radar chart placeholder */
function RadarChartPlaceholder({ categories }: { categories: CategoryData[] }) {
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = 60;
  const levels = 3;
  const n = categories.length;

  const getPoint = (index: number, radius: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  };

  const maxVal = Math.max(...categories.map((c) => c.amount), 1);

  const dataPoints = categories.map((cat, i) => {
    const r = (cat.amount / maxVal) * maxRadius;
    return getPoint(i, r);
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid levels */}
      {Array.from({ length: levels }, (_, level) => {
        const r = (maxRadius / levels) * (level + 1);
        const points = Array.from({ length: n }, (_, i) => {
          const p = getPoint(i, r);
          return `${p.x},${p.y}`;
        }).join(' ');
        return (
          <polygon
            key={level}
            points={points}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={1}
          />
        );
      })}

      {/* Axis lines */}
      {Array.from({ length: n }, (_, i) => {
        const p = getPoint(i, maxRadius);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={1}
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={dataPoints.map((p) => `${p.x},${p.y}`).join(' ')}
        fill="rgba(217, 35, 35, 0.3)"
        stroke="#D92323"
        strokeWidth={2}
      />

      {/* Data dots */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill="#FFE500" />
      ))}

      {/* Labels */}
      {categories.map((cat, i) => {
        const p = getPoint(i, maxRadius + 14);
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(255,255,255,0.5)"
            fontSize={8}
            fontFamily="Barlow Semi Condensed"
          >
            {cat.name}
          </text>
        );
      })}
    </svg>
  );
}
