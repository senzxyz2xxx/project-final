'use client';

import React, { useState } from 'react';
import { SystemTabKey, UserRole, SiteKey, SiteOption } from '../types/dashboard';

interface SidebarProps {
  currentTab: SystemTabKey;
  currentSite: SiteKey;
  role: UserRole;
  onSelectTab: (tab: SystemTabKey) => void;
  onSelectSite: (site: SiteKey) => void;
  onOpenAI: () => void;
  onBack: () => void;
  allowedSystems?: SystemTabKey[];
  allowedSites?: SiteKey[];
}

export const SITES: SiteOption[] = [
  { key: 'all',        label: 'ทุกไซต์งาน',         short: 'ทุกไซต์'    },
  { key: 'hq',         label: 'สำนักงานใหญ่',         short: 'สนง.ใหญ่'  },
  { key: 'muangthong', label: 'ไซต์เมืองทอง',         short: 'เมืองทอง'  },
  { key: 'phuket',     label: 'ไซต์ภูเก็ต',           short: 'ภูเก็ต'    },
  { key: 'chiangmai',  label: 'ไซต์เชียงใหม่',         short: 'เชียงใหม่' },
];

interface NavItem {
  tab: SystemTabKey;
  label: string;
  sub: string;
  icon: React.ReactNode;
}

const OVERVIEW_ITEMS: NavItem[] = [
  {
    tab: 'overview',
    label: 'ภาพรวมระบบ',
    sub: 'General Metrics',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    tab: 'warroom',
    label: 'War Room',
    sub: 'Multi-System Monitor',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8l2 2 2-2 2 2 2-2" />
      </svg>
    ),
  },
];

const SYSTEM_ITEMS: NavItem[] = [
  {
    tab: 'vms',
    label: 'ระบบ VMS',
    sub: 'Visitor Management',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <circle cx="8.5" cy="12" r="2.5" />
        <path d="M14 9h4M14 12h4M14 15h2" />
      </svg>
    ),
  },
  {
    tab: 'attendance',
    label: 'ระบบลงเวลา',
    sub: 'Time Attendance',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
        <path d="M16.5 2.5l1 2M7.5 2.5l-1 2" />
      </svg>
    ),
  },
  {
    tab: 'finance',
    label: 'ระบบการเงิน',
    sub: 'Finance & Budget',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M12 6v2m0 8v2M9 9.5A2 2 0 0111 8h2a2 2 0 010 4h-2a2 2 0 000 4h2a2 2 0 002-1.5" />
      </svg>
    ),
  },
  {
    tab: 'hr',
    label: 'ระบบ HR',
    sub: 'Human Resources',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="3" />
        <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
        <path d="M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.87" />
      </svg>
    ),
  },
  {
    tab: 'crm',
    label: 'ระบบ CRM',
    sub: 'Customer Relations',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <path d="M8 10h.01M12 10h.01M16 10h.01" />
      </svg>
    ),
  },
  {
    tab: 'cms',
    label: 'ระบบ CMS',
    sub: 'Content Management',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
        <path d="M14 2v6h6M8 13h8M8 17h5" />
      </svg>
    ),
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  currentSite,
  onSelectTab,
  onSelectSite,
  onOpenAI,
  onBack,
  allowedSystems,
  allowedSites,
}) => {
  const [siteOpen, setSiteOpen] = useState(false);
  const activeSite = SITES.find((s) => s.key === currentSite) ?? SITES[0];

  const visibleOverview = OVERVIEW_ITEMS;
  const visibleSystems = allowedSystems
    ? SYSTEM_ITEMS.filter((i) => allowedSystems.includes(i.tab))
    : SYSTEM_ITEMS;
  const visibleSites = allowedSites
    ? SITES.filter((s) => allowedSites.includes(s.key))
    : SITES;

  const renderItem = (item: NavItem) => {
    const active = currentTab === item.tab;
    return (
      <button
        key={item.tab}
        onClick={() => onSelectTab(item.tab)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl smooth-transition group ${
          active
            ? 'bg-slate-900 text-white shadow-md'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
        }`}
      >
        <span className={`shrink-0 ${active ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'}`}>
          {item.icon}
        </span>
        <div className="text-left min-w-0">
          <p className={`text-[13px] font-semibold leading-none ${active ? 'text-white' : 'text-slate-800'}`}>
            {item.label}
          </p>
          <p className={`text-[10px] mt-0.5 ${active ? 'text-slate-300' : 'text-slate-400'}`}>
            {item.sub}
          </p>
        </div>
      </button>
    );
  };

  return (
    <aside className="w-64 shrink-0 bg-white card-rounded flex flex-col justify-between shadow-soft border border-slate-100/80 transition-all duration-300 overflow-hidden">
      <div className="p-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5 pb-4 pt-1 px-1">
          <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center text-white shadow-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 3h14M5 9h14M5 15h14M5 21h14M3 3v18M21 3v18" />
            </svg>
          </div>
          <div>
            <span className="font-semibold text-base tracking-tight text-slate-900">Nexus</span>
            <p className="text-[10px] text-slate-400 font-medium -mt-0.5">Dashboard Framework</p>
          </div>
        </div>

        {/* Site Selector Dropdown */}
        <div className="relative mb-5">
          <button
            onClick={() => setSiteOpen((v) => !v)}
            className="w-full flex items-center justify-between gap-2 px-3 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl smooth-transition"
          >
            <div className="flex items-center gap-2 min-w-0">
              <svg className="w-3.5 h-3.5 text-slate-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="text-left min-w-0">
                <p className="text-[10px] text-slate-400 font-medium">บจก. ฤทธา</p>
                <p className="text-[13px] font-bold text-slate-800 leading-tight truncate">{activeSite.label}</p>
              </div>
            </div>
            <svg
              className={`w-3.5 h-3.5 text-slate-400 shrink-0 smooth-transition ${siteOpen ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {siteOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-100 rounded-xl shadow-xl z-50 py-1.5 overflow-hidden">
              {visibleSites.map((site) => (
                <button
                  key={site.key}
                  onClick={() => { onSelectSite(site.key); setSiteOpen(false); }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-[13px] hover:bg-slate-50 smooth-transition ${
                    currentSite === site.key ? 'text-slate-900 font-semibold' : 'text-slate-600'
                  }`}
                >
                  <span>{site.label}</span>
                  {currentSite === site.key && (
                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-4 text-[13.5px]">
          {/* Overview */}
          <div>
            <p className="px-3 text-[10px] font-bold text-slate-400 mb-1.5 tracking-widest uppercase">ภาพรวม</p>
            <div className="space-y-0.5">
              {visibleOverview.map(renderItem)}
            </div>
          </div>

          {/* All Systems */}
          <div>
            <p className="px-3 text-[10px] font-bold text-slate-400 mb-1.5 tracking-widest uppercase">ระบบทั้งหมด</p>
            <div className="space-y-0.5">
              {visibleSystems.map(renderItem)}
            </div>
          </div>
        </nav>
      </div>

      {/* Bottom */}
      <div className="p-4 border-t border-slate-100 space-y-1">
        <button
          onClick={onOpenAI}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 smooth-transition"
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="font-semibold text-[13px]">AI Assistant</span>
          </div>
          <span className="text-[10px] font-bold bg-emerald-500 text-white px-1.5 py-0.5 rounded">Prompt</span>
        </button>

        <button
          onClick={onBack}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 smooth-transition text-[13px] font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
};
