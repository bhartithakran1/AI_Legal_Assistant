import React, { useState } from 'react';
import { User, Gavel, FileText, Search, Printer, Cpu, ShieldCheck, Award } from 'lucide-react';
import CitizenView from './CitizenView';
import LawyerView from './LawyerView';
import DocumentRag from './DocumentRag';
import NoticeGenerator from './NoticeGenerator';
import SectionSearch from './SectionSearch';
import { exportLegalReportToPrint } from '../services/pdfExport';
import { translations } from '../translations/i18n';

export default function SolutionDashboard({ caseData, mode, lang, onOpenRagInspector }) {
  const t = translations[lang] || translations.en;
  const [activeTab, setActiveTab] = useState('solution');
  const [selectedNoticeType, setSelectedNoticeType] = useState(caseData?.suggested_notice_template || 'consumer_complaint');

  if (!caseData) return null;

  const winScore = caseData.win_probability_score || 80;

  const handleOpenNotice = (type) => {
    setSelectedNoticeType(type || 'consumer_complaint');
    setActiveTab('notice');
  };

  return (
    <div className="glass-card animate-fade-in" style={{ padding: '28px', marginBottom: '40px' }}>
      
      {/* Top Title & Win Score Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge-indigo">
              {caseData.category.toUpperCase()} DISPUTE
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              ID: {caseData.problem_id}
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
            {lang === 'hi' ? 'कानूनी विश्लेषण एवं कार्ययोजना (Case Diagnostic Report)' : 'Grounded Legal Diagnostic & Advisory Solution'}
          </h2>
        </div>

        {/* Win Score Badge & PDF Print */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '8px 16px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Award size={22} color="#34d399" />
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.winProbability}</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#34d399', lineHeight: '1.1' }}>
                {winScore}%
              </div>
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={() => exportLegalReportToPrint(caseData, lang)}
            style={{ fontSize: '0.85rem' }}
          >
            <Printer size={16} />
            <span>{t.downloadNoticePdf}</span>
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('solution')}
          className="btn-secondary"
          style={{
            borderColor: activeTab === 'solution' ? 'rgba(99, 102, 241, 0.4)' : 'transparent',
            color: activeTab === 'solution' ? '#ffffff' : 'var(--text-muted)',
            background: activeTab === 'solution' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
            fontWeight: activeTab === 'solution' ? 700 : 500
          }}
        >
          {mode === 'citizen' ? <User size={16} color={activeTab === 'solution' ? '#818cf8' : 'var(--text-muted)'} /> : <Gavel size={16} color={activeTab === 'solution' ? '#818cf8' : 'var(--text-muted)'} />}
          <span>{mode === 'citizen' ? (lang === 'hi' ? 'नागरिक सलाह (Citizen View)' : 'Citizen Legal Guidance') : (lang === 'hi' ? 'वकील विश्लेषण (Lawyer View)' : 'Lawyer Statutory View')}</span>
        </button>

        <button
          onClick={() => setActiveTab('doc_rag')}
          className="btn-secondary"
          style={{
            borderColor: activeTab === 'doc_rag' ? 'rgba(99, 102, 241, 0.4)' : 'transparent',
            color: activeTab === 'doc_rag' ? '#ffffff' : 'var(--text-muted)',
            background: activeTab === 'doc_rag' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
            fontWeight: activeTab === 'doc_rag' ? 700 : 500
          }}
        >
          <FileText size={16} color={activeTab === 'doc_rag' ? '#818cf8' : 'var(--text-muted)'} />
          <span>{t.docRagTab}</span>
        </button>

        <button
          onClick={() => setActiveTab('notice')}
          className="btn-secondary"
          style={{
            borderColor: activeTab === 'notice' ? 'rgba(99, 102, 241, 0.4)' : 'transparent',
            color: activeTab === 'notice' ? '#ffffff' : 'var(--text-muted)',
            background: activeTab === 'notice' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
            fontWeight: activeTab === 'notice' ? 700 : 500
          }}
        >
          <FileText size={16} color={activeTab === 'notice' ? '#818cf8' : 'var(--text-muted)'} />
          <span>{t.noticeTab}</span>
        </button>

        <button
          onClick={() => setActiveTab('search')}
          className="btn-secondary"
          style={{
            borderColor: activeTab === 'search' ? 'rgba(99, 102, 241, 0.4)' : 'transparent',
            color: activeTab === 'search' ? '#ffffff' : 'var(--text-muted)',
            background: activeTab === 'search' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
            fontWeight: activeTab === 'search' ? 700 : 500
          }}
        >
          <Search size={16} color={activeTab === 'search' ? '#818cf8' : 'var(--text-muted)'} />
          <span>{t.searchTab}</span>
        </button>
      </div>

      {/* Tab Content Display */}
      {activeTab === 'solution' && (
        mode === 'citizen' ? (
          <CitizenView citizenData={caseData.citizen_view} lang={lang} onSelectNotice={handleOpenNotice} />
        ) : (
          <LawyerView lawyerData={caseData.lawyer_view} lang={lang} />
        )
      )}

      {activeTab === 'doc_rag' && <DocumentRag lang={lang} />}

      {activeTab === 'notice' && <NoticeGenerator defaultNoticeType={selectedNoticeType} lang={lang} caseData={caseData} />}

      {activeTab === 'search' && <SectionSearch lang={lang} />}

    </div>
  );
}
