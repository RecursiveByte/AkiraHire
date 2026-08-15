# Google Forms

**Base URL:** `/google-forms`  
**Source:** `backend/integration/google_form/api/routes/google_form_routes.py`  
**Routes:** 3

Each route below is called as the base URL followed by the root path
(for example `/google-forms` + `/auth/google/connect`).

| Method | Root | Purpose | Response |
| --- | --- | --- | --- |
| `GET` | `/auth/google/connect` | Connect google | 200 |
| `GET` | `/auth/google/connect/callback` | Google oauth callback | 200 |
| `POST` | `/create_google_form` | Create google form endpoint | 200 `GoogleFormResponse` |
