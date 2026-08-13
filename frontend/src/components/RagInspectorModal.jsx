import React from 'react';
import { X, Cpu, Database, CheckCircle, Zap, Code, ShieldCheck, Layers, Eye, Binary, ExternalLink } from 'lucide-react';

export default function RagInspectorModal({ isOpen, onClose, ragData }) {
  if (!isOpen) return null;

  const data = ragData || {
    query_processed: "Sample legal problem query",
    extracted_keywords: ["cheque", "bounce", "section", "138", "demand", "notice"],
    embedding_model: "OpenAI text-embedding-3-small (1536-dimensional)",
    similarity_algorithm: "Cosine Similarity (FAISS Vector Index)",
    total_corpus_chunks: 10,
    total_chunks_searched: 10,
    chunks_returned_count: 3,
    search_summary_stat: "Searched 10 statutory chunks, returned Top 3",
    top_k_retrieved: [
      {
        section_code: "NI Act Section 138",
        act_title: "Negotiable Instruments Act 1881",
        title: "Dishonour of Cheque for Insufficiency of Funds",
        text_snippet: "Where any cheque drawn by a person on an account maintained by him with a banker for payment of any amount of money is returned by the bank unpaid...",
        similarity_score: 0.94,
        relevance_reason: "Matched: cheque, bounce, notice, insufficient funds",
        source_name: "India Code (indiacode.nic.in)",
        official_citation: "Act No. 26 of 1881, Ministry of Law & Justice, Govt. of India",
        source_url: "https://www.indiacode.nic.in"
      },
      {
        section_code: "BNS Section 318(4) / IPC 420",
        act_title: "Bharatiya Nyaya Sanhita 2023",
        title: "Cheating and Dishonestly Inducing Delivery of Property",
        text_snippet: "Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person shall be punished with imprisonment up to 7 years...",
        similarity_score: 0.86,
        relevance_reason: "Matched: cheating, dishonest inducement, financial loss",
        source_name: "India Code (indiacode.nic.in)",
        official_citation: "BNS Act No. 45 of 2023, Legislative Dept, Govt. of India",
        source_url: "https://www.indiacode.nic.in"
      }
    ],
    execution_time_ms: 1.25,
    augmented_prompt_snippet: "SYSTEM PROMPT CONTEXT PAYLOAD:\nEmbedding Model: OpenAI text-embedding-3-small (1536-dim)\nAlgorithm: Cosine Similarity via FAISS Index..."
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(2, 6, 23, 0.88)',
      backdropFilter: 'blur(14px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-card animate-fade-in" style={{
        width: '100%',
        maxWidth: '920px',
        maxHeight: '92vh',
        overflowY: 'auto',
        border: '1px solid rgba(79, 70, 229, 0.45)',
        padding: '28px',
        background: '#0a101d'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'rgba(79, 70, 229, 0.2)', padding: '10px', borderRadius: '10px' }}>
              <Cpu size={26} color="#818cf8" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
                RAG Architecture & Official Inspector <span className="badge-indigo" style={{ fontSize: '0.7rem' }}>Recruiter Showcase</span>
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Deep inspection of Vector Embedding Models, FAISS Cosine Similarity, Search vs Retrieval metrics, and Official Government Source Citations
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* Technical Architecture Metric Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          
          {/* Card 1: Embedding Model */}
          <div style={{ background: 'rgba(15, 23, 42, 0.9)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(230, 161, 0, 0.3)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
              <Binary size={14} /> Embedding Model
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginTop: '4px' }}>
              {data.embedding_model || "OpenAI text-embedding-3-small (1536-dim)"}
            </div>
          </div>

          {/* Card 2: Similarity Algorithm */}
          <div style={{ background: 'rgba(15, 23, 42, 0.9)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(79, 70, 229, 0.3)' }}>
            <div style={{ fontSize: '0.72rem', color: '#818cf8', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
              <Layers size={14} /> Vector Similarity Algorithm
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginTop: '4px' }}>
              {data.similarity_algorithm || "Cosine Similarity via FAISS Index"}
            </div>
          </div>

          {/* Card 3: Chunks Searched vs Returned */}
          <div style={{ background: 'rgba(15, 23, 42, 0.9)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ fontSize: '0.72rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
              <Database size={14} /> Search vs Retrieval Metric
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981', marginTop: '4px' }}>
              {data.search_summary_stat || `Searched ${data.total_corpus_chunks || 10} chunks, returned Top ${data.top_k_retrieved ? data.top_k_retrieved.length : 3}`}
            </div>
          </div>

          {/* Card 4: Execution Latency */}
          <div style={{ background: 'rgba(15, 23, 42, 0.9)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
              <Zap size={14} color="#f59e0b" /> Vector Query Latency
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f59e0b', marginTop: '2px' }}>
              {data.execution_time_ms} ms
            </div>
          </div>

        </div>

        {/* Official Government Data Source Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.12) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '10px',
          padding: '12px 18px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={20} color="#10b981" />
            <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>
              Grounded in Credible Government Legal Portals: <span style={{ color: 'var(--accent-gold)' }}>India Code (indiacode.nic.in) & Ministry of Law</span>
            </div>
          </div>
          <a
            href="https://www.indiacode.nic.in"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: '0.78rem', color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontWeight: 600 }}
          >
            Visit indiacode.nic.in <ExternalLink size={12} />
          </a>
        </div>

        {/* Extracted Tokens Bar */}
        <div style={{ marginBottom: '20px', background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', marginBottom: '6px', fontWeight: 600 }}>
            Query Tokenization & Feature Extraction:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {data.extracted_keywords.map((word, idx) => (
              <span key={idx} style={{ background: 'rgba(230, 161, 0, 0.12)', color: '#f59e0b', padding: '3px 10px', borderRadius: '6px', fontSize: '0.78rem', border: '1px solid rgba(230, 161, 0, 0.25)', fontFamily: 'monospace' }}>
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Retrieved Legal Text Snippets Section */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Eye size={18} color="#10b981" /> Top-K Retrieved Legal Text Snippets & Official Citations:
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {data.top_k_retrieved.map((chunk, idx) => (
              <div key={idx} style={{
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--accent-gold)', fontSize: '0.95rem' }}>
                    #{idx+1} {chunk.section_code}
                  </span>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span className="badge-emerald">Cosine Match: {Math.round(chunk.similarity_score * 100)}%</span>
                  </div>
                </div>

                <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.88rem', marginBottom: '4px' }}>
                  {chunk.act_title ? `${chunk.act_title} — ` : ''}{chunk.title}
                </div>

                {/* Verified Official Source Badge */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '3px 8px', borderRadius: '4px', marginBottom: '8px' }}>
                  🏛️ <strong>Verified Source:</strong> {chunk.source_name || "India Code (indiacode.nic.in)"} ({chunk.official_citation || "Ministry of Law"})
                </div>

                {/* Legal Text Snippet Excerpt Box */}
                <div style={{
                  background: '#050912',
                  borderLeft: '4px solid #10b981',
                  padding: '10px 14px',
                  borderRadius: '4px',
                  margin: '6px 0',
                  color: '#e2e8f0',
                  fontSize: '0.82rem',
                  lineHeight: '1.5',
                  fontStyle: 'italic'
                }}>
                  "{chunk.text_snippet || chunk.content.slice(0, 150) + '...'}"
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <strong>Match Rationale:</strong> {chunk.relevance_reason}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Augmented System Prompt Payload */}
        <div>
          <h4 style={{ fontSize: '0.9rem', color: '#818cf8', marginBottom: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Code size={16} /> Augmented LLM Prompt Payload:
          </h4>
          <pre style={{
            background: '#04070d',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '14px',
            borderRadius: '8px',
            color: '#a7f3d0',
            fontSize: '0.78rem',
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
            maxHeight: '180px',
            overflowY: 'auto'
          }}>
            {data.augmented_prompt_snippet}
          </pre>
        </div>

      </div>
    </div>
  );
}
