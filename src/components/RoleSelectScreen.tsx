'use client';

import React from 'react';
import { UserRole } from '../types/dashboard';

interface RoleSelectScreenProps {
  onSelectRole: (role: UserRole) => void;
}

export const RoleSelectScreen: React.FC<RoleSelectScreenProps> = ({ onSelectRole }) => {
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col items-center justify-center py-12">
      {/* Brand */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-11 h-11 rounded-xl bg-black flex items-center justify-center text-white shadow-lg">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
            <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
            <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
            <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
          </svg>
        </div>
        <div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900">The Nexus Dashboard</span>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Multi-Tenant &bull; Multi-System &bull; AI-Powered</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-1.5">คุณเข้าใช้งานในฐานะ...</h2>
      <p className="text-sm text-slate-400 mb-8">เลือก Role เพื่อดูมุมมองของแต่ละระดับการใช้งาน</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-3xl">
        {/* User */}
        <button
          onClick={() => onSelectRole('user')}
          className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:border-emerald-200 smooth-transition text-left cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 smooth-transition">
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-2">User</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            ผู้ใช้งาน Dashboard เพื่อ Monitor ระบบ ปรับแต่ง Layout และดูข้อมูลตามสิทธิ์ที่ได้รับ (เข้าถึงองค์กร / ไซต์ / ระบบที่ได้รับอนุญาต)
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">ดูข้อมูล</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">ปรับ Layout</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">AI Prompt</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">War Room</span>
          </div>
          <div className="mt-5">
            <span className="text-xs font-semibold text-emerald-600 group-hover:translate-x-1 smooth-transition inline-block">
              เข้าสู่ Dashboard &rarr;
            </span>
          </div>
        </button>

        {/* Admin */}
        <button
          onClick={() => onSelectRole('admin')}
          className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-200 smooth-transition text-left cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 smooth-transition">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-2">Admin</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            ผู้ดูแลระบบ (บริษัทผู้ให้บริการ) จัดการองค์กรลูกค้า ผู้ใช้งาน Developer สิทธิ์การเข้าถึง และการตั้งค่าทั้งหมด
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">จัดการ User</span>
            <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">จัดการองค์กร</span>
            <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">ดู System Log</span>
          </div>
          <div className="mt-5">
            <span className="text-xs font-semibold text-blue-600 group-hover:translate-x-1 smooth-transition inline-block">
              เข้าสู่ Admin Panel &rarr;
            </span>
          </div>
        </button>

        {/* Developer */}
        <button
          onClick={() => onSelectRole('developer')}
          className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:border-purple-200 smooth-transition text-left cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4 group-hover:bg-purple-100 smooth-transition">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-2">Developer</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            นักพัฒนาระบบที่ต้องการเชื่อมต่อระบบภายนอกผ่าน API หรือ MCP และกำหนด Dataset Parameters สำหรับ Dashboard
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full font-semibold">API Connect</span>
            <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full font-semibold">MCP</span>
            <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full font-semibold">Dataset Config</span>
          </div>
          <div className="mt-5">
            <span className="text-xs font-semibold text-purple-600 group-hover:translate-x-1 smooth-transition inline-block">
              เข้าสู่ Dev Portal &rarr;
            </span>
          </div>
        </button>
      </div>

      <p className="mt-10 text-xs text-slate-400">
        Prototype &bull; Proof of Concept &mdash; The Nexus Dashboard Framework
      </p>
    </div>
  );
};
