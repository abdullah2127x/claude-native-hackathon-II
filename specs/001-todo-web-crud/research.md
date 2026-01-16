# Research: Full-Stack Todo Web Application

**Feature**: 001-todo-web-crud
**Date**: 2026-01-16
**Status**: Complete

---

## 1. Better Auth JWT + FastAPI JWKS Integration

### Decision
Use Better Auth JWT plugin on frontend to generate tokens, verify in FastAPI using JWKS endpoint.

### Rationale
- Better Auth manages sessions and user data natively
- JWT tokens provide stateless authentication for external APIs
- JWKS allows FastAPI to verify tokens without shared secrets
- Follows OAuth 2.0 / OIDC standards

### Implementation Pattern

**Frontend (Better Auth)**:
```typescript
// lib/auth.ts
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";

export const auth = betterAuth({
  database: { /* Neon config */ },
  emailAndPassword: { enabled: true },
  plugins: [jwt()],
});

// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [jwtClient()],
});
```

**Backend (FastAPI)**:
```python
# auth/jwt_handler.py
from jose import jwt, JWTError
import httpx
from functools import lru_cache

BETTER_AUTH_URL = os.getenv("BETTER_AUTH_URL")
JWKS_URL = f"{BETTER_AUTH_URL}/api/auth/jwks"

@lru_cache(maxsize=1)
def get_jwks():
    response = httpx.get(JWKS_URL)
    return response.json()

def verify_jwt(token: str) -> dict:
    jwks = get_jwks()
    header = jwt.get_unverified_header(token)
    key = next(k for k in jwks["keys"] if k["kid"] == header["kid"])
    return jwt.decode(token, key, algorithms=["EdDSA"])
```

### Alternatives Considered
- **Shared secret JWT**: Simpler but less secure, doesn't follow OIDC
- **Cookie-based auth**: Doesn't work for cross-origin API calls
- **API keys**: Not suitable for user authentication

### Source
- Better Auth JWT docs: https://better-auth.com/docs/plugins/jwt
- Integration pattern finder skill reference

---

## 2. React Hook Form + Zod Integration

### Decision
Use React Hook Form with @hookform/resolvers/zod for form management and validation.

### Rationale
- React Hook Form minimizes re-renders (performance)
- Zod provides type-safe runtime validation
- Resolver bridges RHF and Zod seamlessly
- Zod schemas can be reused for API response validation

### Implementation Pattern

```typescript
// lib/validations/task.ts
import { z } from "zod";

export const taskCreateSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(200, "Title must be 200 characters or less"),
  description: z.string()
    .max(2000, "Description must be 2000 characters or less")
    .optional(),
});

export type TaskCreateInput = z.infer<typeof taskCreateSchema>;

// components/tasks/TaskForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskCreateSchema, TaskCreateInput } from "@/lib/validations/task";

export function TaskForm({ onSubmit }) {
  const form = useForm<TaskCreateInput>({
    resolver: zodResolver(taskCreateSchema),
    defaultValues: { title: "", description: "" },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register("title")} />
      {form.formState.errors.title && (
        <span>{form.formState.errors.title.message}</span>
      )}
      {/* ... */}
    </form>
  );
}
```

### Alternatives Considered
- **Formik**: More verbose, larger bundle
- **Native forms**: No validation library integration
- **Yup**: Similar to Zod but no TypeScript inference

### Source
- React Hook Form docs: https://react-hook-form.com
- Zod resolver: https://github.com/react-hook-form/resolvers

---

## 3. MSW Setup for Next.js 16 App Router

### Decision
Use Mock Service Worker (MSW) for API mocking in tests with Next.js 16.

### Rationale
- MSW intercepts at network level (realistic testing)
- Works with both browser and Node environments
- Compatible with Next.js App Router
- Enables testing without backend dependency

### Implementation Pattern

```typescript
// tests/mocks/handlers.ts
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:8000/api/todos", () => {
    return HttpResponse.json([
      { id: "1", title: "Test Task", completed: false },
    ]);
  }),

  http.post("http://localhost:8000/api/todos", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      { id: "new-id", ...body, completed: false },
      { status: 201 }
    );
  }),
];

// tests/mocks/server.ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

// jest.setup.ts
import { server } from "./tests/mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Alternatives Considered
- **Jest mocks**: Don't test actual fetch behavior
- **Nock**: Node-only, doesn't work in browser tests
- **Mirage JS**: Heavier, less maintained

### Source
- MSW docs: https://mswjs.io
- MSW Next.js guide: https://mswjs.io/docs/integrations/node

---

## 4. SQLModel + Neon PostgreSQL Connection

### Decision
Use SQLModel with pooled Neon connection and proper SSL configuration.

### Rationale
- SQLModel combines SQLAlchemy + Pydantic for type safety
- Neon requires pooled connections for serverless
- SSL mode required for Neon security

### Implementation Pattern

```python
# db/database.py
import os
from sqlmodel import SQLModel, create_engine, Session

DATABASE_URL = os.getenv("DATABASE_URL")
# Format: postgresql://user:pass@host.neon.tech/db?sslmode=require

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,      # Check connection health
    pool_recycle=300,        # Recycle every 5 min (serverless)
    echo=False,              # Disable SQL logging in prod
)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

# models/task.py
from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional
import uuid

class Task(SQLModel, table=True):
    __tablename__ = "task"

    id: str = Field(
        default_factory=lambda: str(uuid.uuid4()),
        primary_key=True,
    )
    user_id: str = Field(foreign_key="user.id", index=True)
    title: str = Field(max_length=200)
    description: Optional[str] = Field(default=None, max_length=2000)
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = Field(default=None)
```

### Alternatives Considered
- **Raw psycopg2**: No type safety, more boilerplate
- **SQLAlchemy only**: No Pydantic integration
- **Prisma**: JavaScript-centric, less Python support

### Source
- SQLModel docs: https://sqlmodel.tiangolo.com
- Neon connection guide: https://neon.tech/docs/guides/python

---

## 5. uv Package Manager Setup

### Decision
Use uv as the package manager for the FastAPI backend.

### Rationale
- 10-100x faster than pip
- Handles virtual environments automatically
- Compatible with pyproject.toml
- Developed by Astral (Ruff creators)

### Implementation Pattern

```toml
# backend/pyproject.toml
[project]
name = "todo-backend"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = [
    "fastapi>=0.115.0",
    "uvicorn[standard]>=0.32.0",
    "sqlmodel>=0.0.22",
    "python-jose[cryptography]>=3.3.0",
    "httpx>=0.27.0",
    "python-dotenv>=1.0.0",
    "asyncpg>=0.30.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=8.0.0",
    "pytest-asyncio>=0.24.0",
    "pytest-cov>=5.0.0",
]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
```

```bash
# Setup commands
cd backend
uv venv                    # Create virtual environment
uv pip install -e ".[dev]" # Install with dev dependencies
uv run uvicorn src.main:app --reload  # Run with uv
```

### Alternatives Considered
- **pip + venv**: Slower, manual venv management
- **Poetry**: Slower than uv, more complex
- **conda**: Overkill for web apps

### Source
- uv docs: https://github.com/astral-sh/uv

---

## Summary

All research items resolved. No NEEDS CLARIFICATION items remaining.

| Topic | Decision | Pattern Location |
|-------|----------|------------------|
| JWT Integration | Better Auth JWT + JWKS | `.claude/skills/integration-pattern-finder/` |
| Form Handling | RHF + Zod resolver | Pattern above |
| API Mocking | MSW for Next.js | Pattern above |
| Database | SQLModel + Neon | `.claude/skills/database-schema-architect/` |
| Package Manager | uv | Pattern above |
