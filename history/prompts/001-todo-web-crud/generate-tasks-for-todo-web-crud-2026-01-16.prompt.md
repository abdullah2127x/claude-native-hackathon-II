---
id: "001-todo-web-crud_generate-tasks-for-todo-web-crud_2026-01-16"
stage: "tasks"
feature: "001-todo-web-crud"
date: "2026-01-16"
author: "Claude Code"
summary: "Generate tasks for todo web CRUD feature with TDD approach"
---

# Prompt

Generate task breakdown for feature 001-todo-web-crud based on design documents.

**User Requirements**:
1. Start with scaffolding tasks: `npx create-next-app` for frontend, `uv init` for backend
2. Create CLAUDE.md files in both frontend and backend for development specialists
3. Follow Test-Driven Development (TDD) - MANDATORY, not optional
4. All tasks must follow TDD Red-Green-Refactor cycle

# Response

Generated comprehensive task breakdown for the Full-Stack Todo Web Application feature (001-todo-web-crud) with **MANDATORY TDD approach**. The tasks.md file contains **177 tasks** organized across 10 phases:

## Phase Breakdown

1. **Phase 0: Initial Project Scaffolding (7 tasks)**
   - T000: `npx create-next-app` for Next.js 16 frontend
   - T001: `uv init` for FastAPI backend
   - T002-T006: Dependency installation and test framework configuration

2. **Phase 1: Setup (11 tasks)**
   - T007: Create frontend/CLAUDE.md with TDD standards
   - T008: Create backend/CLAUDE.md with TDD standards
   - T009-T017: Folder structure, middleware, test setup files

3. **Phase 2: Foundational (20 tasks)**
   - Backend: Database, auth, middleware, health check
   - Frontend: Better Auth, API client, validation, UI components

4. **Phases 3-8: User Stories (123 tasks total)**
   - Each user story follows TDD cycle:
     - **RED Phase**: Write tests first, ensure they FAIL
     - **GREEN Phase**: Implement code to make tests PASS
     - **REFACTOR Phase**: Improve code quality while keeping tests green

   - US1 (Authentication): 23 tasks (9 tests, 11 implementation, 3 refactor)
   - US2 (Create Tasks): 25 tasks (8 tests, 12 implementation, 5 refactor)
   - US3 (View Tasks): 24 tasks (9 tests, 11 implementation, 4 refactor)
   - US4 (Update Tasks): 19 tasks (8 tests, 8 implementation, 3 refactor)
   - US5 (Toggle Completion): 16 tasks (6 tests, 7 implementation, 3 refactor)
   - US6 (Delete Tasks): 16 tasks (6 tests, 7 implementation, 3 refactor)

5. **Phase 9: Polish & Cross-Cutting (16 tasks)**
   - Error handling, security verification, performance testing
   - Coverage validation (≥70% mandatory for both frontend and backend)

## Key TDD Requirements

- **46 test-writing tasks** (RED phase) - MUST be completed before implementation
- **56 implementation tasks** (GREEN phase) - MUST make tests pass
- **18 refactor tasks** (REFACTOR phase) - MUST keep tests passing
- **Coverage target**: ≥70% for both frontend and backend (mandatory, verified in Phase 9)

## Scaffolding Commands

Frontend:
```bash
npx create-next-app@latest frontend --typescript --tailwind --app --no-git --import-alias "@/*"
```

Backend:
```bash
mkdir backend && cd backend && uv init --name "todo-backend"
uv add fastapi uvicorn sqlmodel pydantic python-jose[cryptography] passlib[bcrypt] python-multipart aiosqlite
uv add --dev pytest pytest-asyncio pytest-cov httpx
```

## MVP Scope

Phases 0, 1, 2, 3, 4 = **85 tasks** for minimum viable product with:
- TDD approach
- Authentication (sign up, sign in, sign out)
- Task creation
- 70%+ test coverage

## Validation

- All tasks follow strict format: `- [ ] [TaskID] [P?] [Story?] Description with file path`
- TDD workflow enforced: RED → GREEN → REFACTOR
- Independent test criteria for each user story
- Parallel opportunities identified (tasks marked with [P])
- Dependencies clearly mapped

The task breakdown ensures quality code delivery through test-first development while maintaining the constitutional requirement for 70% test coverage.
