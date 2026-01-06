'use client';

import React from 'react';

export function GapDiagram() {
  return (
    <div className="my-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6 overflow-x-auto">
        <svg width="620" height="340" viewBox="0 0 620 340" className="overflow-visible">
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

          {/* Row labels on left */}
          <g>
            <text x="75" y="65" textAnchor="end" className="text-xs font-semibold fill-gray-500">
              Total
            </text>
            <text x="75" y="175" textAnchor="end" className="text-xs font-semibold fill-gray-500">
              User
            </text>
            <text x="75" y="258" textAnchor="end" className="text-xs font-semibold fill-gray-500">
              Operator
            </text>
            <text x="75" y="273" textAnchor="end" className="text-xs font-semibold fill-gray-500">
              commission
            </text>
            <text x="75" y="325" textAnchor="end" className="text-xs font-semibold fill-gray-500">
              Price
            </text>
          </g>

          {/* Before Sync */}
          <g>
            <text x="180" y="20" textAnchor="middle" className="text-sm font-semibold fill-gray-900">
              BEFORE SYNC
            </text>
            
            {/* Stake pool */}
            <rect
              x="100"
              y="35"
              width="160"
              height="50"
              rx="6"
              fill="#D1FAE5"
              stroke="#10B981"
              strokeWidth="2"
            />
            <text x="180" y="55" textAnchor="middle" className="text-xs font-semibold fill-gray-900 italic">
              StakePool.active
            </text>
            <text x="180" y="73" textAnchor="middle" className="text-xs fill-gray-700">
              105.5 tokens
            </text>

            {/* Arrow from stake_pool to share_pool */}
            <line
              x1="180"
              y1="85"
              x2="180"
              y2="140"
              stroke="#EF4444"
              strokeWidth="2"
              strokeDasharray="3,3"
            />
            <text x="190" y="105" textAnchor="start" className="text-xs fill-red-600 font-semibold">
              gap = 5.5
            </text>
            <text x="190" y="120" textAnchor="start" className="text-xs fill-gray-600">
              (unsync'd rewards)
            </text>

            {/* Share pool */}
            <rect
              x="100"
              y="140"
              width="160"
              height="75"
              rx="6"
              fill="#FEE2E2"
              stroke="#EF4444"
              strokeWidth="2"
            />
            <text x="180" y="158" textAnchor="middle" className="text-xs font-semibold fill-gray-900 italic">
              active_shares
            </text>
            <text x="180" y="176" textAnchor="middle" className="text-xs fill-gray-700">
              100 tokens (.total_coins)
            </text>
            <text x="180" y="194" textAnchor="middle" className="text-xs fill-gray-700">
              100 shares (.total_shares)
            </text>

            {/* Price - before */}
            <text x="180" y="325" textAnchor="middle" className="text-sm font-semibold fill-gray-700">
              1.0 token/share
            </text>
          </g>

          {/* Arrow to after - from shares_pool to shares_pool */}
          <line
            x1="260"
            y1="175"
            x2="410"
            y2="175"
            stroke="#6B7280"
            strokeWidth="2"
            markerEnd="url(#arrowhead-gap)"
          />
          <text x="335" y="165" textAnchor="middle" className="text-xs fill-gray-600">
            sync
          </text>

          {/* After Sync */}
          <g>
            <text x="490" y="20" textAnchor="middle" className="text-sm font-semibold fill-gray-900">
              AFTER SYNC
            </text>
            
            {/* Stake pool */}
            <rect
              x="410"
              y="35"
              width="160"
              height="50"
              rx="6"
              fill="#D1FAE5"
              stroke="#10B981"
              strokeWidth="2"
            />
            <text x="490" y="55" textAnchor="middle" className="text-xs font-semibold fill-gray-900 italic">
              StakePool.active
            </text>
            <text x="490" y="73" textAnchor="middle" className="text-xs fill-gray-700">
              105.5 tokens
            </text>

            {/* Arrow from stake_pool to share_pool */}
            <line
              x1="490"
              y1="85"
              x2="490"
              y2="140"
              stroke="#10B981"
              strokeWidth="2"
            />
            <text x="500" y="110" textAnchor="start" className="text-xs fill-green-600 font-semibold">
              gap = 0
            </text>

            {/* Share pool */}
            <rect
              x="410"
              y="140"
              width="160"
              height="75"
              rx="6"
              fill="#D1FAE5"
              stroke="#10B981"
              strokeWidth="2"
            />
            <text x="490" y="158" textAnchor="middle" className="text-xs font-semibold fill-gray-900 italic">
              active_shares
            </text>
            <text x="490" y="176" textAnchor="middle" className="text-xs fill-gray-700">
              105 tokens (.total_coins)
            </text>
            <text x="490" y="194" textAnchor="middle" className="text-xs fill-gray-700">
              100 shares (.total_shares)
            </text>

            {/* Arrow to operator */}
            <line
              x1="490"
              y1="215"
              x2="490"
              y2="235"
              stroke="#8B5CF6"
              strokeWidth="2"
            />

            {/* Operator box - after */}
            <rect
              x="410"
              y="235"
              width="160"
              height="60"
              rx="6"
              fill="#EDE9FE"
              stroke="#8B5CF6"
              strokeWidth="2"
            />
            <text x="490" y="253" textAnchor="middle" className="text-xs font-semibold fill-gray-900 italic">
              active_shares
            </text>
            <text x="490" y="271" textAnchor="middle" className="text-xs fill-gray-700">
              +0.5 tokens
            </text>
            <text x="490" y="286" textAnchor="middle" className="text-xs fill-gray-700">
              +0.476 shares
            </text>

            {/* Price - after */}
            <text x="490" y="325" textAnchor="middle" className="text-sm font-semibold fill-green-600">
              1.05 token/share
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
