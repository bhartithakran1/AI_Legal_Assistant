from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class LegalProblemRequest(BaseModel):
    problem_text: str = Field(..., description="Description of the legal issue")
    category: Optional[str] = Field("general", description="Legal category e.g. property, employment, cyber, financial")
    mode: str = Field("citizen", description="Persona mode: 'citizen' or 'lawyer'")
    jurisdiction: Optional[str] = Field("India", description="Jurisdiction context")
    urgency: Optional[str] = Field("medium", description="Low, medium, or high")
    lang: str = Field("en", description="Language choice: 'en' for English, 'hi' for Hindi (हिंदी)")
    api_key: Optional[str] = Field(None, description="Optional Google Gemini / OpenAI API key")

class RetrievedChunk(BaseModel):
    act_title: str
    section_code: str
    title: str
    content: str
    text_snippet: str
    similarity_score: float
    relevance_reason: str
    category: str

class ActionStep(BaseModel):
    step_number: int
    title: str
    description: str
    action_type: str

class CitizenSolution(BaseModel):
    legal_summary: str
    rights_breakdown: List[str]
    action_plan: List[ActionStep]
    helpline_contacts: List[Dict[str, str]]
    recommended_notice_type: Optional[str] = None

class PrecedentCase(BaseModel):
    case_name: str
    court: str
    year: int
    key_holding: str
    relevance: str

class LawyerSolution(BaseModel):
    statutory_provisions: List[Dict[str, Any]]
    offense_nature: Dict[str, Any]
    defense_strategy: List[str]
    prosecution_points: List[str]
    landmark_precedents: List[PrecedentCase]
    procedural_roadmap: List[str]

class RagDebugInfo(BaseModel):
    query_processed: str
    extracted_keywords: List[str]
    embedding_model: str = "OpenAI text-embedding-3-small (1536-dimensional)"
    similarity_algorithm: str = "Cosine Similarity (FAISS Vector Index)"
    total_corpus_chunks: int = 10
    total_chunks_searched: int = 10
    chunks_returned_count: int = 3
    search_summary_stat: str = "Searched 10 statutory chunks, returned Top 3"
    top_k_retrieved: List[RetrievedChunk]
    execution_time_ms: float
    augmented_prompt_snippet: str

class LegalAnalysisResponse(BaseModel):
    problem_id: str
    category: str
    mode: str
    lang: str
    win_probability_score: int
    risk_assessment: Dict[str, Any]
    citizen_view: Optional[CitizenSolution] = None
    lawyer_view: Optional[LawyerSolution] = None
    rag_debug: RagDebugInfo
    suggested_notice_template: Optional[str] = None

class DocumentRagRequest(BaseModel):
    document_text: str
    question: str
    lang: str = Field("en", description="Language: 'en' or 'hi'")
    api_key: Optional[str] = None

class DocumentRagResponse(BaseModel):
    question: str
    answer: str
    grounded_chunks: List[Dict[str, Any]]
    confidence_score: float

class NoticeGenerateRequest(BaseModel):
    notice_type: str
    sender_name: str
    sender_address: str
    recipient_name: str
    recipient_address: str
    facts_summary: str
    amount_disputed: Optional[str] = None
    notice_period_days: int = 15
    lang: str = Field("en", description="Language: 'en' or 'hi'")

class NoticeGenerateResponse(BaseModel):
    notice_title: str
    notice_body: str
    legal_sections_cited: List[str]
    instructions: str
