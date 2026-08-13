import React, { useState, useEffect } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { searchSections } from '../services/api';

export default function SectionSearch({ lang }) {
  const [query, setQuery] = useState('Cheque Bounce');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    try {
      const data = await searchSections(searchTerm);
      setResults(data.results || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch('Cheque Bounce');
  }, []);

  return (
    <div className="glass-card animate-fade-in" style={{ padding: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <BookOpen size={24} color="var(--accent-gold)" />
        <div>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700 }}>
            Indian Statutory Code Search Engine
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Search Indian laws (BNS 2023, IPC 1860, BNSS, IT Act, Consumer Protection Act) by keyword or section.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search e.g. BNS Section 318, Cyber Fraud, Security Deposit..."
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
        <button onClick={() => handleSearch(query)} disabled={loading} className="btn-primary">
          <Search size={16} />
          <span>Search</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {results.map((item, idx) => (
          <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontWeight: 700, color: 'var(--accent-gold)', fontSize: '0.95rem' }}>
                {item.section_code}
              </span>
              <span className="badge-gold">{item.act_title}</span>
            </div>
            <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem', marginBottom: '4px' }}>
              {item.title}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
