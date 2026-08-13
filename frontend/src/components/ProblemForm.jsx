import React, { useState } from 'react';
import { Send, Zap, Sparkles } from 'lucide-react';
import { translations } from '../translations/i18n';

export default function ProblemForm({ onSubmit, loading, lang }) {
  const t = translations[lang] || translations.en;
  const [problemText, setProblemText] = useState('');
  const [category, setCategory] = useState('general');

  const presetScenarios = [
    {
      label: lang === 'hi' ? '🏠 मकान मालिक डिपॉजिट नहीं दे रहा' : '🏠 Landlord Refusing Deposit Refund',
      text: 'My landlord in Bangalore is refusing to refund my security deposit of Rs 60,000 after I vacated the apartment in good condition with 1 month prior notice. He is making excuse of repaint costs without bill.',
      cat: 'property'
    },
    {
      label: lang === 'hi' ? '💳 ₹1.5 लाख का चेक बाउंस' : '💳 Cheque Bounce of ₹1,50,000',
      text: 'A business client issued a cheque of Rs 1,50,000 against delivered goods. The bank returned the cheque unpaid with memo stating Insufficient Funds. I want to send formal legal demand notice under Sec 138.',
      cat: 'financial'
    },
    {
      label: lang === 'hi' ? '💼 कंपनी ने सैलरी रोकी' : '💼 Employer Terminated & Withheld Salary',
      text: 'My IT employer terminated me without 30 days notice pay and has withheld 2 months salary plus FnF settlement dues amounting to Rs 1,20,000 despite my clean service record.',
      cat: 'employment'
    },
    {
      label: lang === 'hi' ? '🛡️ ₹35,000 क्रेडिट कार्ड धोखाधड़ी' : '🛡️ Cyber Credit Card Fraud of ₹35,000',
      text: 'I received a fake OTP call pretending to be bank manager and lost Rs 35,000 from my credit card via unauthorized transaction. I reported to bank within 2 hours.',
      cat: 'cyber'
    },
    {
      label: lang === 'hi' ? '🛒 खराब टीवी रिफंड इंकार' : '🛒 E-Commerce Refund Refusal for Defective TV',
      text: 'I ordered a Smart TV worth Rs 42,000 from e-commerce platform. Delivered TV display screen was cracked. Platform customer support is refusing return request claiming 7-day window passed.',
      cat: 'consumer'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!problemText.trim()) return;
    onSubmit(problemText, category);
  };

  const handleSelectPreset = (p) => {
    setProblemText(p.text);
    setCategory(p.cat);
  };

  return (
    <div className="glass-card" style={{ padding: '28px', marginBottom: '28px' }}>
      <form onSubmit={handleSubmit}>
        
        {/* Category bar */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', display: 'block', fontWeight: 600 }}>
            {lang === 'hi' ? 'कानूनी श्रेणी (Legal Category)' : 'Legal Category'}
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(10, 16, 28, 0.95)',
              color: '#ffffff',
              border: '1px solid var(--border-subtle)',
              padding: '11px 14px',
              borderRadius: '8px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.92rem',
              fontWeight: 500,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="general">⚖️ General Civil / Criminal Dispute</option>
            <option value="property">🏠 Property & Landlord-Tenant (Rent Control / RERA Act 2016)</option>
            <option value="employment">💼 Employment & Labour Dispute (Industrial Disputes Act / Shops Act)</option>
            <option value="financial">💳 Financial & Cheque Bounce (Sec 138 NI Act 1881 / BNS 318)</option>
            <option value="cyber">🛡️ Cyber Crime & Financial Fraud (IT Act 2000 Sec 66D / 1930)</option>
            <option value="consumer">🛒 Consumer Protection & Defective Goods (Consumer Act 2019 / 1915)</option>
          </select>
        </div>

        {/* Problem Textarea Intake */}
        <div style={{ marginBottom: '18px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'block', fontWeight: 600 }}>
            {lang === 'hi' ? 'कानूनी समस्या विवरण (State Your Problem):' : 'Describe Your Legal Problem:'}
          </label>
          <textarea
            rows={4}
            value={problemText}
            onChange={(e) => setProblemText(e.target.value)}
            placeholder={t.inputPlaceholder}
            style={{
              width: '100%',
              background: 'rgba(5, 9, 18, 0.95)',
              color: '#ffffff',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '16px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.95rem',
              outline: 'none',
              resize: 'vertical',
              lineHeight: '1.6'
            }}
          />
        </div>

        {/* Quick Presentation Scenarios */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: '#a5b4fc', fontWeight: 600, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={14} color="#818cf8" /> {t.presetHeading}
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {presetScenarios.map((p, idx) => (
              <button
                key={idx}
                type="button"
                className="btn-secondary"
                onClick={() => handleSelectPreset(p)}
                style={{ fontSize: '0.78rem', padding: '6px 12px', borderRadius: '20px' }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={loading || !problemText.trim()}
            className="btn-primary"
            style={{ opacity: loading ? 0.75 : 1, padding: '12px 28px' }}
          >
            {loading ? (
              <><span>RAG Retrieving...</span></>
            ) : (
              <>
                <Send size={17} />
                <span>{t.analyzeBtn}</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
