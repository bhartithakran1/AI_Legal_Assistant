import React from 'react';
import { Scale, Globe, Cpu, Key, ShieldCheck } from 'lucide-react';
import { translations } from '../translations/i18n';

export default function Header({ lang, setLang, onOpenRagInspector, onOpenApiKey }) {
  const t = translations[lang] || translations.en;

  return (
    <header className="glass-card-static" style={{ padding: '16px 28px', marginBottom: '28px', borderRadius: '0 0 16px 16px', borderTop: 'none' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            padding: '10px',
            borderRadius: '10px',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Scale size={24} color="#ffffff" strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                Nyay<span style={{ color: 'var(--accent-indigo)' }}>.ai</span>
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', color: '#34d399', fontWeight: 600 }}>
                <span className="pulse-dot"></span> RAG Online
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Language Switcher */}
          <button 
            className="btn-secondary"
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            style={{ borderColor: 'rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
            title="Toggle English / हिंदी"
          >
            <Globe size={16} />
            <span style={{ fontWeight: 600 }}>{lang === 'en' ? 'हिंदी (Hindi)' : 'English'}</span>
          </button>

          {/* Recruiter RAG Inspector Trigger */}
          <button 
            className="btn-secondary"
            onClick={onOpenRagInspector}
            style={{ background: 'rgba(99, 102, 241, 0.12)', borderColor: 'rgba(99, 102, 241, 0.3)', color: '#a5b4fc' }}
          >
            <Cpu size={16} />
            <span>{t.ragInspectorBtn}</span>
          </button>

          {/* API Key Modal Trigger */}
          <button 
            className="btn-secondary"
            onClick={onOpenApiKey}
            title="Configure OpenAI / Gemini API Key"
          >
            <Key size={16} />
            <span>API Key</span>
          </button>

          <span className="badge-indigo" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} /> BNS 2023 / IPC
          </span>
        </div>

      </div>
    </header>
  );
}
