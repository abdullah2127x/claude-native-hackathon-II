# Reusability Workflow: Skills, Agents & Commands for Full-Stack SDD

**Purpose**: Master checklist for creating reusable skills, subagents, and commands during Spec-Driven Development workflow.

**Applies To**: Any full-stack web application using monorepo structure with separate frontend and backend.

**Principle**: Create tools **JUST-IN-TIME** - right before you need them, informed by previous stage outputs.

---

## 📊 Workflow Overview

```
Constitution → Spec → Plan → Tasks → Implementation
     ↓          ↓       ↓       ↓            ↓
   Meta     Discovery  Arch   Breakdown   Execution
   Skills    Tools    Tools    Tools       Tools
```

---

## ✅ Stage 0: META-SKILLS (Create Once, Use Forever)

**When**: Project initialization (before any feature work)

**Purpose**: Cross-cutting tools used throughout all stages

| Tool | Type | Purpose | Status |
|------|------|---------|--------|
| `/sp.phr` | Command | Record prompt history | ✅ Exists |
| `/sp.constitution` | Command | Update constitution | ✅ Exists |
| `/sp.specify` | Command | Create specifications | ✅ Exists |
| `/sp.plan` | Command | Generate plans | ✅ Exists |
| `/sp.tasks` | Command | Break down tasks | ✅ Exists |
| `/sp.implement` | Command | Execute implementation | ✅ Exists |
| `/sp.adr` | Command | Document architectural decisions | ✅ Exists |
| `/sp.git.commit_pr` | Command | Git workflow automation | ✅ Exists |

**Action Required**: ✅ None - all meta-skills already exist

---

## 📋 Stage 1: BEFORE SPEC (Discovery Phase)

**When**: Starting a new feature, need to understand business requirements

**Purpose**: Clarify BUSINESS requirements (WHAT to build), not technical approach (HOW to build)

**Important**: Spec should be technology-agnostic and focus on user needs, not implementation details.

### Skills/Agents to Create:

#### 1. `interview` (Skill)
- **Purpose**: Conducts discovery conversations to understand user needs
- **Status**: ✅ Already exists
- **Use When**: Requirements are ambiguous or need validation

**Note on Tech Stack**:
- If tech stack is **constitutional** (already decided), skip tech validation before spec
- If tech stack is **undecided**, create `tech-stack-evaluator` to help choose technologies
- In your case: Tech stack is constitutional (Next.js 16 + FastAPI + Better Auth + SQLModel + Neon) → No tech validation needed here

### Checklist for Stage 1:

- [ ] Constitution exists and is current
- [ ] Review constitution's tech stack (if decided, skip tech tools)
- [ ] Create `requirements-clarifier` command (optional, if requirements unclear)
- [ ] Use `interview` skill to clarify business requirements
- [ ] Focus on WHAT users need, not HOW to build it
- [ ] ✅ **READY TO WRITE SPEC** (business-focused, tech-agnostic)

---

## 🏗️ Stage 2: AFTER SPEC, BEFORE PLAN (Architecture Phase)

**When**: Spec complete, need to design technical approach

**Purpose**: Design architecture, APIs, schemas, structure - validate TECHNICAL feasibility of business requirements

**Now we focus on HOW**: Spec defined WHAT (business needs), now we design HOW (technical solution)

### Skills/Agents to Create:

#### 3. `integration-pattern-finder` (Skill) ✅ CREATED
- **Purpose**: Finds integration patterns for constitutional tech stack + spec requirements
- **Input**: Spec requirements + Tech stack from constitution
- **Output**: Integration examples, best practices, gotchas, code snippets
- **Reusability**: Any project with fixed tech stack implementing new features
- **Create When**: You know WHAT to build (spec) and need to figure out HOW with your stack
- **Location**: `.claude/skills/integration-pattern-finder/`

**Example Use**:
```bash
Input:
  - Spec: "Users must authenticate to access their tasks"
  - Constitution: "Better Auth (frontend) + FastAPI (backend) + JWT"
Output:
  - Better Auth JWT plugin configuration
  - FastAPI JWT verification middleware pattern
  - Token flow: login → JWT issue → API calls with Authorization header
  - Code examples for both frontend and backend
```

#### 4. `restful-api-designer` (Skill) ✅ CREATED
- **Purpose**: Generates RESTful API design from feature requirements
- **Input**: Feature spec with user stories and acceptance criteria
- **Output**:
  - API endpoint definitions (methods, paths, parameters)
  - Request/response schemas (JSON structure)
  - Authentication requirements
  - Error response patterns
- **Reusability**: Any REST API design task
- **Create When**: Spec defines features needing API endpoints
- **Location**: `.claude/skills/restful-api-designer/`

**Example Use**:
```bash
Input: Spec "User can create, view, update, delete tasks"
Output:
  POST /api/{user_id}/tasks
  GET /api/{user_id}/tasks
  PUT /api/{user_id}/tasks/{id}
  DELETE /api/{user_id}/tasks/{id}
  + schemas for each
```

#### 5. `database-schema-architect` (Skill) ✅ CREATED
- **Purpose**: Designs database schema from data requirements
- **Input**: Data requirements from spec (entities, relationships, constraints)
- **Output**:
  - ORM model definitions (SQLModel classes)
  - Indexes for performance
  - Foreign key relationships
  - Migration strategy
  - User isolation approach
- **Reusability**: Any database design task
- **Create When**: Spec defines data to persist
- **Location**: `.claude/skills/database-schema-architect/`

**Example Use**:
```bash
Input: Spec requires "tasks belong to users, have title/description/status"
Output: Task and User SQLModel models with relationships and indexes
```

#### 6. `monorepo-architect` (Skill)
- **Purpose**: Designs monorepo folder structure for frontend + backend
- **Input**: Frontend and backend technology choices
- **Output**:
  - Recommended folder structure
  - Shared types/schemas location
  - Environment variable strategy
  - CLAUDE.md hierarchy (root, frontend, backend)
  - Package.json / pyproject.toml structure
- **Reusability**: Any monorepo project
- **Create When**: Starting monorepo or reorganizing structure

**Example Use**:
```bash
Input: Next.js frontend + FastAPI backend
Output:
  /frontend (Next.js app)
  /backend (FastAPI app)
  /specs (shared specifications)
  /CLAUDE.md (root navigation)
```

#### 7. `/architecture-review` (Command)
- **Purpose**: Validates plan against constitution principles
- **Input**: Draft plan document
- **Output**: Compliance report with violations and suggestions
- **Checks**:
  - TDD approach included
  - Authentication/authorization design
  - User isolation strategy
  - Performance considerations
  - Technology stack compliance
- **Reusability**: Any project with a constitution
- **Create When**: Plan draft complete, before finalizing

### Checklist for Stage 2:

- [ ] Spec is complete and approved
- [ ] Create `integration-pattern-finder` skill
- [ ] Find integration patterns for spec requirements + constitutional tech stack
- [ ] Create `restful-api-designer` skill
- [ ] Run API design for all features in spec
- [ ] Create `database-schema-architect` subagent
- [ ] Design database schema for all entities
- [ ] Create `monorepo-architect` skill
- [ ] Design folder structure
- [ ] Create `/architecture-review` command
- [ ] Validate plan against constitution
- [ ] Fix any constitutional violations
- [ ] ✅ **READY TO WRITE PLAN**

---

## ✅ Stage 3: AFTER PLAN, BEFORE TASKS (Breakdown Phase)

**When**: Plan complete, need to break into atomic work units

**Purpose**: Generate testable, atomic tasks with dependencies

### Skills/Agents to Create:

#### 8. `tdd-task-generator` (Skill)
- **Purpose**: Generates TDD-based task breakdown from plan
- **Input**: Plan with components, APIs, schemas
- **Output**: Task list following Red → Green → Refactor cycle
- **Each Task Includes**:
  - Test-first approach (write test first)
  - Clear acceptance criteria
  - Links to spec + plan sections
  - Estimated complexity
  - Dependencies on other tasks
- **Reusability**: Any TDD project
- **Create When**: Plan approved, need task breakdown

**Example Use**:
```bash
Input: Plan section "User Authentication API"
Output:
  - T-001: Write failing test for POST /auth/login
  - T-002: Implement login endpoint to pass test
  - T-003: Refactor auth logic into service layer
```

#### 9. `fullstack-task-coordinator` (Subagent)
- **Purpose**: Coordinates tasks requiring both frontend and backend
- **Input**: Feature requiring full-stack implementation
- **Output**: Coordinated task sequence ensuring proper order
- **Ensures**:
  - Backend API complete before frontend consumes it
  - Types/schemas shared between frontend and backend
  - Integration tests after both sides complete
- **Reusability**: Any full-stack feature
- **Create When**: Features span frontend and backend

**Example Use**:
```bash
Input: "User can create tasks" feature
Output:
  1. Backend: POST /api/tasks endpoint + tests
  2. Backend: Task model + migration
  3. Frontend: API client function + tests
  4. Frontend: Create task form + tests
  5. Integration: E2E test for task creation flow
```

#### 10. `constitution-validator` (Skill)
- **Purpose**: Reviews task list against constitutional principles
- **Input**: Task list
- **Output**: Compliance report with violations
- **Checks**:
  - Every task has test-first approach
  - No manual coding mentioned
  - Task IDs reference spec sections
  - 70% test coverage achievable
  - No hardcoded credentials
- **Reusability**: Any constitutionally-governed project
- **Create When**: Task list drafted

#### 11. `/task-dependencies` (Command)
- **Purpose**: Analyzes and visualizes task dependencies
- **Input**: Task list with dependencies
- **Output**: Execution order, dependency graph, blockers
- **Identifies**:
  - Critical path
  - Parallelizable tasks
  - Circular dependencies
  - Missing dependencies
- **Reusability**: Any multi-task project
- **Create When**: Complex task list with many dependencies

### Checklist for Stage 3:

- [ ] Plan is complete and approved
- [ ] Create `tdd-task-generator` skill
- [ ] Generate tasks from plan
- [ ] Create `fullstack-task-coordinator` subagent
- [ ] Coordinate frontend/backend task sequences
- [ ] Create `constitution-validator` skill
- [ ] Validate tasks against constitution
- [ ] Fix constitutional violations
- [ ] Create `/task-dependencies` command
- [ ] Analyze and optimize task order
- [ ] ✅ **READY TO IMPLEMENT**

---

## 💻 Stage 4: AFTER TASKS, DURING IMPLEMENTATION (Execution Phase)

**When**: Tasks approved, ready to write code

**Purpose**: Generate high-quality, tested code following task specifications

### Skills/Agents to Create:

#### 12. `fastapi-crud-generator` (Skill)
- **Purpose**: Generates complete CRUD operations for FastAPI + SQLModel
- **Input**: Database model definition from plan
- **Output**:
  - SQLModel class with type hints
  - Pydantic request/response schemas
  - CRUD operation functions (create, read, update, delete)
  - FastAPI route handlers with error handling
  - Pytest unit tests for all operations
- **Reusability**: Any FastAPI + SQLModel project
- **Create When**: Implementing backend CRUD tasks

**Example Use**:
```bash
Input: Task model (id, user_id, title, description, completed)
Output: models/task.py, schemas/task.py, routes/tasks.py, tests/test_tasks.py
```

#### 13. `nextjs-ui-generator` (Skill)
- **Purpose**: Generates Next.js components with TypeScript and Tailwind
- **Input**: UI component spec from plan
- **Output**:
  - TypeScript React component
  - Tailwind CSS styling (responsive)
  - API integration with type-safe client
  - Component tests (Jest + React Testing Library)
  - Accessibility attributes (ARIA)
- **Reusability**: Any Next.js + TypeScript project
- **Create When**: Implementing frontend UI tasks

**Example Use**:
```bash
Input: "Task list component showing title, status, actions"
Output: components/TaskList.tsx, tests/TaskList.test.tsx
```

#### 14. `jwt-auth-integrator` (Skill)
- **Purpose**: Integrates JWT authentication across frontend and backend
- **Input**: Authentication requirements from plan
- **Output**:
  - Frontend: Auth provider, login/signup forms, protected routes
  - Backend: JWT verification middleware, token generation
  - Shared: JWT secret configuration
  - Tests: Auth flow tests (login, protected route access, token expiry)
- **Reusability**: Any JWT-based auth system
- **Create When**: Implementing authentication tasks

**Example Use**:
```bash
Input: "Users must authenticate to access tasks"
Output:
  Frontend: auth/BetterAuthProvider.tsx, middleware.ts
  Backend: middleware/auth.py, utils/jwt.py
  Tests: auth flow tests
```

#### 15. `/test-first` (Command)
- **Purpose**: Enforces TDD workflow during implementation
- **Input**: Task to implement
- **Process**:
  1. Prompt user to write failing test first
  2. Generate minimal code to pass test
  3. Refactor while keeping tests green
  4. Verify test coverage meets 70% threshold
- **Reusability**: Any TDD project
- **Create When**: Starting any implementation task

#### 16. `constitution-code-reviewer` (Subagent)
- **Purpose**: Reviews generated code against constitutional principles
- **Input**: Code files generated during implementation
- **Output**: Code review with violations and suggestions
- **Checks**:
  - Task ID reference in file header
  - Type safety (TypeScript strict, Python type hints)
  - Error handling on all endpoints
  - Input validation (Pydantic/Zod)
  - No hardcoded credentials
  - Test coverage ≥ 70%
- **Reusability**: Any constitutionally-governed codebase
- **Create When**: Before committing code

### Checklist for Stage 4:

- [ ] Tasks are approved and prioritized
- [ ] Create `fastapi-crud-generator` skill
- [ ] Create `nextjs-ui-generator` skill
- [ ] Create `jwt-auth-integrator` skill
- [ ] Create `/test-first` command
- [ ] Create `constitution-code-reviewer` subagent
- [ ] For each task:
  - [ ] Run `/test-first` to enforce TDD
  - [ ] Generate code using appropriate skill
  - [ ] Run tests (must pass)
  - [ ] Review with `constitution-code-reviewer`
  - [ ] Fix violations
  - [ ] Commit with `/sp.git.commit_pr`
  - [ ] Create PHR with `/sp.phr`
- [ ] ✅ **IMPLEMENTATION COMPLETE**

---

## 📈 Summary: Creation Timeline

### Phase: Discovery (Before Spec) - BUSINESS FOCUS
1. ✅ Meta-skills (already exist)
2. Create `requirements-clarifier` command (optional - only if requirements unclear)

**Key Principle**: Focus on WHAT users need, not HOW to build. Spec should be tech-agnostic.

### Phase: Architecture (After Spec, Before Plan) - TECHNICAL FOCUS
3. Create `integration-pattern-finder` skill
4. Create `restful-api-designer` skill
5. Create `database-schema-architect` subagent
6. Create `monorepo-architect` skill
7. Create `/architecture-review` command

**Key Principle**: Now validate HOW to deliver WHAT. Match spec requirements to constitutional tech stack.

### Phase: Breakdown (After Plan, Before Tasks)
8. Create `tdd-task-generator` skill
9. Create `fullstack-task-coordinator` subagent
10. Create `constitution-validator` skill
11. Create `/task-dependencies` command

### Phase: Execution (After Tasks, During Implementation)
12. Create `fastapi-crud-generator` skill
13. Create `nextjs-ui-generator` skill
14. Create `jwt-auth-integrator` skill
15. Create `/test-first` command
16. Create `constitution-code-reviewer` subagent

---

## 🎯 Key Principles

1. **Just-In-Time Creation**: Don't create all tools upfront - create when you need them, informed by previous stage outputs
2. **Generic Naming**: Names should describe WHAT the tool does, not WHICH phase it's for
3. **Reusability First**: Every skill/agent/command should work across multiple projects
4. **Stage-Informed**: Tools created after a stage are more accurate because they're informed by that stage's output
5. **Constitutional Compliance**: Every stage has a validator to ensure compliance

---

## 🚀 Immediate Next Steps for Current Project

Based on where we are now:

### ✅ Completed:
- [x] Constitution updated to v2.2.0
- [x] Meta-skills exist
- [x] Tech stack is constitutional (Next.js 16 + Better Auth + FastAPI + SQLModel + Neon)

### 📋 Next Actions:

**NOW - Before Spec** (Focus: BUSINESS requirements):
- [ ] Review Hackathon Phase 2 requirements (already clear from hackathon doc)
- [ ] Skip creating `requirements-clarifier` (requirements are clear)
- [ ] Write Phase 2 specification using `/sp.specify`
  - Focus on WHAT users need
  - Define user stories and acceptance criteria
  - Keep it tech-agnostic (no "how to implement" details)

**AFTER Spec, Before Plan** (Focus: TECHNICAL approach):
- [ ] Create `integration-pattern-finder` skill
- [ ] Find Better Auth + FastAPI JWT integration patterns
- [ ] Create `restful-api-designer` skill
- [ ] Design API endpoints from spec
- [ ] Create `database-schema-architect` subagent
- [ ] Design database schema
- [ ] Create `monorepo-architect` skill
- [ ] Design folder structure
- [ ] Use `/sp.plan` to create plan

---

**Version**: 1.1.0
**Last Updated**: 2026-01-15
**Change Log**:
- v1.1.0: Corrected Stage 1 focus (business requirements, not tech validation)
- v1.1.0: Moved tech validation to Stage 2 (after spec, before plan)
- v1.1.0: Added `integration-pattern-finder` skill
- v1.1.0: Clarified separation: Spec = WHAT (business), Plan = HOW (technical)
- v1.0.0: Initial version
**Maintained By**: Project team

---

*This workflow document is reusable across all full-stack SDD projects. Update skill names and tools as your reusability library grows.*
