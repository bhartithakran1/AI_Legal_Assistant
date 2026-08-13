import React from 'react';
import { ShieldCheck, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { translations } from '../translations/i18n';
import HelplineCards from './HelplineCards';

export default function CitizenView({ citizenData, lang, onSelectNotice }) {
  const t = translations[lang] || translations.en;

  if (!citizenData) return null;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Legal Summary Banner */}
      <div className="glass-card" style={{ padding: '20px', borderLeft: '4px solid var(--accent-indigo)', background: 'rgba(99, 102, 241, 0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <ShieldCheck size={24} color="#818cf8" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h3 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '6px', fontWeight: 700 }}>
              {lang === 'hi' ? 'कानूनी सारांश (Legal Assessment Summary)' : 'Case Diagnostic Summary'}
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: '1.6' }}>
              {citizenData.legal_summary}
            </p>
          </div>
        </div>
      </div>

      {/* Fundamental Legal Rights */}
      <div className="glass-card" style={{ padding: '22px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
          <CheckCircle2 size={18} color="#34d399" />
          {t.rightsHeading}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
          {citizenData.rights_breakdown.map((right, idx) => (
            <div key={idx} style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              padding: '12px 14px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px'
            }}>
              <span style={{ color: '#34d399', fontWeight: 700, fontSize: '0.9rem' }}>•</span>
              <span style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.5 }}>{right}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Roadmap */}
      <div className="glass-card" style={{ padding: '22px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#ffffff', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
          <ArrowRight size={18} color="#818cf8" />
          {t.actionPlanHeading}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {citizenData.action_plan.map((step) => (
            <div key={step.step_number} style={{
              background: 'rgba(10, 16, 28, 0.8)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '16px',
              display: 'flex',
              gap: '14px',
              alignItems: 'flex-start'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                color: '#ffffff',
                fontWeight: 800,
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '0.95rem'
              }}>
                {step.step_number}
              </div>

              <div style={{ flex: 1 }}>
                <h4 style={{ color: '#ffffff', fontSize: '0.95rem', marginBottom: '4px', fontWeight: 700 }}>
                  {step.title}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: '1.5' }}>
                  {step.description}
                </p>

                {step.action_type === 'notice' && (
                  <button
                    className="btn-secondary"
                    onClick={() => onSelectNotice(citizenData.recommended_notice_type || 'consumer_complaint')}
                    style={{ marginTop: '10px', fontSize: '0.78rem', padding: '5px 10px', borderColor: 'rgba(99, 102, 241, 0.4)', color: '#a5b4fc' }}
                  >
                    <FileText size={13} />
                    <span>{lang === 'hi' ? 'लीगल नोटिस ड्राफ्ट खोलें (Open Notice Generator)' : 'Generate Draft Legal Notice'}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Helplines */}
      <HelplineCards lang={lang} />

    </div>
  );
}
