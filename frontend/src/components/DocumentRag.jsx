import React, { useState } from 'react';
import { FileText, Send, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { documentRagQa } from '../services/api';
import { translations } from '../translations/i18n';

export default function DocumentRag({ lang }) {
  const t = translations[lang] || translations.en;

  const sampleAgreement = `RENTAL AGREEMENT LEASE CLAUSES:
1. SECURITY DEPOSIT: The Tenant has paid a security deposit of Rs 50,000. The Landlord shall refund the entire deposit within 15 days of tenant vacating the premises, subject to deduction for actual physical damage beyond normal wear and tear.
2. NOTICE PERIOD: Either party may terminate this agreement by giving 30 days prior written notice. If landlord terminates without 30 days notice, landlord shall pay 1 month rent as compensation.
3. MAINTENANCE & UTILITIES: Electricity, water, and monthly apartment society maintenance fees shall be borne by the Tenant.
4. DISPUTE RESOLUTION: Any dispute arising out of this agreement shall be subject to summary jurisdiction of civil courts in Bangalore.`;

  const [documentText, setDocumentText] = useState(sampleAgreement);
  const [question, setQuestion] = useState('What is the notice period for terminating the lease?');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!documentText.trim() || !question.trim()) return;

    setLoading(true);
    try {
      const data = await documentRagQa({ document_text: documentText, question, lang });
      setResult(data);
    } catch (err) {
      alert("Document RAG Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card animate-fade-in" style={{ padding: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <FileText size={24} color="var(--accent-gold)" />
        <div>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700 }}>
            {t.docRagTitle}
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Paste any agreement/contract text to perform document-level RAG chunking & question answering.
          </p>
        </div>
      </div>

      <form onSubmit={handleAnalyze}>
        {/* Document Textarea */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'block', fontWeight: 600 }}>
            Legal Document / Contract Text:
          </label>
          <textarea
            rows={6}
            value={documentText}
            onChange={(e) => setDocumentText(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(6, 10, 18, 0.85)',
              color: '#fff',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '14px',
              fontFamily: 'monospace',
              fontSize: '0.85rem'
            }}
          />
        </div>

        {/* Question Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', marginBottom: '6px', display: 'block', fontWeight: 600 }}>
            Ask a question about this document:
          </label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. Is security deposit refundable? What is the notice period?"
              style={{
                flex: 1,
                background: 'rgba(15, 23, 42, 0.9)',
                color: '#fff',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '12px 16px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem'
              }}
            />
            <button type="submit" disabled={loading} className="btn-primary">
              <Send size={16} />
              <span>{loading ? 'RAG Indexing...' : 'Ask Document'}</span>
            </button>
          </div>
        </div>
      </form>

      {/* RAG Answer Output */}
      {result && (
        <div className="glass-card animate-fade-in" style={{ padding: '20px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4 style={{ color: '#10b981', fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} /> Document RAG Answer
            </h4>
            <span className="badge-emerald">Grounded Match: {Math.round(result.confidence_score * 100)}%</span>
          </div>

          <p style={{ color: '#e2e8f0', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '14px' }}>
            {result.answer}
          </p>

          {result.grounded_chunks && result.grounded_chunks.length > 0 && (
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '6px' }}>
                Extracted Document Clauses Used as Context:
              </div>
              {result.grounded_chunks.map((c, i) => (
                <div key={i} style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '6px', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>
                  <strong>{c.clause_id}:</strong> {c.text}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
