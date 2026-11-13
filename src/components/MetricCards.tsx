'use client';

import React from 'react';
import { KPICard } from '../types/dashboard';

interface MetricCardsProps {
  kpis: [KPICard, KPICard, KPICard, KPICard, KPICard];
}

export const MetricCards: React.FC<MetricCardsProps> = ({ kpis }) => {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
      {kpis.map((kpi, idx) => (
        <div
          key={kpi.id || idx}
          className={`bg-white card-rounded p-4 shadow-soft border border-slate-100 flex flex-col justify-between hover:shadow-md smooth-transition ${
            idx === 4 ? 'col-span-2 sm:col-span-1' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 truncate max-w-[120px]">
              {kpi.label}
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                kpi.isGreen
                  ? 'bg-emeraldPill text-emeraldText'
                  : 'bg-rosePill text-roseText'
              }`}
            >
              {kpi.badge}
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-xl xl:text-[22px] font-extrabold text-slate-900 tracking-tight">
                {kpi.value}
              </span>
              <span
                className={`text-xs font-bold ${
                  kpi.isGreen ? 'text-emeraldText' : 'text-roseText'
                }`}
              >
                {kpi.arrow}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 font-medium truncate">
              {kpi.sub}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};
