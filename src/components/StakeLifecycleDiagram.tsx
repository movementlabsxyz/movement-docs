'use client';

import React from 'react';

export function StakeLifecycleDiagram() {
  return (
    <div className="my-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6 overflow-x-auto">
        <svg width="620" height="200" viewBox="0 0 620 200" className="overflow-visible">
          <defs>
            <marker
              id="arrowhead-lifecycle"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#6B7280" />
            </marker>
          </defs>

          {/* add_stake() label */}
          <text x="70" y="20" textAnchor="middle" className="text-xs fill-gray-600 font-mono">
            add_stake()
          </text>
          <line
            x1="70"
            y1="25"
            x2="70"
            y2="60"
            stroke="#6B7280"
            strokeWidth="1.5"
          />
          <polygon
            points="65,60 75,60 70,70"
            fill="#6B7280"
          />

          {/* State boxes */}
          <g>
            {/* Pending Active */}
            <rect
              x="20"
              y="80"
              width="100"
              height="60"
              rx="6"
              fill="#E0E7FF"
              stroke="#6366F1"
              strokeWidth="2"
            />
            <text x="70" y="105" textAnchor="middle" className="text-xs font-semibold fill-gray-900">
              pending
            </text>
            <text x="70" y="120" textAnchor="middle" className="text-xs font-semibold fill-gray-900">
              active
            </text>
            <text x="70" y="155" textAnchor="middle" className="text-xs fill-gray-700">
              Waiting for
            </text>
            <text x="70" y="170" textAnchor="middle" className="text-xs fill-gray-700">
              next epoch
            </text>

            {/* Active */}
            <rect
              x="180"
              y="80"
              width="100"
              height="60"
              rx="6"
              fill="#D1FAE5"
              stroke="#10B981"
              strokeWidth="2"
            />
            <text x="230" y="105" textAnchor="middle" className="text-xs font-semibold fill-gray-900">
              active
            </text>
            <text x="230" y="155" textAnchor="middle" className="text-xs fill-gray-700">
              Earning
            </text>
            <text x="230" y="170" textAnchor="middle" className="text-xs fill-gray-700">
              rewards
            </text>

            {/* Pending Inactive */}
            <rect
              x="340"
              y="80"
              width="100"
              height="60"
              rx="6"
              fill="#FEF3C7"
              stroke="#F59E0B"
              strokeWidth="2"
            />
            <text x="390" y="105" textAnchor="middle" className="text-xs font-semibold fill-gray-900">
              pending
            </text>
            <text x="390" y="120" textAnchor="middle" className="text-xs font-semibold fill-gray-900">
              inactive
            </text>
            <text x="390" y="155" textAnchor="middle" className="text-xs fill-gray-700">
              Still earning!
            </text>
            <text x="390" y="170" textAnchor="middle" className="text-xs fill-gray-700">
              (until lockup)
            </text>

            {/* Inactive */}
            <rect
              x="500"
              y="80"
              width="100"
              height="60"
              rx="6"
              fill="#F3F4F6"
              stroke="#9CA3AF"
              strokeWidth="2"
            />
            <text x="550" y="105" textAnchor="middle" className="text-xs font-semibold fill-gray-900">
              inactive
            </text>
            <text x="550" y="155" textAnchor="middle" className="text-xs fill-gray-700">
              Ready to
            </text>
            <text x="550" y="170" textAnchor="middle" className="text-xs fill-gray-700">
              withdraw
            </text>
          </g>

          {/* Arrows between states */}
          <line
            x1="120"
            y1="110"
            x2="180"
            y2="110"
            stroke="#6B7280"
            strokeWidth="2"
            markerEnd="url(#arrowhead-lifecycle)"
          />
          <text x="150" y="70" textAnchor="middle" className="text-xs fill-gray-600 font-mono">
            epoch ends
          </text>

          <line
            x1="280"
            y1="110"
            x2="340"
            y2="110"
            stroke="#6B7280"
            strokeWidth="2"
            markerEnd="url(#arrowhead-lifecycle)"
          />
          <text x="310" y="70" textAnchor="middle" className="text-xs fill-gray-600 font-mono">
            unlock()
          </text>

          <line
            x1="440"
            y1="110"
            x2="500"
            y2="110"
            stroke="#6B7280"
            strokeWidth="2"
            markerEnd="url(#arrowhead-lifecycle)"
          />
          <text x="470" y="70" textAnchor="middle" className="text-xs fill-gray-600 font-mono">
            lockup ends
          </text>

        </svg>
      </div>
    </div>
  );
}

