import sqlite3
import json
import os
import time
from typing import List, Dict, Any

DB_PATH = os.path.join(os.path.dirname(__file__), "nyay_legal.db")

def init_db():
    """Initializes SQLite database tables for history, PDFs, and notices."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Consultation History Table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS consultation_history (
            id TEXT PRIMARY KEY,
            timestamp REAL,
            problem_text TEXT,
            category TEXT,
            mode TEXT,
            lang TEXT,
            win_probability_score INTEGER,
            legal_summary TEXT,
            raw_response TEXT
        )
    """)

    # Uploaded Documents Table (PyMuPDF parsed)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS uploaded_documents (
            doc_id TEXT PRIMARY KEY,
            timestamp REAL,
            filename TEXT,
            file_size_bytes INTEGER,
            page_count INTEGER,
            total_chunks INTEGER,
            summary_preview TEXT
        )
    """)

    # Generated Notices Table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS generated_notices (
            notice_id TEXT PRIMARY KEY,
            timestamp REAL,
            notice_type TEXT,
            sender_name TEXT,
            recipient_name TEXT,
            amount_disputed TEXT,
            notice_body TEXT
        )
    """)

    conn.commit()
    conn.close()

def save_consultation(problem_id: str, problem_text: str, category: str, mode: str, lang: str, win_score: int, summary: str, full_data: Dict[str, Any]):
    """Saves a legal consultation record into SQLite."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT OR REPLACE INTO consultation_history 
        (id, timestamp, problem_text, category, mode, lang, win_probability_score, legal_summary, raw_response)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (problem_id, time.time(), problem_text, category, mode, lang, win_score, summary, json.dumps(full_data)))
    conn.commit()
    conn.close()

def get_consultation_history(limit: int = 20) -> List[Dict[str, Any]]:
    """Retrieves recent consultation history records from SQLite."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        SELECT id, timestamp, problem_text, category, mode, lang, win_probability_score, legal_summary 
        FROM consultation_history 
        ORDER BY timestamp DESC LIMIT ?
    """, (limit,))
    rows = cursor.fetchall()
    conn.close()

    history = []
    for r in rows:
        history.append({
            "id": r[0],
            "timestamp": r[1],
            "problem_text": r[2],
            "category": r[3],
            "mode": r[4],
            "lang": r[5],
            "win_probability_score": r[6],
            "legal_summary": r[7]
        })
    return history

def save_uploaded_doc_meta(doc_id: str, filename: str, file_size: int, page_count: int, total_chunks: int, preview: str):
    """Saves uploaded PDF metadata into SQLite."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT OR REPLACE INTO uploaded_documents
        (doc_id, timestamp, filename, file_size_bytes, page_count, total_chunks, summary_preview)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (doc_id, time.time(), filename, file_size, page_count, total_chunks, preview))
    conn.commit()
    conn.close()

def save_generated_notice(notice_id: str, notice_type: str, sender: str, recipient: str, amount: str, body: str):
    """Saves a generated legal notice into SQLite."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT OR REPLACE INTO generated_notices
        (notice_id, timestamp, notice_type, sender_name, recipient_name, amount_disputed, notice_body)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (notice_id, time.time(), notice_type, sender, recipient, amount, body))
    conn.commit()
    conn.close()

# Initialize DB on module import
init_db()
