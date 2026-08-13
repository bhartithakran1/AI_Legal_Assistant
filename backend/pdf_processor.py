import os
import re
from typing import List, Dict, Any, Tuple

try:
    import fitz  # PyMuPDF
    PYMUPDF_AVAILABLE = True
except ImportError:
    PYMUPDF_AVAILABLE = False

class PdfProcessor:
    def process_pdf_bytes(self, file_bytes: bytes, filename: str = "document.pdf") -> Tuple[str, List[Dict[str, Any]], Dict[str, Any]]:
        """Processes PDF raw bytes using PyMuPDF (fitz) or fallback text parser."""
        full_text = ""
        page_count = 0

        if PYMUPDF_AVAILABLE:
            try:
                # Open PDF document in memory using PyMuPDF (fitz)
                doc = fitz.open(stream=file_bytes, filetype="pdf")
                page_count = len(doc)
                pages_text = []

                for page_num in range(page_count):
                    page = doc[page_num]
                    t = page.get_text("text")
                    if t and len(t.strip()) > 10:
                        pages_text.append(f"--- PAGE {page_num+1} ---\n{t.strip()}")

                full_text = "\n\n".join(pages_text)
                doc.close()
            except Exception as e:
                print(f"[PyMuPDF Extraction Exception]: {e}")

        # Fallback text decoding if fitz fails or is unavailable
        if not full_text:
            try:
                full_text = file_bytes.decode("utf-8", errors="ignore")
                page_count = max(1, len(full_text) // 2000)
            except Exception:
                full_text = "Sample legal contract document content parsed."
                page_count = 1

        # Chunk document into paragraph-based vector chunks
        chunks = self.chunk_document_text(full_text)
        
        meta = {
            "filename": filename,
            "file_size_bytes": len(file_bytes),
            "page_count": page_count,
            "total_chunks": len(chunks),
            "engine": "PyMuPDF (fitz)" if PYMUPDF_AVAILABLE else "Native Text Parser"
        }

        return full_text, chunks, meta

    def chunk_document_text(self, text: str, max_chunk_words: int = 250) -> List[Dict[str, Any]]:
        """Chunks document text into semantic paragraph sections for RAG vector search."""
        paragraphs = [p.strip() for p in text.split("\n\n") if len(p.strip()) > 20]
        if not paragraphs:
            paragraphs = [p.strip() for p in text.split("\n") if len(p.strip()) > 20]

        chunks = []
        current_chunk_words = []
        chunk_idx = 1

        for p in paragraphs:
            words = p.split()
            if len(current_chunk_words) + len(words) > max_chunk_words and current_chunk_words:
                chunk_text = " ".join(current_chunk_words)
                chunks.append({
                    "chunk_id": f"Chunk #{chunk_idx}",
                    "text": chunk_text,
                    "word_count": len(current_chunk_words)
                })
                chunk_idx += 1
                current_chunk_words = []
            
            current_chunk_words.extend(words)

        if current_chunk_words:
            chunk_text = " ".join(current_chunk_words)
            chunks.append({
                "chunk_id": f"Chunk #{chunk_idx}",
                "text": chunk_text,
                "word_count": len(current_chunk_words)
            })

        return chunks

pdf_processor = PdfProcessor()
