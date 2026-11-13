'use client';

import React, { useState, useRef, useCallback } from 'react';
import { mockSystemsData } from '../data/mockData';
import { SystemTabKey } from '../types/dashboard';

interface WarRoomMultiPanelProps {
  onNavigate: (tab: SystemTabKey) => void;
  onExit: () => void;
}

type ChartMode = 'line' | 'bar' | 'area';

const ACCENT: Record<string, { main: string; rgb: string; glow: string }> = {
  vms:        { main: '#34d399', rgb: '52,211,153',  glow: 'shadow-emerald-500/20' },
  attendance: { main: '#38bdf8', rgb: '56,189,248',  glow: 'shadow-sky-500/20'     },
  finance:    { main: '#fbbf24', rgb: '251,191,36',  glow: 'shadow-amber-500/20'   },
  hr:         { main: '#a78bfa', rgb: '167,139,250', glow: 'shadow-violet-500/20'  },
  crm:        { main: '#fb7185', rgb: '251,113,133', glow: 'shadow-rose-500/20'    },
  cms:        { main: '#2dd4bf', rgb: '45,212,191',  glow: 'shadow-teal-500/20'    },
};

const SYSTEM_LABELS: Record<string, string> = {
  vms: 'VMS', attendance: 'Attendance', finance: 'Finance',
  hr: 'HR', crm: 'CRM', cms: 'CMS',
};

const ALL_PANEL_KEYS: SystemTabKey[] = ['vms', 'attendance', 'finance', 'hr', 'crm', 'cms'];

function buildLinePath(values: number[], w: number, h: number, pad: number): string {
  if (values.length < 2) return '';
  const maxV = Math.max(...values);
  const minV = Math.min(...values);
  const range = maxV - minV || 1;
  const pts = values.map((v, i) => ({
    x: pad + (i / (values.length - 1)) * (w - pad * 2),
    y: pad + (1 - (v - minV) / range) * (h - pad * 2),
  }));

  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const cpx = (prev.x + curr.x) / 2;
    d += ` C${cpx},${prev.y} ${cpx},${curr.y} ${curr.x},${curr.y}`;
  }
  return d;
}

function buildAreaPath(values: number[], w: number, h: number, pad: number): string {
  const line = buildLinePath(values, w, h, pad);
  if (!line) return '';
  const lastX = pad + (w - pad * 2);
  return `${line} L${lastX},${h} L${pad},${h} Z`;
}

const MiniChart: React.FC<{ values: number[]; color: string; rgb: string; mode: ChartMode; days: string[] }> = ({
  values, color, rgb, mode, days,
}) => {
  const w = 220;
  const h = 64;
  const pad = 4;
  const maxV = Math.max(...values) || 1;

  if (mode === 'bar') {
    const barW = (w - pad * 2) / values.length - 2;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
        {values.map((v, i) => {
          const barH = Math.max(2, (v / maxV) * (h - pad * 2 - 10));
          const x = pad + i * ((w - pad * 2) / values.length) + 1;
          return (
            <g key={i}>
              <rect
                x={x} y={h - pad - barH} width={barW} height={barH}
                rx="2" fill={i === values.length - 2 ? color : `rgba(${rgb},0.25)`}
              />
              <text x={x + barW / 2} y={h - 1} textAnchor="middle" className="fill-slate-600" style={{ fontSize: 7 }}>
                {days[i]}
              </text>
            </g>
          );
        })}
      </svg>
    );
  }

  const linePath = buildLinePath(values, w, h - 10, pad);
  const areaPath = buildAreaPath(values, w, h - 10, pad);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      {mode === 'area' && (
        <path d={areaPath} fill={`rgba(${rgb},0.12)`} />
      )}
      <path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {days.map((day, i) => {
        const x = pad + (i / (values.length - 1)) * (w - pad * 2);
        return (
          <text key={i} x={x} y={h - 1} textAnchor="middle" className="fill-slate-600" style={{ fontSize: 7 }}>
            {day}
          </text>
        );
      })}
    </svg>
  );
};

export const WarRoomMultiPanel: React.FC<WarRoomMultiPanelProps> = ({ onNavigate, onExit }) => {
  const [clock, setClock] = useState(() => new Date().toLocaleTimeString('th-TH'));
  const [editMode, setEditMode] = useState(false);
  const [panelOrder, setPanelOrder] = useState<SystemTabKey[]>(ALL_PANEL_KEYS);
  const [chartModes, setChartModes] = useState<Record<string, ChartMode>>(() => {
    const m: Record<string, ChartMode> = {};
    ALL_PANEL_KEYS.forEach((k) => { m[k] = 'area'; });
    return m;
  });

  const dragItem = useRef<number | null>(null);
  const dragOver = useRef<number | null>(null);

  React.useEffect(() => {
    const id = setInterval(() => setClock(new Date().toLocaleTimeString('th-TH')), 1000);
    return () => clearInterval(id);
  }, []);

  const handleDragStart = useCallback((idx: number) => { dragItem.current = idx; }, []);
  const handleDragEnter = useCallback((idx: number) => { dragOver.current = idx; }, []);
  const handleDragEnd = useCallback(() => {
    if (dragItem.current === null || dragOver.current === null) return;
    const from = dragItem.current;
    const to = dragOver.current;
    if (from === to) { dragItem.current = null; dragOver.current = null; return; }
    setPanelOrder((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    dragItem.current = null;
    dragOver.current = null;
  }, []);

  const cycleChart = useCallback((key: string) => {
    setChartModes((prev) => {
      const order: ChartMode[] = ['area', 'line', 'bar'];
      const cur = prev[key] || 'area';
      const next = order[(order.indexOf(cur) + 1) % order.length];
      return { ...prev, [key]: next };
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: '#0c0e14' }}>
      {/* Top Bar */}
      <header className="shrink-0 flex items-center justify-between px-5 py-2.5" style={{ backgroundColor: '#12141c' }}>
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(52,211,153,0.15)' }}>
            <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          <div>
            <h1 className="text-white text-sm font-semibold tracking-tight">War Room</h1>
            <p className="text-[10px] text-slate-500">Rittha Co., Ltd. &middot; 6 systems &middot; 4 sites</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Live
          </div>
          <span className="text-[11px] text-slate-500 font-mono tabular-nums">{clock}</span>

          <button
            type="button"
            onClick={() => setEditMode((v) => !v)}
            className={`text-[11px] px-3 py-1.5 rounded-lg font-medium smooth-transition ${
              editMode
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10'
            }`}
          >
            {editMode ? 'Done Editing' : 'Edit Layout'}
          </button>

          <button
            type="button"
            onClick={onExit}
            className="text-[11px] text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg font-medium smooth-transition"
          >
            Exit
          </button>
        </div>
      </header>

      {/* Panel Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 p-3 overflow-hidden">
        {panelOrder.map((key, idx) => {
          const data = mockSystemsData[key];
          const accent = ACCENT[key];
          const chartData = data.chart.days;
          const chartMode = chartModes[key] || 'area';

          return (
            <div
              key={key}
              draggable={editMode}
              onDragStart={() => handleDragStart(idx)}
              onDragEnter={() => handleDragEnter(idx)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              className={`rounded-xl p-4 flex flex-col min-h-0 smooth-transition ${
                editMode ? 'cursor-grab active:cursor-grabbing ring-1 ring-amber-500/30' : ''
              }`}
              style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                borderLeft: `2px solid ${accent.main}`,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3 shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  {editMode && (
                    <svg className="w-3.5 h-3.5 text-slate-600 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="9" cy="6" r="1.5" /><circle cx="15" cy="6" r="1.5" />
                      <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
                      <circle cx="9" cy="18" r="1.5" /><circle cx="15" cy="18" r="1.5" />
                    </svg>
                  )}
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ backgroundColor: accent.main }} />
                    <span className="text-xs font-semibold text-white truncate">{SYSTEM_LABELS[key]}</span>
                    <span className="text-[10px] text-slate-500 hidden md:inline truncate">{data.brand}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => cycleChart(key)}
                    className="text-[9px] text-slate-500 hover:text-slate-300 bg-white/5 hover:bg-white/10 px-2 py-0.5 rounded font-medium smooth-transition uppercase tracking-wider"
                  >
                    {chartMode}
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate(key)}
                    className="text-[10px] text-slate-500 hover:text-white bg-white/5 hover:bg-white/10 px-2 py-0.5 rounded font-medium smooth-transition"
                  >
                    Open
                  </button>
                </div>
              </div>

              {/* KPI Row */}
              <div className="grid grid-cols-3 gap-2 mb-3 shrink-0">
                {data.kpis.slice(0, 3).map((kpi) => (
                  <div key={kpi.id} className="rounded-lg p-2" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                    <p className="text-[8px] text-slate-500 leading-tight mb-0.5 truncate uppercase tracking-wider">{kpi.label}</p>
                    <p className="font-semibold text-white text-[11px] leading-tight">{kpi.value}</p>
                    <span className={`text-[9px] font-semibold ${kpi.isGreen ? 'text-emerald-400' : 'text-red-400'}`}>
                      {kpi.arrow} {kpi.badge}
                    </span>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-1 shrink-0">
                  <p className="text-[10px] text-slate-500 font-medium truncate">{data.chart.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-semibold" style={{ color: accent.main }}>{data.chart.legendVal1}</span>
                    <span className="text-[9px] text-emerald-400 font-semibold">{data.chart.legendBadge1}</span>
                  </div>
                </div>
                <div className="flex-1 min-h-0">
                  <MiniChart
                    values={chartData.map((d) => d.sales)}
                    color={accent.main}
                    rgb={accent.rgb}
                    mode={chartMode}
                    days={chartData.map((d) => d.day)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Status */}
      <footer className="shrink-0 flex items-center justify-between px-5 py-2" style={{ backgroundColor: '#12141c' }}>
        <div className="flex items-center gap-5">
          {[
            { name: 'HQ',         ok: true },
            { name: 'Muangthong', ok: true },
            { name: 'Phuket',     ok: true },
            { name: 'Chiangmai',  ok: true },
          ].map((site) => (
            <div key={site.name} className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${site.ok ? 'bg-emerald-500' : 'bg-red-500'}`} />
              <span className="text-[10px] text-slate-500">{site.name}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-600">Nexus Dashboard &middot; War Room</p>
      </footer>
    </div>
  );
};
