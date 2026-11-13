'use client';

import React, { useState } from 'react';
import { SystemTabKey } from '../types/dashboard';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPrompt: (promptText: string, targetTab?: SystemTabKey) => void;
}

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  onApplyPrompt,
}) => {
  const [inputPrompt, setInputPrompt] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'สวัสดีครับ! ผมคือ Nexus AI Assistant คุณสามารถพิมพ์สั่งปรับแต่ง Widget หรือกรองข้อมูลระบบที่ต้องการได้เลยครับ',
    },
  ]);

  const handleSend = (text: string, targetTab?: SystemTabKey) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInputPrompt('');

    // Simulate AI response
    setTimeout(() => {
      let reply = 'รับทราบคำสั่ง! กำลังปรับแต่งหน้า Dashboard ให้ตามต้องการครับ';
      if (text.includes('VMS') || targetTab === 'vms') {
        reply = 'สลับหน้าจอเป็นระบบผู้มาติดต่อ (VMS) เรียบร้อยครับ';
      } else if (text.includes('ลงเวลา') || targetTab === 'attendance') {
        reply = 'ปรับการแสดงผลเป็นระบบลงเวลาพนักงาน เรียบร้อยครับ';
      } else if (text.includes('War Room') || targetTab === 'warroom') {
        reply = 'เปิดโหมด War Room รวบรวมข้อมูลสดจากทุกระบบ เรียบร้อยครับ';
      } else if (text.includes('การเงิน') || targetTab === 'finance') {
        reply = 'เปลี่ยนข้อมูลเป็นระบบการเงินและงบประมาณ เรียบร้อยครับ';
      } else if (text.includes('HR') || targetTab === 'hr') {
        reply = 'สลับหน้าจอเป็นระบบ HR เรียบร้อยครับ';
      } else if (text.includes('CRM') || targetTab === 'crm') {
        reply = 'สลับหน้าจอเป็นระบบ CRM (ลูกค้าสัมพันธ์) เรียบร้อยครับ';
      } else if (text.includes('CMS') || targetTab === 'cms') {
        reply = 'สลับหน้าจอเป็นระบบ CMS (จัดการเนื้อหา) เรียบร้อยครับ';
      } else if (text.includes('ภาพรวม') || targetTab === 'overview') {
        reply = 'รีเซ็ตกลับเป็นภาพรวมระบบ เรียบร้อยครับ';
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      onApplyPrompt(text, targetTab);
    }, 400);
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-96 bg-white shadow-2xl border-l border-slate-100 p-6 flex flex-col justify-between transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Nexus AI Assistant</h3>
              <p className="text-[11px] text-slate-400">Prompt-to-Dashboard Generator</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Info & Sample Prompt Chips */}
        <div className="mt-4 space-y-3">
          <p className="text-xs text-slate-600 leading-relaxed">
            ผู้ใช้งานสามารถพิมพ์ <b>Prompt</b> เพื่อให้ระบบ AI ปรับแต่งการแสดงผล Dashboard
            หรือกดคำสั่งด่วนด้านล่างนี้:
          </p>

          <div className="space-y-1.5 pt-1">
            <button
              onClick={() => handleSend('เปิดโหมด War Room รวม 7 ไซต์งาน', 'warroom')}
              className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-xs text-slate-700 font-medium smooth-transition border border-slate-100"
            >
              เปิดโหมด War Room (รวม 7 ไซต์งาน)
            </button>
            <button
              onClick={() => handleSend('แสดงระบบการเงิน & เบิกจ่ายโครงการ', 'finance')}
              className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-xs text-slate-700 font-medium smooth-transition border border-slate-100"
            >
              สลับเป็นระบบการเงิน (Finance Overview)
            </button>
            <button
              onClick={() => handleSend('ปรับ Dashboard เป็นระบบลงเวลาไซต์เมืองทอง', 'attendance')}
              className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-xs text-slate-700 font-medium smooth-transition border border-slate-100"
            >
              แสดงข้อมูลระบบลงเวลาพนักงาน ไซต์เมืองทอง
            </button>
            <button
              onClick={() => handleSend('ปรับเป็นระบบผู้มาติดต่อ VMS สนง.ใหญ่', 'vms')}
              className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-xs text-slate-700 font-medium smooth-transition border border-slate-100"
            >
              ปรับเป็นระบบ VMS (ผู้มาติดต่อ สนง.ใหญ่)
            </button>
            <button
              onClick={() => handleSend('รีเซ็ตกลับเป็นภาพรวม General metrics', 'overview')}
              className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-xs text-slate-700 font-medium smooth-transition border border-slate-100"
            >
              รีเซ็ตกลับเป็นภาพรวมระบบ
            </button>
          </div>
        </div>

        {/* Chat Feed */}
        <div className="mt-4 p-3 bg-slate-50 rounded-xl text-xs space-y-2 max-h-48 overflow-y-auto border border-slate-100">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-white text-slate-800 font-semibold border border-slate-200 ml-4'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-100 mr-2'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="pt-4 border-t border-slate-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputPrompt);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="พิมพ์คำสั่งปรับแต่ง Dashboard..."
            className="flex-1 text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          />
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold smooth-transition"
          >
            ส่ง
          </button>
        </form>
      </div>
    </div>
  );
};
