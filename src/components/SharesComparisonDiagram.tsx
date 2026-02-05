'use client';

import React from 'react';

export function SharesComparisonDiagram() {
  return (
    <div className="my-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6 overflow-x-auto">
        <svg width="620" height="180" viewBox="0 0 620 180" className="overflow-visible">
          <defs>
            <marker
              id="arrowhead-shares"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#6B7280" />
            </marker>
          </defs>

          {/* Before Rewards */}
          <g>
            <text x="150" y="30" textAnchor="middle" className="text-sm font-semibold fill-gray-900">
              BEFORE REWARDS
            </text>
            
            <rect
              x="50"
              y="50"
              width="200"
              height="110"
              rx="8"
              fill="#E0E7FF"
              stroke="#6366F1"
              strokeWidth="2"
            />
            <text x="150" y="80" textAnchor="middle" className="text-sm font-semibold fill-gray-900">
              Delegator A
            </text>
            <text x="150" y="105" textAnchor="middle" className="text-xs fill-gray-700">
              100 shares
            </text>
            <text x="150" y="120" textAnchor="middle" className="text-xs fill-gray-700">
              × 1.00 price
            </text>
            <line x1="70" y1="130" x2="230" y2="130" stroke="#6B7280" strokeWidth="1" />
            <text x="150" y="145" textAnchor="middle" className="text-xs font-semibold fill-gray-900">
              = 100 TOKEN
            </text>
          </g>

          {/* Arrow */}
          <line
            x1="250"
            y1="105"
            x2="380"
            y2="105"
            stroke="#6B7280"
            strokeWidth="2"
            markerEnd="url(#arrowhead-shares)"
          />
          <text x="315" y="85" textAnchor="middle" className="text-xs fill-gray-600">
              +5% rewards
            </text>
          <text x="315" y="97" textAnchor="middle" className="text-xs fill-gray-500">
              (after commission)
            </text>

          {/* After Rewards */}
          <g>
            <text x="480" y="30" textAnchor="middle" className="text-sm font-semibold fill-gray-900">
              AFTER REWARDS
            </text>
            
            <rect
              x="380"
              y="50"
              width="200"
              height="110"
              rx="8"
              fill="#D1FAE5"
              stroke="#10B981"
              strokeWidth="2"
            />
            <text x="480" y="80" textAnchor="middle" className="text-sm font-semibold fill-gray-900">
              Delegator A
            </text>
            <text x="480" y="105" textAnchor="middle" className="text-xs fill-gray-700">
              100 shares (same!)
            </text>
            <text x="480" y="120" textAnchor="middle" className="text-xs fill-gray-700">
              × 1.05 price (increased!)
            </text>
            <line x1="400" y1="130" x2="560" y2="130" stroke="#6B7280" strokeWidth="1" />
            <text x="480" y="145" textAnchor="middle" className="text-xs font-semibold fill-gray-900">
              = 105 TOKEN (+5 TOKEN)
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

