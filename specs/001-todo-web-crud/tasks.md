# Tasks: Full-Stack Todo Web Application

**Input**: Design documents from `/specs/001-todo-web-crud/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/openapi.yaml, research.md

**Tests**: MANDATORY - Following Test-Driven Development (TDD) approach with Red-Green-Refactor cycle

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`
- **Specifications**: `specs/001-todo-web-crud/`

## TDD Workflow

For each user story:
1. **RED**: Write failing tests first
2. **GREEN**: Implement minimum code to pass tests
3. **REFACTOR**: Improve code quality while keeping tests green

---

## Phase 0: Initial Project Scaffolding

**Purpose**: Create Next.js frontend and FastAPI backend projects

- [ ] T000 Create Next.js 16 frontend with: `npx create-next-app@latest frontend --typescript --tailwind --app --no-git --import-alias "@/*"`
- [ ] T001 Create FastAPI backend structure: `mkdir backend && cd backend && uv init --name "todo-backend"`
- [ ] T002 Install backend core dependencies: `cd backend && uv add fastapi uvicorn sqlmodel pydantic python-jose[cryptography] passlib[bcrypt] python-multipart aiosqlite`
- [ ] T003 Install backend dev dependencies: `cd backend && uv add --dev pytest pytest-asyncio pytest-cov httpx`
- [ ] T004 Install frontend testing dependencies: `cd frontend && npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event msw`
- [ ] T005 Configure Jest for frontend in frontend/jest.config.ts
- [ ] T006 Configure pytest for backend in backend/pyproject.toml (add test config section)

---

## Phase 1: Setup (Development Standards & Structure)

**Purpose**: Create development guidelines and folder structure

- [ ] T007 Create frontend/CLAUDE.md with TypeScript, React, Next.js, TDD standards, and testing requirements
- [ ] T008 Create backend/CLAUDE.md with Python, FastAPI, SQLModel, TDD standards, and pytest guidelines
- [ ] T009 [P] Create frontend folder structure (middleware/, providers/, styles/, lib/constants/, lib/utils/, tests/setup.ts)
- [ ] T010 [P] Create backend folder structure (middleware/, utils/, exceptions/, tests/)
- [ ] T011 [P] Initialize frontend middleware placeholder in frontend/src/middleware/api-interceptor.ts
- [ ] T012 [P] Initialize backend middleware placeholders (cors.py, error_handler.py, logging.py) in backend/src/middleware/
- [ ] T013 [P] Create frontend global styles in frontend/src/styles/globals.css
- [ ] T014 [P] Create frontend constants files (api.ts, messages.ts) in frontend/src/lib/constants/
- [ ] T015 [P] Create backend exception classes (base.py, handlers.py) in backend/src/exceptions/
- [ ] T016 Create test setup file in frontend/src/tests/setup.ts with MSW configuration
- [ ] T017 Create pytest conftest.py in backend/tests/conftest.py with test fixtures

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Backend Foundation

- [ ] T018 Setup database connection in backend/src/db/database.py with Neon PostgreSQL pooling
- [ ] T019 Create User model (read-only reference) in backend/src/models/user.py
- [ ] T020 Configure environment settings in backend/src/config.py with Pydantic Settings
- [ ] T021 Setup CORS middleware in backend/src/middleware/cors.py
- [ ] T022 [P] Setup error handler middleware in backend/src/middleware/error_handler.py
- [ ] T023 [P] Setup logging middleware in backend/src/middleware/logging.py
- [ ] T024 Implement JWT handler with JWKS verification in backend/src/auth/jwt_handler.py
- [ ] T025 Create auth dependencies (get_current_user) in backend/src/auth/dependencies.py
- [ ] T026 Create health check router in backend/src/routers/health.py
- [ ] T027 Initialize FastAPI app with middleware in backend/src/main.py

### Frontend Foundation

- [ ] T028 [P] Setup Better Auth server config in frontend/src/lib/auth.ts
- [ ] T029 [P] Setup Better Auth client in frontend/src/lib/auth-client.ts
- [ ] T030 Create Better Auth API route handler in frontend/src/app/api/auth/[...all]/route.ts
- [ ] T031 Setup API client with interceptors in frontend/src/middleware/api-interceptor.ts
- [ ] T032 Create auth validation schemas in frontend/src/lib/validations/auth.ts
- [ ] T033 [P] Create task validation schemas in frontend/src/lib/validations/task.ts
- [ ] T034 [P] Create TypeScript types in frontend/src/types/index.ts
- [ ] T035 Create AuthProvider wrapper in frontend/src/providers/auth-provider.tsx
- [ ] T036 Create root layout with AuthProvider in frontend/src/app/layout.tsx
- [ ] T037 [P] Create shared UI components (Button, Input, Dialog, ErrorMessage) in frontend/src/components/ui/

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Authentication (Priority: P1) 🎯 MVP

**Goal**: Enable users to create accounts, sign in, and sign out securely

**Independent Test**: Create account, sign out, sign back in with same credentials. Verify session isolation.

### Backend Tests for US1 (RED Phase) ⚠️

> **TDD: Use /test-first-generator and /tdd-red-green-refactor skills**

- [ ] T038 [P] [US1] Generate unit test for User model using /test-first-generator in backend/tests/unit/test_user_model.py
- [ ] T039 [P] [US1] Generate integration test for Better Auth migration using /test-first-generator in backend/tests/integration/test_auth_setup.py
- [ ] T040 [US1] Execute RED phase verification using /tdd-red-green-refactor skill

### Backend Implementation for US1 (GREEN Phase)

- [ ] T041 [US1] Run Better Auth migration to create user tables: `npx @better-auth/cli migrate`
- [ ] T042 [US1] Verify database connection and Better Auth tables exist
- [ ] T043 [US1] Execute GREEN phase verification using /tdd-red-green-refactor skill

### Frontend Tests for US1 (RED Phase) ⚠️

> **TDD: Use /test-first-generator and /tdd-red-green-refactor skills**

- [ ] T044 [P] [US1] Generate SignUpForm component test using /test-first-generator in frontend/src/components/auth/SignUpForm.test.tsx
- [ ] T045 [P] [US1] Generate SignInForm component test using /test-first-generator in frontend/src/components/auth/SignInForm.test.tsx
- [ ] T046 [P] [US1] Generate sign-up page integration test using /test-first-generator in frontend/src/app/(auth)/sign-up/page.test.tsx
- [ ] T047 [P] [US1] Generate sign-in page integration test using /test-first-generator in frontend/src/app/(auth)/sign-in/page.test.tsx
- [ ] T048 [P] [US1] Generate auth flow integration test using /test-first-generator in frontend/src/tests/integration/auth-flow.test.tsx
- [ ] T049 [US1] Create MSW handlers for auth endpoints in frontend/src/tests/mocks/handlers.ts
- [ ] T050 [US1] Execute RED phase verification using /tdd-red-green-refactor skill

### Frontend Implementation for US1 (GREEN Phase)

- [ ] T051 [P] [US1] Create SignUpForm component in frontend/src/components/auth/SignUpForm.tsx
- [ ] T052 [P] [US1] Create SignInForm component in frontend/src/components/auth/SignInForm.tsx
- [ ] T053 [P] [US1] Create sign-up page in frontend/src/app/(auth)/sign-up/page.tsx
- [ ] T054 [P] [US1] Create sign-in page in frontend/src/app/(auth)/sign-in/page.tsx
- [ ] T055 [US1] Create landing page with redirect logic in frontend/src/app/page.tsx
- [ ] T056 [US1] Create dashboard layout with auth guard in frontend/src/app/dashboard/layout.tsx
- [ ] T057 [US1] Add sign-out functionality to dashboard layout
- [ ] T058 [US1] Execute GREEN phase verification using /tdd-red-green-refactor skill

### Refactor for US1

- [ ] T059 [US1] Refactor auth components for code quality and reusability
- [ ] T060 [US1] Execute REFACTOR phase verification using /tdd-red-green-refactor skill

**Checkpoint**: At this point, User Story 1 should be fully functional with 70%+ test coverage - users can sign up, sign in, and sign out

---

## Phase 4: User Story 2 - Create Tasks (Priority: P2)

**Goal**: Allow authenticated users to create tasks with title and optional description

**Independent Test**: Sign in, create task with title only, create task with title and description. Verify both persist.

### Backend Tests for US2 (RED Phase) ⚠️

> **TDD: Use /test-first-generator and /tdd-red-green-refactor skills**

- [ ] T061 [P] [US2] Generate Task model unit test using /test-first-generator in backend/tests/unit/test_task_model.py
- [ ] T062 [P] [US2] Generate Task schema validation test using /test-first-generator in backend/tests/unit/test_task_schemas.py
- [ ] T063 [P] [US2] Generate create_task CRUD unit test using /test-first-generator in backend/tests/unit/test_task_crud.py
- [ ] T064 [US2] Generate POST /api/todos contract test using /test-first-generator in backend/tests/integration/test_tasks_api.py
- [ ] T065 [US2] Execute RED phase verification using /tdd-red-green-refactor skill

### Backend Implementation for US2 (GREEN Phase)

- [ ] T066 [P] [US2] Create Task model in backend/src/models/task.py
- [ ] T067 [P] [US2] Create Task schemas (TaskCreate, TaskUpdate, TaskRead, TaskList) in backend/src/schemas/task.py
- [ ] T068 [US2] Create database tables with SQLModel.metadata.create_all in backend/src/main.py
- [ ] T069 [US2] Implement create_task CRUD function in backend/src/crud/task.py
- [ ] T070 [US2] Create POST /api/todos endpoint in backend/src/routers/tasks.py
- [ ] T071 [US2] Register tasks router in backend/src/main.py
- [ ] T072 [US2] Execute GREEN phase verification using /tdd-red-green-refactor skill

### Frontend Tests for US2 (RED Phase) ⚠️

> **TDD: Use /test-first-generator and /tdd-red-green-refactor skills**

- [ ] T073 [P] [US2] Generate TaskForm component test (create mode) using /test-first-generator in frontend/src/components/tasks/TaskForm.test.tsx
- [ ] T074 [P] [US2] Generate EmptyState component test using /test-first-generator in frontend/src/components/tasks/EmptyState.test.tsx
- [ ] T075 [P] [US2] Generate useTasks hook test for createTask using /test-first-generator in frontend/src/hooks/useTasks.test.ts
- [ ] T076 [US2] Generate dashboard page integration test using /test-first-generator in frontend/src/app/dashboard/page.test.tsx
- [ ] T077 [US2] Update MSW handlers for task endpoints in frontend/src/tests/mocks/handlers.ts
- [ ] T078 [US2] Execute RED phase verification using /tdd-red-green-refactor skill

### Frontend Implementation for US2 (GREEN Phase)

- [ ] T079 [P] [US2] Create TaskForm component (create mode) in frontend/src/components/tasks/TaskForm.tsx
- [ ] T080 [P] [US2] Create EmptyState component in frontend/src/components/tasks/EmptyState.tsx
- [ ] T081 [US2] Create useTasks hook with createTask function in frontend/src/hooks/useTasks.ts
- [ ] T082 [US2] Create dashboard page with TaskForm in frontend/src/app/dashboard/page.tsx
- [ ] T083 [US2] Execute GREEN phase verification using /tdd-red-green-refactor skill

### Refactor for US2

- [ ] T084 [US2] Refactor task components and hooks for code quality
- [ ] T085 [US2] Execute REFACTOR phase verification using /tdd-red-green-refactor skill

**Checkpoint**: At this point, User Stories 1 AND 2 work with 70%+ coverage - users can sign in and create tasks

---

## Phase 5: User Story 3 - View Tasks (Priority: P3)

**Goal**: Display all user's tasks with title, description, and completion status

**Independent Test**: Sign in with account that has tasks, verify all tasks display. Sign in with different account, verify task isolation.

### Backend Tests for US3 (RED Phase) ⚠️

> **TDD: Use /test-first-generator and /tdd-red-green-refactor skills**

- [ ] T086 [P] [US3] Generate list_tasks CRUD unit test with user_id filtering using /test-first-generator in backend/tests/unit/test_task_crud.py
- [ ] T087 [P] [US3] Generate get_task_by_id CRUD unit test with user isolation using /test-first-generator in backend/tests/unit/test_task_crud.py
- [ ] T088 [P] [US3] Generate GET /api/todos contract test using /test-first-generator in backend/tests/integration/test_tasks_api.py
- [ ] T089 [US3] Generate GET /api/todos/{id} contract test using /test-first-generator in backend/tests/integration/test_tasks_api.py
- [ ] T090 [US3] Generate user isolation test using /test-first-generator in backend/tests/integration/test_user_isolation.py
- [ ] T091 [US3] Execute RED phase verification using /tdd-red-green-refactor skill

### Backend Implementation for US3 (GREEN Phase)

- [ ] T092 [US3] Implement list_tasks CRUD function with user_id filtering in backend/src/crud/task.py
- [ ] T093 [US3] Implement get_task_by_id CRUD function with user_id validation in backend/src/crud/task.py
- [ ] T094 [US3] Create GET /api/todos endpoint in backend/src/routers/tasks.py
- [ ] T095 [US3] Create GET /api/todos/{id} endpoint in backend/src/routers/tasks.py
- [ ] T096 [US3] Execute GREEN phase verification using /tdd-red-green-refactor skill

### Frontend Tests for US3 (RED Phase) ⚠️

> **TDD: Use /test-first-generator and /tdd-red-green-refactor skills**

- [ ] T097 [P] [US3] Generate TaskItem component test using /test-first-generator in frontend/src/components/tasks/TaskItem.test.tsx
- [ ] T098 [P] [US3] Generate TaskList component test using /test-first-generator in frontend/src/components/tasks/TaskList.test.tsx
- [ ] T099 [P] [US3] Generate useTasks hook test for fetchTasks using /test-first-generator in frontend/src/hooks/useTasks.test.ts
- [ ] T100 [US3] Generate task list rendering integration test using /test-first-generator in frontend/src/tests/integration/task-list.test.tsx
- [ ] T101 [US3] Execute RED phase verification using /tdd-red-green-refactor skill

### Frontend Implementation for US3 (GREEN Phase)

- [ ] T102 [P] [US3] Create TaskItem component in frontend/src/components/tasks/TaskItem.tsx
- [ ] T103 [P] [US3] Create TaskList component in frontend/src/components/tasks/TaskList.tsx
- [ ] T104 [US3] Add fetchTasks function to useTasks hook in frontend/src/hooks/useTasks.ts
- [ ] T105 [US3] Update dashboard page to display TaskList in frontend/src/app/dashboard/page.tsx
- [ ] T106 [US3] Add empty state handling to dashboard page
- [ ] T107 [US3] Execute GREEN phase verification using /tdd-red-green-refactor skill

### Refactor for US3

- [ ] T108 [US3] Refactor task display components for performance and readability
- [ ] T109 [US3] Execute REFACTOR phase verification using /tdd-red-green-refactor skill

**Checkpoint**: User Stories 1, 2, AND 3 work with 70%+ coverage - users can sign in, create tasks, and view their task list

---

## Phase 6: User Story 4 - Update Tasks (Priority: P4)

**Goal**: Allow users to edit task title and description

**Independent Test**: Create task, edit title, save. Edit description, save. Cancel edit. Verify changes persist correctly.

### Backend Tests for US4 (RED Phase) ⚠️

> **TDD: Use /test-first-generator and /tdd-red-green-refactor skills**

- [ ] T110 [P] [US4] Generate update_task CRUD unit test with user_id validation using /test-first-generator in backend/tests/unit/test_task_crud.py
- [ ] T111 [US4] Generate PATCH /api/todos/{id} contract test using /test-first-generator in backend/tests/integration/test_tasks_api.py
- [ ] T112 [US4] Generate update authorization test (prevent updating other users' tasks) using /test-first-generator in backend/tests/integration/test_user_isolation.py
- [ ] T113 [US4] Execute RED phase verification using /tdd-red-green-refactor skill

### Backend Implementation for US4 (GREEN Phase)

- [ ] T114 [US4] Implement update_task CRUD function with user_id validation in backend/src/crud/task.py
- [ ] T115 [US4] Create PATCH /api/todos/{id} endpoint in backend/src/routers/tasks.py
- [ ] T116 [US4] Execute GREEN phase verification using /tdd-red-green-refactor skill

### Frontend Tests for US4 (RED Phase) ⚠️

> **TDD: Use /test-first-generator and /tdd-red-green-refactor skills**

- [ ] T117 [P] [US4] Generate TaskForm edit mode test using /test-first-generator in frontend/src/components/tasks/TaskForm.test.tsx
- [ ] T118 [P] [US4] Generate useTasks hook test for updateTask using /test-first-generator in frontend/src/hooks/useTasks.test.ts
- [ ] T119 [US4] Generate task edit integration test using /test-first-generator in frontend/src/tests/integration/task-edit.test.tsx
- [ ] T120 [US4] Generate session expiry during edit test using /test-first-generator in frontend/src/tests/integration/session-expiry.test.tsx
- [ ] T121 [US4] Execute RED phase verification using /tdd-red-green-refactor skill

### Frontend Implementation for US4 (GREEN Phase)

- [ ] T122 [US4] Add edit mode to TaskForm component in frontend/src/components/tasks/TaskForm.tsx
- [ ] T123 [US4] Add edit mode toggle to TaskItem component in frontend/src/components/tasks/TaskItem.tsx
- [ ] T124 [US4] Add updateTask function to useTasks hook in frontend/src/hooks/useTasks.ts
- [ ] T125 [US4] Add session expiry detection and draft saving in frontend/src/hooks/useTasks.ts
- [ ] T126 [US4] Execute GREEN phase verification using /tdd-red-green-refactor skill

### Refactor for US4

- [ ] T127 [US4] Refactor edit functionality for better UX and code quality
- [ ] T128 [US4] Execute REFACTOR phase verification using /tdd-red-green-refactor skill

**Checkpoint**: User Stories 1-4 work with 70%+ coverage - users can create, view, and edit tasks

---

## Phase 7: User Story 5 - Mark Tasks Complete/Incomplete (Priority: P5)

**Goal**: Toggle task completion status

**Independent Test**: Create task, mark complete, verify visual change. Mark incomplete, verify visual change. Refresh page, verify status persists.

### Backend Tests for US5 (RED Phase) ⚠️

> **TDD: Use /test-first-generator and /tdd-red-green-refactor skills**

- [ ] T129 [P] [US5] Generate toggle_task_completion CRUD unit test using /test-first-generator in backend/tests/unit/test_task_crud.py
- [ ] T130 [US5] Generate POST /api/todos/{id}/toggle contract test using /test-first-generator in backend/tests/integration/test_tasks_api.py
- [ ] T131 [US5] Execute RED phase verification using /tdd-red-green-refactor skill

### Backend Implementation for US5 (GREEN Phase)

- [ ] T132 [US5] Implement toggle_task_completion CRUD function in backend/src/crud/task.py
- [ ] T133 [US5] Create POST /api/todos/{id}/toggle endpoint in backend/src/routers/tasks.py
- [ ] T134 [US5] Execute GREEN phase verification using /tdd-red-green-refactor skill

### Frontend Tests for US5 (RED Phase) ⚠️

> **TDD: Use /test-first-generator and /tdd-red-green-refactor skills**

- [ ] T135 [P] [US5] Generate CompletionToggle component test using /test-first-generator in frontend/src/components/tasks/TaskItem.test.tsx
- [ ] T136 [P] [US5] Generate useTasks hook test for toggleComplete using /test-first-generator in frontend/src/hooks/useTasks.test.ts
- [ ] T137 [US5] Generate task completion toggle integration test using /test-first-generator in frontend/src/tests/integration/task-toggle.test.tsx
- [ ] T138 [US5] Execute RED phase verification using /tdd-red-green-refactor skill

### Frontend Implementation for US5 (GREEN Phase)

- [ ] T139 [US5] Create CompletionToggle component in frontend/src/components/tasks/TaskItem.tsx
- [ ] T140 [US5] Add toggleComplete function to useTasks hook in frontend/src/hooks/useTasks.ts
- [ ] T141 [US5] Add visual distinction for completed tasks (styling) in TaskItem component
- [ ] T142 [US5] Execute GREEN phase verification using /tdd-red-green-refactor skill

### Refactor for US5

- [ ] T143 [US5] Refactor completion toggle for accessibility and visual feedback
- [ ] T144 [US5] Execute REFACTOR phase verification using /tdd-red-green-refactor skill

**Checkpoint**: User Stories 1-5 work with 70%+ coverage - full task management except deletion

---

## Phase 8: User Story 6 - Delete Tasks (Priority: P6)

**Goal**: Allow users to permanently delete tasks after confirmation

**Independent Test**: Create task, initiate delete, cancel. Initiate delete again, confirm. Verify task removed and deletion persists.

### Backend Tests for US6 (RED Phase) ⚠️

> **TDD: Use /test-first-generator and /tdd-red-green-refactor skills**

- [ ] T145 [P] [US6] Generate delete_task CRUD unit test with user_id validation using /test-first-generator in backend/tests/unit/test_task_crud.py
- [ ] T146 [US6] Generate DELETE /api/todos/{id} contract test using /test-first-generator in backend/tests/integration/test_tasks_api.py
- [ ] T147 [US6] Generate delete authorization test using /test-first-generator in backend/tests/integration/test_user_isolation.py
- [ ] T148 [US6] Execute RED phase verification using /tdd-red-green-refactor skill

### Backend Implementation for US6 (GREEN Phase)

- [ ] T149 [US6] Implement delete_task CRUD function with user_id validation in backend/src/crud/task.py
- [ ] T150 [US6] Create DELETE /api/todos/{id} endpoint in backend/src/routers/tasks.py
- [ ] T151 [US6] Execute GREEN phase verification using /tdd-red-green-refactor skill

### Frontend Tests for US6 (RED Phase) ⚠️

> **TDD: Use /test-first-generator and /tdd-red-green-refactor skills**

- [ ] T152 [P] [US6] Generate DeleteConfirmDialog component test using /test-first-generator in frontend/src/components/tasks/DeleteConfirmDialog.test.tsx
- [ ] T153 [P] [US6] Generate useTasks hook test for deleteTask using /test-first-generator in frontend/src/hooks/useTasks.test.ts
- [ ] T154 [US6] Generate task deletion integration test with confirmation using /test-first-generator in frontend/src/tests/integration/task-delete.test.tsx
- [ ] T155 [US6] Execute RED phase verification using /tdd-red-green-refactor skill

### Frontend Implementation for US6 (GREEN Phase)

- [ ] T156 [US6] Create DeleteConfirmDialog component in frontend/src/components/tasks/DeleteConfirmDialog.tsx
- [ ] T157 [US6] Add delete button and dialog trigger to TaskItem component in frontend/src/components/tasks/TaskItem.tsx
- [ ] T158 [US6] Add deleteTask function to useTasks hook in frontend/src/hooks/useTasks.ts
- [ ] T159 [US6] Execute GREEN phase verification using /tdd-red-green-refactor skill

### Refactor for US6

- [ ] T160 [US6] Refactor delete confirmation for better UX
- [ ] T161 [US6] Execute REFACTOR phase verification using /tdd-red-green-refactor skill

**Checkpoint**: All user stories complete with 70%+ coverage - full CRUD functionality with authentication

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories, coverage verification, and final validation

### Error Handling & Reliability

- [ ] T162 [P] Add network error handling with retry in frontend/src/hooks/useNetworkError.ts
- [ ] T163 [P] Write test for network error handling in frontend/src/hooks/useNetworkError.test.ts
- [ ] T164 [P] Add request/response logging to API interceptor in frontend/src/middleware/api-interceptor.ts
- [ ] T165 [P] Add user-facing error messages in frontend/src/lib/constants/messages.ts

### Security & Performance

- [ ] T166 [P] Verify index creation on task.user_id and task.user_id,created_at
- [ ] T167 [P] Add SQL injection prevention verification in backend/src/crud/task.py
- [ ] T168 [P] Test user isolation across all endpoints with integration tests
- [ ] T169 [P] Test session expiry handling across all task operations
- [ ] T170 [P] Add responsive design testing for mobile (320px) and desktop (1920px)
- [ ] T171 Performance testing: API response times < 200ms, page load < 2s

### Coverage & Validation

- [ ] T172 Run backend test coverage: `cd backend && uv run pytest --cov=src --cov-report=term-missing --cov-fail-under=70`
- [ ] T173 Run frontend test coverage: `cd frontend && npm run test:coverage` (verify ≥70%)
- [ ] T174 Create quickstart.md validation script in specs/001-todo-web-crud/
- [ ] T175 Run quickstart.md validation end-to-end
- [ ] T176 Fix any test coverage gaps to meet 70% minimum
- [ ] T177 Run full test suite (backend + frontend) and verify all tests pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 0 (Scaffolding)**: No dependencies - MUST be completed first
- **Phase 1 (Setup)**: Depends on Phase 0 completion
- **Phase 2 (Foundational)**: Depends on Phase 1 - BLOCKS all user stories
- **User Stories (Phase 3-8)**: All depend on Foundational phase completion
  - Must follow TDD cycle: Tests (RED) → Implementation (GREEN) → Refactor
  - User stories can proceed in priority order (P1 → P2 → P3 → P4 → P5 → P6)
- **Phase 9 (Polish)**: Depends on all user stories being complete

### TDD Cycle Within Each User Story

1. **RED Phase**: Write all tests first, verify they FAIL
2. **GREEN Phase**: Implement minimum code to make tests PASS
3. **REFACTOR Phase**: Improve code quality while keeping tests green

### User Story Dependencies

- **User Story 1 (P1) - Authentication**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P2) - Create Tasks**: Depends on US1 (requires authentication)
- **User Story 3 (P3) - View Tasks**: Depends on US2 (needs tasks to view)
- **User Story 4 (P4) - Update Tasks**: Depends on US2 and US3 (needs tasks to update and view changes)
- **User Story 5 (P5) - Toggle Completion**: Depends on US2 and US3 (needs tasks to toggle and view status)
- **User Story 6 (P6) - Delete Tasks**: Depends on US2 and US3 (needs tasks to delete and verify deletion)

### Parallel Opportunities

#### Phase 0 (Scaffolding)
- T002, T003, T004 can run after T001 completes
- T005, T006 can run in parallel

#### Phase 1 (Setup)
- T009, T010, T011, T012, T013, T014, T015 can all run in parallel after T007, T008

#### Phase 2 (Foundational)
- Backend: T022, T023 can run in parallel
- Frontend: T028, T029, T033, T034, T037 can run in parallel

#### Within Each User Story (Tests)
- All test tasks marked [P] in RED phase can run in parallel
- Implementation tasks marked [P] in GREEN phase can run in parallel

---

## Implementation Strategy

### MVP First (User Stories 1-2 with TDD)

1. Complete Phase 0: Scaffolding (T000-T006)
2. Complete Phase 1: Setup (T007-T017)
3. Complete Phase 2: Foundational (T018-T037) - CRITICAL - blocks all stories
4. Complete Phase 3: User Story 1 (Authentication) using /test-first-generator and /tdd-red-green-refactor skills
5. Complete Phase 4: User Story 2 (Create Tasks) using /test-first-generator and /tdd-red-green-refactor skills
6. **STOP and VALIDATE**: Run full test suite, verify 70%+ coverage, test manually
7. Deploy/demo if ready

### Full Feature Delivery with TDD

1. Complete Scaffolding + Setup + Foundational → Foundation ready
2. For each User Story (US1 → US6):
   - **RED**: Use /test-first-generator to create tests, execute RED phase with /tdd-red-green-refactor
   - **GREEN**: Implement features, execute GREEN phase with /tdd-red-green-refactor
   - **REFACTOR**: Improve code, execute REFACTOR phase with /tdd-red-green-refactor
   - **CHECKPOINT**: Independent validation
3. Complete Phase 9: Polish & Coverage verification using /tdd-red-green-refactor for verification
4. Final validation and deployment

---

## Task Summary

**Total Tasks**: 177
**Tasks by Phase**:
- Phase 0 (Scaffolding): 7 tasks
- Phase 1 (Setup): 11 tasks
- Phase 2 (Foundational): 20 tasks
- Phase 3 (US1 - Authentication): 23 tasks (9 tests, 11 implementation, 3 refactor)
- Phase 4 (US2 - Create Tasks): 25 tasks (8 tests, 12 implementation, 5 refactor)
- Phase 5 (US3 - View Tasks): 24 tasks (9 tests, 11 implementation, 4 refactor)
- Phase 6 (US4 - Update Tasks): 19 tasks (8 tests, 8 implementation, 3 refactor)
- Phase 7 (US5 - Toggle Completion): 16 tasks (6 tests, 7 implementation, 3 refactor)
- Phase 8 (US6 - Delete Tasks): 16 tasks (6 tests, 7 implementation, 3 refactor)
- Phase 9 (Polish): 16 tasks

**Test Tasks**: 46 test-writing tasks (following TDD RED phase)
**Implementation Tasks**: 56 implementation tasks (TDD GREEN phase)
**Refactor Tasks**: 18 refactor tasks (TDD REFACTOR phase)
**Infrastructure Tasks**: 57 tasks (scaffolding, setup, foundational, polish)

**Coverage Target**: ≥70% for both frontend and backend (mandatory, verified in Phase 9)

**Parallel Opportunities**: Tasks marked with [P] can run in parallel within their phase

**Suggested MVP Scope**: Phases 0, 1, 2, 3, 4 (85 tasks) = Minimum viable product with TDD, authentication, and task creation

---

## Notes

- **TDD is MANDATORY**: All feature development follows Red-Green-Refactor cycle
- Use `/test-first-generator` to create test files before implementation
- Use `/tdd-red-green-refactor` to execute RED → GREEN → REFACTOR phases
- Tests MUST fail initially (RED phase) - verify with /tdd-red-green-refactor
- Implementation MUST make tests pass (GREEN phase) - verify with /tdd-red-green-refactor
- Refactoring MUST keep tests passing - verify with /tdd-red-green-refactor
- Coverage minimum: 70% for both frontend and backend - verify with /tdd-red-green-refactor
- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each phase (RED, GREEN, REFACTOR) or logical group
- Stop at any checkpoint to validate story independently
- All tasks follow strict format: `- [ ] [ID] [P?] [Story?] Description with file path`
