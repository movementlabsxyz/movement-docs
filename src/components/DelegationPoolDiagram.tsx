'use client';

import React from 'react';

export function DelegationPoolDiagram() {
  return (
    <div className="my-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6 overflow-x-auto">
        <svg width="550" height="280" viewBox="0 0 550 280" className="overflow-visible">
          <defs>
            <marker
              id="arrowhead-delegation"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#6B7280" />
            </marker>
          </defs>

          {/* Address label */}
          <text x="275" y="20" textAnchor="middle" className="text-xs fill-gray-500 italic">
            Same address: 0x1234...
          </text>

          {/* DelegationPool Box */}
          <rect
            x="20"
            y="35"
            width="240"
            height="230"
            rx="8"
            fill="#EDE9FE"
            stroke="#8B5CF6"
            strokeWidth="2"
          />
          <text x="140" y="60" textAnchor="middle" className="text-sm font-semibold fill-gray-900">
            DelegationPool
          </text>
          <text x="40" y="85" textAnchor="start" className="text-xs fill-gray-700">
            Tracks ownership via shares
          </text>

          {/* active_shares box inside DelegationPool */}
          <rect
            x="40"
            y="100"
            width="200"
            height="70"
            rx="6"
            fill="#C4B5FD"
            stroke="#7C3AED"
            strokeWidth="1.5"
          />
          <text x="140" y="120" textAnchor="middle" className="text-xs font-semibold fill-gray-900 italic">
            active_shares
          </text>
          <text x="140" y="135" textAnchor="middle" className="text-xs fill-gray-700">
            (pool_u64::Pool)
          </text>
          <text x="60" y="155" textAnchor="start" className="text-xs fill-gray-600">
            total_coins, total_shares
          </text>

          {/* inactive_shares box inside DelegationPool */}
          <rect
            x="40"
            y="180"
            width="200"
            height="70"
            rx="6"
            fill="#C4B5FD"
            stroke="#7C3AED"
            strokeWidth="1.5"
          />
          <text x="140" y="200" textAnchor="middle" className="text-xs font-semibold fill-gray-900 italic">
            inactive_shares
          </text>
          <text x="140" y="215" textAnchor="middle" className="text-xs fill-gray-700">
            (Table of pool_u64::Pool)
          </text>
          <text x="60" y="235" textAnchor="start" className="text-xs fill-gray-600">
            per lockup cycle
          </text>

          {/* StakePool Box */}
          <rect
            x="290"
            y="35"
            width="240"
            height="230"
            rx="8"
            fill="#D1FAE5"
            stroke="#10B981"
            strokeWidth="2"
          />
          <text x="410" y="60" textAnchor="middle" className="text-sm font-semibold fill-gray-900">
            StakePool
          </text>
          <text x="310" y="85" textAnchor="start" className="text-xs fill-gray-700">
            Holds actual TOKEN
          </text>
          <text x="310" y="110" textAnchor="start" className="text-xs fill-gray-700">
            • active: 100,000
          </text>
          <text x="310" y="130" textAnchor="start" className="text-xs fill-gray-700">
            • pending_active: 5,000
          </text>
          <text x="310" y="150" textAnchor="start" className="text-xs fill-gray-700">
            • pending_inactive: 10,000
          </text>
          <text x="310" y="170" textAnchor="start" className="text-xs fill-gray-700">
            • inactive: 0
          </text>

          {/* Arrow from active_shares to StakePool */}
          <line
            x1="240"
            y1="135"
            x2="290"
            y2="120"
            stroke="#6B7280"
            strokeWidth="1.5"
            strokeDasharray="3,3"
          />
          <text x="265" y="115" textAnchor="middle" className="text-xs fill-gray-500">
            tracks
          </text>

          {/* Arrow from inactive_shares to StakePool */}
          <line
            x1="240"
            y1="215"
            x2="290"
            y2="150"
            stroke="#6B7280"
            strokeWidth="1.5"
            strokeDasharray="3,3"
          />
        </svg>
      </div>
    </div>
  );
}

