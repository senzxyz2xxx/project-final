'use client';

import React from 'react';
import { FunnelStage } from '../types/dashboard';

interface ConversionFunnelChartProps {
  title: string;
  sub: string;
  conversionRate: string;
  conversionBadge: string;
  stages: FunnelStage[];
}

export const ConversionFunnelChart: React.FC<ConversionFunnelChartProps> = ({
  title,
  sub,
  conversionRate,
  conversionBadge,
  stages,
}) => {
  const [s1, s2, s3, s4] = stages;

  return (
    <div className="lg:col-span-5 xl:col-span-4 bg-white card-rounded p-5 shadow-soft border border-slate-100 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-start justify-between pb-2">
        <div>
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
        </div>
        <div className="text-right">
          <span className="text-[11px] text-slate-400 font-medium">Conversion rate</span>
          <div className="flex items-center justify-end gap-1.5 mt-0.5">
            <span className="text-xl font-extrabold text-slate-900">{conversionRate}</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emeraldPill text-emeraldText">
              {conversionBadge}
            </span>
          </div>
        </div>
      </div>

      {/* Vertical Bars Funnel with intermediate comb pillars */}
      <div className="w-full flex-1 flex flex-col justify-end pt-4 pb-1">
        <div className="h-44 w-full flex items-end justify-between px-1 gap-1">
          {/* Stage 1 */}
          <div className="flex flex-col items-center w-11 group">
            <span className="text-[11px] font-bold text-slate-800 mb-1.5">
              {s1?.percentage || 100}%
            </span>
            <div className="w-2.5 h-36 bg-emerald-500 rounded-full group-hover:scale-105 smooth-transition shadow-sm"></div>
          </div>

          {/* Comb lines between 1 & 2 */}
          <div className="flex items-end gap-1 flex-1 justify-around px-0.5 opacity-60">
            <div className="w-1.5 h-32 bg-slate-200 rounded-full"></div>
            <div className="w-1.5 h-28 bg-slate-200 rounded-full"></div>
            <div className="w-1.5 h-25 bg-slate-200 rounded-full"></div>
            <div className="w-1.5 h-23 bg-slate-200 rounded-full"></div>
            <div className="w-1.5 h-21 bg-slate-200 rounded-full"></div>
          </div>

          {/* Stage 2 */}
          <div className="flex flex-col items-center w-14 group">
            <span className="text-[11px] font-bold text-slate-800 mb-1.5">
              {s2?.percentage || 53}%
            </span>
            <div className="w-2.5 h-20 bg-emerald-500 rounded-full group-hover:scale-105 smooth-transition shadow-sm"></div>
          </div>

          {/* Comb lines between 2 & 3 */}
          <div className="flex items-end gap-1 flex-1 justify-around px-0.5 opacity-60">
            <div className="w-1.5 h-16 bg-slate-200 rounded-full"></div>
            <div className="w-1.5 h-13 bg-slate-200 rounded-full"></div>
            <div className="w-1.5 h-10 bg-slate-200 rounded-full"></div>
            <div className="w-1.5 h-8 bg-slate-200 rounded-full"></div>
          </div>

          {/* Stage 3 */}
          <div className="flex flex-col items-center w-12 group">
            <span className="text-[11px] font-bold text-slate-800 mb-1.5">
              {s3?.percentage || 13}%
            </span>
            <div className="w-2.5 h-7 bg-emerald-500 rounded-full group-hover:scale-105 smooth-transition shadow-sm"></div>
          </div>

          {/* Comb lines between 3 & 4 */}
          <div className="flex items-end gap-1 flex-1 justify-around px-0.5 opacity-60">
            <div className="w-1.5 h-6 bg-slate-200 rounded-full"></div>
            <div className="w-1.5 h-5 bg-slate-200 rounded-full"></div>
          </div>

          {/* Stage 4 */}
          <div className="flex flex-col items-center w-11 group">
            <span className="text-[11px] font-bold text-slate-800 mb-1.5">
              {s4?.percentage || 10}%
            </span>
            <div className="w-2.5 h-5 bg-emerald-500 rounded-full group-hover:scale-105 smooth-transition shadow-sm"></div>
          </div>
        </div>

        {/* Labels below bars */}
        <div className="flex justify-between items-start text-[11px] text-slate-400 font-medium pt-3 border-t border-slate-100 mt-2 px-1">
          <div className="text-center w-12">
            <p className="text-slate-500 font-semibold leading-tight truncate">{s1?.name || 'Leads'}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{s1?.value || 1500}</p>
          </div>
          <div className="text-center w-16">
            <p className="text-slate-500 font-semibold leading-tight truncate">{s2?.name || 'Cart'}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{s2?.value || 800}</p>
          </div>
          <div className="text-center w-14">
            <p className="text-slate-500 font-semibold leading-tight truncate">{s3?.name || 'Checkout'}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{s3?.value || 200}</p>
          </div>
          <div className="text-center w-12">
            <p className="text-slate-500 font-semibold leading-tight truncate">{s4?.name || 'Deals'}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{s4?.value || 150}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
