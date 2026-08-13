import React from 'react';
import { User, Gavel } from 'lucide-react';
import { translations } from '../translations/i18n';

export default function PersonaToggle({ mode, setMode, lang }) {
  const t = translations[lang] || translations.en;

  return (
    <div className="glass-card-static" style={{ padding: '6px', marginBottom: '24px', display: 'flex', gap: '6px', background: 'rgba(10, 16, 28, 0.9)', borderRadius: '12px' }}>
      {/* Citizen Mode */}
      <button
        onClick={() => setMode('citizen')}
        style={{
          flex: 1,
          padding: '14px 18px',
          borderRadius: '8px',
          border: mode === 'citizen' ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid transparent',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          background: mode === 'citizen' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
          color: mode === 'citizen' ? '#ffffff' : 'var(--text-muted)'
        }}
      >
        <User size={20} color={mode === 'citizen' ? '#818cf8' : 'var(--text-muted)'} />
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontWeight: 700, fontSize: '0.92rem', color: mode === 'citizen' ? '#ffffff' : 'var(--text-muted)' }}>{t.citizenMode}</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{t.citizenModeDesc}</div>
        </div>
      </button>

      {/* Lawyer / Advocate Mode */}
      <button
        onClick={() => setMode('lawyer')}
        style={{
          flex: 1,
          padding: '14px 18px',
          borderRadius: '8px',
          border: mode === 'lawyer' ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid transparent',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          background: mode === 'lawyer' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
          color: mode === 'lawyer' ? '#ffffff' : 'var(--text-muted)'
        }}
      >
        <Gavel size={20} color={mode === 'lawyer' ? '#818cf8' : 'var(--text-muted)'} />
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontWeight: 700, fontSize: '0.92rem', color: mode === 'lawyer' ? '#ffffff' : 'var(--text-muted)' }}>{t.lawyerMode}</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{t.lawyerModeDesc}</div>
        </div>
      </button>
    </div>
  );
}
