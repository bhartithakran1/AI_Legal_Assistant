import React from 'react';
import { BookOpen, Scale, Landmark, Shield, FileSpreadsheet } from 'lucide-react';
import { translations } from '../translations/i18n';

export default function LawyerView({ lawyerData, lang }) {
  const t = translations[lang] || translations.en;

  if (!lawyerData) return null;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Offense Classification Badge Grid */}
      <div className="glass-card" style={{ padding: '20px', background: 'rgba(79, 70, 229, 0.08)', border: '1px solid rgba(79, 70, 229, 0.25)' }}>
        <h3 style={{ fontSize: '1rem', color: '#818cf8', marginBottom: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={18} /> Criminal & Civil Classification (BNSS / CrPC Procedural Matrix)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bailability:</span>
            <div style={{ fontWeight: 700, color: '#f59e0b', fontSize: '0.9rem', marginTop: '2px' }}>
              {lawyerData.offense_nature.bailable}
            </div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cognizance:</span>
            <div style={{ fontWeight: 700, color: '#10b981', fontSize: '0.9rem', marginTop: '2px' }}>
              {lawyerData.offense_nature.cognizable}
            </div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Competent Court:</span>
            <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.85rem', marginTop: '2px' }}>
              {lawyerData.offense_nature.court_competent}
            </div>
          </div>
        </div>
      </div>

      {/* Statutory Provisions */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--accent-gold)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen size={20} color="var(--accent-gold)" />
          {t.lawyerStatutesHeading}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {lawyerData.statutory_provisions.map((item, idx) => (
            <div key={idx} style={{
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(230, 161, 0, 0.25)',
              borderRadius: '10px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, color: 'var(--accent-gold)', fontSize: '1rem' }}>
                  {item.code}
                </span>
                <span className="badge-indigo">RAG Match: {item.match_confidence}</span>
              </div>
              <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.92rem', marginBottom: '6px' }}>
                {item.act} — {item.title}
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Landmark Precedents */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Landmark size={20} color="#818cf8" />
          {t.lawyerPrecedentsHeading}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {lawyerData.landmark_precedents.map((p, idx) => (
            <div key={idx} style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '16px'
            }}>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem', marginBottom: '4px' }}>
                {p.case_name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', marginBottom: '8px' }}>
                {p.court} ({p.year})
              </div>
              <p style={{ fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '8px', lineHeight: '1.4' }}>
                <strong>Holding:</strong> {p.key_holding}
              </p>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <strong>Relevance:</strong> {p.relevance}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prosecution vs Defense Strategy */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        {/* Defense Strategy */}
        <div className="glass-card" style={{ padding: '20px', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
          <h4 style={{ color: '#10b981', fontSize: '1rem', marginBottom: '12px', fontWeight: 600 }}>
            🛡️ Defense Strategy Pointers
          </h4>
          <ul style={{ paddingLeft: '18px', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.6' }}>
            {lawyerData.defense_strategy.map((d, i) => <li key={i} style={{ marginBottom: '6px' }}>{d}</li>)}
          </ul>
        </div>

        {/* Prosecution Points */}
        <div className="glass-card" style={{ padding: '20px', borderColor: 'rgba(244, 63, 94, 0.3)' }}>
          <h4 style={{ color: '#f43f5e', fontSize: '1rem', marginBottom: '12px', fontWeight: 600 }}>
            ⚖️ Prosecution & Argument Points
          </h4>
          <ul style={{ paddingLeft: '18px', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.6' }}>
            {lawyerData.prosecution_points.map((p, i) => <li key={i} style={{ marginBottom: '6px' }}>{p}</li>)}
          </ul>
        </div>

      </div>

    </div>
  );
}
