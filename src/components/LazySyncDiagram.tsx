'use client';

import React from 'react';

export function LazySyncDiagram() {
  return (
    <div className="my-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6 overflow-x-auto">
        <svg width="600" height="220" viewBox="50 0 550 220" className="overflow-visible">
          <defs>
            <marker
              id="arrowhead-sync"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#6B7280" />
            </marker>
          </defs>

          {/* Epoch labels above boxes */}
          <text x="125" y="10" textAnchor="middle" className="text-sm font-semibold fill-gray-900">
            EPOCH N
          </text>
          <text x="325" y="10" textAnchor="middle" className="text-sm font-semibold fill-gray-900">
            EPOCH N+1
          </text>
          <text x="525" y="10" textAnchor="middle" className="text-sm font-semibold fill-gray-900">
            EPOCH N+2
          </text>

          {/* Epoch boxes */}
          <g>
            {/* Epoch N */}
            <rect
              x="50"
              y="20"
              width="150"
              height="50"
              rx="8"
              fill="#FEF3C7"
              stroke="#F59E0B"
              strokeWidth="2"
            />
            <text x="125" y="40" textAnchor="middle" className="text-xs fill-gray-700 font-semibold italic">
              StakePool
            </text>
            <text x="125" y="55" textAnchor="middle" className="text-xs fill-gray-700">
              += rewards
            </text>

            {/* Epoch N+1 */}
            <rect
              x="250"
              y="20"
              width="150"
              height="50"
              rx="8"
              fill="#FEF3C7"
              stroke="#F59E0B"
              strokeWidth="2"
            />
            <text x="325" y="40" textAnchor="middle" className="text-xs fill-gray-700 font-semibold italic">
              StakePool
            </text>
            <text x="325" y="55" textAnchor="middle" className="text-xs fill-gray-700">
              += rewards
            </text>

            {/* Epoch N+2 */}
            <rect
              x="450"
              y="20"
              width="150"
              height="50"
              rx="8"
              fill="#D1FAE5"
              stroke="#10B981"
              strokeWidth="2"
            />
            <text x="525" y="40" textAnchor="middle" className="text-xs fill-gray-700 font-semibold italic">
              StakePool
            </text>
            <text x="525" y="55" textAnchor="middle" className="text-xs fill-gray-700">
              += rewards
            </text>
          </g>

          {/* Arrows between epochs */}
          <line
            x1="200"
            y1="45"
            x2="250"
            y2="45"
            stroke="#6B7280"
            strokeWidth="2"
            markerEnd="url(#arrowhead-sync)"
          />
          <line
            x1="400"
            y1="45"
            x2="450"
            y2="45"
            stroke="#6B7280"
            strokeWidth="2"
            markerEnd="url(#arrowhead-sync)"
          />

          {/* Share pool boxes */}
          <g>
            {/* Share pool N (stale) */}
            <rect
              x="50"
              y="100"
              width="150"
              height="60"
              rx="8"
              fill="#FEE2E2"
              stroke="#EF4444"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <text x="125" y="118" textAnchor="middle" className="text-xs font-semibold fill-gray-900 italic">
              active_shares
            </text>
            <text x="125" y="132" textAnchor="middle" className="text-xs fill-gray-700">
              (stale) no update
            </text>
            <text x="125" y="150" textAnchor="middle" className="text-xs fill-gray-700">
              gap ↑
            </text>

            {/* Share pool N+1 (stale) */}
            <rect
              x="250"
              y="100"
              width="150"
              height="60"
              rx="8"
              fill="#FEE2E2"
              stroke="#EF4444"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <text x="325" y="118" textAnchor="middle" className="text-xs font-semibold fill-gray-900 italic">
              active_shares
            </text>
            <text x="325" y="132" textAnchor="middle" className="text-xs fill-gray-700">
              (stale) no update
            </text>
            <text x="325" y="150" textAnchor="middle" className="text-xs fill-gray-700">
              gap ↑
            </text>

            {/* Share pool N+2 (synced) */}
            <rect
              x="450"
              y="100"
              width="150"
              height="60"
              rx="8"
              fill="#D1FAE5"
              stroke="#10B981"
              strokeWidth="2"
            />
            <text x="525" y="118" textAnchor="middle" className="text-xs font-semibold fill-gray-900 italic">
              active_shares
            </text>
            <text x="525" y="132" textAnchor="middle" className="text-xs fill-gray-700">
              synced!
            </text>
            <text x="525" y="150" textAnchor="middle" className="text-xs fill-gray-700">
              gap → 0
            </text>
          </g>

          {/* Arrows from stake_pool to share_pool */}
          <line
            x1="125"
            y1="70"
            x2="125"
            y2="100"
            stroke="#6B7280"
            strokeWidth="1.5"
            strokeDasharray="2,2"
          />
          <line
            x1="325"
            y1="70"
            x2="325"
            y2="100"
            stroke="#6B7280"
            strokeWidth="1.5"
            strokeDasharray="2,2"
          />
          <line
            x1="525"
            y1="70"
            x2="525"
            y2="100"
            stroke="#10B981"
            strokeWidth="2"
          />

          {/* User action label */}
          <text x="525" y="215" textAnchor="middle" className="text-xs fill-gray-900 italic">
            synchronize_delegation_pool()
          </text>
          {/* Arrow from user action to synced share pool */}
          <line
            x1="525"
            y1="205"
            x2="525"
            y2="160"
            stroke="#10B981"
            strokeWidth="2"
            markerEnd="url(#arrowhead-sync)"
          />
        </svg>
      </div>
    </div>
  );
}

