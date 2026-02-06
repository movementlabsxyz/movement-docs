'use client';

import React from 'react';

interface TokenDistributionData {
  name: string;
  tokens: number; // in millions
  percentage: number;
  color: string;
}

const data: TokenDistributionData[] = [
  { name: 'Ecosystem', tokens: 4000, percentage: 40.0, color: '#3B82F6' },
  { name: 'Foundation', tokens: 1000, percentage: 10.0, color: '#EF4444' },
  { name: 'Early Contributors', tokens: 1750, percentage: 17.5, color: '#F59E0B' },
  { name: 'Early Backers', tokens: 2250, percentage: 22.5, color: '#10B981' },
  { name: 'Community', tokens: 1000, percentage: 10.0, color: '#8B5CF6' },
];

// Calculate pie chart path
function getPieSlicePath(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = {
    x: centerX + radius * Math.cos(startAngle),
    y: centerY + radius * Math.sin(startAngle),
  };
  const end = {
    x: centerX + radius * Math.cos(endAngle),
    y: centerY + radius * Math.sin(endAngle),
  };
  const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

  return `
    M ${centerX} ${centerY}
    L ${start.x} ${start.y}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}
    Z
  `;
}

export function TokenDistributionChart() {
  const size = 320;
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = 120;
  const legendOffset = 20;
  const legendItemHeight = 24;

  let currentAngle = -Math.PI / 2; // Start at top

  const slices = data.map((item) => {
    const sliceAngle = (item.percentage / 100) * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;

    const slice = {
      ...item,
      path: getPieSlicePath(centerX, centerY, radius, startAngle, endAngle),
      startAngle,
      endAngle,
      labelAngle: startAngle + sliceAngle / 2,
    };

    currentAngle = endAngle;
    return slice;
  });

  // Calculate label position (rounded for hydration consistency)
  const getLabelPosition = (angle: number, distance: number) => {
    return {
      x: Math.round((centerX + distance * Math.cos(angle)) * 100) / 100,
      y: Math.round((centerY + distance * Math.sin(angle)) * 100) / 100,
    };
  };

  return (
    <div className="my-8 flex flex-col items-center gap-8 lg:flex-row lg:justify-center">
      {/* Pie Chart */}
      <div className="flex-shrink-0">
        <svg width={size} height={size} className="overflow-visible">
          {slices.map((slice, index) => {
            const labelPos = getLabelPosition(slice.labelAngle, radius * 0.65);
            return (
              <g key={index}>
                <path
                  d={slice.path}
                  fill={slice.color}
                  stroke="white"
                  strokeWidth="2"
                  className="hover:opacity-80 transition-opacity"
                />
                {slice.percentage > 5 && (
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-semibold fill-white pointer-events-none"
                  >
                    {slice.percentage}%
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-3 min-w-[280px]">
        <div className="space-y-2">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <div className="flex items-center gap-3 flex-1">
                <div
                  className="w-4 h-4 rounded flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-gray-900">{item.name}</span>
              </div>
              <div className="flex items-center gap-4 text-right flex-shrink-0">
                <span className="text-gray-600 font-medium">
                  {item.tokens.toLocaleString()}M
                </span>
                <span className="text-gray-900 font-semibold w-12">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-3 border-t border-gray-200 mt-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-gray-900">Total</span>
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-medium">10,000M</span>
              <span className="text-gray-900 font-semibold w-12">100.0%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
