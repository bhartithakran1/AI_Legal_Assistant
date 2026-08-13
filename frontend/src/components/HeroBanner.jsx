import React from 'react';
import { Sparkles, BookOpen, FileCheck, Gavel, ShieldCheck } from 'lucide-react';
import { translations } from '../translations/i18n';

export default function HeroBanner({ lang }) {
  const t = translations[lang] || translations.en;

  return (
    <div className="glass-card" style={{
      padding: '28px 32px',
      marginBottom: '28px',
      background: 'linear-gradient(135deg, rgba(16, 24, 42, 0.9) 0%, rgba(24, 35, 60, 0.8) 100%)',
      border: '1px solid var(--border-subtle)'
    }}>
      <div style={{ maxWidth: '880px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }} className="badge-indigo">
          <Sparkles size={13} /> Full-Stack RAG Indian Legal AI Engine
        </div>
        
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px', lineHeight: '1.25' }}>
          {lang === 'hi' ? 'भारतीय कानूनों की सरल, सटीक और अधिकार-आधारित AI व्याख्या' : 'Democratizing Indian Law with Intelligent RAG AI'}
        </h2>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.6' }}>
          {lang === 'hi'
            ? 'अपनी कानूनी समस्या हिंदी या अंग्रेजी में दर्ज करें। हमारा RAG इंजन BNS 2023, IPC, IT Act, NI Act 138 और कंज्यूमर एक्ट से सटीक धाराएं और 4-चरणीय कार्ययोजना प्रदान करता है।'
            : 'State your legal problem in plain English or Hindi. Powered by FastAPI, FAISS vector similarity over Bharatiya Nyaya Sanhita (BNS 2023), IPC, IT Act & NI Act 138, delivering actionable rights, legal notice drafts & document QA.'}
        </p>

        {/* Feature Chips Grid */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#cbd5e1', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', padding: '7px 12px', borderRadius: '8px' }}>
            <BookOpen size={15} color="#818cf8" /> BNS 2023 & IPC Mapping
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#cbd5e1', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', padding: '7px 12px', borderRadius: '8px' }}>
            <FileCheck size={15} color="#34d399" /> 1-Click Legal Notice Drafts
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#cbd5e1', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', padding: '7px 12px', borderRadius: '8px' }}>
            <Gavel size={15} color="#a5b4fc" /> Supreme Court Precedents
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#cbd5e1', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', padding: '7px 12px', borderRadius: '8px' }}>
            <ShieldCheck size={15} color="#38bdf8" /> Official indiacode.nic.in Sources
          </div>
        </div>
      </div>
    </div>
  );
}
