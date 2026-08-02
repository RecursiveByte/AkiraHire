# AGENTS.md

# AkiraHire Frontend

This document defines the coding standards and architecture that every AI agent must follow when modifying this project.

---

# Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React
- Axios
- Zustand
- React Hook Form
- Zod

Always use the existing project stack.
Do not introduce new libraries unless explicitly requested.

---

# General Rules

- Always write TypeScript.
- Never use JavaScript files.
- Keep components small and reusable.
- Avoid duplicate code.
- Prefer composition over large components.
- Follow existing folder structure.
- Never break existing functionality.
- Do not remove existing features unless requested.

---

# Code Style

- Use functional React components.
- Use arrow functions.
- Prefer named exports when the project already uses them.
- Use async/await instead of Promise chains.
- Keep functions focused on one responsibility.
- Write clean and readable code.
- Avoid unnecessary comments.

---

# Component Guidelines

- Keep UI components presentational.
- Move business logic into hooks or services.
- Reuse existing components whenever possible.
- Do not create duplicate UI components.

---

# Styling

- Use Tailwind CSS only.
- Do not use inline styles.
- Keep spacing consistent.
- Maintain responsive design.
- Follow the existing design system.

---

# State Management

- Use Zustand for global state.
- Use local React state when global state is unnecessary.
- Avoid unnecessary global state.

---

# API Layer

- All API calls must go through the existing service layer.
- Do not call Axios directly inside components.
- Keep request logic separate from UI.

Example:

Component
    ↓
Service
    ↓
Axios
    ↓
Backend

---

# Forms

- Use React Hook Form.
- Validate using Zod.
- Display validation errors clearly.
- Never bypass validation.

---

# Error Handling

- Handle loading states.
- Handle empty states.
- Handle API errors gracefully.
- Never leave unhandled promises.

---

# Performance

- Minimize unnecessary re-renders.
- Memoize only when beneficial.
- Lazy load large components when appropriate.
- Avoid unnecessary API requests.

---

# File Organization

Prefer this structure.

app/
components/
features/
hooks/
services/
store/
types/
utils/
constants/

Keep related files together.

---

# Naming Conventions

Components:
PascalCase

Example:
UserCard.tsx

Hooks:
useSomething.ts

Example:
useAuth.ts

Utilities:
camelCase

Example:
formatDate.ts

Constants:
UPPER_SNAKE_CASE

Types:
User.ts
Job.ts

---

# Accessibility

- Use semantic HTML.
- Add labels to form inputs.
- Use accessible buttons.
- Maintain keyboard navigation.

---

# Before Writing Code

Always check whether similar functionality already exists.

Prefer extending existing code over creating new code.

Reuse existing utilities whenever possible.

---

# When Modifying Code

Do not rewrite entire files unless necessary.

Modify only the relevant sections.

Preserve formatting and coding style.

---

# Pull Requests

Generated code should be:

- Readable
- Maintainable
- Production-ready
- Type-safe
- Responsive
- Consistent with the existing architecture

Avoid placeholder implementations unless explicitly requested.

---

# Important

When requirements are unclear:

- Ask for clarification instead of making assumptions.
- Do not invent API endpoints.
- Do not invent database fields.
- Follow the existing project architecture.