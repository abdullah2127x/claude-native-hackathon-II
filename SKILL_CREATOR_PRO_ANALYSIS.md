# Skill Creator Pro - Analysis & Framework

**Analyzed**: 2026-01-16
**Purpose**: Understand how to create production-grade skills for TDD automation and test generation

---

## Executive Summary

The `skill-creator-pro` skill provides a comprehensive framework for creating high-quality, reusable skills that extend Claude's capabilities. It emphasizes:

1. **Domain Discovery FIRST** - Research before asking users
2. **Zero-Shot Expertise** - Embed domain knowledge in the skill
3. **Reusability** - Handle variations, not single requirements
4. **Progressive Disclosure** - Metadata → SKILL.md → References
5. **Type-Aware Creation** - Different patterns for different skill types

---

## Core Framework: 8-Step Creation Process

```
Metadata → Discovery → Requirements → Analyze → Embed → Structure → Implement → Validate
```

### Step 1: Get Skill Metadata (ASK 2 QUESTIONS ONLY)

**Ask immediately**:
1. **Skill type?** → Builder | Guide | Automation | Analyzer | Validator
2. **Domain/technology?** → What domain to research

**DO NOT ask yet**: Use cases, tech stack, constraints (comes after discovery)

### Step 2: Domain Discovery (AUTOMATIC - NO USER INPUT)

**Research the domain BEFORE asking anything else**:

| Discover | How | Example: TDD |
|----------|-----|--------------|
| **Core concepts** | Official docs, Context7 | Red-Green-Refactor, unit tests, integration tests |
| **Standards** | Search "[domain] standards" | Test coverage ≥70%, AAA pattern (Arrange-Act-Assert) |
| **Best practices** | Search "[domain] best practices 2025" | Test isolation, mocking patterns, describe blocks |
| **Anti-patterns** | Search "[domain] common mistakes" | Testing implementation, no test isolation, brittle tests |
| **Security** | Search "[domain] security" | Test data security, credential handling in tests |
| **Ecosystem** | Search "[domain] ecosystem tools" | Jest, pytest, RTL, MSW, coverage tools |

**Source Priority**:
1. Official documentation (most authoritative)
2. Library docs (Context7)
3. GitHub (real implementations)
4. Community (Stack Overflow - verify accuracy)
5. WebSearch (last resort)

**Sufficiency Check** (BEFORE asking user):
```
- [ ] Core concepts: Can I explain fundamentals?
- [ ] Best practices: Do I know recommended approaches?
- [ ] Anti-patterns: Do I know what to avoid?
- [ ] Security: Do I know security considerations?
- [ ] Ecosystem: Do I know related tools/options?
- [ ] Official sources: Do I have authoritative references?

If ANY gap → Research more (don't ask user for domain knowledge)
Only if CANNOT discover (proprietary) → Ask user
```

### Step 3: Get User Requirements (ASK ABOUT THEIR CONTEXT)

**Ask about USER'S specific needs** (NOT domain knowledge):

| ✅ Ask | ❌ Don't Ask |
|--------|--------------|
| "What's YOUR use case?" | "What is TDD?" |
| "What's YOUR tech stack?" | "What testing tools exist?" |
| "Any existing test templates?" | "How does Jest work?" |
| "Specific constraints?" | "What are best practices?" |

**Good vs Bad Examples**:
```
✅ "Are you using Jest, pytest, or another testing framework?"
   (Asking about THEIR environment)

❌ "What testing frameworks are available?"
   (Asking for domain knowledge we should discover)

✅ "What's your target coverage percentage?"
   (Asking about THEIR requirements)

❌ "What's a good coverage percentage?"
   (Asking for domain knowledge we should discover)
```

### Step 4: Analyze Domain

**Combine discovered knowledge + user requirements**:

**Procedural Knowledge (HOW)**:
- Step-by-step workflows
- Decision trees and branching logic
- Error handling sequences
- Validation procedures

**Domain Expertise (WHAT)**:
- Core concepts and terminology
- Best practices and patterns
- Anti-patterns to avoid
- Standards and compliance requirements

**Variability Analysis**:
| What VARIES (User Input) | What's CONSTANT (Domain Pattern) |
|--------------------------|-----------------------------------|
| Testing framework (Jest/pytest) | Red-Green-Refactor cycle |
| Test file locations | AAA pattern (Arrange-Act-Assert) |
| Coverage threshold | Test isolation principle |
| Component/function names | Mocking best practices |

### Step 5: Embed Domain Knowledge

**Take knowledge from Step 2 and EMBED into skill**:

**What Goes in `references/`**:

| Gathered Knowledge | Purpose in Skill |
|--------------------|------------------|
| Jest/pytest API docs | Enable correct test syntax |
| TDD best practices | Guide quality decisions |
| Code examples (AAA pattern) | Provide reference patterns |
| Anti-patterns (brittle tests) | Prevent common mistakes |
| Coverage tools usage | Support quality verification |

**Structure `references/` based on domain needs**:
```
references/
├── jest-patterns.md          # Jest-specific test patterns
├── pytest-patterns.md        # pytest-specific test patterns
├── react-testing-library.md  # RTL component testing
├── tdd-best-practices.md     # Red-Green-Refactor guidance
├── mocking-strategies.md     # MSW, jest.mock(), pytest fixtures
└── coverage-requirements.md  # Coverage thresholds and reporting
```

**When to Generate `scripts/`**:

Generate scripts when domain requires **deterministic, executable procedures**:

| Domain Need | Example Scripts |
|-------------|-----------------|
| Test execution | `run_tests.sh` (run Jest/pytest with coverage) |
| Test verification | `verify_red_phase.sh` (ensure tests fail) |
| Coverage checking | `check_coverage.sh` (verify ≥70%) |

**When to Generate `assets/`**:

Generate assets when domain requires **exact templates or boilerplate**:

| Domain Need | Example Assets |
|-------------|----------------|
| Test templates | `component.test.tsx`, `test_api.py` |
| Mock templates | `msw-handler.ts`, `pytest-fixture.py` |
| Config templates | `jest.config.ts`, `pytest.ini` |

### Step 6: Initialize Structure

```bash
skill-name/
├── SKILL.md              # Main skill definition (<500 lines)
├── references/           # Domain expertise (structured per domain)
├── scripts/              # Executable procedures (optional)
└── assets/               # Templates/boilerplate (optional)
```

### Step 7: Implement by Type

**For Builder Skills** (like our TDD/test-generator):

Required sections:
1. **Before Implementation** - Context gathering
2. **Required Clarifications** - Critical questions before building
3. **Output Specification** - Define what artifact looks like
4. **Domain Standards** - Must follow + Must avoid
5. **Output Checklist** - Verification criteria

### Step 8: Validate

**Quality Checklist**:
```
Domain Discovery:
- [ ] Core concepts discovered and understood
- [ ] Best practices from authentic sources
- [ ] Anti-patterns documented
- [ ] Security considerations covered
- [ ] Official documentation linked
- [ ] User NOT asked for domain knowledge

Frontmatter:
- [ ] name: lowercase, hyphens, ≤64 chars, matches directory
- [ ] description: [What]+[When], ≤1024 chars, clear triggers
- [ ] allowed-tools: Set if restricted access needed

Structure:
- [ ] SKILL.md <500 lines
- [ ] Progressive disclosure (details in references/)

Knowledge Coverage:
- [ ] Procedural (HOW): Workflows, decision trees, error handling
- [ ] Domain (WHAT): Concepts, best practices, anti-patterns

Zero-Shot Implementation:
- [ ] Includes "Before Implementation" section
- [ ] Gathers runtime context (codebase, conversation, user guidelines)
- [ ] Domain expertise embedded in references/
- [ ] Only asks user for THEIR requirements

Reusability:
- [ ] Handles variations (not requirement-specific)
- [ ] Clarifications capture variable elements
- [ ] Constants encoded (domain patterns)
```

---

## Skill Anatomy

### SKILL.md Structure

```markdown
---
name: skill-name                    # Required
description: |                      # Required, ≤1024 chars
  [What] Capability statement.
  [When] Use when users ask to <triggers>.
allowed-tools: Read, Grep, Glob     # Optional: restrict tools
model: claude-sonnet-4-20250514     # Optional: model override
---

# Skill Name

Brief one-line description.

## What This Skill Does
- Capability 1
- Capability 2

## What This Skill Does NOT Do
- Exclusion 1
- Exclusion 2

---

## Before Implementation

Gather context to ensure successful implementation:

| Source | Gather |
|--------|--------|
| **Codebase** | Existing structure, patterns, conventions |
| **Conversation** | User's specific requirements |
| **Skill References** | Domain patterns from `references/` |
| **User Guidelines** | Project-specific conventions |

---

## Required Clarifications

Ask about USER'S context (not domain knowledge):

1. **Use case**: "What's YOUR specific need?"
2. **Constraints**: "Any specific requirements?"

---

## Workflow

1. Step one
2. Step two
3. Step three

---

## Output Checklist

Before delivering, verify:
- [ ] Requirement 1
- [ ] Requirement 2
```

### Frontmatter Specification

| Field | Required | Constraints | Purpose |
|-------|----------|-------------|---------|
| `name` | Yes | Lowercase, numbers, hyphens; ≤64 chars; match directory | Skill identifier |
| `description` | Yes | ≤1024 chars; [What] + [When] | Trigger matching |
| `allowed-tools` | No | Comma-separated tool names | Restrict tool access |
| `model` | No | Valid model ID | Override model |

**Description Format**: `[What it does] + [When to use/triggers]`

**Good Example**:
```yaml
description: |
  Automate Test-Driven Development workflow with Red-Green-Refactor cycle.
  This skill should be used when implementing TDD, writing tests first,
  following Red-Green-Refactor cycle, or ensuring test coverage.
```

**Bad Example**:
```yaml
description: TDD helper
```

---

## Skill Types

### Overview

| Type | Purpose | Key Output | Our Skills |
|------|---------|------------|------------|
| **Builder** | Create artifacts | Code, docs, configs | test-first-generator |
| **Automation** | Execute workflows | Processed files, reports | tdd-red-green-refactor |
| **Guide** | Provide instructions | Step-by-step workflows | - |
| **Analyzer** | Extract insights | Reports, summaries | - |
| **Validator** | Enforce quality | Pass/fail assessments | - |

### Type Selection

```
What does the skill primarily do?

Creates NEW artifacts (code, tests)?
  → Builder (test-first-generator)

Executes multi-step PROCESSES automatically?
  → Automation (tdd-red-green-refactor)

Teaches HOW to do something?
  → Guide

EXTRACTS information or provides ANALYSIS?
  → Analyzer

CHECKS quality or ENFORCES standards?
  → Validator
```

### Builder Skills (test-first-generator)

**Purpose**: Generate test code, components, configurations

**Required sections**:
```markdown
## Before Implementation
[Context gathering table]

## Required Clarifications
1. **Test type**: "Component test, unit test, or integration test?"
2. **Framework**: "Jest or pytest?"
3. **File location**: "Where to create test file?"

## Output Specification
[Define what test file looks like]

## Domain Standards
### Must Follow
- [ ] AAA pattern (Arrange-Act-Assert)
- [ ] Test isolation (no shared state)
- [ ] Descriptive test names

### Must Avoid
- Testing implementation details
- Brittle selectors
- No assertions

## Output Checklist
- [ ] Test file created with correct syntax
- [ ] Tests follow AAA pattern
- [ ] Descriptive test names
```

### Automation Skills (tdd-red-green-refactor)

**Purpose**: Execute TDD workflow, run tests, verify coverage

**Required sections**:
```markdown
## Before Implementation
[Context gathering table]

## Available Scripts
| Script | Purpose | Usage |
|--------|---------|-------|
| `scripts/run_red_phase.sh` | Verify tests fail | `./run_red_phase.sh` |
| `scripts/run_green_phase.sh` | Verify tests pass | `./run_green_phase.sh` |

## Dependencies
- Testing framework (Jest/pytest)
- Coverage tools

## Error Handling
| Error | Recovery |
|-------|----------|
| Tests pass in RED phase | Alert user, review test |
| Coverage < threshold | Generate additional tests |

## Input/Output
- **Input**: Test files, implementation files
- **Output**: Test results, coverage report
```

---

## Core Principles

### 1. Reusable Intelligence, Not Requirement-Specific

Skills must handle **VARIATIONS**, not single requirements:

```
❌ Bad: "Create Jest test for SignUpForm component"
   (Requirement-specific, only works for SignUpForm)

✅ Good: "Generate component tests adaptable to any React component"
   (Reusable, handles variations)

❌ Bad: "Run TDD for task creation feature"
   (Requirement-specific, only works for tasks)

✅ Good: "Execute TDD workflow for any feature with Red-Green-Refactor"
   (Reusable, handles any feature)
```

**Identify what VARIES vs what's CONSTANT**:

| Varies (Capture in Clarifications) | Constant (Embed in Skill) |
|------------------------------------|---------------------------|
| Component name | AAA pattern structure |
| Test framework (Jest/pytest) | Red-Green-Refactor cycle |
| File locations | Test isolation principle |
| Coverage threshold | Mocking best practices |

### 2. Concise is Key

Context window is a public good (~1,500+ tokens per skill activation):

- Challenge each sentence: "Does Claude really need this?"
- Prefer examples over verbose explanations
- Move details to `references/`

**Good**:
```markdown
## AAA Pattern

All tests must follow Arrange-Act-Assert:

```typescript
test('should submit form', () => {
  // Arrange
  const onSubmit = jest.fn();
  render(<Form onSubmit={onSubmit} />);

  // Act
  userEvent.click(screen.getByRole('button'));

  // Assert
  expect(onSubmit).toHaveBeenCalled();
});
```
```

**Bad**:
```markdown
## AAA Pattern

The AAA pattern is a testing methodology that stands for Arrange, Act, and Assert.
It's widely used in unit testing to structure tests in a clear and readable way.
The Arrange phase sets up the test conditions. The Act phase executes the code
under test. The Assert phase verifies the expected outcome. This pattern makes
tests easier to understand and maintain because...

[15 more paragraphs of explanation]
```

### 3. Appropriate Freedom

Match specificity to task fragility:

| Freedom Level | When to Use | Example |
|---------------|-------------|---------|
| **High** | Multiple approaches valid | "Choose test style (describe/it vs test)" |
| **Medium** | Preferred pattern exists | Provide pseudocode with parameters |
| **Low** | Operations are fragile | Exact test execution script |

### 4. Progressive Disclosure

Three-level loading system:

1. **Metadata** (~100 tokens) - Always in context
   - `description` field (≤1024 chars)
   - Triggers skill activation

2. **SKILL.md body** (<500 lines) - When skill triggers
   - Workflows, clarifications, checklists
   - Quick reference patterns

3. **References** (unlimited) - Loaded as needed
   - Detailed patterns, examples, API docs
   - Claude reads when implementation needs it

---

## Application to Our Two Skills

### Skill 1: `tdd-red-green-refactor`

**Type**: Automation (executes multi-step TDD workflow)

**Domain Discovery Needed**:
- [ ] TDD cycle (Red-Green-Refactor)
- [ ] Test execution (Jest/pytest)
- [ ] Coverage verification (≥70%)
- [ ] Git commit patterns for TDD phases
- [ ] Best practices for each phase

**Structure**:
```
tdd-red-green-refactor/
├── SKILL.md
│   ├── Workflow: RED → GREEN → REFACTOR
│   ├── Error handling: Tests pass in RED, tests fail in GREEN
│   ├── Git integration: Commit after each phase
│   └── Coverage verification
├── references/
│   ├── red-phase-patterns.md     # Writing failing tests
│   ├── green-phase-patterns.md   # Making tests pass
│   ├── refactor-patterns.md      # Code quality improvements
│   └── tdd-best-practices.md     # Domain expertise
└── scripts/
    ├── verify_red.sh             # Ensure tests fail
    ├── verify_green.sh           # Ensure tests pass
    └── check_coverage.sh         # Verify ≥70%
```

**Clarifications to Ask**:
1. "Which user story to implement? (US1-US6)"
2. "Testing framework: Jest (frontend) or pytest (backend)?"
3. "Target coverage threshold? (default: 70%)"

**Workflow**:
```
1. RED Phase:
   - User identifies feature (e.g., US1)
   - Read tasks.md for test tasks (T038-T040)
   - Generate failing tests
   - Run: verify_red.sh
   - Commit: "test(US1): add failing tests"

2. GREEN Phase:
   - Read tasks.md for implementation tasks (T041-T043)
   - Generate implementation
   - Run: verify_green.sh
   - Commit: "feat(US1): implement feature, tests passing"

3. REFACTOR Phase:
   - Identify code smells
   - Apply refactoring patterns
   - Run: verify_green.sh (ensure still pass)
   - Commit: "refactor(US1): improve code quality"

4. Coverage Check:
   - Run: check_coverage.sh
   - Report: Coverage percentage
```

---

### Skill 2: `test-first-generator`

**Type**: Builder (creates test artifacts)

**Domain Discovery Needed**:
- [ ] Jest syntax and patterns
- [ ] pytest syntax and patterns
- [ ] React Testing Library patterns
- [ ] AAA pattern (Arrange-Act-Assert)
- [ ] Test isolation techniques
- [ ] Mocking patterns (MSW, jest.mock, pytest fixtures)

**Structure**:
```
test-first-generator/
├── SKILL.md
│   ├── Clarifications: Component/function details
│   ├── Output spec: Test file structure
│   ├── Standards: AAA pattern, isolation, naming
│   └── Checklist: Verification criteria
├── references/
│   ├── jest-patterns.md              # Jest API and patterns
│   ├── pytest-patterns.md            # pytest API and patterns
│   ├── react-testing-library.md      # RTL component testing
│   ├── aaa-pattern.md                # Arrange-Act-Assert
│   └── mocking-strategies.md         # MSW, jest.mock, fixtures
└── assets/
    ├── templates/
    │   ├── component.test.tsx        # React component test
    │   ├── hook.test.ts              # Custom hook test
    │   ├── api.test.tsx              # API integration test
    │   ├── test_model.py             # SQLModel test
    │   ├── test_crud.py              # CRUD unit test
    │   └── test_api.py               # FastAPI endpoint test
    └── examples/
        ├── simple-component.test.tsx  # Basic example
        └── complex-api.test.py        # Advanced example
```

**Clarifications to Ask**:
1. "Test type: Component, hook, API endpoint, model, or CRUD?"
2. "Framework: Jest (frontend) or pytest (backend)?"
3. "Subject under test: Component/function name and signature?"
4. "Expected behavior: What should it do?"
5. "File location: Where to create test file?"

**Output Specification**:
```typescript
// Frontend: component.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { {{COMPONENT_NAME}} } from './{{COMPONENT_NAME}}';

describe('{{COMPONENT_NAME}}', () => {
  it('should {{TEST_DESCRIPTION}}', async () => {
    // Arrange
    {{SETUP}}

    // Act
    {{ACTION}}

    // Assert
    {{ASSERTIONS}}
  });
});
```

```python
# Backend: test_{{MODULE}}.py
import pytest
from {{MODULE}} import {{FUNCTION}}

class Test{{Function}}:
    def test_{{behavior}}(self):
        # Arrange
        {{SETUP}}

        # Act
        {{ACTION}}

        # Assert
        {{ASSERTIONS}}
```

**Domain Standards**:

Must Follow:
- [ ] AAA pattern (Arrange-Act-Assert)
- [ ] Test isolation (no shared state)
- [ ] Descriptive test names (should_behaviorWhen_condition)
- [ ] One assertion per concept
- [ ] Mock external dependencies

Must Avoid:
- Testing implementation details
- Brittle selectors (prefer role/label)
- No assertions in tests
- Shared test state
- Testing library internals

---

## Implementation Strategy

### Option A: Use skill-creator-pro to Generate Both

**Advantages**:
- Follows proven patterns
- Domain discovery built-in
- Quality validation
- Production-grade output

**Process**:
```bash
# Create Skill 1
/skill-creator-pro

Type: Automation
Domain: Test-Driven Development (TDD)
Use case: Execute Red-Green-Refactor workflow for 001-todo-web-crud
Tech stack: Jest, pytest, Git
Constraints: 70% coverage minimum, commit after each phase

# Create Skill 2
/skill-creator-pro

Type: Builder
Domain: Test Code Generation (Jest, pytest)
Use case: Generate test files for React components and FastAPI endpoints
Tech stack: Jest, React Testing Library, pytest
Constraints: AAA pattern, test isolation, descriptive names
```

### Option B: Manual Creation Following Framework

**Advantages**:
- Direct control
- Customize for exact needs
- Learn framework deeply

**Process**:
```
For each skill:

1. Domain Discovery (automatic):
   - Research TDD best practices
   - Study Jest/pytest documentation
   - Gather React Testing Library patterns
   - Identify anti-patterns

2. Structure:
   - Create directory
   - Write SKILL.md (<500 lines)
   - Create references/ with embedded knowledge
   - Add scripts/ for automation
   - Add assets/ for templates

3. Validate:
   - Check against quality checklist
   - Test with sample tasks
   - Verify zero-shot capability
```

---

## Key Takeaways

### 1. Domain Expertise IN the Skill

**The skill IS the domain expert**:
- Research domain BEFORE asking user
- Embed discovered knowledge in `references/`
- User provides THEIR requirements, not domain knowledge
- Skill implements zero-shot (no runtime discovery needed)

### 2. Reusability > Specificity

**Handle variations, not single cases**:
- Identify what varies (user input) vs constant (domain pattern)
- Capture variables in clarifications
- Encode constants in skill logic

### 3. Progressive Disclosure

**Three-level system**:
- Metadata: Triggers (always loaded)
- SKILL.md: Workflows (<500 lines)
- References: Details (loaded as needed)

### 4. Type-Aware Creation

**Different patterns for different types**:
- Builder: Clarifications → Output Spec → Standards → Checklist
- Automation: Scripts → Dependencies → Error Handling → I/O

### 5. Quality Checklist

**Before delivering**:
- [ ] Domain discovery complete (not asking user for domain knowledge)
- [ ] Frontmatter correct (name, description, tools)
- [ ] Structure valid (SKILL.md <500 lines)
- [ ] Knowledge embedded (procedural + domain in references/)
- [ ] Zero-shot capable (all context gathered at runtime)
- [ ] Reusable (handles variations)

---

## Next Steps

### Recommended Approach: Use skill-creator-pro

**Why**:
1. Automatic domain discovery (saves 2-3 hours)
2. Quality validation built-in
3. Production-grade output
4. Follows proven patterns

**How**:
```bash
# Step 1: Create tdd-red-green-refactor
/skill-creator-pro

# Step 2: Create test-first-generator
/skill-creator-pro

# Step 3: Test both skills
/tdd-red-green-refactor    # Execute TDD for US1
/test-first-generator      # Generate test for SignUpForm
```

### Alternative: Manual Creation

**If you prefer direct control**:
1. Follow 8-step creation process
2. Use templates from this analysis
3. Validate against quality checklist
4. Test with real tasks from tasks.md

---

## Reference Files Read

- `.claude/skills/skill-creator-pro/SKILL.md`
- `.claude/skills/skill-creator-pro/references/skill-patterns.md`
- `.claude/skills/skill-creator-pro/references/creation-workflow.md`

**Next**: Review other reference files for complete patterns:
- `reusability-patterns.md` - Procedural+domain knowledge
- `quality-patterns.md` - Clarifications and enforcement
- `technical-patterns.md` - Error handling and security
- `workflows.md` - Sequential and conditional workflows
- `output-patterns.md` - Template and example patterns
