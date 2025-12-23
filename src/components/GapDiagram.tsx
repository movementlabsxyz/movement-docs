'use client';

import React from 'react';

export function GapDiagram() {
  return (
    <div className="my-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6 overflow-x-auto">
        <svg width="450" height="210" viewBox="0 0 450 210" className="overflow-visible">
          <defs>
            <marker
              id="arrowhead-gap"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#6B7280" />
            </marker>
          </defs>

          {/* Before Sync */}
          <g>
            <text x="110" y="20" textAnchor="middle" className="text-sm font-semibold fill-gray-900">
              BEFORE SYNC
            </text>
            
            {/* Stake pool */}
            <rect
              x="50"
              y="35"
              width="120"
              height="50"
              rx="6"
              fill="#D1FAE5"
              stroke="#10B981"
              strokeWidth="2"
            />
            <text x="110" y="55" textAnchor="middle" className="text-xs font-semibold fill-gray-900 italic">
              StakePool
            </text>
            <text x="110" y="73" textAnchor="middle" className="text-xs fill-gray-700">
              105,000 TOKEN
            </text>

            {/* Arrow from stake_pool to share_pool */}
            <line
              x1="110"
              y1="85"
              x2="110"
              y2="135"
              stroke="#EF4444"
              strokeWidth="2"
              strokeDasharray="3,3"
            />
            <text x="120" y="105" textAnchor="start" className="text-xs fill-red-600 font-semibold">
              gap = 5,000
            </text>
            <text x="120" y="120" textAnchor="start" className="text-xs fill-gray-600">
              (unsync'd rewards)
            </text>

            {/* Share pool */}
            <rect
              x="50"
              y="135"
              width="120"
              height="60"
              rx="6"
              fill="#FEE2E2"
              stroke="#EF4444"
              strokeWidth="2"
            />
            <text x="110" y="155" textAnchor="middle" className="text-xs font-semibold fill-gray-900 italic">
              active_shares
            </text>
            <text x="110" y="173" textAnchor="middle" className="text-xs fill-gray-700">
              100,000 SHARES
            </text>
          </g>

          {/* Arrow to after - from shares_pool to shares_pool */}
          <line
            x1="170"
            y1="160"
            x2="300"
            y2="160"
            stroke="#6B7280"
            strokeWidth="2"
            markerEnd="url(#arrowhead-gap)"
          />
          <text x="235" y="150" textAnchor="middle" className="text-xs fill-gray-600">
            sync
          </text>

          {/* After Sync */}
          <g>
            <text x="360" y="20" textAnchor="middle" className="text-sm font-semibold fill-gray-900">
              AFTER SYNC
            </text>
            
            {/* Stake pool */}
            <rect
              x="300"
              y="35"
              width="120"
              height="50"
              rx="6"
              fill="#D1FAE5"
              stroke="#10B981"
              strokeWidth="2"
            />
            <text x="360" y="55" textAnchor="middle" className="text-xs font-semibold fill-gray-900 italic">
              StakePool
            </text>
            <text x="360" y="73" textAnchor="middle" className="text-xs fill-gray-700">
              105,000 TOKEN
            </text>

            {/* Arrow from stake_pool to share_pool */}
            <line
              x1="360"
              y1="85"
              x2="360"
              y2="135"
              stroke="#10B981"
              strokeWidth="2"
            />
            <text x="370" y="105" textAnchor="start" className="text-xs fill-green-600 font-semibold">
              gap = 0
            </text>

            {/* Share pool */}
            <rect
              x="300"
              y="135"
              width="120"
              height="60"
              rx="6"
              fill="#D1FAE5"
              stroke="#10B981"
              strokeWidth="2"
            />
            <text x="360" y="155" textAnchor="middle" className="text-xs font-semibold fill-gray-900 italic">
              active_shares
            </text>
            <text x="360" y="173" textAnchor="middle" className="text-xs fill-gray-700">
              100,000 SHARES
            </text>
            <text x="360" y="185" textAnchor="middle" className="text-xs fill-gray-700">
              + commission
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

