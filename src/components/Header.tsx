'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SystemTabKey } from '../types/dashboard';

interface HeaderProps {
  title: string;
  brand: string;
  currentTab: SystemTabKey;
  onSelectTab: (tab: SystemTabKey) => void;
  onOpenAI: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  brand,
  currentTab,
  onSelectTab,
  onOpenAI,
}) => {
  const [dateRange, setDateRange] = useState('Last 7 days');
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);

  const dateRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setIsDateOpen(false);
      }
      if (brandRef.current && !brandRef.current.contains(event.target as Node)) {
        setIsBrandOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
      <div>
        <h1 className="text-2xl lg:text-[28px] font-extrabold text-slate-900 tracking-tight">
          {title}
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          The Nexus Dashboard Framework • รองรับ Multi-Tenant และ Real-time Streams
        </p>
      </div>

      {/* Top Right Controls Matching Image */}
      <div className="flex items-center gap-2.5 text-[13px] self-start sm:self-auto">
        {/* Date Filter */}
        <div className="relative inline-block text-left" ref={dateRef}>
          <button
            onClick={() => setIsDateOpen(!isDateOpen)}
            className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 text-slate-700 font-medium hover:bg-slate-50 shadow-sm smooth-transition"
          >
            <svg
              className="w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{dateRange}</span>
            <svg
              className="w-3.5 h-3.5 text-slate-400 ml-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isDateOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-40 text-slate-700">
              {['Today', 'Last 7 days', 'Last 30 days', 'This Month', 'This Year'].map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setDateRange(range);
                    setIsDateOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 ${
                    dateRange === range
                      ? 'font-semibold text-emerald-600 bg-emerald-50/50'
                      : ''
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Organization / System Selector Dropdown */}
        <div className="relative inline-block text-left" ref={brandRef}>
          <button
            onClick={() => setIsBrandOpen(!isBrandOpen)}
            className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 text-slate-700 font-medium hover:bg-slate-50 shadow-sm smooth-transition"
          >
            <span className="font-semibold text-slate-800">{brand}</span>
            <svg
              className="w-3.5 h-3.5 text-slate-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isBrandOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-40 text-slate-700">
              <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                เมนูภาพรวม
              </div>
              <button
                onClick={() => {
                  onSelectTab('overview');
                  setIsBrandOpen(false);
                }}
                className={`w-full text-left flex items-center justify-between px-3.5 py-2 hover:bg-slate-50 font-medium ${
                  currentTab === 'overview' ? 'text-emerald-700 bg-emerald-50/50' : 'text-slate-800'
                }`}
              >
                <span>🛒 Redondo Brand (ภาพรวม)</span>
                {currentTab === 'overview' && (
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    Active
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  onSelectTab('warroom');
                  setIsBrandOpen(false);
                }}
                className={`w-full text-left flex items-center justify-between px-3.5 py-2 hover:bg-slate-50 font-medium ${
                  currentTab === 'warroom' ? 'text-emerald-700 bg-emerald-50/50' : 'text-slate-800'
                }`}
              >
                <span>🚨 War Room (รวม 7 ไซต์งาน)</span>
                {currentTab === 'warroom' && (
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    Active
                  </span>
                )}
              </button>

              <div className="mt-2 pt-2 border-t border-slate-100 px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                ระบบย่อย (Sub-systems)
              </div>
              <button
                onClick={() => {
                  onSelectTab('finance');
                  setIsBrandOpen(false);
                }}
                className={`w-full text-left block px-3.5 py-2 hover:bg-slate-50 ${
                  currentTab === 'finance' ? 'text-emerald-700 font-semibold bg-emerald-50/40' : 'text-slate-700'
                }`}
              >
                💰 ระบบการเงิน (Finance)
              </button>
              <button
                onClick={() => {
                  onSelectTab('attendance');
                  setIsBrandOpen(false);
                }}
                className={`w-full text-left block px-3.5 py-2 hover:bg-slate-50 ${
                  currentTab === 'attendance' ? 'text-emerald-700 font-semibold bg-emerald-50/40' : 'text-slate-700'
                }`}
              >
                ⏱️ ระบบลงเวลา (Time Attendance)
              </button>
              <button
                onClick={() => {
                  onSelectTab('vms');
                  setIsBrandOpen(false);
                }}
                className={`w-full text-left block px-3.5 py-2 hover:bg-slate-50 ${
                  currentTab === 'vms' ? 'text-emerald-700 font-semibold bg-emerald-50/40' : 'text-slate-700'
                }`}
              >
                🏢 ระบบ VMS (ผู้มาติดต่อ)
              </button>
              <button
                onClick={() => {
                  onSelectTab('hr');
                  setIsBrandOpen(false);
                }}
                className={`w-full text-left block px-3.5 py-2 hover:bg-slate-50 ${
                  currentTab === 'hr' ? 'text-emerald-700 font-semibold bg-emerald-50/40' : 'text-slate-700'
                }`}
              >
                👥 ระบบ HR (ทรัพยากรบุคคล)
              </button>
            </div>
          )}
        </div>

        {/* AI Assistant Quick Trigger */}
        <button
          onClick={onOpenAI}
          title="Prompt AI to customize Dashboard"
          className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-xl border border-emerald-200/80 smooth-transition flex items-center gap-1.5"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-xs font-bold hidden md:inline">AI Prompt</span>
        </button>
      </div>
    </header>
  );
};
