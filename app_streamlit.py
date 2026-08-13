import streamlit as st
import requests
import json
import time

st.set_page_config(
    page_title="Nyay AI - Indian Legal Assistant (FastAPI, PyMuPDF, RAG)",
    page_icon="⚖️",
    layout="wide"
)

API_URL = "http://127.0.0.1:8000/api"

# Header
st.title("⚖️ Nyay AI - Indian Legal Assistant")
st.markdown("### **AI-Powered RAG Legal Guidance in English & Hindi (BNS 2023, IPC, IT Act, NI Act 138)**")

# Sidebar Controls
st.sidebar.header("⚙️ Configuration")
lang = st.sidebar.selectbox("Select Language", ["English (en)", "Hindi (hi - हिंदी)"], index=0)
lang_code = "hi" if "Hindi" in lang else "en"

mode = st.sidebar.radio("Select Persona Mode", ["Citizen Mode (Plain Language)", "Lawyer Mode (Statutes & Precedents)"])
mode_code = "lawyer" if "Lawyer" in mode else "citizen"

api_key = st.sidebar.text_input("OpenAI / Gemini API Key (Optional)", type="password")

# Main Interface Tabs
tab1, tab2, tab3, tab4 = st.tabs(["📝 Case Diagnostic Intake", "📄 Upload Legal PDF (PyMuPDF)", "📜 Legal Notice Generator", "🔍 Search Statutory Codes"])

with tab1:
    st.subheader("Describe Your Legal Issue")
    category = st.selectbox("Category", ["general", "property", "employment", "financial", "cyber", "consumer"])
    problem_text = st.text_area("Legal Problem Description", value="My landlord in Bangalore is refusing to refund my security deposit of Rs 60,000 after I vacated the apartment in good condition.", height=120)

    if st.button("Diagnose Legal Case", type="primary"):
        with st.spinner("RAG Vector Retrieving & Analyzing Indian Laws..."):
            try:
                res = requests.post(f"{API_URL}/analyze-case", json={
                    "problem_text": problem_text,
                    "category": category,
                    "mode": mode_code,
                    "lang": lang_code,
                    "api_key": api_key
                }, timeout=10)
                
                if res.status_code == 200:
                    data = res.json()
                    st.success("Case Diagnostic Completed!")

                    col1, col2 = st.columns([3, 1])
                    with col1:
                        st.metric("Estimated Case Strength", f"{data['win_probability_score']}%")
                    with col2:
                        st.caption(f"Problem ID: {data['problem_id']}")

                    if mode_code == "citizen" and data.get("citizen_view"):
                        cv = data["citizen_view"]
                        st.info(f"**Legal Summary:** {cv['legal_summary']}")
                        
                        st.subheader("Your Rights")
                        for r in cv["rights_breakdown"]:
                            st.write(f"- {r}")

                        st.subheader("Step-by-Step Action Roadmap")
                        for step in cv["action_plan"]:
                            st.write(f"**Step {step['step_number']}: {step['title']}** - {step['description']}")

                    elif mode_code == "lawyer" and data.get("lawyer_view"):
                        lv = data["lawyer_view"]
                        st.subheader("Statutory Provisions")
                        for s in lv["statutory_provisions"]:
                            st.write(f"**{s['code']}**: {s['act']} - {s['title']}")

                        st.subheader("Landmark Precedents")
                        for p in lv["landmark_precedents"]:
                            st.write(f"**{p['case_name']}** ({p['court']}, {p['year']}) - {p['key_holding']}")

                else:
                    st.error("Failed to connect to FastAPI backend server.")
            except Exception as e:
                st.error(f"Backend Server Connection Error: {e}. Make sure FastAPI server is running (`python backend/run.py`).")

with tab2:
    st.subheader("Upload Legal Contract / Court Judgment PDF (PyMuPDF Parser)")
    uploaded_file = st.file_uploader("Upload PDF file", type=["pdf"])
    if uploaded_file:
        if st.button("Parse PDF & Extract Clauses"):
            files = {"file": (uploaded_file.name, uploaded_file.getvalue(), "application/pdf")}
            with st.spinner("PyMuPDF (fitz) Parsing PDF..."):
                try:
                    res = requests.post(f"{API_URL}/upload-pdf", files=files, timeout=12)
                    if res.status_code == 200:
                        doc_data = res.json()
                        st.success(f"PDF Successfully Parsed with PyMuPDF!")
                        st.json({
                            "Filename": doc_data["filename"],
                            "Page Count": doc_data["page_count"],
                            "Total Chunks": doc_data["total_chunks"],
                            "Parser Engine": doc_data["engine_used"]
                        })
                        st.text_area("Extracted Preview", value=doc_data["extracted_text"][:1500], height=200)
                except Exception as e:
                    st.error(f"PDF Upload Error: {e}")

with tab3:
    st.subheader("1-Click Legal Notice Generator")
    n_type = st.selectbox("Notice Type", ["landlord_deposit", "cheque_bounce", "salary_demand", "consumer_complaint"])
    sender = st.text_input("Sender Name", value="Rahul Sharma")
    recipient = st.text_input("Recipient / Opposing Party Name", value="Landlord / Company Management")
    amount = st.text_input("Disputed Amount (Rs)", value="60000")

    if st.button("Generate Legal Notice"):
        res = requests.post(f"{API_URL}/generate-notice", json={
            "notice_type": n_type,
            "sender_name": sender,
            "sender_address": "Bangalore",
            "recipient_name": recipient,
            "recipient_address": "Bangalore",
            "facts_summary": "Unlawful withholding of funds despite repeated reminders.",
            "amount_disputed": amount,
            "lang": lang_code
        })
        if res.status_code == 200:
            notice_data = res.json()
            st.code(notice_data["notice_body"], language="text")

with tab4:
    st.subheader("Search Indian Statutory Codes")
    q = st.text_input("Search query", value="Cheque bounce")
    if st.button("Search Codes"):
        res = requests.get(f"{API_URL}/search-sections?query={q}")
        if res.status_code == 200:
            s_data = res.json()
            for item in s_data.get("results", []):
                st.write(f"**{item['section_code']}**: {item['title']}")
                st.caption(item['content'])
