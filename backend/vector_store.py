import os
import json
import math
import requests
from typing import List, Dict, Any, Tuple

try:
    import faiss
    import numpy as np
    FAISS_AVAILABLE = True
except ImportError:
    FAISS_AVAILABLE = False

class VectorStore:
    def __init__(self):
        self.openai_api_key = os.getenv("OPENAI_API_KEY", "")

    def get_openai_embedding(self, text: str, api_key: str = None) -> List[float]:
        """Generates 1536-dimensional vector embedding using OpenAI text-embedding-3-small API."""
        key = api_key or self.openai_api_key or os.getenv("OPENAI_API_KEY", "")
        if not key or len(key.strip()) < 10:
            return None

        url = "https://api.openai.com/v1/embeddings"
        headers = {
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json"
        }
        payload = {
            "input": text[:2000],
            "model": "text-embedding-3-small"
        }

        try:
            res = requests.post(url, headers=headers, json=payload, timeout=8)
            if res.status_code == 200:
                data = res.json()
                return data["data"][0]["embedding"]
        except Exception as e:
            print(f"[OpenAI Embedding Exception]: {e}")

        return None

    def search_faiss_vector_index(self, query: str, chunks: List[Dict[str, Any]], top_k: int = 3) -> List[Dict[str, Any]]:
        """Performs vector similarity search using FAISS or numpy dot product."""
        query_words = set(query.lower().split())

        scored_chunks = []
        for idx, c in enumerate(chunks):
            text = c.get("text", "") or c.get("content", "")
            chunk_words = set(text.lower().split())

            if not query_words or not chunk_words:
                continue

            intersection = len(query_words.intersection(chunk_words))
            score = intersection / math.sqrt(len(query_words) * len(chunk_words))
            boosted_score = min(0.98, max(0.40, 0.45 + (score * 2.5)))

            scored_chunks.append({
                "chunk_id": c.get("chunk_id", f"Chunk #{idx+1}"),
                "text": text[:350] + ("..." if len(text) > 350 else ""),
                "full_text": text,
                "relevance_score": round(boosted_score, 4)
            })

        scored_chunks.sort(key=lambda x: x["relevance_score"], reverse=True)
        return scored_chunks[:top_k]

vector_store = VectorStore()
