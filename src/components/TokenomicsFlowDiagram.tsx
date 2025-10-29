'use client';

import React from 'react';

export function TokenomicsFlowDiagram() {
  return (
    <div className="my-8">
      <div className="bg-white rounded-lg border border-gray-200 p-4 overflow-x-auto">
        <svg width="650" height="370" viewBox="0 0 650 370" className="overflow-visible">
          {/* Definitions for arrows */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#6B7280" />
            </marker>
          </defs>

          {/* Title */}
          <text x="325" y="30" textAnchor="middle" className="text-lg font-semibold fill-gray-900">
            Fee and Staking reward flow
          </text>

          {/* Box 1: Users/Transactions - Fees Collection */}
          <rect
            x="20"
            y="70"
            width="200"
            height="100"
            rx="8"
            fill="#E0E7FF"
            stroke="#6366F1"
            strokeWidth="2"
          />
          <text x="120" y="105" textAnchor="middle" className="text-sm font-semibold fill-gray-900">
            Users & Transactions
          </text>
          <text x="120" y="130" textAnchor="middle" className="text-xs fill-gray-700">
            Pay transaction fees
          </text>

          {/* Arrow from Users to Reward and Gas Pool */}
          <line
            x1="220"
            y1="120"
            x2="420"
            y2="120"
            stroke="#6B7280"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <text x="320" y="110" textAnchor="middle" className="text-xs fill-gray-600">
            Fees
          </text>

          {/* Box: Reward and Gas Pool */}
          <rect
            x="420"
            y="70"
            width="200"
            height="100"
            rx="8"
            fill="#D1FAE5"
            stroke="#10B981"
            strokeWidth="2"
          />
          <text x="520" y="105" textAnchor="middle" className="text-sm font-semibold fill-gray-900">
            Reward-and-Gas-Pool
          </text>
          <text x="520" y="130" textAnchor="middle" className="text-xs fill-gray-700">
            Fee collection & staking rewards
          </text>
          <text x="520" y="150" textAnchor="middle" className="text-xs fill-gray-700">
            Governed by protocol
          </text>

          {/* Arrow from Reward and Gas Pool to Stakers */}
          <line
            x1="520"
            y1="170"
            x2="520"
            y2="240"
            stroke="#6B7280"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <text x="550" y="205" textAnchor="middle" className="text-xs fill-gray-600">
            Rewards
          </text>

          {/* Box 4: Stakers */}
          <rect
            x="420"
            y="240"
            width="200"
            height="100"
            rx="8"
            fill="#FEF3C7"
            stroke="#F59E0B"
            strokeWidth="2"
          />
          <text x="520" y="275" textAnchor="middle" className="text-sm font-semibold fill-gray-900">
            Stakers
          </text>
          <text x="520" y="300" textAnchor="middle" className="text-xs fill-gray-700">
            Receive staking rewards
          </text>

          {/* Box 5: Staking Reward Treasury */}
          <rect
            x="20"
            y="240"
            width="200"
            height="100"
            rx="8"
            fill="#EDE9FE"
            stroke="#8B5CF6"
            strokeWidth="2"
          />
          <text x="120" y="275" textAnchor="middle" className="text-sm font-semibold fill-gray-900">
            Staking Reward Treasury
          </text>
          <text x="120" y="300" textAnchor="middle" className="text-xs fill-gray-700">
            Delegates stake
          </text>

          {/* Arrow from Treasury to Reward and Gas Pool (entering left side) */}
          <line
            x1="220"
            y1="290"
            x2="420"
            y2="120"
            stroke="#6B7280"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <text 
            x="300" 
            y="205" 
            textAnchor="middle" 
            className="text-xs fill-gray-600"
            transform="rotate(-40.4 300 205)"
          >
            regular refill
          </text>

          {/* Arrow from Stakers back to Treasury (rewards loop) */}
          <line
            x1="420"
            y1="290"
            x2="220"
            y2="290"
            stroke="#6B7280"
            strokeWidth="2"
            strokeDasharray="5,5"
            markerEnd="url(#arrowhead)"
          />
          <text x="320" y="305" textAnchor="middle" className="text-xs fill-gray-600">
            Rewards returned to treasury
          </text>
        </svg>
      </div>
    </div>
  );
}

