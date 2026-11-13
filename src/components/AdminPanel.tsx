'use client';

import React, { useState } from 'react';
import { UserAccount, SystemTabKey, SiteKey } from '../types/dashboard';
import { ALL_SYSTEMS_LIST, ALL_SITES_LIST } from '../data/permissions';

type AdminSection = 'orgs' | 'users' | 'dev' | 'logs';

interface AdminPanelProps {
  onBack: () => void;
  users: UserAccount[];
  onUpdateUser: (userId: string, updates: Partial<Pick<UserAccount, 'allowedSites' | 'allowedSystems' | 'status'>>) => void;
}

const ORGS = [
  { name: 'Rittha Co., Ltd.',              sites: 7, systems: 10, users: 42, status: 'Active' },
  { name: 'ThaiPattana Construction',       sites: 3, systems: 5,  users: 18, status: 'Active' },
  { name: 'Mega Project Co., Ltd.',         sites: 1, systems: 3,  users: 8,  status: 'Trial'  },
];

const DEVS = [
  { name: 'Nontawat Rakthai',  system: 'VMS (Rittha HQ)',     method: 'REST API', status: 'Connected', lastSync: '2 min ago'  },
  { name: 'Suphakit Wiangsaa', system: 'Time Attendance',      method: 'MCP',      status: 'Connected', lastSync: '5 min ago'  },
  { name: 'Kitti Chuenchom',   system: 'Finance ERP',          method: 'REST API', status: 'Pending',   lastSync: 'Awaiting'   },
];

const LOGS = [
  { time: '10:42:03', level: 'INFO',  msg: 'User Worapol signed in via Time Attendance, site Muangthong' },
  { time: '10:38:17', level: 'INFO',  msg: 'Dev Nontawat synced VMS HQ data (1,420 records)' },
  { time: '10:35:00', level: 'WARN',  msg: 'API rate limit 80% reached on Finance ERP (Rittha)' },
  { time: '10:30:12', level: 'INFO',  msg: 'User Piyawat opened War Room Dashboard' },
  { time: '10:12:55', level: 'INFO',  msg: 'Admin added new org: Mega Project Co., Ltd.' },
  { time: '09:50:40', level: 'ERROR', msg: 'Connection timeout on HR system, site Chiangmai (retry succeeded)' },
];

const NAV_ITEMS: { key: AdminSection; label: string }[] = [
  { key: 'orgs',  label: 'Organizations' },
  { key: 'users', label: 'User Access'   },
  { key: 'dev',   label: 'Developers'    },
  { key: 'logs',  label: 'System Log'    },
];

const NAV_ICONS: Record<AdminSection, React.ReactNode> = {
  orgs: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  users: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  dev: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  logs: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
};

const SYSTEM_LABELS: Record<SystemTabKey, string> = {
  overview: 'Overview', warroom: 'War Room', vms: 'VMS',
  attendance: 'Attendance', finance: 'Finance', hr: 'HR', crm: 'CRM', cms: 'CMS',
};

const SITE_LABELS: Record<SiteKey, string> = {
  all: 'All Sites', hq: 'HQ', muangthong: 'Muangthong', phuket: 'Phuket', chiangmai: 'Chiangmai',
};

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBack, users, onUpdateUser }) => {
  const [section, setSection] = useState<AdminSection>('orgs');
  const [editingUser, setEditingUser] = useState<string | null>(null);

  const toggleSystem = (userId: string, system: SystemTabKey) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;
    const has = user.allowedSystems.includes(system);
    const next = has
      ? user.allowedSystems.filter((s) => s !== system)
      : [...user.allowedSystems, system];
    onUpdateUser(userId, { allowedSystems: next });
  };

  const toggleSite = (userId: string, site: SiteKey) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;
    const has = user.allowedSites.includes(site);
    const next = has
      ? user.allowedSites.filter((s) => s !== site)
      : [...user.allowedSites, site];
    onUpdateUser(userId, { allowedSites: next });
  };

  const toggleStatus = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;
    onUpdateUser(userId, { status: user.status === 'active' ? 'inactive' : 'active' });
  };

  return (
    <div className="w-full max-w-[1580px] flex gap-4 xl:gap-5 items-stretch">
      {/* Admin Sidebar */}
      <aside className="w-60 shrink-0 bg-white card-rounded p-4 flex flex-col justify-between shadow-soft border border-slate-100/80">
        <div>
          <div className="flex items-center gap-2.5 pb-5 pt-2 px-1">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <span className="font-semibold text-[15px] tracking-tight text-slate-900">Admin Panel</span>
              <p className="text-[10px] text-slate-400">The Nexus Dashboard</p>
            </div>
          </div>

          <nav className="space-y-1 text-[13.5px]">
            {NAV_ITEMS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setSection(key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl smooth-transition ${
                  section === key
                    ? 'bg-blue-50 font-semibold text-blue-700 border border-blue-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                }`}
              >
                <span className={section === key ? 'text-blue-600' : 'text-slate-400'}>
                  {NAV_ICONS[key]}
                </span>
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onBack}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 smooth-transition font-medium text-[13.5px]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-4 min-w-0">
        <div className="flex items-center justify-between pt-1">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
              {NAV_ITEMS.find((n) => n.key === section)?.label}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">Admin &bull; The Nexus Dashboard Framework</p>
          </div>
          {section !== 'logs' && section !== 'users' && (
            <button type="button" className="text-xs bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 smooth-transition">
              + Add New
            </button>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
          {/* Organizations */}
          {section === 'orgs' && (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  <th className="px-5 py-3.5">Organization</th>
                  <th className="px-5 py-3.5">Sites</th>
                  <th className="px-5 py-3.5">Systems</th>
                  <th className="px-5 py-3.5">Users</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {ORGS.map((org) => (
                  <tr key={org.name} className="hover:bg-slate-50/60 smooth-transition">
                    <td className="px-5 py-4 font-semibold text-slate-900">{org.name}</td>
                    <td className="px-5 py-4 text-slate-600">{org.sites} sites</td>
                    <td className="px-5 py-4 text-slate-600">{org.systems} systems</td>
                    <td className="px-5 py-4 text-slate-600">{org.users} users</td>
                    <td className="px-5 py-4">
                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                        org.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {org.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button type="button" className="text-xs text-blue-600 font-semibold hover:underline">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Users with real permission toggles */}
          {section === 'users' && (
            <div>
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    <th className="px-5 py-3.5">Name</th>
                    <th className="px-5 py-3.5">Organization</th>
                    <th className="px-5 py-3.5">Role</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {users.map((u) => (
                    <React.Fragment key={u.id}>
                      <tr className="hover:bg-slate-50/60 smooth-transition">
                        <td className="px-5 py-4">
                          <p className="font-semibold text-slate-900">{u.name}</p>
                          <p className="text-xs text-slate-400">{u.email}</p>
                        </td>
                        <td className="px-5 py-4 text-slate-600">{u.org}</td>
                        <td className="px-5 py-4">
                          <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full capitalize">
                            {u.role}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() => toggleStatus(u.id)}
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full smooth-transition cursor-pointer ${
                              u.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {u.status === 'active' ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() => setEditingUser(editingUser === u.id ? null : u.id)}
                            className={`text-xs font-semibold smooth-transition ${
                              editingUser === u.id ? 'text-slate-500' : 'text-blue-600 hover:underline'
                            }`}
                          >
                            {editingUser === u.id ? 'Close' : 'Permissions'}
                          </button>
                        </td>
                      </tr>

                      {/* Expanded permission editor */}
                      {editingUser === u.id && (
                        <tr>
                          <td colSpan={5} className="px-5 py-4 bg-slate-50/80 border-t border-slate-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                              {/* Systems */}
                              <div>
                                <p className="text-xs font-semibold text-slate-700 mb-2">Allowed Systems</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {ALL_SYSTEMS_LIST.map((sys) => {
                                    const on = u.allowedSystems.includes(sys);
                                    return (
                                      <button
                                        key={sys}
                                        type="button"
                                        onClick={() => toggleSystem(u.id, sys)}
                                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border smooth-transition ${
                                          on
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                                        }`}
                                      >
                                        {SYSTEM_LABELS[sys]}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Sites */}
                              <div>
                                <p className="text-xs font-semibold text-slate-700 mb-2">Allowed Sites</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {ALL_SITES_LIST.map((site) => {
                                    const on = u.allowedSites.includes(site);
                                    return (
                                      <button
                                        key={site}
                                        type="button"
                                        onClick={() => toggleSite(u.id, site)}
                                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border smooth-transition ${
                                          on
                                            ? 'bg-emerald-600 text-white border-emerald-600'
                                            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                                        }`}
                                      >
                                        {SITE_LABELS[site]}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-3">
                              Changes apply immediately. When this user logs in, they will only see the systems and sites toggled on above.
                            </p>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Developers */}
          {section === 'dev' && (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  <th className="px-5 py-3.5">Developer</th>
                  <th className="px-5 py-3.5">Connected System</th>
                  <th className="px-5 py-3.5">Method</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Last Sync</th>
                  <th className="px-5 py-3.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {DEVS.map((d) => (
                  <tr key={d.name} className="hover:bg-slate-50/60 smooth-transition">
                    <td className="px-5 py-4 font-semibold text-slate-900">{d.name}</td>
                    <td className="px-5 py-4 text-slate-600">{d.system}</td>
                    <td className="px-5 py-4">
                      <span className="text-[11px] font-semibold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">{d.method}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        d.status === 'Connected' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500 text-xs">{d.lastSync}</td>
                    <td className="px-5 py-4">
                      <button type="button" className="text-xs text-blue-600 font-semibold hover:underline">Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Logs */}
          {section === 'logs' && (
            <div className="p-5 space-y-1.5">
              {LOGS.map((log, i) => (
                <div key={i} className="flex items-start gap-3 text-xs font-mono py-2 border-b border-slate-50 last:border-0">
                  <span className="text-slate-400 shrink-0 w-16">{log.time}</span>
                  <span className={`shrink-0 font-semibold px-1.5 py-0.5 rounded text-[10px] ${
                    log.level === 'ERROR' ? 'bg-red-50 text-red-600' :
                    log.level === 'WARN'  ? 'bg-amber-50 text-amber-600' :
                                            'bg-slate-100 text-slate-500'
                  }`}>
                    {log.level}
                  </span>
                  <span className="text-slate-700">{log.msg}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
