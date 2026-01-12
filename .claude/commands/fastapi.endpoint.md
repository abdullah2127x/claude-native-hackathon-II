---
description: Create complete FastAPI endpoint with SQLModel, validation, and tests
argument-hint: [resource] [method]
allowed-tools: Read, Write, Edit, Bash
---

# /fastapi.endpoint

Creates a complete FastAPI endpoint following project patterns.

## Usage
```
/fastapi.endpoint [resource] [method]
```

**Example:**
```
/fastapi.endpoint task POST
/fastapi.endpoint user GET
```

## Workflow

### 1. Create SQLModel Schemas
**File:** `backend/app/models/$1.py`

Create the following schemas:
- `$1Base` - Shared fields (title, description, etc.)
- `$1` - Database model with `table=True` and `id` field
- `$1Create` - For POST requests (excludes id, timestamps)
- `$1Read` - For responses (includes all fields)
- `$1Update` - For PUT/PATCH requests (all fields optional)

### 2. Create API Endpoint
**File:** `backend/app/routes/$1.py`

Implement the `$2` method handler with:
- Import models and dependencies
- Use `async def` for handler
- Add database session dependency: `session: Session = Depends(get_session)`
- Implement proper validation with Pydantic
- Use `HTTPException` for errors with appropriate status codes
- Return properly typed responses using `$1Read` model
- Add user_id filtering for multi-user support

### 3. Register Router
**File:** `backend/app/main.py`

Add router import and registration:
```python
from app.routes.$1 import router as $1_router
app.include_router($1_router, prefix="/api", tags=["$1s"])
```

### 4. Create Tests
**File:** `backend/tests/test_$1.py`

Create tests for:
- Success case (201 for POST, 200 for GET/PUT/PATCH/DELETE)
- Validation errors (400)
- Not found errors (404)
- Unauthorized access (401)
- User isolation (each user sees only their data)

## Success Criteria

- [ ] All inputs validated with Pydantic
- [ ] Error responses include descriptive messages
- [ ] Database session properly managed (no leaks)
- [ ] Status codes correct (200, 201, 400, 404, 401)
- [ ] Response models properly typed
- [ ] Tests pass with >70% coverage
- [ ] Follows fastapi-sqlmodel-patterns skill
- [ ] User isolation enforced (user_id filtering)