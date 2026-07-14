# 🤖 AkiraHire

AkiraHire is an **AI-powered HR automation platform** that helps recruiters manage the complete hiring workflow—from creating jobs and application forms to evaluating candidates and publishing hiring posts.

Instead of relying on a single AI assistant, AkiraHire uses a **LangGraph-powered multi-agent system**, where specialized AI agents work together to automate different parts of recruitment while keeping the recruiter in complete control.

---

# 🚀 Live Demo

> Add your live demo link here

---

# ✨ Features

- 💼 Create, update, publish, close, and manage job postings
- 📝 Build and manage application forms
- 🤖 AI-powered candidate evaluation against job requirements
- 👤 Dedicated recruiter and candidate portals
- 💬 AI chat assistant with real-time streaming responses
- 🌐 Generate Google Forms from natural language
- 📢 Generate and publish LinkedIn hiring posts
- 📄 Resume parsing for AI-assisted evaluation
- 🔐 Secure role-based authentication
- ⚡ Fast virtualized tables and debounced searching

---

# 🤖 Multi-Agent AI Architecture

At the heart of **AkiraHire** is a **LangGraph-powered multi-agent system**.

Instead of giving one large AI model every responsibility, AkiraHire routes each request to a specialized AI agent designed for one specific task.

This architecture makes the platform more accurate, modular, maintainable, and scalable.

The flow looks like this:

```
User Request
      │
      ▼
 Router Agent
      │
      ├──────────────► Job Agent
      ├──────────────► Application Agent
      ├──────────────► Form Agent
      ├──────────────► Google Form Agent
      ├──────────────► LinkedIn Agent
      └──────────────► General Agent
```

---

# 🧭 Router Agent

The **Router Agent** acts as the brain of the AI system.

Its responsibility is to understand the recruiter's request, identify the user's intent, and dispatch the request to the correct specialist agent.

### Examples

**"Create a Backend Developer job"**
➡️ Job Agent

**"Evaluate candidate Rahul"**
➡️ Application Agent

**"Generate an application form"**
➡️ Form Agent

**"Create a Google Form for internships"**
➡️ Google Form Agent

**"Write a LinkedIn hiring post"**
➡️ LinkedIn Agent

**"How does candidate evaluation work?"**
➡️ General Agent

---

# 💼 Job Agent

The **Job Agent** manages everything related to job postings.

### Responsibilities

- ✨ Generate professional job descriptions
- 💼 Create new jobs
- ✏️ Update existing jobs
- 📢 Publish jobs
- 🔒 Close job openings
- 🗑 Delete jobs
- 🔍 Search jobs
- 📄 Retrieve job information
- 📊 Manage job status

Sensitive operations like deleting or closing a job require recruiter approval before execution.

---

# 📄 Application Agent

The **Application Agent** handles everything related to candidate applications.

### Responsibilities

- 📥 Retrieve submitted applications
- 👤 Fetch candidate information
- 🤖 Evaluate resumes using AI
- 📊 Compare resumes against job descriptions
- ⭐ Generate candidate match scores
- 📋 Produce structured evaluation reports
- ✅ Recommend shortlisted candidates
- ❌ Recommend rejected candidates
- 📑 Retrieve application details

Resume evaluation uses parsed resume data together with job requirements to generate recruiter-friendly insights.

---

# 📝 Form Agent

The **Form Agent** automates application form management.

### Responsibilities

- ➕ Create application forms
- ✏️ Update forms
- 👀 Retrieve form details
- 🔗 Attach forms to jobs
- 📄 Generate form fields automatically
- 📋 Manage recruiter forms

Recruiters simply describe the information they want to collect, and the agent prepares the form structure automatically.

---

# 🌐 Google Form Agent

The **Google Form Agent** creates Google Forms directly from natural language.

### Responsibilities

- 🧠 Understand plain-English prompts
- 📋 Generate complete Google Forms
- ✨ Automatically structure questions
- 🔗 Return editable Google Form links
- ⚙️ Integrate directly with Google Forms

Example prompt:

> Create a Software Engineer application form asking for personal details, education, skills, projects, resume upload, and work experience.

The AI converts this into a fully structured Google Form automatically.

---

# 💼 LinkedIn Agent

The **LinkedIn Agent** helps recruiters create professional hiring posts.

### Responsibilities

- ✍️ Generate LinkedIn hiring posts
- 🎯 Create engaging recruitment content
- 📢 Generate attractive job announcements
- 🚀 Publish directly to LinkedIn
- 💡 Improve wording and formatting

Before publishing, the recruiter must explicitly approve the generated content.

---

# 💬 General Agent

The **General Agent** acts as AkiraHire's conversational assistant.

### Responsibilities

- 👋 Greetings
- ❓ General questions
- 📖 Explain platform features
- 💡 Help recruiters navigate the system
- 🎓 Recruitment-related guidance
- 🛠 Explain workflows

It doesn't modify jobs or applications—it simply assists users with information and guidance.

---

# 👤 Human-in-the-Loop Approval

Although AkiraHire automates repetitive recruitment tasks, **the recruiter always remains in control.**

Actions that affect real data or publish content never happen automatically.

Examples include:

- 🗑 Deleting jobs
- 🔒 Closing jobs
- 📢 Publishing LinkedIn posts

The AI pauses and waits for explicit recruiter confirmation before continuing.

This ensures automation increases productivity without removing human oversight.

---

# ⚙️ Engineering Highlights

### 🤖 Multi-Agent AI System

A LangGraph-based Router Agent dispatches every request to one of six specialist AI agents instead of relying on one large AI assistant.

---

### 👤 Human-in-the-Loop Approval

Critical actions pause execution until the recruiter explicitly approves them, ensuring AI assists rather than replaces human decision-making.

---

### 🔐 Role-Based Authentication

Users are assigned recruiter or candidate roles, and backend authorization prevents unauthorized access to protected resources.

---

### ⚡ Debounced Search & Filters

Search inputs wait until users stop typing before sending API requests, significantly reducing unnecessary server traffic.

---

### 🚀 Virtualized Tables

Large datasets such as jobs, candidates, applications, and chat history only render visible rows, ensuring smooth performance even with thousands of records.

---

### 🛡 Centralized Error Handling

A global exception handler catches custom application errors, returns consistent API responses, and prevents internal stack traces from being exposed.

---

### 📄 Resume Parsing

Uploaded resumes are automatically parsed, allowing AI evaluation without requiring recruiters to manually extract candidate information.

---

# 🛠 Tech Stack

## 💻 Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Zustand
- Axios

---

## ⚙️ Backend

- FastAPI
- Python
- PostgreSQL
- SQLAlchemy
- Alembic

---

## 🤖 Artificial Intelligence

- LangGraph
- LangChain
- Groq
- Llama 3.3 70B

---

## ☁️ Cloud & Integrations

- Supabase Storage
- Google OAuth2
- Google Forms API
- LinkedIn OAuth

---

# 📂 Running Locally

## Backend

```bash
cd backend

pip install -r requirements.txt

cp .env.example .env

alembic upgrade head

python main.py

# or

uvicorn app:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Visit:

```
http://localhost:3000
```

---

# 🚀 Future Improvements

- 📧 Email Agent
- 📅 Interview Scheduling Agent
- 📈 Recruitment Analytics Dashboard
- 📹 AI Interview Assistant
- 📊 Hiring Performance Insights

---

# 📄 License

This project currently has **no license specified**.

Unless stated otherwise, all rights are reserved.