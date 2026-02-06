'use client';

import React, { useState } from 'react';

interface VestingDataPoint {
  month: string;
  period: number;
  circSupplyPercent: number;
  ecosystem: number;
  foundation: number;
  earlyBackers: number;
  earlyContributors: number;
  community: number;
  total: number;
}

// Monthly circulating supply data (cumulative)
const monthlyData: VestingDataPoint[] = [
  { month: 'Nov-24', period: 0, circSupplyPercent: 22.5, ecosystem: 1000, foundation: 250, earlyBackers: 0, earlyContributors: 0, community: 1000, total: 2250 },
  { month: 'Nov-25', period: 12, circSupplyPercent: 28.5, ecosystem: 1600, foundation: 250, earlyBackers: 0, earlyContributors: 0, community: 1000, total: 2850 },
  { month: 'Nov-26', period: 24, circSupplyPercent: 48.3, ecosystem: 2200, foundation: 437.5, earlyBackers: 750, earlyContributors: 437.5, community: 1000, total: 4825 },
  { month: 'Nov-27', period: 36, circSupplyPercent: 68.0, ecosystem: 2800, foundation: 625, earlyBackers: 1500, earlyContributors: 875, community: 1000, total: 6800 },
  { month: 'Nov-28', period: 48, circSupplyPercent: 87.8, ecosystem: 3400, foundation: 812.5, earlyBackers: 2250, earlyContributors: 1312.5, community: 1000, total: 8775 },
  { month: 'Nov-29', period: 60, circSupplyPercent: 100.0, ecosystem: 4000, foundation: 1000, earlyBackers: 2250, earlyContributors: 1750, community: 1000, total: 10000 },
];

const colors = {
  ecosystem: '#3B82F6',
  foundation: '#EF4444',
  earlyBackers: '#10B981',
  earlyContributors: '#F59E0B',
  community: '#8B5CF6',
};

export function CumulativeVestingChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const chartWidth = 600;
  const chartHeight = 400;
  const margin = { top: 20, right: 40, bottom: 60, left: 80 };
  const innerWidth = chartWidth - margin.left - margin.right;
  const innerHeight = chartHeight - margin.top - margin.bottom;

  const maxValue = 10000;
  const xScale = (index: number) => 
    margin.left + (index / (monthlyData.length - 1)) * innerWidth;
  const yScale = (value: number) => 
    margin.top + innerHeight - (value / maxValue) * innerHeight;

  // Create paths for each category (stacked area)
  const createPath = (category: keyof Omit<VestingDataPoint, 'month' | 'period' | 'circSupplyPercent' | 'total'>) => {
    const topPoints: Array<{ x: number; y: number }> = [];
    const bottomPoints: Array<{ x: number; y: number }> = [];
    
    // Calculate cumulative bottom stack (sum of all previous categories)
    const getBottomStack = (index: number, currentCategory: typeof category) => {
      let sum = 0;
      const categoryOrder = ['community', 'foundation', 'earlyContributors', 'earlyBackers', 'ecosystem'];
      const currentIndex = categoryOrder.indexOf(currentCategory);
      
      for (let i = 0; i < currentIndex; i++) {
        const prevCategory = categoryOrder[i] as typeof category;
        sum += monthlyData[index][prevCategory];
      }
      return sum;
    };
    
    // Top line (current category + previous stacks)
    monthlyData.forEach((point, index) => {
      const x = xScale(index);
      const bottomStack = getBottomStack(index, category);
      const topY = bottomStack + point[category];
      topPoints.push({ x, y: yScale(topY) });
    });

    // Bottom line (just previous stacks)
    monthlyData.forEach((point, index) => {
      const x = xScale(index);
      const bottomStack = getBottomStack(index, category);
      bottomPoints.push({ x, y: yScale(bottomStack) });
    });

    // Combine top and bottom to create closed path
    const allPoints = [
      ...topPoints,
      ...bottomPoints.reverse()
    ];

    return allPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  };

  const categories: Array<{
    key: keyof Omit<VestingDataPoint, 'month' | 'period' | 'circSupplyPercent' | 'total'>;
    name: string;
    color: string;
  }> = [
    { key: 'community', name: 'Community', color: colors.community },
    { key: 'foundation', name: 'Foundation', color: colors.foundation },
    { key: 'earlyContributors', name: 'Early Contributors', color: colors.earlyContributors },
    { key: 'earlyBackers', name: 'Early Backers', color: colors.earlyBackers },
    { key: 'ecosystem', name: 'Ecosystem', color: colors.ecosystem },
  ];

  return (
    <div className="my-8">
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Cumulative circulating supply over time: stacked view showing the cumulative circulating supply by category from TGE (Nov 2024) through full vesting (Nov 2029). Real unlock schedules may vary from shown projection.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 overflow-x-auto">
        <svg width={chartWidth} height={chartHeight} className="overflow-visible">
          {/* Grid lines */}
          {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((ratio) => {
            const value = ratio * maxValue;
            const y = yScale(value);
            return (
              <g key={ratio}>
                <line
                  x1={margin.left}
                  y1={y}
                  x2={margin.left + innerWidth}
                  y2={y}
                  stroke="#E5E7EB"
                  strokeWidth={1}
                  strokeDasharray={ratio === 0 ? '0' : '4,4'}
                />
                <text
                  x={margin.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="text-xs fill-gray-500"
                >
                  {(value / 1000).toFixed(0)}K
                </text>
              </g>
            );
          })}

          {/* Stacked area paths */}
          {categories.map((category) => (
            <path
              key={category.key}
              d={createPath(category.key)}
              fill={category.color}
              fillOpacity={0.7}
              stroke="white"
              strokeWidth={2}
              className="transition-opacity hover:opacity-90"
            />
          ))}

          {/* Vertical line and tooltip on hover */}
          {hoveredIndex !== null && (
            <>
              <line
                x1={xScale(hoveredIndex)}
                y1={margin.top}
                x2={xScale(hoveredIndex)}
                y2={margin.top + innerHeight}
                stroke="#374151"
                strokeWidth={2}
                strokeDasharray="4,4"
                opacity={0.5}
              />
              <rect
                x={xScale(hoveredIndex) - 100}
                y={margin.top + 10}
                width={200}
                height={120}
                fill="white"
                stroke="#E5E7EB"
                strokeWidth={1}
                rx={4}
                className="shadow-lg"
              />
              <text
                x={xScale(hoveredIndex)}
                y={margin.top + 30}
                textAnchor="middle"
                className="text-sm font-semibold fill-gray-900"
              >
                {monthlyData[hoveredIndex].month}
              </text>
              <text
                x={xScale(hoveredIndex)}
                y={margin.top + 50}
                textAnchor="middle"
                className="text-xs fill-gray-600"
              >
                {monthlyData[hoveredIndex].circSupplyPercent.toFixed(1)}% Circulating
              </text>
              <text
                x={xScale(hoveredIndex)}
                y={margin.top + 70}
                textAnchor="middle"
                className="text-xs font-semibold fill-gray-900"
              >
                Total: {monthlyData[hoveredIndex].total.toLocaleString()}M
              </text>
              <text
                x={xScale(hoveredIndex)}
                y={margin.top + 90}
                textAnchor="middle"
                className="text-xs fill-gray-500"
              >
                Period: {monthlyData[hoveredIndex].period} months
              </text>
            </>
          )}

          {/* X-axis labels */}
          {monthlyData.map((point, index) => (
            <g key={index}>
              <line
                x1={xScale(index)}
                y1={margin.top + innerHeight}
                x2={xScale(index)}
                y2={margin.top + innerHeight + 5}
                stroke="#9CA3AF"
                strokeWidth={1}
              />
              <text
                x={xScale(index)}
                y={margin.top + innerHeight + 20}
                textAnchor="middle"
                className="text-xs fill-gray-700"
              >
                {point.month.split('-')[0]}
              </text>
              <text
                x={xScale(index)}
                y={margin.top + innerHeight + 35}
                textAnchor="middle"
                className="text-xs fill-gray-500"
              >
                {point.month.split('-')[1]}
              </text>
            </g>
          ))}

          {/* Interactive hover area */}
          {monthlyData.map((_, index) => {
            const leftX = index === 0 ? margin.left : (xScale(index - 1) + xScale(index)) / 2;
            const rightX = index === monthlyData.length - 1 
              ? margin.left + innerWidth 
              : (xScale(index) + xScale(index + 1)) / 2;
            
            return (
              <rect
                key={index}
                x={leftX}
                y={margin.top}
                width={rightX - leftX}
                height={innerHeight}
                fill="transparent"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              />
            );
          })}

          {/* Axes */}
          <line
            x1={margin.left}
            y1={margin.top + innerHeight}
            x2={margin.left + innerWidth}
            y2={margin.top + innerHeight}
            stroke="#374151"
            strokeWidth={2}
          />
          <line
            x1={margin.left}
            y1={margin.top}
            x2={margin.left}
            y2={margin.top + innerHeight}
            stroke="#374151"
            strokeWidth={2}
          />
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <div key={category.key} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: category.color }}
            />
            <span className="text-sm text-gray-700">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

