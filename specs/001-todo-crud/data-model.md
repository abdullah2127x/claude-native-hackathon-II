# Data Model: Todo CRUD Operations

## Overview
This document defines the data model for the Todo CRUD Operations feature, including entity definitions, relationships, and validation rules.

## Entity Definitions

### User Entity
**Note**: Managed by Better Auth, but referenced here for relationship mapping

- **id**: UUID (Primary Key)
- **email**: String (required, unique, max 255 chars, valid email format)
- **username**: String (required, unique, 3-30 chars)
- **password**: String (hashed, required, min 8 chars with complexity)
- **created_at**: DateTime (auto-generated)
- **updated_at**: DateTime (auto-generated)
- **is_active**: Boolean (default: true)

### Todo Entity
- **id**: Integer (Primary Key, auto-increment)
- **user_id**: UUID (Foreign Key to User.id, required)
- **title**: String (required, 1-200 characters)
- **description**: String (optional, max 1000 characters)
- **completed**: Boolean (default: false)
- **created_at**: DateTime (auto-generated)
- **updated_at**: DateTime (auto-generated)

## Validation Rules

### User Validation
- Email must be valid email format
- Email must be unique across all users
- Username must be 3-30 characters (alphanumeric + underscore/hyphen)
- Username must be unique across all users
- Password must be at least 8 characters with complexity requirements
- User must be active to access system

### Todo Validation
- Title is required and must be 1-200 characters
- Description is optional and can be up to 1000 characters
- User_id must reference an existing, active user
- Only the owner can modify or delete their todos
- Completed status is a boolean value (true/false)

## Relationships

### User to Todo (One-to-Many)
- One user can have many todos
- Foreign key constraint: Todo.user_id → User.id
- Cascade delete: If user is deleted, all their todos are deleted
- Todos are filtered by user_id for data isolation

## Database Schema

```sql
-- Users table (managed by Better Auth)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- Todos table
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_todos_user_id ON todos(user_id);
CREATE INDEX idx_todos_completed ON todos(completed);
CREATE INDEX idx_todos_user_completed ON todos(user_id, completed);
```

## State Transitions

### Todo State Transitions
- **Incomplete → Complete**: When user marks todo as complete
- **Complete → Incomplete**: When user marks todo as incomplete

### Todo Lifecycle
1. **Created**: Todo is created with completed = false
2. **Active**: Todo exists and can be viewed/modified by owner
3. **Completed**: Todo is marked as completed by user
4. **Deleted**: Todo is removed by user or cascade deleted with user

## Security Considerations

### Data Isolation
- All queries must be filtered by user_id to ensure data isolation
- API endpoints must validate that requesting user owns the todo
- Direct database access must enforce user_id constraints

### Access Controls
- Users can only read, update, or delete their own todos
- Users cannot access todos belonging to other users
- Admin functionality (if needed) must be explicitly defined and secured

## Audit Trail

### Required Auditing
- Creation timestamp (created_at) for all todos
- Update timestamp (updated_at) for all modifications
- User identification (user_id) for ownership tracking
- Modification history may be implemented as needed