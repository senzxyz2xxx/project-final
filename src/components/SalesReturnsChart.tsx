'use client';

import React, { useState } from 'react';
import { ChartDayData } from '../types/dashboard';

interface SalesReturnsChartProps {
  title: string;
  sub: string;
  legend1: string;
  legendVal1: string;
  legendBadge1: string;
  legend2: string;
  legendVal2: string;
  legendBadge2: string;
  days: ChartDayData[];
}

export const SalesReturnsChart: React.FC<SalesReturnsChartProps> = ({
  title,
  sub,
  legend1,
  legendVal1,
  legendBadge1,
  legend2,
  legendVal2,
  legendBadge2,
  days,
}) => {
  // Default hover is on Friday (index 4) matching the uploaded image
  const [activeIdx, setActiveIdx] = useState<number>(4);

  // Coordinates for the 7 points:
  // Mon, Tue, Wed, Thu, Fri, Sat, Sun
  const points = [
    { x: 0, y: 135 },
    { x: 116, y: 125 },
    { x: 233, y: 140 },
    { x: 350, y: 110 },
    { x: 470, y: 55 }, // Fri
    { x: 583, y: 65 },
    { x: 700, y: 88 },
  ];

  const currentPoint = points[activeIdx] || points[4];
  const activeDay = days[activeIdx] || days[4];

  const percentX = (currentPoint.x / 700) * 100;
  const percentY = (currentPoint.y / 200) * 100;

  return (
    <div className="lg:col-span-7 xl:col-span-8 bg-white card-rounded p-5 shadow-soft border border-slate-100 flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-2">
        <div>
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
        </div>
        {/* Header Stats */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5 text-[11px] text-slate-500 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>{legend1}</span>
            </div>
            <div className="flex items-center justify-end gap-1.5 mt-0.5">
              <span className="text-xl font-extrabold text-slate-900">{legendVal1}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emeraldPill text-emeraldText">
                {legendBadge1}
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5 text-[11px] text-slate-500 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
              <span>{legend2}</span>
            </div>
            <div className="flex items-center justify-end gap-1.5 mt-0.5">
              <span className="text-xl font-extrabold text-slate-900">{legendVal2}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rosePill text-roseText">
                {legendBadge2}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive SVG Chart Canvas */}
      <div className="relative w-full h-64 mt-3 select-none">
        {/* Y-Axis Labels & Dashed Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[11px] text-slate-400 font-medium pr-2">
          <div className="flex items-center w-full">
            <span className="w-8 shrink-0">10k</span>
            <div className="w-full border-b border-dashed border-slate-100 ml-2"></div>
          </div>
          <div className="flex items-center w-full">
            <span className="w-8 shrink-0">5k</span>
            <div className="w-full border-b border-dashed border-slate-100 ml-2"></div>
          </div>
          <div className="flex items-center w-full">
            <span className="w-8 shrink-0">1k</span>
            <div className="w-full border-b border-dashed border-slate-100 ml-2"></div>
          </div>
          <div className="flex items-center w-full">
            <span className="w-8 shrink-0">500</span>
            <div className="w-full border-b border-dashed border-slate-100 ml-2"></div>
          </div>
          <div className="flex items-center w-full">
            <span className="w-8 shrink-0">0</span>
            <div className="w-full border-b border-slate-100 ml-2"></div>
          </div>
        </div>

        {/* SVG Drawing Canvas */}
        <div className="absolute inset-0 left-8 bottom-6">
          <svg viewBox="0 0 700 200" preserveAspectRatio="none" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="chartSalesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.22" />
                <stop offset="85%" stopColor="#10b981" stopOpacity="0.01" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Gradient Area Fill */}
            <path
              d="M 0 135 C 60 145, 90 120, 150 128 C 210 136, 260 152, 330 115 C 380 90, 420 115, 470 55 C 520 75, 590 55, 640 85 C 670 95, 690 90, 700 88 L 700 200 L 0 200 Z"
              fill="url(#chartSalesGrad)"
            />

            {/* Returns Secondary Gray Curve */}
            <path
              d="M 0 165 C 50 160, 110 170, 170 162 C 230 155, 290 168, 350 160 C 410 152, 470 165, 530 158 C 590 152, 650 162, 700 159"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Emerald Main Curve */}
            <path
              d="M 0 135 C 60 145, 90 120, 150 128 C 210 136, 260 152, 330 115 C 380 90, 420 115, 470 55 C 520 75, 590 55, 640 85 C 670 95, 690 90, 700 88"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.6"
              strokeLinecap="round"
            />

            {/* Active Point Pulsing Glow */}
            <circle
              cx={currentPoint.x}
              cy={currentPoint.y}
              r="8"
              fill="#10b981"
              fillOpacity="0.25"
              className="animate-pulse"
            />
            {/* Active Point Pin */}
            <circle
              cx={currentPoint.x}
              cy={currentPoint.y}
              r="4.5"
              fill="#10b981"
              stroke="#ffffff"
              strokeWidth="2"
              className="shadow cursor-pointer"
            />

            {/* Hover Targets for each day */}
            {points.map((pt, i) => (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r="12"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setActiveIdx(i)}
              />
            ))}
          </svg>

          {/* Floating Tooltip Box matching image */}
          <div
            style={{ left: `${percentX}%`, top: `${percentY}%` }}
            className="absolute -translate-x-1/2 -translate-y-full bg-white rounded-xl px-3 py-2 shadow-tooltip border border-slate-100 flex flex-col items-center pointer-events-none z-20 transition-all duration-150"
          >
            <span className="text-[10px] text-slate-400 font-medium tracking-tight">
              {activeDay?.date || '14 March 2:39 PM'}
            </span>
            <span className="text-xs font-extrabold text-slate-900 mt-0.5 whitespace-nowrap">
              {activeDay?.salesFormatted || '4,782'}
            </span>
            <div className="w-2.5 h-2.5 bg-white border-r border-b border-slate-100 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2"></div>
          </div>
        </div>

        {/* X-Axis Labels */}
        <div className="absolute bottom-0 left-8 right-0 flex justify-between text-[11px] font-medium text-slate-400 pt-2 border-t border-slate-100">
          {days.map((item, index) => (
            <button
              key={item.day}
              onClick={() => setActiveIdx(index)}
              className={`smooth-transition px-1.5 py-0.5 rounded ${
                activeIdx === index
                  ? 'font-extrabold text-slate-900 bg-slate-100 shadow-sm'
                  : 'hover:text-slate-700'
              }`}
            >
              {item.day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
