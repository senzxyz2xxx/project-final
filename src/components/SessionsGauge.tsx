'use client';

import React from 'react';

interface SessionsGaugeProps {
  title: string;
  uniqueUsers: string;
  uniqueLabel: string;
  totalSessions: string;
  totalLabel: string;
  gaugePercentage?: number;
}

export const SessionsGauge: React.FC<SessionsGaugeProps> = ({
  title,
  uniqueUsers,
  uniqueLabel,
  totalSessions,
  totalLabel,
  gaugePercentage = 78,
}) => {
  // SVG coordinates for arc:
  // Center is (100, 100), radius is 80.
  // 0% is (20, 100). 100% is (180, 100).
  // Angle for gaugePercentage (0 to 100):
  const angle = Math.PI - (gaugePercentage / 100) * Math.PI;
  const endX = 100 + 80 * Math.cos(angle);
  const endY = 100 - 80 * Math.sin(angle);

  const greenArcPath = `M 20 100 A 80 80 0 0 1 ${endX.toFixed(1)} ${endY.toFixed(1)}`;

  return (
    <div className="lg:col-span-3 bg-white card-rounded p-5 shadow-soft border border-slate-100 flex flex-col justify-between">
      <h2 className="text-sm font-bold text-slate-900">{title}</h2>

      {/* Radial Gauge Graphic */}
      <div className="relative flex flex-col items-center justify-center my-auto py-3">
        <svg className="w-48 h-28 overflow-visible" viewBox="0 0 200 110">
          {/* Background grey arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#eef2f6"
            strokeWidth="15"
            strokeLinecap="round"
          />
          {/* Green Progress arc */}
          <path
            d={greenArcPath}
            fill="none"
            stroke="#10b981"
            strokeWidth="15"
            strokeLinecap="round"
            className="smooth-transition"
          />
        </svg>

        {/* Center Metric inside gauge */}
        <div className="text-center -mt-10">
          <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {uniqueUsers}
          </span>
          <p className="text-[11px] text-slate-400 font-medium">{uniqueLabel}</p>
        </div>
      </div>

      {/* Bottom Metric */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
        <span className="text-slate-400 font-medium">{totalLabel}</span>
        <span className="font-extrabold text-slate-900 text-sm">{totalSessions}</span>
      </div>
    </div>
  );
};
