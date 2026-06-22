# AkiraHire

AkiraHire is an AI-powered HR automation platform designed to streamline recruitment and candidate management workflows through specialized AI agents.

## Current Feature

### Google AutoForm Agent

The Google AutoForm Agent allows HR teams to create complete Google Forms from a simple natural language description.

Example:

> "Create a software engineer application form with name, email, phone number, years of experience, skills, resume link, and availability."

The agent automatically:

* Generates a structured form schema using AI.
* Creates a Google Form.
* Adds all required questions.
* Creates a Google Sheet for responses.
* Links the Google Form with the response sheet.
* Returns form and sheet URLs instantly.

### Key Features

* Natural language to Google Form generation.
* Automatic Google Sheets integration.
* AI-powered form schema generation.
* Google OAuth authentication.
* FastAPI-based REST API.
* Modular architecture for future expansion.

## Planned Features

AkiraHire is being built as a collection of specialized HR agents.

### Gmail Agent

* Candidate outreach automation.
* Interview invitation emails.
* Follow-up email generation.
* Bulk email workflows.

### Resume Screening Agent

* Resume parsing.
* Candidate ranking.
* Skill extraction.
* Job description matching.

### LinkedIn Agent

* Generate hiring posts.
* Generate company updates.
* Recruitment campaign content.

### Interview Agent

* Interview scheduling.
* Candidate communication.
* Automated reminders.

### Candidate Management Agent

* Applicant tracking.
* Candidate status management.
* Recruitment pipeline monitoring.

### Analytics Agent

* Hiring metrics.
* Recruitment performance insights.
* Candidate funnel analysis.

## Tech Stack

* FastAPI
* Python
* Google Forms API
* Google Sheets API
* OAuth 2.0
* Pydantic
* AI-powered schema generation

## Vision

AkiraHire aims to become a unified AI-powered HR operating system where multiple specialized agents work together to automate recruitment, candidate engagement, and talent management workflows.
