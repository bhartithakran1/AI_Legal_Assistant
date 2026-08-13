import React from 'react';
import { PhoneCall, ShieldAlert, ShoppingBag, Scale } from 'lucide-react';
import { translations } from '../translations/i18n';

export default function HelplineCards({ lang }) {
  const t = translations[lang] || translations.en;

  const helplines = [
    {
      name: lang === 'hi' ? 'साइबर क्राइम हेल्पलाइन' : 'Cyber Crime Helpline',
      number: '1930',
      desc: lang === 'hi' ? 'ऑनलाइन धोखाधड़ी और यूपीआई स्कैम तुरंत रिपोर्ट करें' : 'Report online bank fraud & UPI scams immediately',
      icon: <ShieldAlert size={22} color="#f43f5e" />,
      portal: 'cybercrime.gov.in'
    },
    {
      name: lang === 'hi' ? 'राष्ट्रीय उपभोक्ता हेल्पलाइन' : 'National Consumer Helpline',
      number: '1915',
      desc: lang === 'hi' ? 'ई-कॉमर्स, रिफंड और खराब उत्पाद शिकायतें' : 'Free e-commerce, refund & product defect grievances',
      icon: <ShoppingBag size={22} color="#f59e0b" />,
      portal: 'consumerhelpline.gov.in'
    },
    {
      name: lang === 'hi' ? 'नालसा मुफ्त कानूनी सहायता' : 'NALSA Free Legal Aid',
      number: '15100',
      desc: lang === 'hi' ? 'पात्र नागरिकों के लिए सरकारी मुफ्त वकील' : 'Government free legal advocate representation',
      icon: <Scale size={22} color="#10b981" />,
      portal: 'nalsa.gov.in'
    }
  ];

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <PhoneCall size={18} color="var(--accent-gold)" />
        {t.helplinesHeading}
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
        {helplines.map((h, idx) => (
          <div key={idx} style={{
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '10px',
            padding: '16px',
            display: 'flex',
            gap: '12px'
          }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
              {h.icon}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>
                {h.name}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-gold)', margin: '2px 0' }}>
                📞 {h.number}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {h.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
