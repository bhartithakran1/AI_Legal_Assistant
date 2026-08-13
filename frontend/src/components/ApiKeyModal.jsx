import React, { useState } from 'react';
import { X, Key, Check } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, apiKey, setApiKey }) {
  if (!isOpen) return null;
  const [tempKey, setTempKey] = useState(apiKey || '');

  const handleSave = () => {
    setApiKey(tempKey);
    localStorage.setItem('gemini_api_key', tempKey);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(2, 6, 23, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '480px', padding: '28px', background: '#0c1424' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Key size={20} color="var(--accent-gold)" />
            <h3 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 700 }}>Google Gemini API Key</h3>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
        </div>

        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Optionally enter your Google Gemini API key to enable live dynamic AI synthesis alongside our built-in RAG legal vector engine.
        </p>

        <input
          type="password"
          value={tempKey}
          onChange={(e) => setTempKey(e.target.value)}
          placeholder="AIzaSy..."
          style={{ width: '100%', background: 'rgba(6,10,18,0.9)', color: '#fff', border: '1px solid var(--border-subtle)', padding: '10px 14px', borderRadius: '8px', marginBottom: '20px', fontFamily: 'monospace' }}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={handleSave} className="btn-primary"><Check size={16} /> Save Key</button>
        </div>
      </div>
    </div>
  );
}
