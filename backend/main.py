import os
import json
import time
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any, List, Optional

from models import (
    LegalProblemRequest, LegalAnalysisResponse,
    DocumentRagRequest, DocumentRagResponse,
    NoticeGenerateRequest, NoticeGenerateResponse
)
from rag_service import rag_engine
from ai_service import ai_legal_service
from pdf_processor import pdf_processor
from vector_store import vector_store
import database as db

app = FastAPI(
    title="AI Legal Assistant API - Indian Law (FastAPI, OpenAI, FAISS, PyMuPDF, SQLite)",
    description="Placement-ready RAG REST API matching specified tech stack.",
    version="2.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TEMPLATES_FILE = os.path.join(os.path.dirname(__file__), "data", "templates.json")

@app.get("/")
def read_root():
    return {
        "status": "online",
        "app": "AI Legal Assistant (FastAPI, OpenAI Embeddings, FAISS, PyMuPDF, SQLite)",
        "docs_url": "/docs",
        "version": "2.0.0"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "vector_corpus_size": len(rag_engine.corpus),
        "database": "SQLite (nyay_legal.db)"
    }

@app.post("/api/analyze-case")
def analyze_legal_case(req: LegalProblemRequest):
    """Main RAG Legal Case Diagnostic Endpoint."""
    if not req.problem_text or len(req.problem_text.strip()) < 5:
        raise HTTPException(status_code=400, detail="Problem description must be at least 5 characters long.")
    
    try:
        response_data = ai_legal_service.synthesize_legal_solution(
            problem_text=req.problem_text,
            category=req.category,
            mode=req.mode,
            lang=req.lang or "en",
            api_key=req.api_key
        )
        
        # Save consultation record into SQLite database
        summary_text = response_data.get("citizen_view", {}).get("legal_summary", "Legal Diagnostic")
        db.save_consultation(
            problem_id=response_data["problem_id"],
            problem_text=req.problem_text,
            category=req.category,
            mode=req.mode,
            lang=req.lang or "en",
            win_score=response_data["win_probability_score"],
            summary=summary_text,
            full_data=response_data
        )

        return response_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Legal analysis error: {str(e)}")

@app.post("/api/upload-pdf")
async def upload_legal_pdf(file: UploadFile = File(...)):
    """Uploads legal PDF document, extracts text using PyMuPDF (fitz), indexes into FAISS/Chroma vector store, and saves metadata in SQLite."""
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    file_bytes = await file.read()
    if not file_bytes:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    full_text, chunks, meta = pdf_processor.process_pdf_bytes(file_bytes, filename=file.filename)
    doc_id = f"pdf_{int(time.time())}"

    # Save PDF metadata into SQLite database
    db.save_uploaded_doc_meta(
        doc_id=doc_id,
        filename=file.filename,
        file_size=meta["file_size_bytes"],
        page_count=meta["page_count"],
        total_chunks=meta["total_chunks"],
        preview=full_text[:200]
    )

    return {
        "doc_id": doc_id,
        "filename": file.filename,
        "page_count": meta["page_count"],
        "total_chunks": meta["total_chunks"],
        "engine_used": meta["engine"],
        "summary_preview": full_text[:300] + "...",
        "extracted_text": full_text
    }

@app.get("/api/history")
def get_history(limit: int = 15):
    """Returns recent consultation history records from SQLite database."""
    return {"history": db.get_consultation_history(limit=limit)}

@app.post("/api/document-rag", response_model=DocumentRagResponse)
def document_rag_qa(req: DocumentRagRequest):
    """Performs Document-Level RAG Q&A / Legal Document Simplifier using FAISS / Vector Search."""
    doc_text = req.document_text.strip()
    question = req.question.strip()

    if not doc_text or not question:
        raise HTTPException(status_code=400, detail="Both document_text and question are required.")

    chunks = pdf_processor.chunk_document_text(doc_text)
    vector_results = vector_store.search_faiss_vector_index(question, chunks, top_k=3)

    is_hi = (req.lang == "hi")

    if vector_results:
        top_match = vector_results[0]
        prefix = "आपके द्वारा प्रदान किए गए दस्तावेज के अनुसार" if is_hi else "Based strictly on your provided document"
        ans_summary = f"{prefix} ({top_match['chunk_id']}): {top_match['text']}"
        confidence = top_match["relevance_score"]
        grounded_chunks = [{"clause_id": r["chunk_id"], "text": r["full_text"], "relevance_score": r["relevance_score"]} for r in vector_results]
    else:
        ans_summary = "दस्तावेज में आपके प्रश्न का सीधा उत्तर नहीं मिला।" if is_hi else "No explicit clause directly matches your exact question in the document."
        confidence = 0.50
        grounded_chunks = []

    return DocumentRagResponse(
        question=question,
        answer=ans_summary,
        grounded_chunks=grounded_chunks,
        confidence_score=confidence
    )

@app.post("/api/generate-notice", response_model=NoticeGenerateResponse)
def generate_legal_notice(req: NoticeGenerateRequest):
    """Generates customized Legal Notice draft and saves into SQLite database."""
    templates = {}
    if os.path.exists(TEMPLATES_FILE):
        with open(TEMPLATES_FILE, "r", encoding="utf-8") as f:
            templates = json.load(f)

    n_type = req.notice_type if req.notice_type in templates else "consumer_complaint"
    tpl = templates.get(n_type, templates["consumer_complaint"])

    body = tpl["template_structure"]
    body = body.replace("[RECIPIENT_NAME]", req.recipient_name or "Opposing Party / Management")
    body = body.replace("[RECIPIENT_ADDRESS]", req.recipient_address or "Address of Opposing Party")
    body = body.replace("[SENDER_NAME]", req.sender_name or "Complainant Name")
    body = body.replace("[SENDER_ADDRESS]", req.sender_address or "Complainant Address")
    body = body.replace("[FACTS_SUMMARY]", req.facts_summary or "Facts of dispute detailing financial / contractual breach.")
    body = body.replace("[AMOUNT]", req.amount_disputed or "50,000")
    body = body.replace("[CHEQUE_NO]", "123456")
    body = body.replace("[MEMO_DATE]", "01-08-2026")

    # Save notice to SQLite
    notice_id = f"notice_{int(time.time())}"
    db.save_generated_notice(
        notice_id=notice_id,
        notice_type=n_type,
        sender=req.sender_name,
        recipient=req.recipient_name,
        amount=req.amount_disputed or "50000",
        body=body
    )

    instr = "स्पीड पोस्ट / रजिस्टर्ड पोस्ट से भेजें और पावती रसीद सुरक्षित रखें।" if req.lang == "hi" else "Send via Speed Post AD or Registered Post. Keep postal receipt safely for court record."

    return NoticeGenerateResponse(
        notice_title=tpl["notice_title"],
        notice_body=body,
        legal_sections_cited=tpl["legal_sections_cited"],
        instructions=instr
    )

@app.get("/api/search-sections")
def search_statutory_sections(query: str = ""):
    if not query:
        return {"query": "", "results": rag_engine.corpus[:5]}

    results, _ = rag_engine.search(query, top_k=5)
    return {"query": query, "results": results}
