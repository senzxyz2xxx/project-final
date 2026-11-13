'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SystemTabKey } from '../types/dashboard';

interface HeaderProps {
  title: string;
  brand: string;
  siteName: string;
  currentTab: SystemTabKey;
  editMode: boolean;
  onToggleEditMode: () => void;
  onSelectTab: (tab: SystemTabKey) => void;
  onOpenAI: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  brand,
  siteName,
  editMode,
  onToggleEditMode,
  onOpenAI,
}) => {
  const [dateRange, setDateRange] = useState('Last 7 days');
  const [isDateOpen, setIsDateOpen] = useState(false);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setIsDateOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
      <div>
        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
          <span className="text-[11px] text-slate-400 font-medium">{brand}</span>
          <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-[11px] text-slate-500 font-semibold">{siteName}</span>
          <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-[11px] text-slate-700 font-semibold">{title}</span>
        </div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
          {title}
        </h1>
        <p className="text-xs text-slate-400 font-medium mt-0.5">
          The Nexus Dashboard Framework &bull; Multi-Tenant &bull; Real-time
        </p>
      </div>

      <div className="flex items-center gap-2.5 text-[13px] self-start sm:self-auto">
        {/* Date Filter */}
        <div className="relative inline-block text-left" ref={dateRef}>
          <button
            onClick={() => setIsDateOpen(!isDateOpen)}
            className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 text-slate-700 font-medium hover:bg-slate-50 shadow-sm smooth-transition"
          >
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{dateRange}</span>
            <svg className="w-3.5 h-3.5 text-slate-400 ml-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isDateOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-40 text-slate-700">
              {['Today', 'Last 7 days', 'Last 30 days', 'This Month', 'This Year'].map((range) => (
                <button
                  key={range}
                  onClick={() => { setDateRange(range); setIsDateOpen(false); }}
                  className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 ${
                    dateRange === range ? 'font-semibold text-emerald-600 bg-emerald-50/50' : ''
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Edit Mode Toggle */}
        <button
          onClick={onToggleEditMode}
          title={editMode ? 'ออกจากโหมดแก้ไข' : 'ปรับแต่ง Layout'}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border font-semibold text-[13px] smooth-transition ${
            editMode
              ? 'bg-amber-500 text-white border-amber-500 hover:bg-amber-600'
              : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50 shadow-sm'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span className="hidden md:inline">{editMode ? 'กำลังแก้ไข...' : 'ปรับแต่ง Layout'}</span>
        </button>

        {/* AI Assistant Quick Trigger */}
        <button
          onClick={onOpenAI}
          title="Prompt AI to customize Dashboard"
          className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-xl border border-emerald-200/80 smooth-transition flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-xs font-bold hidden md:inline">AI Prompt</span>
        </button>
      </div>
    </header>
  );
};
