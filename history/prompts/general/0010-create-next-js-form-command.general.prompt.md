---
id: 0010
title: Create Next.js form command
stage: general
date: 2026-01-11
surface: command-creation
model: Claude Sonnet 4.5
feature: none
branch: 001-todo-crud
user: AbdullahQureshi
command: create-command
labels: [command, nextjs, form, react-hook-form, zod, shadcn, validation]
links:
  spec:
  ticket:
  adr:
  pr:
files:
  - .claude/commands/nextjs.form.md
tests:
  - type: manual
    status: passed
    description: Command file created and validated
---

## Prompt

Create a slash command at .claude/commands/nextjs.form.md that generates a Next.js form component with react-hook-form, Zod validation, and shadcn/ui components. It should accept form name and comma-separated field names as arguments (e.g., /nextjs.form SignupForm email,password). Create the form component in components/forms/, a Server Action in app/actions/, and tests. Use $1 for form name and $ARGUMENTS for fields. Include proper frontmatter with description, argument-hint, and allowed-tools.

## Response snapshot

Created a comprehensive slash command file for generating Next.js forms with react-hook-form, Zod validation, and shadcn/ui components. The command creates:
- Form component in components/forms/{form-name}.tsx
- Server Action in app/actions/{form-name}-action.ts
- Tests in tests/forms/{form-name}.test.tsx
- Zod validation schema based on field names
- Complete success criteria checklist with 15 validation points

## Outcome

- ✅ Impact: Next.js form generation command created with comprehensive implementation guide
- 🧪 Tests: Manual validation passed
- 📁 Files: 1 file created at .claude/commands/nextjs.form.md
- 🔁 Next prompts: Ready for implementation when needed
- 🧠 Reflection: Command provides complete workflow for creating forms with proper validation and testing

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
