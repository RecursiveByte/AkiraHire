# AkiraHire :: Backend API Routes

Per-module reference for the FastAPI backend. Each module has one **base URL** 
(its router prefix); every route under it is a **method** plus a **root** path.

- **15** modules, **76** routes total
- No global version prefix: routes are hit directly (`/auth/login`, not `/api/auth/login`)
- Live copy served by the app at `/docs`, `/redoc`, `/openapi.json`

## App API `backend/api/routes`

| Module | Base URL | Routes | File |
| --- | --- | --- | --- |
| Authentication | `/auth` | 9 | [`authentication.md`](authentication.md) |
| Candidate | `/candidate` | 6 | [`candidate.md`](candidate.md) |
| Recruiter | `/recruiter` | 2 | [`recruiter.md`](recruiter.md) |
| Admin | `/admin` | 3 | [`admin.md`](admin.md) |
| Jobs | `/jobs` | 9 | [`jobs.md`](jobs.md) |
| Forms | `/forms` | 9 | [`forms.md`](forms.md) |
| Applications | `/applications` | 12 | [`applications.md`](applications.md) |
| Application evaluations | `/application-evaluations` | 5 | [`application-evaluations.md`](application-evaluations.md) |
| Resume | `/resume` | 2 | [`resume.md`](resume.md) |
| Chatbot | `/chatbot` | 3 | [`chatbot.md`](chatbot.md) |
| Assistant threads | `/assistant` | 1 | [`assistant-threads.md`](assistant-threads.md) |

## Integrations `backend/integration`

| Module | Base URL | Routes | File |
| --- | --- | --- | --- |
| Google Calendar | `/google-calendar` | 4 | [`google-calendar.md`](google-calendar.md) |
| Google Forms | `/google-forms` | 3 | [`google-forms.md`](google-forms.md) |
| Integrations | `/integrations` | 2 | [`integrations.md`](integrations.md) |
| LinkedIn | `/linkedin` | 6 | [`linkedin.md`](linkedin.md) |

> Note: `backend/api/routes/google_calendar_routes.py` is an empty stub. The calendar
> router the app actually mounts lives under `backend/integration/google_calendar`.
