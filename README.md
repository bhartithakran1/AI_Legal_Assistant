⚖️ AI Legal Assistant (Indian Law - Bilingual English & Hindi RAG)

Nyay AI is a modern, full-stack AI legal assistant that simplifies complex Indian legal concepts (BNS 2023, IPC 1860, BNSS 2023, IT Act 2000, Consumer Protection Act 2019, NI Act Section 138, Indian Contract Act) into plain-language explanations in **English and Hindi (हिंदी)**.

---

## 🚀 Key Features

1. **Bilingual AI Support (English + Hindi / हिंदी)**: Instant language switching for legal rights, action roadmaps, and statutory explanations.
2. **Retrieval-Augmented Generation (RAG) Architecture**:
   - Vector database indexing modern Indian laws & court precedents.
   - Cosine Similarity & TF-IDF vector matching retriever.
   - Grounded context synthesis payload.
3. **Interactive RAG Pipeline Inspector (Recruiter Feature)**: Live developer modal revealing query tokenization, top-K retrieved statutory chunks, match confidence % scores, and context payloads.
4. **Document-Level RAG & Legal Simplifier**: Drag-and-drop or paste lease agreements, contracts, or notices for clause QA.
5. **Dual Persona Modes**:
   - **Citizen Mode**: Plain-language legal rights, 4-step action roadmap, and emergency helpline cards (Cyber Cell 1930, Consumer Helpline 1915, NALSA 15100).
   - **Lawyer / Advocate Mode**: BNS/IPC statutory codes, bailable/cognizable classification, landmark Supreme Court precedents, and defense strategies.
6. **1-Click Legal Notice Generator**: Automated drafting of Legal Demand Notices (Check Bounce, Security Deposit Refund, Salary Dues, Consumer Forum Complaints) with printable PDF export.

---

## 🛠️ Tech Stack

- **Backend**: Python FastAPI, Uvicorn, Pydantic, NumPy/Scikit-Learn RAG Engine, REST API endpoints.
- **Frontend**: React + Vite, Custom Midnight Navy (`#060a12`) & Royal Saffron Gold (`#e6a100`) Glassmorphism UI, Lucide React icons, CSS design system.

---

## 💻 How to Run the Project

### 1️⃣ Start the Python FastAPI Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate      # On Windows
pip install -r requirements.txt
python run.py
```
*Backend API running at:* `http://127.0.0.1:8000`  
*Swagger Documentation:* `http://127.0.0.1:8000/docs`

### 2️⃣ Start the React Frontend
```bash
cd frontend
npm install
npm run dev
```
*Frontend App running at:* `http://localhost:5173`

---

## 🎓 Placement Demo Guide for Recruiters & Professors

1. Open `http://localhost:5173` in your browser.
2. Click any of the **Quick Presentation Demo buttons** (*Landlord Deposit Refund*, *Cheque Bounce*, *Salary Delay*, *Cyber Scam*, *E-Commerce Defective Product*).
3. Toggle between **English** and **हिंदी (Hindi)** to demonstrate bilingual capability.
4. Switch between **Citizen Mode** and **Lawyer Mode** to showcase persona customization.
5. Click **"RAG Pipeline Inspector"** in the top navigation bar to display live vector search metrics, similarity scores, and execution latency.
6. Click **"Download Printable Legal Opinion PDF"** to demonstrate printable report generation.
