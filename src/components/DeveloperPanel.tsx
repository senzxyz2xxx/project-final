'use client';

import React, { useState } from 'react';

type DevSection = 'systems' | 'connect' | 'dataset' | 'test';

interface DeveloperPanelProps {
  onBack: () => void;
}

const CONNECTED = [
  { name: 'VMS — บจก. ฤทธา สนง.ใหญ่',   method: 'REST API', fields: 12, status: 'Connected', uptime: '99.9%' },
  { name: 'ระบบลงเวลา — ไซต์เมืองทอง',   method: 'MCP',      fields: 8,  status: 'Connected', uptime: '100%'  },
];

const SAMPLE_FIELDS = [
  { name: 'visitor_count',   type: 'integer',  label: 'จำนวนผู้มาติดต่อ',     enabled: true  },
  { name: 'checkin_time',    type: 'datetime', label: 'เวลาเช็คอิน',          enabled: true  },
  { name: 'checkout_time',   type: 'datetime', label: 'เวลาเช็คเอาท์',        enabled: true  },
  { name: 'vehicle_plate',   type: 'string',   label: 'ทะเบียนรถ (LPR)',      enabled: true  },
  { name: 'visitor_purpose', type: 'enum',     label: 'วัตถุประสงค์',          enabled: true  },
  { name: 'host_department', type: 'string',   label: 'แผนกผู้รับ',           enabled: false },
  { name: 'id_card_scan',    type: 'string',   label: 'เลขบัตรประชาชน (hash)', enabled: false },
  { name: 'photo_capture',   type: 'binary',   label: 'รูปถ่าย (Base64)',      enabled: false },
];

const NAV_ITEMS: { key: DevSection; label: string }[] = [
  { key: 'systems', label: 'ระบบที่เชื่อมต่อ' },
  { key: 'connect', label: 'เพิ่มการเชื่อมต่อ' },
  { key: 'dataset', label: 'Dataset Config'  },
  { key: 'test',    label: 'ทดสอบ API'       },
];

const NAV_ICONS: Record<DevSection, React.ReactNode> = {
  systems: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
  connect: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  ),
  dataset: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  ),
  test: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
};

export const DeveloperPanel: React.FC<DeveloperPanelProps> = ({ onBack }) => {
  const [section, setSection] = useState<DevSection>('systems');
  const [fields, setFields] = useState(SAMPLE_FIELDS);
  const [method, setMethod] = useState<'push' | 'pull'>('pull');

  const toggleField = (name: string) => {
    setFields((prev) => prev.map((f) => (f.name === name ? { ...f, enabled: !f.enabled } : f)));
  };

  return (
    <div className="w-full max-w-[1580px] flex gap-4 xl:gap-5 items-stretch">
      {/* Dev Sidebar */}
      <aside className="w-60 shrink-0 bg-white card-rounded p-4 flex flex-col justify-between shadow-soft border border-slate-100/80">
        <div>
          <div className="flex items-center gap-2.5 pb-5 pt-2 px-1">
            <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center text-white shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-[15px] tracking-tight text-slate-900">Dev Portal</span>
              <p className="text-[10px] text-slate-400">The Nexus Dashboard</p>
            </div>
          </div>

          <nav className="space-y-1 text-[13.5px]">
            {NAV_ITEMS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSection(key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl smooth-transition ${
                  section === key
                    ? 'bg-purple-50 font-semibold text-purple-700 border border-purple-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                }`}
              >
                <span className={section === key ? 'text-purple-600' : 'text-slate-400'}>
                  {NAV_ICONS[key]}
                </span>
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button
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
        <div className="pt-1">
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
            {NAV_ITEMS.find((n) => n.key === section)?.label}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">Developer &bull; The Nexus Dashboard Framework</p>
        </div>

        {/* Connected Systems */}
        {section === 'systems' && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  <th className="px-5 py-3.5">ระบบ</th>
                  <th className="px-5 py-3.5">วิธีเชื่อมต่อ</th>
                  <th className="px-5 py-3.5">Fields</th>
                  <th className="px-5 py-3.5">สถานะ</th>
                  <th className="px-5 py-3.5">Uptime</th>
                  <th className="px-5 py-3.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {CONNECTED.map((s) => (
                  <tr key={s.name} className="hover:bg-slate-50/60 smooth-transition">
                    <td className="px-5 py-4 font-semibold text-slate-900">{s.name}</td>
                    <td className="px-5 py-4">
                      <span className="text-[11px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">{s.method}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{s.fields} fields</td>
                    <td className="px-5 py-4">
                      <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">{s.status}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{s.uptime}</td>
                    <td className="px-5 py-4">
                      <button onClick={() => setSection('dataset')} className="text-xs text-purple-600 font-semibold hover:underline">
                        Dataset Config
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add Connection */}
        {section === 'connect' && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-6 space-y-6">
            <div>
              <p className="text-sm font-bold text-slate-800 mb-3">1. เลือกวิธีส่งข้อมูลเข้า The Nexus Dashboard</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMethod('pull')}
                  className={`p-4 rounded-xl border-2 text-left smooth-transition ${method === 'pull' ? 'border-purple-400 bg-purple-50' : 'border-slate-100 hover:border-slate-200'}`}
                >
                  <p className="font-bold text-slate-900 text-sm mb-1">Pull (Dashboard ดึงข้อมูล)</p>
                  <p className="text-xs text-slate-500">The Nexus Dashboard จะ GET ข้อมูลจาก endpoint ของคุณ ตาม interval ที่กำหนด</p>
                </button>
                <button
                  onClick={() => setMethod('push')}
                  className={`p-4 rounded-xl border-2 text-left smooth-transition ${method === 'push' ? 'border-purple-400 bg-purple-50' : 'border-slate-100 hover:border-slate-200'}`}
                >
                  <p className="font-bold text-slate-900 text-sm mb-1">Push (ระบบส่งข้อมูลมาให้)</p>
                  <p className="text-xs text-slate-500">ระบบของคุณจะ POST ข้อมูลมาที่ Webhook URL ของ The Nexus Dashboard</p>
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-800 mb-3">2. ข้อมูลการเชื่อมต่อ</p>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">ชื่อระบบ</label>
                  <input className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="เช่น ระบบ VMS สาขาเชียงใหม่" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">
                    {method === 'pull' ? 'API Endpoint URL' : 'Webhook URL ของคุณ'}
                  </label>
                  <input className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="https://your-system.example.com/api/data" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">API Key / Bearer Token</label>
                  <input type="password" className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="••••••••••••••••" />
                </div>
              </div>
            </div>

            <button onClick={() => setSection('dataset')} className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl smooth-transition">
              ถัดไป: Dataset Config &rarr;
            </button>
          </div>
        )}

        {/* Dataset Field Mapping */}
        {section === 'dataset' && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
              <p className="text-sm font-bold text-slate-800">กำหนด Fields ที่จะส่งเข้า Dashboard</p>
              <p className="text-xs text-slate-400 mt-0.5">เลือกเฉพาะ Parameters ที่ต้องการแสดงผล (Dataset: VMS สนง.ใหญ่)</p>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  <th className="px-5 py-3">ใช้งาน</th>
                  <th className="px-5 py-3">Field Name</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">ป้ายกำกับ (Label)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {fields.map((f) => (
                  <tr key={f.name} className={`hover:bg-slate-50/60 smooth-transition ${!f.enabled ? 'opacity-40' : ''}`}>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => toggleField(f.name)}
                        className={`w-10 h-5 rounded-full smooth-transition relative ${f.enabled ? 'bg-purple-500' : 'bg-slate-200'}`}
                      >
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow smooth-transition ${f.enabled ? 'left-5' : 'left-0.5'}`} />
                      </button>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-700">{f.name}</td>
                    <td className="px-5 py-3">
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">{f.type}</span>
                    </td>
                    <td className="px-5 py-3 text-slate-600">{f.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-4 border-t border-slate-100">
              <button onClick={() => setSection('test')} className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl smooth-transition">
                บันทึก &amp; ทดสอบ API &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Test API */}
        {section === 'test' && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-6 space-y-4">
            <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
              <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-bold text-emerald-800 text-sm">เชื่อมต่อสำเร็จ</p>
                <p className="text-xs text-emerald-600">ตรวจพบ 1,420 records ล่าสุด &bull; Response time: 142ms</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-600 mb-2">Response Preview (JSON)</p>
              <pre className="bg-slate-900 text-emerald-400 text-[11px] rounded-xl p-4 overflow-x-auto font-mono leading-relaxed">
{`{
  "status": "ok",
  "timestamp": "2026-11-14T10:42:03Z",
  "data": {
    "visitor_count": 1420,
    "checkin_success": 1385,
    "current_in_building": 84,
    "avg_checkin_time_sec": 84,
    "vehicle_count": 428
  }
}`}
              </pre>
            </div>
            <button onClick={() => setSection('systems')} className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl smooth-transition">
              เสร็จสิ้น &mdash; ดูระบบที่เชื่อมต่อ
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
