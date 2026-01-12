# Quickstart Guide: Todo CRUD Operations

## Overview
This guide provides a quick introduction to setting up and running the Todo CRUD Operations feature with authentication.

## Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.11+
- PostgreSQL (or Neon Serverless PostgreSQL account)
- Git

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install and use uv (required package manager)
# Create virtual environment with uv
uv venv

# Install dependencies using uv (mandatory)
uv sync

# Or install in development mode:
uv pip install -e .

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration
```

#### Backend Environment Variables
```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/todo_app

# Authentication Configuration
BETTER_AUTH_SECRET=your-super-secret-jwt-signing-key-here-make-it-long-and-random
BETTER_AUTH_URL=http://localhost:3000

# FastAPI Configuration
API_HOST=0.0.0.0
API_PORT=8000
API_LOG_LEVEL=info

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

#### Run Backend Migrations
```bash
# Run database migrations
alembic upgrade head

# Or create initial migration if needed
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

#### Start Backend Server
```bash
# Run the server with uv (mandatory approach)
uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
# or
yarn install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration
```

#### Frontend Environment Variables
```env
# Next.js Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000/v1

# Better Auth Configuration
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

#### Start Frontend Server
```bash
# Run the development server
npm run dev
# or
yarn dev
```

## API Endpoints

### Authentication Endpoints
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Todo Endpoints
- `GET /users/{user_id}/todos` - Get user's todos
- `POST /users/{user_id}/todos` - Create a new todo
- `GET /users/{user_id}/todos/{todo_id}` - Get a specific todo
- `PUT /users/{user_id}/todos/{todo_id}` - Update a todo
- `PATCH /users/{user_id}/todos/{todo_id}` - Partially update a todo
- `DELETE /users/{user_id}/todos/{todo_id}` - Delete a todo

## Example Usage

### Register a New User
```bash
curl -X POST http://localhost:8000/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123",
    "username": "john_doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123"
  }'
```

### Create a Todo (with JWT token from login)
```bash
curl -X POST "http://localhost:8000/v1/users/{user_id}/todos" \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Need to buy milk, bread, and eggs",
    "completed": false
  }'
```

### Get User's Todos
```bash
curl -X GET "http://localhost:8000/v1/users/{user_id}/todos" \
  -H "Authorization: Bearer <jwt_token>"
```

## Development

### Running Tests
```bash
# Backend tests (using uv - mandatory)
cd backend
uv run pytest

# Frontend tests
cd frontend
npm run test
```

### Database Migrations
```bash
# Create a new migration (using uv - mandatory)
uv run alembic revision --autogenerate -m "Description of changes"

# Apply migrations (using uv - mandatory)
uv run alembic upgrade head
```

## Troubleshooting

### Common Issues
1. **Port already in use**: Check if backend (8000) or frontend (3000) ports are already occupied
2. **Database connection issues**: Verify DATABASE_URL is correct in your .env file
3. **Authentication problems**: Ensure BETTER_AUTH_SECRET is the same across frontend and backend

### Environment Setup Issues
- Make sure all environment variables are properly set
- Check that the database is running and accessible
- Verify that the frontend and backend can communicate with each other

## Deployment

### Production Build
```bash
# Frontend production build
cd frontend
npm run build

# Backend deployment would depend on your hosting provider
```

For detailed deployment instructions, refer to the deployment documentation.