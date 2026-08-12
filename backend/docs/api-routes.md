# AkiraHire API Routes

Reference for the AkiraHire backend HTTP API. The backend is a FastAPI app, so
an always up to date interactive version of this is served by the app itself:

- Swagger UI: `/docs`
- ReDoc: `/redoc`
- OpenAPI schema: `/openapi.json`

This document is a hand written overview meant for quickly finding an endpoint
and knowing who is allowed to call it.

## Base URL

All paths below are relative to the backend origin, for example
`http://localhost:8000` in development or your deployed backend URL in
production. There is no global version prefix, so a path like `/auth/login` is
called as `http://localhost:8000/auth/login`.

## Authentication

Authentication is JWT based.

- Sign up with `POST /auth/signup` or log in with `POST /auth/login`. A
  successful login returns an access token and sets a refresh token.
- Send the access token on protected requests as
  `Authorization: Bearer <access_token>`.
- When the access token expires, call `POST /auth/refresh` to get a new one
  using the refresh token.
- `POST /auth/logout` ends the session.

Google sign in is also supported through `GET /auth/google/login` and the
callback `GET /auth/google/callback`.

### Roles

Every user has one of three roles, and many endpoints are restricted to a
specific role:

- `CANDIDATE` — job seekers who build a profile and apply to jobs.
- `RECRUITER` — post jobs, build forms, review and evaluate applications.
- `ADMIN` — platform administration, forms, and analytics.

### Rate limiting

Endpoints are rate limited (backed by Redis via `fastapi-limiter`). If you send
too many requests in a short window you will get `429 Too Many Requests`.

### Auth column

Each table has an **Auth** column:

- `Public` — no token required.
- `User` — any authenticated user.
- `Candidate`, `Recruiter`, `Admin` — authenticated user with that role.
- `Refresh token` — needs the refresh token, not the access token.

## Authentication (`/auth`)

| Method | Path | Description | Auth |
| --- | --- | --- | --- |
| POST | `/auth/signup` | Register a new user. | Public |
| POST | `/auth/login` | Log in and receive an access token. | Public |
| POST | `/auth/refresh` | Exchange the refresh token for a new access token. | Refresh token |
| POST | `/auth/logout` | End the current session. | User |
| GET | `/auth/me` | Get the current user's details. | User |
| GET | `/auth/google/login` | Start the Google OAuth login flow. | Public |
| GET | `/auth/google/callback` | Google OAuth redirect target. | Public |
| POST | `/auth/forgot-password` | Send a password reset email. | Public |
| POST | `/auth/reset-password` | Set a new password using a reset token. | Public |

## Candidate profiles (`/candidate`)

| Method | Path | Description | Auth |
| --- | --- | --- | --- |
| POST | `/candidate/profile` | Create the current candidate's profile. | Candidate |
| GET | `/candidate/profile` | Get the current candidate's profile. | Candidate |
| PATCH | `/candidate/profile` | Update the current candidate's profile. | Candidate |
| GET | `/candidate/profile/{candidate_id}` | Get a candidate profile by id. | User |
| GET | `/candidate/profiles` | List all candidate profiles. | Admin |
| DELETE | `/candidate/profile/{candidate_id}` | Delete a candidate profile. | Candidate |

## Recruiter profiles (`/recruiter`)

| Method | Path | Description | Auth |
| --- | --- | --- | --- |
| GET | `/recruiter/profiles` | List all recruiter profiles. | Admin |
| DELETE | `/recruiter/profile/{recruiter_id}` | Delete a recruiter profile. | Admin |

## Jobs (`/jobs`)

| Method | Path | Description | Auth |
| --- | --- | --- | --- |
| GET | `/jobs/search` | Search jobs. | Recruiter |
| GET | `/jobs/recruiter` | List the current recruiter's jobs. | Recruiter |
| POST | `/jobs/generate-description` | Generate a job description with AI. | Recruiter |
| POST | `/jobs/` | Create a job. | Recruiter |
| GET | `/jobs/{job_id}` | Get a job by id. | Recruiter |
| PATCH | `/jobs/{job_id}` | Update a job. | Recruiter |
| DELETE | `/jobs/{job_id}` | Delete a job. | Recruiter |
| PATCH | `/jobs/{job_id}/publish` | Publish a job. | Recruiter |
| PATCH | `/jobs/{job_id}/close` | Close a job. | Recruiter |

## Forms (`/forms`)

| Method | Path | Description | Auth |
| --- | --- | --- | --- |
| POST | `/forms/generate-form-schema-json` | Generate a form schema with AI. | Admin |
| POST | `/forms/` | Create a form. | Admin |
| GET | `/forms/with-job` | List forms together with their job. | Admin |
| GET | `/forms/recruiter/` | List the current recruiter's forms. | Recruiter |
| GET | `/forms/{form_id}` | Get a form by id. | Admin |
| GET | `/forms/{form_id}/with-job` | Get a form with its job by form id. | Admin |
| GET | `/forms/job/{job_id}` | Get a form by job id. | Admin |
| PATCH | `/forms/{form_id}/publish` | Publish a form. | Admin |
| PATCH | `/forms/{form_id}/close` | Close a form. | Admin |
| DELETE | `/forms/{form_id}` | Delete a form. | Admin |

## Applications (`/applications`)

| Method | Path | Description | Auth |
| --- | --- | --- | --- |
| POST | `/applications/` | Create an application. | Candidate |
| GET | `/applications/applied-form-ids` | Form ids the candidate has already applied to. | Candidate |
| GET | `/applications/candidate/` | Search the candidate's own applications. | Candidate |
| GET | `/applications/candidate/view` | The candidate's applications with form data. | Candidate |
| GET | `/applications/candidate/{candidate_id}/view` | A candidate's applications with form data. | Candidate |
| GET | `/applications/recruiter/view` | The recruiter's applications. | Recruiter |
| GET | `/applications/recruiter/{recruiter_id}` | Applications for a recruiter. | Recruiter |
| GET | `/applications/recruiter/{recruiter_id}/view` | Applications for a recruiter with form data. | Recruiter |
| GET | `/applications/{application_id}` | Get an application by id. | Recruiter |
| GET | `/applications/{application_id}/view` | Get an application with its form. | Recruiter |
| PATCH | `/applications/{application_id}` | Update an application. | Candidate |
| DELETE | `/applications/{application_id}` | Delete an application. | User |

## Application evaluations (`/application-evaluations`)

| Method | Path | Description | Auth |
| --- | --- | --- | --- |
| POST | `/application-evaluations/{application_id}/evaluate` | Evaluate an application. | Recruiter |
| GET | `/application-evaluations/recruiter` | The recruiter's evaluated applications. | Recruiter |
| GET | `/application-evaluations/` | List all evaluations. | Recruiter |
| POST | `/application-evaluations/top` | Get the top ranked evaluations. | Recruiter |
| DELETE | `/application-evaluations/{application_id}` | Delete an evaluation. | Admin |

## Resumes (`/resume`)

| Method | Path | Description | Auth |
| --- | --- | --- | --- |
| POST | `/resume/read` | Parse a resume and return its extracted data. | Candidate |
| POST | `/resume/upload` | Upload a resume file. | Candidate |

## Chatbot (`/chatbot`)

| Method | Path | Description | Auth |
| --- | --- | --- | --- |
| POST | `/chatbot/chat` | Send a message to the assistant. | Recruiter |
| POST | `/chatbot/chat/stream` | Send a message and stream the reply. | Recruiter |
| GET | `/chatbot/conversations` | List the recruiter's conversations. | Recruiter |
| GET | `/chatbot/thread/{thread_id}/messages` | Get the messages in a thread. | Recruiter |

## Assistant threads (`/assistant`)

| Method | Path | Description | Auth |
| --- | --- | --- | --- |
| DELETE | `/assistant/threads/{thread_id}` | Delete a chat thread. | Recruiter |

## Integrations (`/integrations`)

| Method | Path | Description | Auth |
| --- | --- | --- | --- |
| GET | `/integrations/` | List connected integrations. | Recruiter |
| DELETE | `/integrations/connected-accounts/{account_id}` | Disconnect a connected account. | Recruiter |

## Google Calendar (`/google-calendar`)

| Method | Path | Description | Auth |
| --- | --- | --- | --- |
| GET | `/google-calendar/auth/google/connect` | Start connecting Google Calendar. | User |
| GET | `/google-calendar/auth/google/connect/callback` | Google Calendar OAuth callback. | Public |
| GET | `/google-calendar/events` | List calendar events. | User |
| POST | `/google-calendar/events` | Create a calendar event. | User |

## Google Forms (`/google-forms`)

| Method | Path | Description | Auth |
| --- | --- | --- | --- |
| GET | `/google-forms/auth/google/connect` | Start connecting Google Forms. | User |
| GET | `/google-forms/auth/google/connect/callback` | Google Forms OAuth callback. | Public |
| POST | `/google-forms/create_google_form` | Create a Google Form. | User |

## LinkedIn (`/linkedin`)

| Method | Path | Description | Auth |
| --- | --- | --- | --- |
| GET | `/linkedin/auth/connect` | Start connecting a LinkedIn account. | User |
| GET | `/linkedin/auth/callback` | LinkedIn OAuth callback. | Recruiter |
| POST | `/linkedin/generate-post` | Generate a LinkedIn post draft. | Recruiter |
| GET | `/linkedin/drafts` | List post drafts. | Recruiter |
| DELETE | `/linkedin/drafts/{draft_id}` | Delete a draft. | Recruiter |
| POST | `/linkedin/publish-post` | Publish a post. | Recruiter |

## Notes

- Request and response bodies are defined by the Pydantic schemas in the backend
  and are shown in full on `/docs`. This file focuses on the route surface and
  access rules.
- Roles are enforced with the `require_role` dependency, and a few endpoints
  only require any signed in user (`get_current_user`). If you get `403
  Forbidden`, check that your role matches the Auth column.
