'use client';

import React from 'react';
import { TrafficSourceItem } from '../types/dashboard';

interface TrafficSourcesCardProps {
  title: string;
  spend: string;
  cpa: string;
  impressions: string;
  clicks: string;
  sources: TrafficSourceItem[];
}

export const TrafficSourcesCard: React.FC<TrafficSourcesCardProps> = ({
  title,
  spend,
  cpa,
  impressions,
  clicks,
  sources,
}) => {
  const col1 = sources.slice(0, Math.ceil(sources.length / 2));
  const col2 = sources.slice(Math.ceil(sources.length / 2));

  return (
    <div className="lg:col-span-5 bg-white card-rounded p-5 shadow-soft border border-slate-100 flex flex-col justify-between">
      <h2 className="text-sm font-bold text-slate-900">{title}</h2>

      {/* Top 4 Stats */}
      <div className="grid grid-cols-4 gap-2 pt-1 pb-3 text-left">
        <div>
          <p className="text-[10.5px] text-slate-400 font-medium truncate">Marketing Spend</p>
          <p className="text-xs font-bold text-slate-900 mt-0.5 truncate">{spend}</p>
        </div>
        <div>
          <p className="text-[10.5px] text-slate-400 font-medium truncate">CPA / Avg.</p>
          <p className="text-xs font-bold text-slate-900 mt-0.5 truncate">{cpa}</p>
        </div>
        <div>
          <p className="text-[10.5px] text-slate-400 font-medium truncate">Impressions</p>
          <p className="text-xs font-bold text-slate-900 mt-0.5 truncate">{impressions}</p>
        </div>
        <div>
          <p className="text-[10.5px] text-slate-400 font-medium truncate">Clicks / Ops</p>
          <p className="text-xs font-bold text-slate-900 mt-0.5 truncate">{clicks}</p>
        </div>
      </div>

      {/* Segmented Horizontal Pill Progress Bar */}
      <div className="w-full flex items-center gap-1 my-1">
        {sources.map((src, i) => (
          <div
            key={i}
            className={`h-2 rounded-full ${src.color} transition-all duration-500`}
            style={{ width: `${src.widthPercent}%` }}
            title={`${src.name}: ${src.count}`}
          ></div>
        ))}
      </div>

      {/* 2-Column Sources Breakdown */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 pt-3 text-[12px] border-t border-slate-100 mt-1">
        <div className="space-y-2">
          {col1.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                <span className="text-slate-600 font-medium truncate max-w-[110px]">{item.name}</span>
              </div>
              <span className="font-bold text-slate-900">{item.count.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {col2.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                <span className="text-slate-600 font-medium truncate max-w-[110px]">{item.name}</span>
              </div>
              <span className="font-bold text-slate-900">{item.count.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
