# Quickstart: Full-Stack Todo Web Application

**Feature**: 001-todo-web-crud
**Date**: 2026-01-16

This guide provides step-by-step instructions for setting up the development environment.

---

## Prerequisites

- **Node.js**: v20+ (for Next.js 16)
- **Python**: 3.11+
- **uv**: Package manager for Python
- **PostgreSQL**: Neon account (free tier available)
- **Git**: For version control

---

## Step 1: Clone and Navigate

```bash
cd todo-in-memory-console-app
git checkout 001-todo-web-crud
```

---

## Step 2: Setup Backend

### 2.1 Install uv (if not installed)

```bash
# macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### 2.2 Create Backend Directory

```bash
mkdir -p backend/src/{models,schemas,auth,crud,routers,db}
mkdir -p backend/tests/{unit,integration}
cd backend
```

### 2.3 Initialize Python Project

```bash
uv init
```

### 2.4 Create pyproject.toml

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
    "psycopg2-binary>=2.9.0",
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

### 2.5 Install Dependencies

```bash
uv venv
uv pip install -e ".[dev]"
```

### 2.6 Create Environment File

```bash
# backend/.env
DATABASE_URL=postgresql://user:password@host.neon.tech/database?sslmode=require
BETTER_AUTH_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:3000
```

### 2.7 Create Basic Files

```bash
# backend/src/__init__.py
touch src/__init__.py

# Create all __init__.py files
touch src/models/__init__.py
touch src/schemas/__init__.py
touch src/auth/__init__.py
touch src/crud/__init__.py
touch src/routers/__init__.py
touch src/db/__init__.py
```

### 2.8 Run Backend

```bash
uv run uvicorn src.main:app --reload --port 8000
```

---

## Step 3: Setup Frontend

### 3.1 Create Next.js App

```bash
cd ..  # Back to repo root
npx create-next-app@latest frontend --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### 3.2 Install Additional Dependencies

```bash
cd frontend
npm install better-auth @better-auth/cli react-hook-form @hookform/resolvers zod
npm install -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event msw @types/jest jest-environment-jsdom
```

### 3.3 Create Environment File

```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
BETTER_AUTH_SECRET=your-secret-key-here-min-32-chars
DATABASE_URL=postgresql://user:password@host.neon.tech/database?sslmode=require
```

### 3.4 Configure TypeScript (Strict Mode)

Update `frontend/tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    // ... other options
  }
}
```

### 3.5 Configure Jest

Create `frontend/jest.config.ts`:

```typescript
import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

export default createJestConfig(config);
```

Create `frontend/jest.setup.ts`:

```typescript
import '@testing-library/jest-dom';
import { server } from './tests/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### 3.6 Run Better Auth Migration

```bash
npx @better-auth/cli migrate
```

### 3.7 Run Frontend

```bash
npm run dev
```

---

## Step 4: Setup Neon Database

### 4.1 Create Neon Account

1. Go to https://neon.tech
2. Sign up for free account
3. Create new project

### 4.2 Get Connection String

1. Go to project dashboard
2. Copy connection string (with pooled connection)
3. Format: `postgresql://user:password@host.neon.tech/database?sslmode=require`

### 4.3 Update Environment Files

Update both `backend/.env` and `frontend/.env.local` with your Neon connection string.

---

## Step 5: Verify Setup

### 5.1 Check Backend Health

```bash
curl http://localhost:8000/health
# Expected: {"status":"healthy"}
```

### 5.2 Check Frontend

Open http://localhost:3000 in browser.

### 5.3 Run Tests

```bash
# Backend tests
cd backend
uv run pytest --cov=src --cov-report=term-missing

# Frontend tests
cd frontend
npm test -- --coverage
```

---

## Directory Structure (After Setup)

```
todo-in-memory-console-app/
├── backend/
│   ├── src/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── auth/
│   │   ├── crud/
│   │   └── routers/
│   ├── tests/
│   ├── pyproject.toml
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── hooks/
│   │   └── types/
│   ├── tests/
│   ├── package.json
│   ├── tsconfig.json
│   ├── jest.config.ts
│   └── .env.local
│
├── specs/
│   └── 001-todo-web-crud/
│
└── CLAUDE.md
```

---

## Common Issues

### Issue: CORS errors

**Solution**: Ensure `CORS_ORIGINS` in backend `.env` matches frontend URL.

### Issue: Database connection failed

**Solution**: Check Neon connection string has `?sslmode=require`.

### Issue: JWT verification fails

**Solution**: Ensure `BETTER_AUTH_URL` in backend points to frontend URL.

### Issue: uv not found

**Solution**: Restart terminal after installing uv, or add to PATH manually.

---

## Next Steps

1. Run `/sp.tasks` to generate task breakdown
2. Start implementing following TDD workflow
3. Use `architect-reviewer` subagent to validate before major changes
