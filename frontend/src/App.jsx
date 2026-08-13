import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import PersonaToggle from './components/PersonaToggle';
import ProblemForm from './components/ProblemForm';
import SolutionDashboard from './components/SolutionDashboard';
import RagInspectorModal from './components/RagInspectorModal';
import ApiKeyModal from './components/ApiKeyModal';
import { analyzeCase } from './services/api';

export default function App() {
  const [lang, setLang] = useState('en');
  const [mode, setMode] = useState('citizen');
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [isRagInspectorOpen, setIsRagInspectorOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  // Run initial diagnostic on load for presentation readiness
  useEffect(() => {
    handleDiagnostic(
      "My landlord in Bangalore is refusing to refund my security deposit of Rs 60,000 after I vacated the apartment in good condition.",
      "property",
      false
    );
  }, []);

  const handleDiagnostic = async (problemText, category, shouldScroll = true) => {
    if (!problemText || !problemText.trim()) return;

    setLoading(true);
    try {
      const result = await analyzeCase({
        problem_text: problemText,
        category: category || "general",
        mode: mode,
        lang: lang,
        api_key: apiKey
      });
      
      setCaseData(result);

      if (shouldScroll) {
        setTimeout(() => {
          const el = document.getElementById('solution-dashboard');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }
    } catch (err) {
      console.error("Diagnostic Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto', padding: '0 20px 40px' }}>
        
        {/* Header with Language & RAG Inspector Controls */}
        <Header 
          lang={lang} 
          setLang={setLang} 
          onOpenRagInspector={() => setIsRagInspectorOpen(true)}
          onOpenApiKey={() => setIsApiKeyModalOpen(true)}
        />

        {/* Hero Section */}
        <HeroBanner lang={lang} />

        {/* Persona Mode Switcher (Citizen vs Lawyer) */}
        <PersonaToggle mode={mode} setMode={setMode} lang={lang} />

        {/* Legal Problem Intake Form */}
        <ProblemForm 
          onSubmit={(txt, cat) => handleDiagnostic(txt, cat, true)} 
          loading={loading} 
          lang={lang} 
        />

        {/* Diagnostic Solution Dashboard */}
        <div id="solution-dashboard">
          <SolutionDashboard 
            caseData={caseData} 
            mode={mode} 
            lang={lang} 
            onOpenRagInspector={() => setIsRagInspectorOpen(true)}
          />
        </div>

      </div>

      {/* Recruiter RAG Inspector Modal */}
      <RagInspectorModal 
        isOpen={isRagInspectorOpen} 
        onClose={() => setIsRagInspectorOpen(false)}
        ragData={caseData?.rag_debug}
      />

      {/* API Key Modal */}
      <ApiKeyModal 
        isOpen={isApiKeyModalOpen} 
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        setApiKey={setApiKey}
      />
    </div>
  );
}
