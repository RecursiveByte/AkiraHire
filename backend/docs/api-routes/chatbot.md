# Chatbot

**Base URL:** `/chatbot`  
**Source:** `backend/api/routes/chat_bot_router.py`  
**Routes:** 4

Each route below is called as the base URL followed by the root path
(for example `/chatbot` + `/thread/{thread_id}/messages`).

| Method | Root | Purpose |
| --- | --- | --- |
| `GET` | `/thread/{thread_id}/messages` | Get chat history |
| `POST` | `/chat` | Chat |
| `POST` | `/chat/stream` | Chat stream |
| `GET` | `/conversations` | Get conversations |
