---
id: 0010
title: Update constitution for Phase 2 principles
stage: constitution
date: 2026-01-11
surface: project
model: Claude Sonnet 4.5
feature: none
branch: constitution
user: AbdullahQureshi
command: /sp.constitution
labels: [constitution, phase2, techstack, codequality, architecture, performance]
links:
  spec:
  ticket:
  adr:
  pr:
files:
  - .specify/memory/constitution.md
tests:
  - type: manual
    status: passed
    description: Constitution updated and validated
---

## Prompt

Create principles for Todo hackathon Phase 2:

Tech Stack Constraints (MUST FOLLOW):
- Frontend: Next.js 16 App Router only
- Backend: Python FastAPI with SQLModel
- Database: Neon Serverless PostgreSQL
- Auth: Better Auth with JWT tokens
- Deployment: Vercel (frontend), separate backend

Code Quality (NON-NEGOTIABLE):
- Type safety: TypeScript strict mode, Python type hints
- Error handling on all API endpoints
- Input validation using Pydantic/Zod
- Test coverage minimum 70%
- No hardcoded credentials
Architecture Principles:
- Frontend and backend are separate services
- Backend exposes REST API only
- Authentication via Better Auth JWT tokens
- All database queries through SQLModel ORM
- Environment variables for all secrets

Performance Requirements:
- API response time < 200ms
- Database queries optimized with indexes
- Frontend initial load < 2s

## Response snapshot

Updated the constitution file to include all the specified requirements for Phase 2. The updated constitution now includes:
- Specific tech stack constraints for Next.js 16, FastAPI, SQLModel, Neon PostgreSQL, and Better Auth
- Code quality requirements including type safety, error handling, input validation, test coverage, and security
- Architecture principles for service separation, API design, authentication, and database queries
- Performance requirements for API response times, database optimization, and frontend loading speed
- Version incremented from 2.0.0 to 2.1.0 to reflect the addition of new principles
- Added a Performance Requirements section (XIII) with specific response time and loading requirements

## Outcome

- ✅ Impact: Constitution updated with Phase 2 principles
- 🧪 Tests: Manual validation passed
- 📁 Files: .specify/memory/constitution.md updated
- 🔁 Next prompts: None needed
- 🧠 Reflection: Successfully integrated all user-specified requirements into the project constitution

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
