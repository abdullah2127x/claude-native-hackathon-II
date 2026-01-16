# Implementation Plan: Full-Stack Todo Web Application

**Branch**: `001-todo-web-crud` | **Date**: 2026-01-16 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-todo-web-crud/spec.md`
**Constitution Version**: 2.2.1

## Summary

Full-stack web application enabling authenticated users to perform CRUD operations on personal tasks. The system provides secure user isolation, responsive UI, and persistent data storage using a Next.js 16 frontend with Better Auth and a FastAPI backend with SQLModel ORM connected to Neon PostgreSQL.

---

## Technical Context

**Frontend**:
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form + Zod resolver
- **Validation**: Zod schemas
- **Authentication**: Better Auth (JWT tokens)
- **Testing**: Jest + React Testing Library + MSW (Mock Service Worker)
- **Coverage Target**: ≥70%

**Backend**:
- **Framework**: Python FastAPI
- **Language**: Python 3.11+
- **Package Manager**: uv
- **ORM**: SQLModel
- **Validation**: Pydantic
- **Testing**: pytest + pytest-asyncio
- **Coverage Target**: ≥70%

**Database**:
- **Type**: PostgreSQL
- **Provider**: Neon Serverless
- **Connection**: Pooled connection string with SSL

**Authentication Flow**:
- Better Auth manages user sessions on frontend
- JWT tokens issued by Better Auth
- FastAPI validates JWT via JWKS from Better Auth
- All API requests include `Authorization: Bearer <token>`

**Target Platform**: Web (responsive: 320px - 1920px)
**Performance Goals**: API < 200ms, page load < 2s
**Scale**: 10 concurrent users, 100+ tasks per user

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Status | Evidence |
|-----------|-------------|--------|----------|
| **I. TDD** | Test-first development | ✅ PASS | Jest + pytest planned, 70% coverage target |
| **II. No Manual Coding** | Claude Code generates all code | ✅ PASS | Using Spec-Kit Plus workflow |
| **III. Code Quality** | Type safety, validation, error handling | ✅ PASS | TS strict, Zod/Pydantic, error handling planned |
| **VIII. Persistent Storage** | Database required | ✅ PASS | Neon PostgreSQL |
| **IX. RESTful API** | REST + JSON | ✅ PASS | FastAPI REST endpoints |
| **X. Security & Isolation** | User isolation, verified identity | ✅ PASS | JWT auth + user_id filtering |
| **XI. Authentication** | JWT + Better Auth | ✅ PASS | Better Auth JWT plugin |
| **XII. Architecture** | Monorepo, separated frontend/backend | ✅ PASS | /frontend, /backend structure |
| **XIII. Performance** | <200ms API, <2s load | ✅ PASS | Optimized queries, indexes planned |

**Constitution Gate**: ✅ PASSED

---

## Project Structure

### Documentation (this feature)

```text
specs/001-todo-web-crud/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0: Integration patterns
├── data-model.md        # Phase 1: Database schema
├── quickstart.md        # Phase 1: Setup instructions
├── contracts/           # Phase 1: API contracts
│   ├── openapi.yaml     # OpenAPI 3.0 specification
│   └── schemas.ts       # Zod schemas for frontend
└── tasks.md             # Phase 2: Task breakdown (via /sp.tasks)
```

### Source Code (repository root)

```text
/
├── frontend/                      # Next.js 16 App Router
│   ├── src/
│   │   ├── app/                   # App Router pages
│   │   │   ├── (auth)/            # Auth pages group
│   │   │   │   ├── sign-in/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── sign-up/
│   │   │   │       └── page.tsx
│   │   │   ├── dashboard/         # Protected pages
│   │   │   │   ├── page.tsx       # Task list
│   │   │   │   └── layout.tsx     # Auth guard
│   │   │   ├── api/
│   │   │   │   └── auth/
│   │   │   │       └── [...all]/
│   │   │   │           └── route.ts  # Better Auth handler
│   │   │   ├── layout.tsx         # Root layout
│   │   │   └── page.tsx           # Landing/redirect
│   │   ├── components/            # React components
│   │   │   ├── auth/
│   │   │   │   ├── SignInForm.tsx
│   │   │   │   └── SignUpForm.tsx
│   │   │   ├── tasks/
│   │   │   │   ├── TaskList.tsx
│   │   │   │   ├── TaskItem.tsx
│   │   │   │   ├── TaskForm.tsx
│   │   │   │   ├── DeleteConfirmDialog.tsx
│   │   │   │   └── EmptyState.tsx
│   │   │   └── ui/                # Shared UI components
│   │   │       ├── Button.tsx
│   │   │       ├── Input.tsx
│   │   │       ├── Dialog.tsx
│   │   │       └── ErrorMessage.tsx
│   │   ├── lib/
│   │   │   ├── auth.ts            # Better Auth server config
│   │   │   ├── auth-client.ts     # Better Auth client
│   │   │   ├── api.ts             # API client for FastAPI
│   │   │   └── validations/
│   │   │       ├── auth.ts        # Auth Zod schemas
│   │   │       └── task.ts        # Task Zod schemas
│   │   ├── hooks/
│   │   │   ├── useTasks.ts        # Task CRUD operations
│   │   │   └── useNetworkError.ts # Network error handling
│   │   └── types/
│   │       └── index.ts           # TypeScript types
│   ├── tests/
│   │   ├── components/
│   │   ├── integration/
│   │   └── mocks/
│   │       └── handlers.ts        # MSW handlers
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── jest.config.ts
│   └── package.json
│
├── backend/                       # FastAPI application
│   ├── src/
│   │   ├── main.py               # FastAPI app entry
│   │   ├── config.py             # Environment configuration
│   │   ├── db/
│   │   │   └── database.py       # Database connection
│   │   ├── models/
│   │   │   ├── user.py           # User model (read-only ref)
│   │   │   └── task.py           # Task SQLModel
│   │   ├── schemas/
│   │   │   └── task.py           # Pydantic schemas
│   │   ├── auth/
│   │   │   ├── jwt_handler.py    # JWT verification via JWKS
│   │   │   └── dependencies.py   # Auth dependencies
│   │   ├── crud/
│   │   │   └── task.py           # Task CRUD operations
│   │   └── routers/
│   │       ├── tasks.py          # Task endpoints
│   │       └── health.py         # Health check
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── conftest.py           # pytest fixtures
│   ├── pyproject.toml            # uv project config
│   └── .python-version           # Python version
│
├── specs/                         # Shared specifications
├── .specify/                      # Spec-Kit Plus config
├── .claude/                       # Claude Code config
│   ├── skills/
│   └── agents/
└── CLAUDE.md                      # Root navigation
```

**Structure Decision**: Web application with monorepo structure. Frontend (Next.js 16) and backend (FastAPI) are separated as required by constitution. Specifications are shared at root level.

---

## Improved Project Structure (Phase 2 Updates)

### Frontend Structure Enhancements

```text
frontend/
├── src/
│   ├── app/                       # Next.js App Router pages
│   ├── components/                # React components
│   ├── hooks/                     # Custom React hooks
│   ├── lib/
│   │   ├── api-client/            # RENAMED from api.ts for clarity
│   │   │   └── index.ts           # FastAPI client setup
│   │   ├── constants/             # ← NEW: App-wide constants
│   │   │   ├── api.ts             # API endpoints, timeouts
│   │   │   └── messages.ts        # User-facing messages
│   │   ├── utils/                 # ← NEW: Utility functions
│   │   │   ├── format.ts          # Date/string formatting
│   │   │   └── validators.ts      # Helper validators
│   │   ├── auth.ts
│   │   ├── auth-client.ts
│   │   └── validations/
│   ├── middleware/                # ← NEW: Request/response interceptors
│   │   └── api-interceptor.ts     # Token injection, error handling
│   ├── providers/                 # ← NEW: React Context providers
│   │   └── auth-provider.tsx      # Better Auth provider wrapper
│   ├── styles/                    # ← NEW: Global styles
│   │   └── globals.css            # Tailwind imports + custom styles
│   ├── types/
│   └── tests/
│       ├── setup.ts               # ← NEW: Test configuration
│       ├── components/
│       ├── integration/
│       └── mocks/
└── CLAUDE.md                      # ← NEW: Frontend development guide
```

### Backend Structure Enhancements

```text
backend/
├── src/
│   ├── main.py
│   ├── config.py
│   ├── middleware/                # ← NEW: Centralized middleware
│   │   ├── __init__.py
│   │   ├── cors.py                # CORS configuration
│   │   ├── error_handler.py       # Global exception handling
│   │   └── logging.py             # Request/response logging
│   ├── db/
│   ├── models/
│   ├── schemas/
│   ├── auth/
│   ├── crud/
│   ├── routers/
│   ├── utils/                     # ← NEW: Helper functions
│   │   ├── __init__.py
│   │   ├── decorators.py          # Reusable decorators
│   │   └── constants.py           # Backend constants
│   ├── exceptions/                # ← NEW: Custom exception classes
│   │   ├── __init__.py
│   │   ├── base.py                # Base exception classes
│   │   └── handlers.py            # Exception handlers
│   └── tests/
└── CLAUDE.md                      # ← NEW: Backend development guide
```

---

## CLAUDE.md Development Guides

### Frontend CLAUDE.md (frontend/CLAUDE.md)

**Purpose**: Frontend-specific development standards and patterns

**Required Sections**:
1. **Code Generation Standards**
   - TypeScript strict mode requirements
   - React patterns (functional components, props typing)
   - Tailwind CSS usage rules
   - React Hook Form + Zod integration patterns

2. **File Organization**
   - Directory structure explanation
   - Component naming conventions (PascalCase, descriptive)
   - Hook naming (prefix with `use`, verb-based)
   - Test file co-location

3. **Testing Requirements**
   - 70% coverage minimum
   - Test user interactions, not implementation
   - MSW setup for API mocking
   - Better Auth mocking patterns

4. **Error Handling Patterns**
   - Network errors via `useNetworkError` hook
   - Form validation via Zod + React Hook Form
   - API error responses (401, 422, 500)
   - Session expiry handling (save draft → redirect → restore)

5. **Performance Guidelines**
   - Code splitting for routes and modals
   - React optimization (useMemo, useCallback, React.memo)
   - API optimization (debounce, request cancellation)

6. **Security Best Practices**
   - Input validation (Zod schemas)
   - XSS prevention (no dangerouslySetInnerHTML)
   - JWT handling (memory only, HTTP-only cookies)
   - HTTPS enforcement

7. **Common Patterns**
   - Creating new components (template)
   - Adding new API endpoints (full flow)
   - Adding forms (Zod → RHF → submit)

8. **What NOT to Do**
   - Don't create unnecessary files
   - Don't add comments to unchanged code
   - Don't refactor unrelated code
   - Don't use `any` type
   - Don't bypass validation

### Backend CLAUDE.md (backend/CLAUDE.md)

**Purpose**: Backend-specific API and database patterns

**Required Sections**:
1. **API Standards**
   - All endpoints return JSON
   - HTTP status codes (401, 404, 422, 500)
   - User isolation pattern (filter by user_id)
   - CORS handling

2. **Database Patterns**
   - SQLModel for type-safe queries
   - Always include user_id in WHERE clauses
   - Index creation guidelines
   - Async connection pooling

3. **Testing Requirements**
   - 70% coverage minimum
   - TestClient for endpoint testing
   - Mock JWT verification
   - pytest fixtures for database setup

4. **Error Handling**
   - Custom exceptions for domain errors
   - Centralized error handlers via middleware
   - Logging strategy (log 5xx, return minimal details)
   - Validation errors (422 with field details)

5. **Configuration Management**
   - Pydantic Settings for environment variables
   - Type-safe configuration access
   - Environment-specific overrides

6. **Security Best Practices**
   - JWT verification via JWKS
   - User isolation enforcement
   - SQL injection prevention (SQLModel parameterization)
   - Rate limiting structure (future-proof)

7. **Common Patterns**
   - Creating new endpoints (route → schema → CRUD → tests)
   - Adding database models (SQLModel → migration → tests)
   - Adding authentication (dependency injection)

8. **What NOT to Do**
   - Don't skip user_id filtering
   - Don't return raw exceptions to client
   - Don't use string concatenation for SQL
   - Don't skip input validation

---

## Middleware Specifications

### Frontend Middleware

#### API Interceptor (`src/middleware/api-interceptor.ts`)

**Purpose**: Centralized request/response handling for FastAPI calls

**Responsibilities**:
- Inject JWT token from Better Auth session into `Authorization` header
- Handle 401 responses (token refresh or redirect to sign-in)
- Log API errors for debugging
- Retry failed requests with exponential backoff (network errors only)
- Transform API error responses into typed errors

**Implementation Pattern**:
```typescript
// Axios interceptor approach
import axios from 'axios';
import { authClient } from '@/lib/auth-client';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
});

// Request interceptor - add JWT token
apiClient.interceptors.request.use(async (config) => {
  const session = await authClient.getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Redirect to sign-in, save current location
      window.location.href = `/sign-in?returnUrl=${window.location.pathname}`;
    }
    return Promise.reject(error);
  }
);
```

**Features**:
- Automatic token injection
- Session expiry handling
- Error transformation
- Request/response logging (dev mode)

### Backend Middleware

#### CORS Middleware (`src/middleware/cors.py`)

**Purpose**: Configure Cross-Origin Resource Sharing for frontend

**Implementation**:
```python
from fastapi.middleware.cors import CORSMiddleware
from src.config import settings

def configure_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,  # ["http://localhost:3000"]
        allow_credentials=True,
        allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["Authorization", "Content-Type"],
        max_age=3600,  # Cache preflight for 1 hour
    )
```

#### Error Handler Middleware (`src/middleware/error_handler.py`)

**Purpose**: Centralized exception handling with consistent error responses

**Implementation**:
```python
from fastapi import Request, status
from fastapi.responses import JSONResponse
from src.exceptions.base import TaskNotFoundError, UnauthorizedError

async def error_handler_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except TaskNotFoundError as e:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"detail": str(e), "code": "TASK_NOT_FOUND"}
        )
    except UnauthorizedError as e:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"detail": "Unauthorized", "code": "UNAUTHORIZED"}
        )
    except Exception as e:
        # Log internal errors, return generic message
        logger.error(f"Unhandled error: {e}", exc_info=True)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "Internal server error", "code": "INTERNAL_ERROR"}
        )
```

#### Logging Middleware (`src/middleware/logging.py`)

**Purpose**: Log all incoming requests and responses for debugging

**Implementation**:
```python
import time
from fastapi import Request
import logging

logger = logging.getLogger(__name__)

async def logging_middleware(request: Request, call_next):
    start_time = time.time()

    # Log request
    logger.info(f"{request.method} {request.url.path}")

    # Process request
    response = await call_next(request)

    # Log response with timing
    duration = time.time() - start_time
    logger.info(
        f"{request.method} {request.url.path} "
        f"status={response.status_code} duration={duration:.3f}s"
    )

    return response
```

**Middleware Registration Order** (in `main.py`):
```python
from src.middleware.cors import configure_cors
from src.middleware.logging import logging_middleware
from src.middleware.error_handler import error_handler_middleware

# Order matters: first added = outermost layer
app.middleware("http")(logging_middleware)      # 1. Log first
app.middleware("http")(error_handler_middleware) # 2. Handle errors
configure_cors(app)                              # 3. CORS last
```

---

## Component Architecture

### Frontend Components

```
App Layout
├── AuthProvider (Better Auth)
├── Unauthenticated Routes
│   ├── SignInPage → SignInForm
│   └── SignUpPage → SignUpForm
└── Protected Routes (Dashboard)
    └── DashboardPage
        ├── TaskForm (create)
        ├── TaskList
        │   └── TaskItem (map)
        │       ├── TaskForm (edit mode)
        │       ├── CompletionToggle
        │       └── DeleteButton → DeleteConfirmDialog
        └── EmptyState (if no tasks)
```

### Backend Architecture

```
FastAPI App
├── Middleware
│   ├── CORS
│   └── Error Handler
├── Dependencies
│   ├── get_session (database)
│   └── get_current_user (JWT auth)
└── Routers
    ├── /health (GET)
    └── /api/todos
        ├── GET / (list)
        ├── POST / (create)
        ├── GET /{id} (read)
        ├── PATCH /{id} (update)
        ├── DELETE /{id} (delete)
        └── POST /{id}/toggle (completion)
```

---

## Authentication Flow

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Browser    │    │   Next.js    │    │   FastAPI    │
│   (Client)   │    │   (Better    │    │   (Backend)  │
│              │    │    Auth)     │    │              │
└──────┬───────┘    └──────┬───────┘    └──────┬───────┘
       │                   │                   │
       │ 1. Sign In        │                   │
       │──────────────────>│                   │
       │                   │                   │
       │ 2. Session + JWT  │                   │
       │<──────────────────│                   │
       │                   │                   │
       │ 3. Get JWT token  │                   │
       │──────────────────>│                   │
       │                   │                   │
       │ 4. JWT returned   │                   │
       │<──────────────────│                   │
       │                   │                   │
       │ 5. API request with Authorization: Bearer <JWT>
       │─────────────────────────────────────>│
       │                   │                   │
       │                   │ 6. Fetch JWKS     │
       │                   │<──────────────────│
       │                   │                   │
       │                   │ 7. Return JWKS    │
       │                   │──────────────────>│
       │                   │                   │
       │                   │                   │ 8. Verify JWT
       │                   │                   │    Extract user_id
       │                   │                   │
       │ 9. Response (filtered by user_id)    │
       │<─────────────────────────────────────│
```

---

## API Design Summary

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /health | Health check | No |
| GET | /api/todos | List user's tasks | Yes |
| POST | /api/todos | Create task | Yes |
| GET | /api/todos/{id} | Get task by ID | Yes |
| PATCH | /api/todos/{id} | Update task | Yes |
| DELETE | /api/todos/{id} | Delete task | Yes |
| POST | /api/todos/{id}/toggle | Toggle completion | Yes |

See `contracts/openapi.yaml` for full specification.

---

## Data Model Summary

### User (Better Auth managed - read-only reference)

| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PRIMARY KEY |
| email | string | UNIQUE, NOT NULL |
| name | string | NOT NULL |
| emailVerified | boolean | DEFAULT false |
| createdAt | timestamp | NOT NULL |
| updatedAt | timestamp | NOT NULL |

### Task

| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PRIMARY KEY |
| user_id | UUID | FOREIGN KEY → user.id, INDEX |
| title | string(200) | NOT NULL |
| description | string(2000) | NULLABLE |
| completed | boolean | DEFAULT false |
| created_at | timestamp | NOT NULL, DEFAULT now() |
| updated_at | timestamp | NULLABLE |

See `data-model.md` for full schema with SQLModel definitions.

---

## Testing Strategy

### Frontend Testing (Jest + RTL + MSW)

| Test Type | Coverage | Tools |
|-----------|----------|-------|
| Component rendering | All components | React Testing Library |
| User interactions | Forms, buttons, toggles | @testing-library/user-event |
| Form validation | All Zod schemas | React Hook Form testing |
| API integration | All API calls | MSW mock handlers |
| Error handling | Network errors, validation | MSW error scenarios |

### Backend Testing (pytest)

| Test Type | Coverage | Tools |
|-----------|----------|-------|
| Unit tests | CRUD functions, schemas | pytest |
| Integration tests | API endpoints | TestClient |
| Auth tests | JWT verification | Mock JWKS |
| Database tests | SQLModel operations | Test database |

**Coverage Target**: ≥70% for both frontend and backend

---

## Error Handling Strategy

### Frontend

```typescript
// Network errors → useNetworkError hook
// Form validation → Zod + React Hook Form field errors
// Session expiry → Save draft to localStorage, redirect to login
// API errors → Toast notifications + retry option
```

### Backend

```python
# Validation errors → 422 with details
# Auth errors → 401 Unauthorized
# Not found → 404 with message
# Server errors → 500 with generic message (log details)
```

---

## Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
BETTER_AUTH_SECRET=your-secret-key
DATABASE_URL=postgresql://...
```

### Backend (.env)

```env
DATABASE_URL=postgresql://user:pass@host.neon.tech/db?sslmode=require
BETTER_AUTH_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:3000
```

---

## Complexity Tracking

No constitutional violations requiring justification. All requirements map directly to constitutional mandates.

---

## Phase 0 Research Required

Research completed and documented in `research.md`:

1. ✅ Better Auth JWT + FastAPI JWKS integration pattern
2. ✅ React Hook Form + Zod integration pattern
3. ✅ MSW setup for Next.js 16 App Router
4. ✅ SQLModel + Neon PostgreSQL connection pattern
5. ✅ uv package manager setup for FastAPI

---

## Phase 1 Artifacts Generated

| Artifact | Status | Description |
|----------|--------|-------------|
| `research.md` | ✅ | Integration patterns and decisions |
| `data-model.md` | ✅ | SQLModel schemas with relationships |
| `contracts/openapi.yaml` | ✅ | OpenAPI 3.0 specification |
| `contracts/schemas.ts` | ✅ | Zod schemas for frontend |
| `quickstart.md` | ✅ | Setup instructions |
| **Phase 2 Improvements** | **📋 PENDING** | **CLAUDE.md files, folder structure, middleware** |

---

## Next Steps

### Phase 2 Preparation (Before Implementation)

1. **Create CLAUDE.md files**:
   - `frontend/CLAUDE.md` - Frontend development guide (see CLAUDE.md Development Guides section)
   - `backend/CLAUDE.md` - Backend development guide (see CLAUDE.md Development Guides section)

2. **Create folder structure**:
   - Frontend: `middleware/`, `providers/`, `styles/`, `lib/constants/`, `lib/utils/`
   - Backend: `middleware/`, `utils/`, `exceptions/`

3. **Create middleware placeholder files**:
   - Frontend: `src/middleware/api-interceptor.ts`
   - Backend: `src/middleware/cors.py`, `src/middleware/error_handler.py`, `src/middleware/logging.py`

### Phase 2 Workflow

4. **Run `/sp.tasks`** to generate task breakdown
5. **Run `architect-reviewer`** subagent to validate plan
6. **Execute tasks** following Red → Green → Refactor cycle

---

**Plan Version**: 1.1.0
**Created**: 2026-01-16
**Updated**: 2026-01-16 (Added Phase 2 improvements: CLAUDE.md, folder structure, middleware)
**Author**: Claude Code (Spec-Kit Plus)
