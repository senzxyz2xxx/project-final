'use client';

import React, { useState } from 'react';
import { UserRole } from '../types/dashboard';

interface LoginScreenProps {
  onSelectRole: (role: UserRole) => void;
}

const QUICK_ROLES: { key: UserRole; label: string; desc: string }[] = [
  { key: 'user',      label: 'User',      desc: 'View & customize dashboard' },
  { key: 'admin',     label: 'Admin',     desc: 'Manage users & systems'     },
  { key: 'developer', label: 'Developer', desc: 'Connect systems via API'    },
];

const FEATURES = [
  'Multi-tenant, multi-site in one platform',
  'Real-time data across VMS, HR, Finance, CRM and more',
  'AI-powered dashboard customization',
  'War Room: all systems at a glance',
];

export const LoginScreen: React.FC<LoginScreenProps> = ({ onSelectRole }) => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onSelectRole('user'); }, 600);
  };

  return (
    <div className="w-full max-w-[1100px] min-h-[calc(100vh-24px)] md:min-h-[calc(100vh-40px)] flex rounded-2xl overflow-hidden border border-slate-200/60 shadow-soft bg-white">

      {/* Left panel */}
      <div
        className="hidden lg:flex lg:w-[400px] xl:w-[440px] shrink-0 flex-col justify-between p-10"
        style={{ backgroundColor: '#181818' }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 3h14M5 9h14M5 15h14M5 21h14M3 3v18M21 3v18" />
            </svg>
          </div>
          <span className="text-white text-base font-semibold">Nexus</span>
        </div>

        <div>
          <h2 className="text-white text-3xl font-semibold leading-snug mb-3">
            One platform.<br />Every system.
          </h2>
          <p className="text-sm text-white/50 leading-relaxed">
            Connect every system in your organization<br />
            and customize the view for each role.
          </p>
        </div>

        <ul className="space-y-3">
          {FEATURES.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-sm text-white/60 leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>

        <p className="text-xs text-white/25">The Nexus Dashboard Framework</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-8 py-10">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 3h14M5 9h14M5 15h14M5 21h14M3 3v18M21 3v18" />
              </svg>
            </div>
            <span className="font-semibold text-slate-900">Nexus</span>
          </div>

          <h1 className="text-2xl font-semibold text-slate-900 mb-1">Sign in</h1>
          <p className="text-sm text-slate-400 mb-8">Enter your credentials to continue</p>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent smooth-transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent smooth-transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white text-base font-semibold py-2.5 rounded-xl hover:bg-slate-800 smooth-transition disabled:opacity-60 active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign in'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-xs text-slate-400">or continue as</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Quick role access */}
          <div className="grid grid-cols-3 gap-2">
            {QUICK_ROLES.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => onSelectRole(r.key)}
                className="group flex flex-col items-center gap-1 py-3 px-2 rounded-xl border border-slate-200 hover:border-slate-900 hover:bg-slate-900 smooth-transition active:scale-[0.97]"
              >
                <span className="text-xs font-semibold text-slate-700 group-hover:text-white smooth-transition">
                  {r.label}
                </span>
                <span className="text-[10px] text-slate-400 group-hover:text-slate-300 smooth-transition text-center leading-tight">
                  {r.desc}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
