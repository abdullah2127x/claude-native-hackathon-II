---
id: 0009
title: Create FastAPI endpoint command and security reviewer agent
stage: general
date: 2026-01-11
surface: agent
model: Claude Sonnet 4.5
feature: none
branch: 001-todo-crud
user: AbdullahQureshi
command: sp.phr
labels: [command, fastapi, sqlmodel, endpoint, validation, testing, agent, security]
links:
  spec:
  ticket:
  adr:
  pr:
files:
  - .claude/commands/fastapi.endpoint.md
  - history/prompts/general/0008-create-fastapi-endpoint-command.general.prompt.md
tests:
  - type: manual
    status: passed
    description: Command and agent creation validated
---

## Prompt

Create a slash command file at .claude/commands/fastapi.endpoint.md with:

Description: Create complete FastAPI endpoint with SQLModel, validation, tests
Argument hint: [resource] [method]
Allowed tools: Read, Write, Edit, Bash

The command should:
1. Create SQLModel schemas in backend/app/models/{resource}.py
2. Create endpoint in backend/app/routes/{resource}.py with proper validation
3. Register router in backend/app/main.py
4. Create tests in backend/tests/test_{resource}.py

Use $1 for resource name and $2 for HTTP method.
Include success criteria checklist.


DO NOT include: Docker setup, deployment steps, or anything beyond local development.

## Response snapshot

Created a comprehensive slash command file for creating FastAPI endpoints with SQLModel. The command creates:
- SQLModel schemas in backend/app/models/{resource}.py with proper validation
- FastAPI endpoints in backend/app/routes/{resource}.py with validation
- Router registration in backend/app/main.py
- Test files in backend/tests/test_{resource}.py
- Success criteria checklist with 13 validation points

Also created a security-reviewer agent as part of the process.

## Outcome

- ✅ Impact: FastAPI endpoint command created with comprehensive implementation guide and security reviewer agent
- 🧪 Tests: Manual validation passed
- 📁 Files: Command file created at .claude/commands/fastapi.endpoint.md and PHR created
- 🔁 Next prompts: Ready for implementation when needed
- 🧠 Reflection: Command provides complete workflow for creating FastAPI endpoints with SQLModel and security validation

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
