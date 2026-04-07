# AI_Legal_Assistant
AI-powered Indian Legal Assistant that explains laws and legal documents in simple English and Hindi using FastAPI and RAG.
# ⚖️ AI-Based Legal Assistant (Indian Law)

An AI-powered Legal Assistant designed to simplify Indian laws and make legal information accessible to everyone. This system allows users to ask legal questions and receive clear, easy-to-understand explanations in **English and Hindi**.

---

## 🚀 Overview

Understanding legal language can be difficult for common people. This project bridges that gap by using AI to explain complex Indian legal concepts in a simple and user-friendly way.

The assistant is capable of:

* Answering questions related to Indian laws (IPC, etc.)
* Explaining legal concepts in simple language
* Supporting bilingual responses (English + Hindi)

---

## 🧠 Tech Stack

* **Backend:** FastAPI
* **AI Model:** OpenAI API
* **Validation:** Pydantic
* **Environment Management:** python-dotenv
* **Server:** Uvicorn

---

## 📂 Project Structure

```
ai-legal-assistant/
│
├── app/
│   └── main.py
│
├── data/                # (For IPC dataset - upcoming)
├── requirements.txt
├── .env                 # (Not included in repo)
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```
git clone https://github.com/bhartithakran1/AI_based_Legal_Assistant.git
cd AI_based_Legal_Assistant
```

---

### 2️⃣ Create Virtual Environment

```
python -m venv venv
venv\Scripts\activate     # Windows
# OR
source venv/bin/activate  # Mac/Linux
```

---

### 3️⃣ Install Dependencies

```
pip install -r requirements.txt
```

---

### 4️⃣ Add Environment Variables

Create a `.env` file in the root directory:

```
OPENAI_API_KEY=your_api_key_here
```

---

### 5️⃣ Run the Server

```
uvicorn app.main:app --reload
```

Open in browser:

```
http://127.0.0.1:8000/docs
```

---

## 📌 API Endpoints

### 🏠 Home

* `GET /`
* Check if API is running

### 💬 Query Legal Question

* `POST /query`

**Request Body:**

```json
{
  "question": "What is IPC 420?"
}
```

---

## 🧪 Example Use Cases

* "Explain IPC 420 in simple terms"
* "What are my rights during arrest?"
* "Explain theft law in India"
* "Hindi mein samjhao IPC 378"

---

## 🔥 Future Enhancements

* 📄 Upload and analyze legal documents (FIR, contracts)
* 🧠 RAG-based legal knowledge using IPC dataset
* ⚖️ Show relevant law sections with answers
* 🌐 Advanced multilingual support
* 👤 User authentication system
* 📱 WhatsApp / Chat-based interface

---

## ⚠️ Disclaimer

This AI provides general legal information and is not a substitute for a qualified lawyer.

---

## 👩‍💻 Author

**Bharti Thakran**
AI Developer | FastAPI | LLM Enthusiast 🚀

---

## ⭐ Contribution

Contributions, suggestions, and improvements are welcome!
Feel free to fork the repository and submit a pull request.

