# Skills & Agents Strategy

**Project**: Full-Stack Todo Web Application (001-todo-web-crud)
**Date**: 2026-01-16
**Status**: TDD Implementation with 178 Tasks
**Recommendation**: Direct Implementation with Existing Skills

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Existing Skills (USE NOW)](#existing-skills-use-now)
3. [Potential Custom Skills (Consider Later)](#potential-custom-skills-consider-later)
4. [Recommended Implementation Strategy](#recommended-implementation-strategy)
5. [Timeline & Priorities](#timeline--priorities)

---

## Executive Summary

### Current State
- ✅ 178 well-organized TDD tasks (Phase 0-9)
- ✅ Comprehensive design documents (spec, plan, data-model, contracts)
- ✅ Clear Red-Green-Refactor workflow defined
- ⚠️ 6-8 potential custom skills identified but NOT CRITICAL

### Decision: Direct Implementation
**Recommendation**: Use existing skills + manual TDD workflow
**Rationale**: Existing skills cover 70% of needs; custom skills have low ROI for single project
**Time to MVP**: 2-3 weeks with existing skills
**ROI Threshold**: Create custom skills only if 3+ similar projects planned

---

## Existing Skills (USE NOW)

These skills are available and directly applicable to your project:

### 1. **`better-auth-integration`** ⭐⭐⭐ HIGH PRIORITY

**Purpose**: Generate complete Better Auth setup for Next.js frontend

**What It Does**:
- Generates `frontend/src/lib/auth.ts` (server config)
- Generates `frontend/src/lib/auth-client.ts` (client config)
- Generates `frontend/src/app/api/auth/[...all]/route.ts` (API handler)
- Sets up environment variables (.env.local)
- Configures database schema for user tables
- Supports JWT tokens, email/password auth, OAuth providers

**When to Use**:
- **Phase 2 - Foundational** (T028, T029, T030)
- Run: `/better-auth-integration` with framework=next-app-router, database=postgres

**Expected Output**:
- Complete Better Auth configuration files
- Environment variables needed
- Database migration commands

**Time Saved**: 3-4 hours of manual configuration

**Example Usage**:
```
Feature: 001-todo-web-crud
Task: T028-T030 (Frontend Auth Setup)
Trigger: /better-auth-integration
Framework: next-app-router
Database: postgres
Features: [email-password, jwt, 2fa] (optional)
```

---

### 2. **`fastapi-sqlmodel-patterns`** ⭐⭐⭐ HIGH PRIORITY

**Purpose**: Generate FastAPI endpoints with SQLModel ORM patterns

**What It Does**:
- Generates SQLModel model definitions
- Generates Pydantic request/response schemas
- Generates CRUD operation functions
- Generates FastAPI route handlers
- Includes error handling patterns
- Validates request/response types

**When to Use**:
- **Phase 2**: T018-T027 (Backend foundation)
- **Phase 4**: T066-T071 (Create Tasks CRUD)
- **Phase 5**: T092-T095 (View Tasks CRUD)
- **Phase 6**: T114-T115 (Update Tasks CRUD)
- **Phase 8**: T149-T150 (Delete Tasks CRUD)

**Expected Output**:
- Type-safe CRUD operations
- Proper HTTP status codes
- Input validation with Pydantic
- SQLModel query patterns

**Time Saved**: 2-3 hours per CRUD feature

**Example Usage**:
```
Feature: 001-todo-web-crud / User Story 2 (Create Tasks)
Trigger: /fastapi-sqlmodel-patterns
Task: Create POST /api/todos endpoint
Input: Task model (id, user_id, title, description, completed, created_at, updated_at)
Output:
  - TaskCreate schema
  - TaskRead schema
  - create_task CRUD function
  - POST /api/todos endpoint
```

---

### 3. **`database-schema-architect`** ⭐⭐ MEDIUM PRIORITY

**Purpose**: Design and verify database schemas from requirements

**What It Does**:
- Generates SQLModel table definitions
- Creates relationships between entities
- Defines indexes for performance
- Generates migration-ready schema
- Validates constraints and types
- Provides SQLAlchemy configuration

**When to Use**:
- **Phase 2 - T018-T020**: Database setup
- Validation: Cross-check against `specs/001-todo-web-crud/data-model.md`

**Already Have**: `data-model.md` with complete schema
**Use For**: Verification and detailed index recommendations

**Time Saved**: 1-2 hours (mostly for validation)

**Example Usage**:
```
Feature: 001-todo-web-crud
Trigger: /database-schema-architect
Input:
  - User entity (from Better Auth)
  - Task entity (title, description, completed, timestamps)
  - Relationships: User (1:N) Task
Output:
  - Indexed schema for PostgreSQL
  - SQLModel definitions
  - Migration recommendations
```

---

### 4. **`restful-api-designer`** ⭐⭐ MEDIUM PRIORITY

**Purpose**: Design RESTful API endpoints from specifications

**What It Does**:
- Generates endpoint definitions
- Creates request/response schemas
- Defines HTTP status codes
- Provides OpenAPI specification
- Validates REST conventions

**Already Have**: `specs/001-todo-web-crud/contracts/openapi.yaml`
**Use For**: Validation and detailed schema generation

**Time Saved**: 0.5-1 hour (mostly for cross-checking)

---

### 5. **`integration-pattern-finder`** ⭐⭐ MEDIUM PRIORITY

**Purpose**: Discover integration patterns between tech stack components

**What It Does**:
- Finds patterns for Next.js + FastAPI integration
- Better Auth + FastAPI JWT verification patterns
- SQLModel + React Query/Hook integration
- MSW mocking patterns for testing
- Error handling across stack

**When to Use**:
- **Phase 2**: Before implementing auth (JWT verification)
- **Phase 3**: Before implementing API client integration
- **Phase 4+**: When integrating frontend/backend

**Time Saved**: 2-3 hours per integration point

**Example Usage**:
```
Specification: Next.js 16 + FastAPI + Better Auth + SQLModel
Trigger: /integration-pattern-finder
Query: "How do I verify Better Auth JWT tokens in FastAPI?"
Output:
  - JWKS verification pattern
  - FastAPI dependency injection
  - Error handling examples
  - Code patterns for user_id extraction
```

---

### 6. **`fetch-library-docs`** ⭐⭐⭐ HIGH PRIORITY

**Purpose**: Fetch official documentation for external libraries

**What It Does**:
- Retrieves Jest documentation for testing patterns
- Fetches React Testing Library guides
- Gets pytest best practices
- Provides SQLModel query examples
- Fetches Better Auth API documentation

**When to Use**:
- **Continuously** throughout implementation
- Before writing tests (fetch Jest/RTL patterns)
- Before implementing features (fetch SQLModel patterns)
- During debugging (fetch library-specific error handling)

**Time Saved**: 1-2 hours per feature (avoiding documentation hunting)

**Libraries to Fetch Docs For**:
- Jest (`/jest`)
- React Testing Library (`/react-testing-library`)
- pytest (`/pytest`)
- SQLModel (`/sqlmodel`)
- Better Auth (`/better-auth`)
- FastAPI (`/fastapi`)
- Next.js (`/next.js`)

---

### 7. **`sp.git.commit_pr`** ⭐⭐⭐ HIGH PRIORITY

**Purpose**: Automate git commits and PR creation

**What It Does**:
- Creates intelligent commits based on changes
- Follows conventional commit format
- Groups related changes
- Creates pull requests with summaries
- Tracks commit history

**When to Use**:
- After each **TDD Phase** (RED, GREEN, REFACTOR):
  - RED phase complete → commit failing tests
  - GREEN phase complete → commit passing implementation
  - REFACTOR phase complete → commit refactored code
- After each **User Story** completion
- Before deployment

**Recommended Workflow**:
```
For each User Story:

1. RED Phase Complete:
   git commit -m "test(US1): add failing tests for auth signup"

2. GREEN Phase Complete:
   git commit -m "feat(US1): implement auth signup, tests passing"

3. REFACTOR Phase Complete:
   git commit -m "refactor(US1): improve code quality, tests still passing"

4. User Story Complete:
   Create PR with: /sp.git.commit_pr
```

**Time Saved**: 30 minutes per user story (commit management)

---

### 8. **`sp.taskstoissues`** ⭐⭐ MEDIUM PRIORITY

**Purpose**: Convert tasks.md into GitHub Issues for tracking

**What It Does**:
- Converts 178 tasks → GitHub Issues
- Maintains task dependencies
- Creates labels (P1, P2, P3, TDD, RED, GREEN, REFACTOR)
- Links related issues
- Auto-assigns based on story

**When to Use**:
- **After Phase 0 scaffolding**: Convert Phase 1-2 tasks
- **Incrementally**: As each phase completes
- Or: Convert all 178 tasks at once

**Time Saved**: 2-3 hours (issue tracking setup)

**Example Issue from Tasks**:
```
Title: "[US1] T044: Write SignUpForm component test"
Labels: [US1, TDD, RED, Phase-3]
Dependencies: T007, T008, T017 (must complete first)
Description: Write failing test for SignUpForm component in
  frontend/src/components/auth/SignUpForm.test.tsx
```

---

### 9. **`sp.implement`** ⭐⭐⭐ HIGH PRIORITY

**Purpose**: Execute implementation plan by processing tasks

**What It Does**:
- Reads tasks.md sequentially
- Generates code for each task
- Runs tests and verifies coverage
- Creates commits
- Reports progress

**When to Use**:
- **Phase 0-9**: Throughout entire project
- OR use manually with `fastapi-sqlmodel-patterns` + manual work

**Time Saved**: Depends on automation level (5-10 hours potentially)

---

## Potential Custom Skills (Consider Later)

These are skills that COULD be created but are NOT CRITICAL for MVP.

### ❌ NOT RECOMMENDED FOR THIS PROJECT

**Reasoning**:
- Low ROI for single project (creation time > time saved)
- Existing skills + manual workflow sufficient
- Complexity not justified yet

---

### 1. **TDD Workflow Automation Skill** 🔴🟢🔵 (CONSIDER IF: 3+ similar projects)

**Name**: `tdd-red-green-refactor` (hypothetical)

**Purpose**: Automate Test-Driven Development workflow per user story

**What It Would Do**:
```
Tier 1 - Manual (Current Approach):
- User writes tests manually
- User runs: npm test / pytest
- User writes implementation
- User runs tests again
- User refactors code
- Creates commit after each phase

Tier 2 - Assisted (If Skill Created):
- Generate test stubs from requirements
- Verify tests fail (RED phase)
- Generate implementation stubs
- Run tests and verify pass (GREEN phase)
- Suggest refactoring improvements
- Auto-create commits per phase
```

**Implementation Complexity**: MEDIUM-HIGH (requires test generation + test runner integration)

**ROI Analysis**:
| Metric | Value |
|--------|-------|
| **Development time**: | 4-6 hours |
| **Time saved per story**: | 1-2 hours |
| **Stories in project**: | 6 |
| **Total time saved**: | 6-12 hours |
| **Net ROI**: | NEGATIVE (creation > savings) |
| **Net ROI if 3 projects**: | POSITIVE |

**Recommendation**: ❌ Skip for now | ✅ Create if building 3+ similar projects

---

### 2. **Test-First Code Generation Skill** 📝 (CONSIDER IF: Repetitive patterns)

**Name**: `test-generator` (hypothetical)

**Purpose**: Generate Jest/React Testing Library and pytest tests with common patterns

**What It Would Do**:
- Generate component test skeletons (React Testing Library)
- Generate hook test patterns (jest)
- Generate API endpoint test patterns (pytest)
- Generate integration test templates
- Ensure comprehensive test coverage

**Example Generation**:
```typescript
// Input
Component: SignUpForm
Props: [email, password, onSubmit, isLoading, error]
Interactions: [type email, type password, click submit, show error]

// Output
// frontend/src/components/auth/SignUpForm.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignUpForm } from './SignUpForm';

describe('SignUpForm', () => {
  it('should render email and password inputs', () => {
    render(<SignUpForm onSubmit={jest.fn()} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should call onSubmit when form is submitted', async () => {
    const onSubmit = jest.fn();
    render(<SignUpForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(onSubmit).toHaveBeenCalled();
  });

  // ... more tests
});
```

**Implementation Complexity**: MEDIUM (pattern libraries, test generation logic)

**ROI Analysis**:
| Metric | Value |
|--------|-------|
| **Development time**: | 3-4 hours |
| **Time saved per component**: | 30-45 minutes |
| **Components in project**: | ~15 |
| **Total time saved**: | 7.5-11 hours |
| **Net ROI**: | MARGINAL (creation ≈ savings) |
| **Net ROI if 2+ projects**: | POSITIVE |

**Recommendation**: ❌ Skip for now | ✅ Create if building multiple similar projects

---

### 3. **Full-Stack Integration Pattern Finder (Custom)** 🔗 (CONSIDER IF: Reusable template)

**Name**: `next-fastapi-integration-patterns` (hypothetical)

**Purpose**: Specialized patterns for Next.js 16 + FastAPI + Better Auth + SQLModel stack

**What It Would Do**:
- Provide Next.js ↔ FastAPI communication patterns
- Better Auth JWT verification in FastAPI
- SQLModel + React Hook Form integration
- MSW mock server setup for API testing
- Error handling across full stack
- Environment variable management

**Example Queries**:
```
1. "How to verify Better Auth JWT in FastAPI?"
   → Returns: JWKS verification code, FastAPI dependency, error handling

2. "How to setup MSW for mocking task API endpoints?"
   → Returns: MSW handler setup, mock data patterns, integration with tests

3. "How to use React Hook Form with Zod for task creation?"
   → Returns: Form component pattern, validation schema, submission handling

4. "How to handle 401 session expiry in Next.js?"
   → Returns: Interceptor code, redirect logic, draft saving pattern
```

**Implementation Complexity**: HIGH (knowledge synthesis, pattern documentation)

**ROI Analysis**:
| Metric | Value |
|--------|-------|
| **Development time**: | 5-8 hours |
| **Time saved in project**: | 3-5 hours |
| **Time saved if 2+ projects**: | 10-15 hours |
| **Net ROI for 1 project**: | SLIGHTLY NEGATIVE |
| **Net ROI if 2+ projects**: | POSITIVE |

**Recommendation**: ❌ Skip for now | ✅ Create if building 2+ similar full-stack apps

---

### 4. **Coverage Report Analyzer Skill** 📊 (CONSIDER IF: Phase 9 bottleneck)

**Name**: `coverage-analyzer` (hypothetical)

**Purpose**: Analyze Jest and pytest coverage reports to identify gaps

**What It Would Do**:
- Parse Jest coverage JSON
- Parse pytest coverage report
- Identify uncovered lines/branches
- Suggest missing tests
- Highlight coverage thresholds (70% minimum)
- Generate coverage summary report

**When Needed**: Phase 9 only (T172-T176)

**Implementation Complexity**: LOW (report parsing, simple analysis)

**ROI Analysis**:
| Metric | Value |
|--------|-------|
| **Development time**: | 1-2 hours |
| **Time saved in Phase 9**: | 1-2 hours |
| **Frequency**: | One-time use |
| **Net ROI**: | BREAK-EVEN |

**Recommendation**: ❌ Skip for now | ✅ Create only if coverage analysis becomes bottleneck

---

## Recommended Implementation Strategy

### Phase-by-Phase Skill Usage

#### **Phase 0: Scaffolding** (T000-T006)
- **Manual**: Run `npx create-next-app` and `uv init` commands
- **No skills needed** - straightforward CLI commands

#### **Phase 1: Setup** (T007-T017)
- **Manual**: Create CLAUDE.md files (detailed developer guides)
- **Manual**: Create folder structure
- **No skills needed** - file creation and documentation

#### **Phase 2: Foundational** (T018-T037)

| Task | Skill to Use | Alternative |
|------|--------------|-------------|
| T028-T030 (Better Auth) | `/better-auth-integration` | Manual (2-3 hours) |
| T018-T027 (Backend setup) | `/fastapi-sqlmodel-patterns` | Manual (3-4 hours) |
| T031-T037 (Frontend setup) | `/fetch-library-docs` | Manual research |

#### **Phase 3-8: User Stories** (T038-T161)

For Each User Story:

1. **RED Phase (Test Writing)**:
   - Fetch docs: `/fetch-library-docs` (Jest, React Testing Library, pytest)
   - Write tests manually (clear requirements in tasks.md)

2. **GREEN Phase (Implementation)**:
   - Use `/fastapi-sqlmodel-patterns` for backend endpoints
   - Use `/fetch-library-docs` for API patterns
   - Use `/integration-pattern-finder` for frontend-backend integration

3. **REFACTOR Phase**:
   - Use `/fetch-library-docs` for best practices
   - Manual code review and improvement

4. **Commit**:
   - Use `/sp.git.commit_pr` to create commits

#### **Phase 9: Polish** (T162-T177)
- `/fetch-library-docs` for testing best practices
- Manual coverage analysis (or `/coverage-analyzer` if created)
- `/sp.git.commit_pr` for final commits

---

## Timeline & Priorities

### IMMEDIATE (Start Now - Week 1)

**HIGH PRIORITY SKILLS**:
1. ✅ **`better-auth-integration`** - Phase 2 auth setup
2. ✅ **`fastapi-sqlmodel-patterns`** - Phase 2-8 CRUD patterns
3. ✅ **`fetch-library-docs`** - Continuous throughout
4. ✅ **`sp.git.commit_pr`** - After each TDD phase
5. ✅ **`sp.taskstoissues`** - Optional, for tracking

**Estimated Time Saved**: 8-12 hours across project

### LATER (After MVP - Week 3+)

**CONSIDER CREATING** (Only if building 3+ similar projects):
1. 📝 **`tdd-red-green-refactor`** - TDD automation
2. 📊 **`test-generator`** - Test stub generation
3. 🔗 **`next-fastapi-integration-patterns`** - Stack-specific patterns

**Cost-Benefit**: Only worthwhile if this is first of 3+ similar projects

### NEVER (Not Worth Creating)

- ❌ Generic "auto-code-generator" (too broad, unmaintainable)
- ❌ "Multi-framework" skill (Next.js + Vue + Angular is overkill)
- ❌ "AI test writer" (too error-prone without human review)

---

## Success Metrics

### For THIS Project (No Custom Skills)

| Metric | Target | How to Measure |
|--------|--------|-----------------|
| **Time to MVP** | 2-3 weeks | Phases 0-4 complete |
| **Test coverage** | ≥70% | Phase 9 coverage reports |
| **Code quality** | No linting errors | CI/CD check |
| **Documentation** | CLAUDE.md complete | frontend/CLAUDE.md + backend/CLAUDE.md |

### For FUTURE Projects (If Creating Custom Skills)

| Metric | Target | How to Measure |
|--------|--------|-----------------|
| **Skill reusability** | ≥3 projects | Count projects using skills |
| **Time saved per project** | ≥30% | Compare project duration |
| **Developer onboarding** | <4 hours | Time to first pull request |
| **Pattern standardization** | 100% | All projects follow same patterns |

---

## Summary & Recommendation

### DO THIS NOW ✅

1. **Use existing skills**:
   - `better-auth-integration` (Phase 2)
   - `fastapi-sqlmodel-patterns` (Phase 2-8)
   - `fetch-library-docs` (Continuous)
   - `sp.git.commit_pr` (Per phase)

2. **Manual TDD workflow**:
   - RED phase: Write tests (guided by tasks.md)
   - GREEN phase: Write implementation (use skills + library docs)
   - REFACTOR phase: Improve code quality
   - Commit: Use sp.git.commit_pr

3. **Start Phase 0 immediately**:
   - Next.js scaffolding
   - FastAPI setup
   - No blocker, no custom skills needed

### DO THIS ONLY IF ⚠️

1. **Creating 3+ similar projects**:
   - Then build `tdd-red-green-refactor` skill (saves 15-20 hours)
   - Then build `test-generator` skill (saves 10-15 hours)
   - Then build stack-specific patterns skill

2. **Coverage analysis becomes bottleneck**:
   - Then build `coverage-analyzer` skill

3. **Need reusable templates**:
   - Then package skills into "Full-Stack Starter Kit"

### FINAL DECISION: **Direct Implementation** ✅

- **Start Phase 0 immediately** with existing skills
- **No custom skills needed** for MVP
- **Revisit after MVP** (if planning 3+ similar projects)
- **Expected MVP delivery**: 2-3 weeks

---

## Related Files

- `tasks.md` - 178 tasks organized by phase and user story
- `plan.md` - Technical architecture and design decisions
- `spec.md` - Feature specifications and acceptance criteria
- `data-model.md` - Database schema design
- `contracts/openapi.yaml` - API endpoint specifications

---

**Document Version**: 1.0
**Last Updated**: 2026-01-16
**Status**: Ready for Phase 0 Implementation
