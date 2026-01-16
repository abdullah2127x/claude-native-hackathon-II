# Data Model: Full-Stack Todo Web Application

**Feature**: 001-todo-web-crud
**Date**: 2026-01-16
**Database**: PostgreSQL (Neon Serverless)
**ORM**: SQLModel

---

## Entity Relationship Diagram

```
┌─────────────────────────────────┐
│            user                 │  (Better Auth managed)
├─────────────────────────────────┤
│ id          : UUID    [PK]     │
│ email       : VARCHAR [UNIQUE] │
│ name        : VARCHAR          │
│ emailVerified: BOOLEAN         │
│ image       : VARCHAR [NULL]   │
│ createdAt   : TIMESTAMP        │
│ updatedAt   : TIMESTAMP        │
└────────────────┬────────────────┘
                 │
                 │ 1:N
                 │
┌────────────────▼────────────────┐
│            task                 │
├─────────────────────────────────┤
│ id          : UUID    [PK]     │
│ user_id     : UUID    [FK, IX] │
│ title       : VARCHAR(200)     │
│ description : VARCHAR(2000)    │
│ completed   : BOOLEAN          │
│ created_at  : TIMESTAMP        │
│ updated_at  : TIMESTAMP [NULL] │
└─────────────────────────────────┘
```

---

## Table: user (Better Auth Managed)

**IMPORTANT**: This table is created and managed by Better Auth. Do NOT create or modify via SQLModel migrations. Use as read-only reference.

| Column | Type | Nullable | Default | Constraints |
|--------|------|----------|---------|-------------|
| id | UUID | No | - | PRIMARY KEY |
| email | VARCHAR | No | - | UNIQUE, INDEX |
| name | VARCHAR | No | - | - |
| emailVerified | BOOLEAN | No | false | - |
| image | VARCHAR | Yes | NULL | - |
| createdAt | TIMESTAMP | No | now() | - |
| updatedAt | TIMESTAMP | No | now() | - |

### SQLModel Definition (Read-Only Reference)

```python
# models/user.py
from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional

class User(SQLModel, table=True):
    """
    User model - MANAGED BY BETTER AUTH.
    This is a read-only reference for foreign key relationships.
    DO NOT create migrations for this table.
    """
    __tablename__ = "user"

    id: str = Field(primary_key=True)
    email: str = Field(unique=True, index=True)
    name: str
    email_verified: bool = Field(default=False, alias="emailVerified")
    image: Optional[str] = Field(default=None)
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")
```

---

## Table: task

| Column | Type | Nullable | Default | Constraints |
|--------|------|----------|---------|-------------|
| id | UUID | No | gen_random_uuid() | PRIMARY KEY |
| user_id | UUID | No | - | FOREIGN KEY → user(id), INDEX |
| title | VARCHAR(200) | No | - | - |
| description | VARCHAR(2000) | Yes | NULL | - |
| completed | BOOLEAN | No | false | - |
| created_at | TIMESTAMP | No | now() | - |
| updated_at | TIMESTAMP | Yes | NULL | - |

### Indexes

| Name | Columns | Type | Purpose |
|------|---------|------|---------|
| pk_task | id | B-TREE | Primary key |
| ix_task_user_id | user_id | B-TREE | User filtering (required for isolation) |
| ix_task_user_created | user_id, created_at DESC | B-TREE | Sorted task list query |

### Foreign Keys

| Column | References | On Delete | On Update |
|--------|------------|-----------|-----------|
| user_id | user(id) | CASCADE | CASCADE |

### SQLModel Definition

```python
# models/task.py
from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional
import uuid

class TaskBase(SQLModel):
    """Base schema with shared fields"""
    title: str = Field(max_length=200)
    description: Optional[str] = Field(default=None, max_length=2000)

class Task(TaskBase, table=True):
    """Task database model"""
    __tablename__ = "task"

    id: str = Field(
        default_factory=lambda: str(uuid.uuid4()),
        primary_key=True,
    )
    user_id: str = Field(foreign_key="user.id", index=True)
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = Field(default=None)
```

---

## Pydantic Schemas

```python
# schemas/task.py
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class TaskCreate(BaseModel):
    """Request schema for creating a task"""
    title: str = Field(min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=2000)

class TaskUpdate(BaseModel):
    """Request schema for updating a task (all fields optional)"""
    title: Optional[str] = Field(default=None, min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=2000)
    completed: Optional[bool] = Field(default=None)

class TaskRead(BaseModel):
    """Response schema for reading a task"""
    id: str
    user_id: str
    title: str
    description: Optional[str]
    completed: bool
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class TaskList(BaseModel):
    """Response schema for task list"""
    data: list[TaskRead]
    total: int
```

---

## Zod Schemas (Frontend)

```typescript
// lib/validations/task.ts
import { z } from "zod";

// Create task schema
export const taskCreateSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be 200 characters or less"),
  description: z
    .string()
    .max(2000, "Description must be 2000 characters or less")
    .optional()
    .nullable(),
});

export type TaskCreateInput = z.infer<typeof taskCreateSchema>;

// Update task schema
export const taskUpdateSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be 200 characters or less")
    .optional(),
  description: z
    .string()
    .max(2000, "Description must be 2000 characters or less")
    .optional()
    .nullable(),
  completed: z.boolean().optional(),
});

export type TaskUpdateInput = z.infer<typeof taskUpdateSchema>;

// Task response schema (for runtime validation)
export const taskSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  completed: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
});

export type Task = z.infer<typeof taskSchema>;

// Task list response schema
export const taskListSchema = z.object({
  data: z.array(taskSchema),
  total: z.number(),
});

export type TaskListResponse = z.infer<typeof taskListSchema>;
```

---

## Auth Schemas (Frontend)

```typescript
// lib/validations/auth.ts
import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or less"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/\d/, "Password must contain at least one number"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
});

export type SignInInput = z.infer<typeof signInSchema>;
```

---

## Validation Rules Summary

| Field | Rule | Spec Reference |
|-------|------|----------------|
| Password | Min 8 chars, at least 1 number | FR-003 |
| Task title | Required, max 200 chars | FR-007 |
| Task description | Optional, max 2000 chars | FR-008 |
| Email | Valid email format | FR-002 |

---

## Database Migration Notes

1. **Better Auth tables**: Created automatically by Better Auth CLI
   ```bash
   npx @better-auth/cli migrate
   ```

2. **Task table**: Created by SQLModel
   ```python
   # In FastAPI startup
   SQLModel.metadata.create_all(engine)
   ```

3. **Index creation**: Automatic from SQLModel Field definitions

4. **Foreign key**: Ensure `user` table exists before creating `task`
