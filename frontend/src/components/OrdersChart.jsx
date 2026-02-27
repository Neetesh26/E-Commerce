import React from 'react';

// Simple SVG bar chart — no external deps.
// Expects `data` as array of { label: string, value: number }
const OrdersChart = ({ data = [], width = 600, height = 200 }) => {
  if (!data || data.length === 0) {
    return <p className="text-sm text-gray-500">No orders data available.</p>;
  }

  const padding = 20;
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;
  const max = Math.max(...data.map((d) => d.value));
  const barWidth = innerWidth / data.length - 8;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} className="bg-white rounded shadow-sm p-2">
      <g transform={`translate(${padding}, ${padding})`}>
        {data.map((d, i) => {
          const x = i * (barWidth + 8);
          const h = max === 0 ? 0 : (d.value / max) * innerHeight;
          const y = innerHeight - h;
          return (
            <g key={d.label}>
              <rect x={x} y={y} width={barWidth} height={h} fill="#2563eb" rx="4" />
              <text x={x + barWidth / 2} y={innerHeight + 14} fontSize="10" textAnchor="middle" fill="#374151">{d.label}</text>
              <text x={x + barWidth / 2} y={y - 4} fontSize="10" textAnchor="middle" fill="#111827">{d.value}</text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default OrdersChart;
