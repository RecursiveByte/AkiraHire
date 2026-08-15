# Chatbot

**Base URL:** `/chatbot`  
**Source:** `backend/api/routes/chat_bot_router.py`  
**Routes:** 3

Each route below is called as the base URL followed by the root path
(for example `/chatbot` + `/thread/{thread_id}/messages`).

| Method | Root | Purpose | Response |
| --- | --- | --- | --- |
| `GET` | `/thread/{thread_id}/messages` | Get chat history | 200 `ChatHistoryResponse` |
| `POST` | `/chat` | Chat | 200 |
| `GET` | `/conversations` | Get conversations | 200 `list[ChatThreadResponse]` |

## Response schemas

### `ChatHistoryResponse`

| Field | Type |
| --- | --- |
| `messages` | `list[ChatMessageResponse]` |

### `ChatThreadResponse`

| Field | Type |
| --- | --- |
| `id` | `UUID` |
| `title` | `str` |
| `updated_at` | `datetime` |
