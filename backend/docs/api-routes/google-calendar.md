# Google Calendar

**Base URL:** `/google-calendar`  
**Source:** `backend/integration/google_calendar/api/routes/google_calendar_routes.py`  
**Routes:** 4

Each route below is called as the base URL followed by the root path
(for example `/google-calendar` + `/auth/google/connect`).

| Method | Root | Purpose | Response |
| --- | --- | --- | --- |
| `GET` | `/auth/google/connect` | Connect google calendar | 200 |
| `GET` | `/auth/google/connect/callback` | Google calendar callback | 200 |
| `GET` | `/events` | Get calendar events | 200 |
| `POST` | `/events` | Create calendar event | 200 |
