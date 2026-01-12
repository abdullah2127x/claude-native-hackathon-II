---
description: Generate Next.js form with react-hook-form, Zod validation, and shadcn/ui components
argument-hint: [FormName] [field1,field2,field3]
allowed-tools: Read, Write, Edit, Bash
---

# /nextjs.form

Creates a validated Next.js form component with Server Action.

## Usage
```
/nextjs.form [FormName] [fields]
```

**Examples:**
```
/nextjs.form SignupForm email,password,confirmPassword
/nextjs.form TodoForm title,description
```

## Workflow

### 1. Create Form Component
**File:** `components/forms/$1.tsx`

Create with:
- Import shadcn/ui components (Form, FormField, FormItem, FormLabel, FormControl, FormMessage, Input, Button)
- Import `useForm` from react-hook-form with `zodResolver`
- Create Zod schema based on `$ARGUMENTS` fields
- Implement form with shadcn Form components
- Add loading state during submission
- Display error messages with FormMessage
- Show success toast on completion
- Call Server Action on submit

### 2. Create Server Action
**File:** `app/actions/$1.ts` (lowercase filename)

Create with:
- `'use server'` directive
- Import and validate with Zod schema
- Implement business logic (database operations, API calls)
- Return typed response: `{ success: boolean, message?: string, error?: string }`
- Proper error handling with try-catch

### 3. Create Tests
**File:** `__tests__/components/$1.test.tsx`

Test:
- Form renders all fields
- Validation works (empty fields, invalid formats)
- Submission calls Server Action
- Loading state displays
- Success/error messages show

## Success Criteria

- [ ] Zod validates all `$ARGUMENTS` fields
- [ ] User-friendly error messages
- [ ] Loading state prevents double-submit
- [ ] Accessible (ARIA labels, keyboard navigation)
- [ ] Mobile responsive
- [ ] Follows shadcn-ui-patterns skill
- [ ] Server Action returns typed response
- [ ] Tests cover validation and submission