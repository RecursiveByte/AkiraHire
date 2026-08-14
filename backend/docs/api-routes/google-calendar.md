# Google Calendar

**Base URL:** `/google-calendar`  
**Source:** `backend/integration/google_calendar/api/routes/google_calendar_routes.py`  
**Routes:** 4

Each route below is called as the base URL followed by the root path
(for example `/google-calendar` + `/auth/google/connect`).

| Method | Root | Purpose |
| --- | --- | --- |
| `GET` | `/auth/google/connect` | Connect google calendar |
| `GET` | `/auth/google/connect/callback` | Google calendar callback |
| `GET` | `/events` | Get calendar events |
| `POST` | `/events` | Create calendar event |
