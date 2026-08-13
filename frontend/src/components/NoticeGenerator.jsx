import React, { useState, useEffect } from 'react';
import { FileText, Copy, Printer, Check } from 'lucide-react';
import { generateNotice } from '../services/api';
import { translations } from '../translations/i18n';

export default function NoticeGenerator({ defaultNoticeType, lang, caseData }) {
  const t = translations[lang] || translations.en;

  const [noticeType, setNoticeType] = useState(defaultNoticeType || 'consumer_complaint');
  const [senderName, setSenderName] = useState('Rahul Sharma');
  const [senderAddress, setSenderAddress] = useState('Flat 402, Sunshine Apartments, Indiranagar, Bangalore - 560038');
  const [recipientName, setRecipientName] = useState('Managing Director / Opposing Party');
  const [recipientAddress, setRecipientAddress] = useState('Plot 12, Corporate Tower, MG Road, Bangalore');
  const [factsSummary, setFactsSummary] = useState('Opposing party failed to refund deposit amount despite repeated written reminders after lease termination.');
  const [amount, setAmount] = useState('60,000');
  const [copied, setCopied] = useState(false);

  const [noticeResult, setNoticeResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await generateNotice({
        notice_type: noticeType,
        sender_name: senderName,
        sender_address: senderAddress,
        recipient_name: recipientName,
        recipient_address: recipientAddress,
        facts_summary: factsSummary,
        amount_disputed: amount,
        lang
      });
      setNoticeResult(data);
    } catch (err) {
      alert("Notice Generator Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGenerate();
  }, [noticeType]);

  const handleCopyText = () => {
    if (!noticeResult) return;
    navigator.clipboard.writeText(noticeResult.notice_body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="glass-card animate-fade-in" style={{ padding: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <FileText size={24} color="var(--accent-gold)" />
        <div>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700 }}>
            {t.noticeGeneratorTitle}
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Auto-generate customizable 15-day Legal Demand Notice under Indian statutes.
          </p>
        </div>
      </div>

      {/* Select Notice Type */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {[
          { id: 'landlord_deposit', label: '🏠 Landlord Security Deposit Notice' },
          { id: 'cheque_bounce', label: '💳 Sec 138 NI Act Cheque Bounce Notice' },
          { id: 'salary_demand', label: '💼 Unpaid Salary Recovery Notice' },
          { id: 'consumer_complaint', label: '🛒 Consumer Forum Demand Notice' }
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            className="btn-secondary"
            onClick={() => setNoticeType(item.id)}
            style={{
              borderColor: noticeType === item.id ? 'var(--accent-gold)' : 'var(--border-subtle)',
              color: noticeType === item.id ? 'var(--accent-gold)' : '#fff',
              background: noticeType === item.id ? 'rgba(230, 161, 0, 0.15)' : 'rgba(255,255,255,0.03)'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Form Fields Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '20px' }}>
        <div>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Sender Name:</label>
          <input type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} style={{ width: '100%', background: 'rgba(15,23,42,0.9)', color: '#fff', border: '1px solid var(--border-subtle)', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
        </div>
        <div>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Recipient / Opposing Party Name:</label>
          <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} style={{ width: '100%', background: 'rgba(15,23,42,0.9)', color: '#fff', border: '1px solid var(--border-subtle)', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
        </div>
        <div>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Disputed Amount (Rs):</label>
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: '100%', background: 'rgba(15,23,42,0.9)', color: '#fff', border: '1px solid var(--border-subtle)', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
        </div>
      </div>

      <button onClick={handleGenerate} disabled={loading} className="btn-primary" style={{ marginBottom: '20px' }}>
        {loading ? 'Generating Notice...' : 'Update Legal Notice Draft'}
      </button>

      {/* Generated Output Area */}
      {noticeResult && (
        <div style={{ background: '#080d1a', border: '1px solid var(--border-gold)', borderRadius: '12px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <h4 style={{ color: 'var(--accent-gold)', fontSize: '1rem', fontWeight: 700 }}>
              {noticeResult.notice_title}
            </h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleCopyText} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : t.copyNotice}</span>
              </button>
            </div>
          </div>

          <pre style={{
            background: '#04070d',
            padding: '16px',
            borderRadius: '8px',
            color: '#e2e8f0',
            fontSize: '0.85rem',
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
            lineHeight: '1.6',
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {noticeResult.notice_body}
          </pre>

          <div style={{ marginTop: '14px', fontSize: '0.8rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '6px' }}>
            💡 <strong>Dispatch Instructions:</strong> {noticeResult.instructions}
          </div>
        </div>
      )}

    </div>
  );
}
