export function exportLegalReportToPrint(caseData, lang = "en") {
  const isHi = (lang === "hi");
  const winScore = caseData.win_probability_score || 80;
  const citizen = caseData.citizen_view;
  const lawyer = caseData.lawyer_view;
  const rag = caseData.rag_debug;

  const title = isHi ? "न्याय AI - आधिकारिक कानूनी मूल्यांकन रिपोर्ट" : "Nyay AI - Official Legal Assessment & Advisory Report";
  
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to download or print the PDF legal report.");
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
          .header { text-align: center; border-bottom: 2px solid #e6a100; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 26px; font-weight: bold; color: #0f172a; letter-spacing: 1px; }
          .tagline { color: #64748b; font-size: 14px; }
          .box { background: #f8fafc; border-left: 4px solid #e6a100; padding: 15px 20px; margin-bottom: 25px; border-radius: 4px; }
          h2 { color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; font-size: 18px; margin-top: 25px; }
          ul { padding-left: 20px; }
          li { margin-bottom: 8px; }
          .badge { display: inline-block; background: #e6a100; color: #000; font-weight: bold; padding: 4px 10px; border-radius: 12px; font-size: 13px; }
          .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; }
          @media print {
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 20px; text-align: right;">
          <button onclick="window.print()" style="background: #e6a100; border: none; padding: 10px 20px; font-weight: bold; cursor: pointer; border-radius: 4px;">Print / Save as PDF</button>
        </div>

        <div class="header">
          <div class="logo">⚖️ NYAY AI - LEGAL ASSISTANT</div>
          <div class="tagline">Indian Statutory Analysis Grounded in BNS 2023, IPC & RAG Retrieval</div>
          <p><strong>Report ID:</strong> ${caseData.problem_id} | <strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>

        <div class="box">
          <p><strong>Case Category:</strong> ${caseData.category.toUpperCase()} | <strong>Estimated Case Strength:</strong> <span class="badge">${winScore}%</span></p>
          <p><strong>Legal Summary:</strong> ${citizen ? citizen.legal_summary : ''}</p>
        </div>

        <h2>${isHi ? "1. मौलिक कानूनी अधिकार (Legal Rights)" : "1. Fundamental Legal Rights"}</h2>
        <ul>
          ${citizen ? citizen.rights_breakdown.map(r => `<li>${r}</li>`).join('') : ''}
        </ul>

        <h2>${isHi ? "2. चरणबद्ध कार्ययोजना (Action Plan)" : "2. Step-by-Step Action Roadmap"}</h2>
        <ol>
          ${citizen ? citizen.action_plan.map(a => `<li><strong>${a.title}:</strong> ${a.description}</li>`).join('') : ''}
        </ol>

        <h2>${isHi ? "3. लागू कानूनी धाराएं (Statutory Codes)" : "3. Applicable Indian Statutory Codes"}</h2>
        ${lawyer ? lawyer.statutory_provisions.map(s => `
          <div style="background: #f1f5f9; padding: 10px 15px; margin-bottom: 10px; border-radius: 4px;">
            <strong>${s.code} - ${s.act}</strong> (${s.title})<br/>
            <small>${s.description}</small>
          </div>
        `).join('') : ''}

        <h2>${isHi ? "4. RAG विधिक साक्ष्य (Retrieved Chunks)" : "4. RAG Vector Grounding Proof"}</h2>
        <p>This report was generated using TF-IDF / Cosine Similarity RAG retrieval over indexed Indian laws.</p>
        <ul>
          ${rag ? rag.top_k_retrieved.map(c => `<li><strong>${c.section_code}</strong> (Match: ${Math.round(c.similarity_score * 100)}%) - ${c.title}</li>`).join('') : ''}
        </ul>

        <div class="footer">
          Nyay AI Legal Assistant — College Project Edition. Disclaimer: Educational legal guidance tool.
        </div>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
