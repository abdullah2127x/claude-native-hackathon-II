# Setup Guide - Fixing Common Errors

This guide helps you resolve the errors documented in `error.md`.

## Errors Fixed in Latest Commit (94d5777)

### Error 1: Backend - Table 'user' Not Found

**Error Message:**
```
sqlalchemy.exc.NoReferencedTableError: Foreign key associated with column 'task.user_id' could not find table 'user'
```

**Root Cause:**
The User and Task models weren't being imported before SQLModel tried to create tables, so SQLModel didn't know about the relationships.

**Fix:**
✅ Fixed in `backend/src/db/database.py` by importing both models before creating tables.

**No action required** - this is already fixed in the codebase.

---

### Error 2: Frontend - Module 'better-auth/react' Not Found

**Error Message:**
```
Module not found: Can't resolve 'better-auth/react'
```

**Root Cause:**
The `better-auth` package and other dependencies were missing from `package.json`.

**Fix:**
✅ Added all missing dependencies to `frontend/package.json`:
- better-auth
- react-hook-form
- @hookform/resolvers
- zod
- axios
- Testing libraries (jest, testing-library, msw)

**ACTION REQUIRED:**

```bash
cd frontend
npm install
```

This will install all the newly added dependencies. After installation:
- better-auth and all other packages will be available
- The frontend server will start without errors

---

## First Time Setup (Complete Process)

If you're setting up the project for the first time, follow these steps:

### 1. Clone and Setup Environment

```bash
# Clone repository
git clone <repository-url>
cd todo-in-memory-console-app

# Create environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

### 2. Configure Environment Variables

**Edit `backend/.env`:**
```env
DATABASE_URL=postgresql://user:password@host:port/database
BETTER_AUTH_URL=http://localhost:3000
CORS_ORIGINS=["http://localhost:3000"]
```

**Edit `frontend/.env.local`:**
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000
DATABASE_URL=postgresql://user:password@host:port/database
BETTER_AUTH_SECRET=<generate-with-openssl-rand-base64-32>
```

### 3. Install Backend Dependencies

```bash
cd backend
uv sync
```

### 4. Install Frontend Dependencies

```bash
cd frontend
npm install
```

This step will install all packages including:
- better-auth
- react-hook-form
- zod
- axios
- All testing libraries

### 5. Start the Servers

**Terminal 1 - Backend:**
```bash
cd backend
uv run uvicorn src.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 6. Access the Application

- Frontend: http://localhost:3000
- Backend API Docs: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

---

## Troubleshooting

### Backend still can't find 'user' table

1. Make sure you've pulled the latest changes:
   ```bash
   git pull origin 001-todo-web-crud
   ```

2. Check that `backend/src/db/database.py` contains:
   ```python
   from src.models.user import User  # noqa: F401
   from src.models.task import Task  # noqa: F401
   ```

3. Delete the SQLite database if using SQLite:
   ```bash
   rm backend/test.db
   ```

4. Restart the backend server.

### Frontend still can't find 'better-auth/react'

1. Delete node_modules and package-lock.json:
   ```bash
   cd frontend
   rm -rf node_modules package-lock.json
   ```

2. Reinstall dependencies:
   ```bash
   npm install
   ```

3. Check that `better-auth` appears in `frontend/package.json`:
   ```json
   "dependencies": {
     "better-auth": "^1.2.0",
     ...
   }
   ```

4. Verify installation:
   ```bash
   npm list better-auth
   ```

### Database Connection Issues

If you're having trouble connecting to PostgreSQL:

1. **Using Neon Serverless (Recommended):**
   - Sign up at https://neon.tech
   - Create a new project
   - Copy the connection string
   - Update both `backend/.env` and `frontend/.env.local`

2. **Using Local PostgreSQL:**
   ```bash
   # Start PostgreSQL
   # Create database
   createdb todo_app

   # Update .env files with:
   DATABASE_URL=postgresql://localhost:5432/todo_app
   ```

3. **Using SQLite (Development Only):**
   ```env
   # In backend/.env
   DATABASE_URL=sqlite:///./test.db
   ```
   Note: Better Auth requires PostgreSQL for production.

---

## Verification

After setup, verify everything works:

1. **Backend Health Check:**
   ```bash
   curl http://localhost:8000/health
   ```
   Should return: `{"status": "healthy"}`

2. **Frontend Loads:**
   Open http://localhost:3000 - you should see the sign-up page

3. **Create Test Account:**
   - Sign up with test credentials
   - You should be redirected to the dashboard

4. **Create Test Task:**
   - Fill in the "Create New Task" form
   - Task should appear in the list below

If all steps work, setup is complete! ✅

---

## Still Having Issues?

1. Check the error.md file for documented errors
2. Review the main README.md for complete documentation
3. Check backend logs for detailed error messages
4. Check browser console for frontend errors

## References

- Main README: `README.md`
- Backend Guide: `backend/CLAUDE.md`
- Frontend Guide: `frontend/CLAUDE.md`
- Constitution: `.specify/memory/constitution.md`
