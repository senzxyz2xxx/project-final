'use client';

import React, { useState, useCallback } from 'react';
import { Sidebar, SITES } from '../components/Sidebar';
import { Header } from '../components/Header';
import { MetricCards } from '../components/MetricCards';
import { SalesReturnsChart } from '../components/SalesReturnsChart';
import { ConversionFunnelChart } from '../components/ConversionFunnelChart';
import { SessionsGauge } from '../components/SessionsGauge';
import { TrafficSourcesCard } from '../components/TrafficSourcesCard';
import { RegionalSalesTable } from '../components/RegionalSalesTable';
import { AIAssistantDrawer } from '../components/AIAssistantDrawer';
import { LoginScreen } from '../components/LoginScreen';
import { WarRoomMultiPanel } from '../components/WarRoomMultiPanel';
import { AdminPanel } from '../components/AdminPanel';
import { DeveloperPanel } from '../components/DeveloperPanel';
import { mockSystemsData } from '../data/mockData';
import { SystemTabKey, UserRole, SiteKey, UserAccount } from '../types/dashboard';
import { defaultUsers, ALL_SYSTEMS_LIST, ALL_SITES_LIST } from '../data/permissions';

export default function DashboardPage() {
  const [role, setRole]               = useState<UserRole | null>(null);
  const [currentTab, setCurrentTab]   = useState<SystemTabKey>('overview');
  const [currentSite, setCurrentSite] = useState<SiteKey>('hq');
  const [isAIOpen, setIsAIOpen]       = useState(false);
  const [editMode]                     = useState(false);

  const [users, setUsers] = useState<UserAccount[]>(defaultUsers);
  const [activeUserId, setActiveUserId] = useState<string>('u3');

  const activeUser = users.find((u) => u.id === activeUserId);
  const userPermissions = activeUser
    ? { allowedSites: activeUser.allowedSites, allowedSystems: activeUser.allowedSystems }
    : { allowedSites: ALL_SITES_LIST, allowedSystems: ALL_SYSTEMS_LIST };

  const handleSelectRole = useCallback((r: UserRole) => {
    setRole(r);
    if (r === 'user') {
      setActiveUserId('u1');
      setCurrentTab('overview');
    }
  }, []);

  const handleUpdateUser = useCallback((userId: string, updates: Partial<Pick<UserAccount, 'allowedSites' | 'allowedSystems' | 'status'>>) => {
    setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, ...updates } : u));
  }, []);

  const handleSelectTab = useCallback((tab: SystemTabKey) => {
    if (tab === 'warroom' || tab === 'overview') {
      setCurrentTab(tab);
      return;
    }
    if (role === 'user' && !userPermissions.allowedSystems.includes(tab)) {
      return;
    }
    setCurrentTab(tab);
  }, [role, userPermissions.allowedSystems]);

  if (!role) return <LoginScreen onSelectRole={handleSelectRole} />;
  if (role === 'admin') return (
    <AdminPanel
      onBack={() => setRole(null)}
      users={users}
      onUpdateUser={handleUpdateUser}
    />
  );
  if (role === 'developer') return <DeveloperPanel onBack={() => setRole(null)} />;

  // War Room: fullscreen overlay
  if (currentTab === 'warroom') {
    return (
      <WarRoomMultiPanel
        onNavigate={(tab) => { setCurrentTab(tab); }}
        onExit={() => setCurrentTab('overview')}
      />
    );
  }

  // User Dashboard
  const currentData = mockSystemsData[currentTab] ?? mockSystemsData.overview;
  const activeSite = SITES.find((s) => s.key === currentSite) ?? SITES[0];

  const handleApplyAIPrompt = (promptText: string, targetTab?: SystemTabKey) => {
    if (targetTab) { handleSelectTab(targetTab); return; }
    if (promptText.includes('VMS'))      { handleSelectTab('vms');        return; }
    if (promptText.includes('ลงเวลา'))   { handleSelectTab('attendance'); return; }
    if (promptText.includes('War Room')) { handleSelectTab('warroom');    return; }
    if (promptText.includes('การเงิน'))  { handleSelectTab('finance');    return; }
    if (promptText.includes('HR'))       { handleSelectTab('hr');         return; }
    if (promptText.includes('CRM'))      { handleSelectTab('crm');       return; }
    if (promptText.includes('CMS'))      { handleSelectTab('cms');       return; }
    setCurrentTab('overview');
  };

  return (
    <div className="w-full max-w-[1580px] flex gap-4 xl:gap-5 items-stretch relative">
      <Sidebar
        currentTab={currentTab}
        currentSite={currentSite}
        role={role}
        onSelectTab={handleSelectTab}
        onSelectSite={setCurrentSite}
        onOpenAI={() => setIsAIOpen(true)}
        onBack={() => setRole(null)}
        allowedSystems={userPermissions.allowedSystems}
        allowedSites={userPermissions.allowedSites}
      />

      <main className="flex-1 flex flex-col gap-4 min-w-0">
        <Header
          title={currentData.title}
          brand={currentData.brand}
          siteName={activeSite.label}
          currentTab={currentTab}
          editMode={editMode}
          onToggleEditMode={() => {}}
          onSelectTab={handleSelectTab}
          onOpenAI={() => setIsAIOpen(true)}
        />

        <MetricCards kpis={currentData.kpis} />

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <SalesReturnsChart
            title={currentData.chart.title}
            sub={currentData.chart.sub}
            legend1={currentData.chart.legend1}
            legendVal1={currentData.chart.legendVal1}
            legendBadge1={currentData.chart.legendBadge1}
            legend2={currentData.chart.legend2}
            legendVal2={currentData.chart.legendVal2}
            legendBadge2={currentData.chart.legendBadge2}
            days={currentData.chart.days}
          />
          <ConversionFunnelChart
            title={currentData.funnel.title}
            sub={currentData.funnel.sub}
            conversionRate={currentData.funnel.conversionRate}
            conversionBadge={currentData.funnel.conversionBadge}
            stages={currentData.funnel.stages}
          />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
          <SessionsGauge
            title={currentData.sessions.title}
            uniqueUsers={currentData.sessions.uniqueUsers}
            uniqueLabel={currentData.sessions.uniqueLabel}
            totalSessions={currentData.sessions.totalSessions}
            totalLabel={currentData.sessions.totalLabel}
            gaugePercentage={currentData.sessions.gaugePercentage}
          />
          <TrafficSourcesCard
            title={currentData.traffic.title}
            spend={currentData.traffic.spend}
            cpa={currentData.traffic.cpa}
            impressions={currentData.traffic.impressions}
            clicks={currentData.traffic.clicks}
            sources={currentData.traffic.sources}
          />
          <RegionalSalesTable
            title={currentData.regions.title}
            rows={currentData.regions.rows}
          />
        </section>

        <footer className="pt-2 pb-4 text-xs text-slate-400 flex items-center justify-between">
          <span>The Nexus Dashboard Framework &bull; Next.js + Tailwind CSS</span>
          <button
            onClick={() => setIsAIOpen(true)}
            className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Nexus AI Prompt Assistant</span>
          </button>
        </footer>
      </main>

      <AIAssistantDrawer
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onApplyPrompt={handleApplyAIPrompt}
      />
    </div>
  );
}
