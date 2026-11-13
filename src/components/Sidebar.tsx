'use client';

import React from 'react';
import { SystemTabKey } from '../types/dashboard';

interface SidebarProps {
  currentTab: SystemTabKey;
  onSelectTab: (tab: SystemTabKey) => void;
  onOpenAI: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenAI,
}) => {
  return (
    <aside className="w-60 shrink-0 bg-white card-rounded p-4 flex flex-col justify-between shadow-soft border border-slate-100/80 transition-all duration-300">
      <div>
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-6 pt-2 px-1">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-black flex items-center justify-center text-white shadow-sm">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <span className="font-bold text-[17px] tracking-tight text-slate-900">
              Nexus
            </span>
          </div>
          <button
            title="Collapse Sidebar"
            className="w-7 h-7 rounded-lg border border-slate-200/90 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 smooth-transition"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Navigation Menu Matching the Uploaded Image */}
        <nav className="space-y-4 text-[13.5px]">
          {/* หมวดหมู่ 1: ภาพรวม */}
          <div>
            <p className="px-3 text-xs font-semibold text-slate-400 mb-1.5 tracking-tight">
              ภาพรวม
            </p>
            <div className="space-y-1">
              {/* ภาพรวม */}
              <button
                onClick={() => onSelectTab('overview')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl smooth-transition ${
                  currentTab === 'overview'
                    ? 'bg-slate-100/90 font-semibold text-slate-900 shadow-card'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                }`}
              >
                <svg
                  className={`w-4 h-4 ${
                    currentTab === 'overview' ? 'text-slate-900' : 'text-slate-500'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                  <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
                  <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
                  <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
                </svg>
                <span>ภาพรวม</span>
              </button>

              {/* War Room */}
              <button
                onClick={() => onSelectTab('warroom')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl smooth-transition ${
                  currentTab === 'warroom'
                    ? 'bg-slate-100/90 font-semibold text-slate-900 shadow-card'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                }`}
              >
                <svg
                  className={`w-4 h-4 ${
                    currentTab === 'warroom' ? 'text-slate-900' : 'text-slate-500'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                <span>War Room</span>
              </button>
            </div>
          </div>

          {/* หมวดหมู่ 2: ระบบ */}
          <div>
            <p className="px-3 text-xs font-semibold text-slate-400 mb-1.5 tracking-tight">
              ระบบ
            </p>
            <div className="space-y-1">
              {/* ระบบการเงิน */}
              <button
                onClick={() => onSelectTab('finance')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl smooth-transition ${
                  currentTab === 'finance'
                    ? 'bg-slate-100/90 font-semibold text-slate-900 shadow-card'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                }`}
              >
                <svg
                  className={`w-4 h-4 ${
                    currentTab === 'finance' ? 'text-slate-900' : 'text-slate-500'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
                <span>ระบบการเงิน</span>
              </button>

              {/* ระบบลงเวลา */}
              <button
                onClick={() => onSelectTab('attendance')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl smooth-transition ${
                  currentTab === 'attendance'
                    ? 'bg-slate-100/90 font-semibold text-slate-900 shadow-card'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                }`}
              >
                <svg
                  className={`w-4 h-4 ${
                    currentTab === 'attendance' ? 'text-slate-900' : 'text-slate-500'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>ระบบลงเวลา</span>
              </button>

              {/* ระบบ VMS */}
              <button
                onClick={() => onSelectTab('vms')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl smooth-transition ${
                  currentTab === 'vms'
                    ? 'bg-slate-100/90 font-semibold text-slate-900 shadow-card'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                }`}
              >
                <svg
                  className={`w-4 h-4 ${
                    currentTab === 'vms' ? 'text-slate-900' : 'text-slate-500'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="1" y="3" width="15" height="13" rx="1"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                <span>ระบบ VMS</span>
              </button>

              {/* ระบบ HR */}
              <button
                onClick={() => onSelectTab('hr')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl smooth-transition ${
                  currentTab === 'hr'
                    ? 'bg-slate-100/90 font-semibold text-slate-900 shadow-card'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                }`}
              >
                <svg
                  className={`w-4 h-4 ${
                    currentTab === 'hr' ? 'text-slate-900' : 'text-slate-500'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>ระบบ HR</span>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className="pt-4 border-t border-slate-100 text-[13.5px] space-y-1">
        {/* AI Assistant Quick Trigger */}
        <button
          onClick={onOpenAI}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-emerald-700 bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-100 smooth-transition"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm">✨</span>
            <span className="font-semibold text-xs">AI Assistant</span>
          </div>
          <span className="text-[10px] font-bold bg-white text-emerald-600 px-1.5 py-0.5 rounded shadow-sm">
            Prompt
          </span>
        </button>

        <a
          href="#help"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 smooth-transition"
        >
          <svg
            className="w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-medium">ช่วยเหลือ & ติดต่อ</span>
        </a>
        <a
          href="#settings"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 smooth-transition"
        >
          <svg
            className="w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="font-medium">การตั้งค่า</span>
        </a>
      </div>
    </aside>
  );
};
