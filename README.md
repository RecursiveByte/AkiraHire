<h1>
  <img src="./frontend/public/images/akira-logo.avif" width="25" height="25" />
  AkiraHire
</h1>



AkiraHire is an **AI-powered HR automation platform** that helps recruiters manage the complete hiring workflow from creating jobs and application forms to evaluating candidates and publishing hiring posts.

Instead of relying on a single AI assistant, AkiraHire uses a **LangGraph-powered multi-agent system**, where specialized AI agents work together to automate different parts of recruitment while keeping the recruiter in complete control.

---

# 🚀 Live Demo

> https://akira.abhoba.com/

---

# ✨ Features

- 💼 Create, update, publish, close, and manage job postings
- 📝 Build and manage application forms
- 🤖 AI-powered candidate evaluation against job requirements
- 👤 Dedicated recruiter and candidate portals
- 💬 AI chat assistant for managing recruitment workflows
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
      ├──────────────► Email Agent
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

The **Job Agent** helps recruiters create job postings.

### Responsibilities

- ✨ Generate professional job descriptions
- 💼 Create new jobs after recruiter approval

The Job Agent first generates the job details and waits for the recruiter to explicitly approve them before creating the job.

Actions such as deleting a job, closing a job, or changing its status are controlled directly by the recruiter through the platform.

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
- 🔗 Attach forms to jobs
- 📋 Manage recruiter forms

Recruiters simply describe the information they want to collect, and the agent prepares the form structure automatically.

Actions such as deleting a form, closing a form, or changing its status are controlled directly by the recruiter through the platform.

---

# 🌐 Google Form Agent

The **Google Form Agent** creates Google Forms directly from natural language.

### Responsibilities

- 🧠 Understand plain-English prompts
- 📋 Generate complete Google Forms
- 📊 Generate and link Google Sheets according to recruiter requirements
- 🔗 Return editable Google Form and Google Sheet links
- ⚙️ Integrate directly with Google Forms

Example prompt:

> Create a Software Engineer application form asking for personal details, education, skills, projects, resume upload, and work experience.

The AI converts this into a fully structured Google Form automatically.

---

# 💼 LinkedIn Agent

The **LinkedIn Agent** helps recruiters create professional hiring posts.

### Responsibilities

- ✍️ Generate LinkedIn hiring posts

Before publishing, the recruiter must explicitly approve the generated content.

The LinkedIn Agent only generates the hiring post. **Publishing is handled separately by the platform, as publishing a job post is an important decision that remains under recruiter control.**

---

# 📧 Email Agent

The **Email Agent** helps recruiters automate candidate communication while keeping the recruiter in control.

Before the Email Agent can access the recruiter's calendar or send emails, the recruiter must explicitly grant the required permissions.

### Responsibilities

- ✉️ Generate professional candidate emails
- 📩 Send recruitment-related emails
- 🎯 Personalize emails based on candidate and job information
- 📅 Access the recruiter's calendar after explicit authorization
- 🕐 Check the recruiter's calendar to determine suitable times for communication
- ⏰ Schedule emails according to the recruiter's availability and preferences
- 📋 Generate interview invitations and other recruitment-related communications
- 🔔 Send candidate notifications
- ✏️ Customize email content based on recruiter instructions

The Email Agent **cannot access the recruiter's calendar or send emails without explicit authorization**.

Once permission is granted, the agent can check the recruiter's calendar and use the recruiter's availability to determine an appropriate time to send or schedule candidate communications.


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

# 📄 License

This project currently has **no license specified**.

Unless stated otherwise, all rights are reserved.
