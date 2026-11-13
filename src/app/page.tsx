'use client';

import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { MetricCards } from '../components/MetricCards';
import { SalesReturnsChart } from '../components/SalesReturnsChart';
import { ConversionFunnelChart } from '../components/ConversionFunnelChart';
import { SessionsGauge } from '../components/SessionsGauge';
import { TrafficSourcesCard } from '../components/TrafficSourcesCard';
import { RegionalSalesTable } from '../components/RegionalSalesTable';
import { AIAssistantDrawer } from '../components/AIAssistantDrawer';
import { mockSystemsData } from '../data/mockData';
import { SystemTabKey } from '../types/dashboard';

export default function DashboardPage() {
  const [currentTab, setCurrentTab] = useState<SystemTabKey>('overview');
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Retrieve mock data for current system
  const currentData = mockSystemsData[currentTab] || mockSystemsData.overview;

  const handleApplyAIPrompt = (promptText: string, targetTab?: SystemTabKey) => {
    if (targetTab) {
      setCurrentTab(targetTab);
    } else {
      if (promptText.includes('VMS')) setCurrentTab('vms');
      else if (promptText.includes('ลงเวลา')) setCurrentTab('attendance');
      else if (promptText.includes('War Room')) setCurrentTab('warroom');
      else if (promptText.includes('การเงิน')) setCurrentTab('finance');
      else if (promptText.includes('HR')) setCurrentTab('hr');
      else setCurrentTab('overview');
    }
  };

  return (
    <div className="w-full max-w-[1580px] flex gap-4 xl:gap-5 items-stretch relative">
      {/* 1. Sidebar Matching User Uploaded Screenshot */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        onOpenAI={() => setIsAIOpen(true)}
      />

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Top Header Bar */}
        <Header
          title={currentData.title}
          brand={currentData.brand}
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
          onOpenAI={() => setIsAIOpen(true)}
        />

        {/* Top 5 Metric Cards */}
        <MetricCards kpis={currentData.kpis} />

        {/* Middle Section: Sales & Returns Chart + Funnel Bar Chart */}
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

        {/* Bottom Section: Sessions Gauge + Traffic Sources + Regional Sales */}
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

        {/* Footer */}
        <footer className="pt-2 pb-4 text-center text-xs text-slate-400 flex items-center justify-between">
          <span>The Nexus Dashboard Framework • Next.js + Tailwind CSS</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAIOpen(true)}
              className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1"
            >
              <span>✨</span>
              <span>Nexus AI Prompt Assistant</span>
            </button>
          </div>
        </footer>
      </main>

      {/* 3. AI Assistant Slide-over Drawer */}
      <AIAssistantDrawer
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onApplyPrompt={handleApplyAIPrompt}
      />
    </div>
  );
}
