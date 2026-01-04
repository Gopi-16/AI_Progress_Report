# AI Progress Report — Backend (TypeScript + Express + MongoDB)

This backend provides a REST API for the ai-progress-report frontend:
- User authentication (register, login) with JWT
- Report model CRUD operations
- Basic role check middleware
- Input validation with Zod

Prerequisites
- Node.js 18+ and npm
- Docker (optional, for running MongoDB via docker-compose) or a MongoDB URI (Atlas or local)

Quick start (local MongoDB via docker-compose)
1. cd backend
2. cp .env.example .env and fill values
3. docker-compose up -d      # starts MongoDB for local dev
4. npm install
5. npm run dev

Quick start (without Docker, using Atlas or local Mongo)
1. cp .env.example .env and set MONGODB_URI to your MongoDB connection string
2. npm install
3. npm run dev

Scripts
- npm run dev — development with ts-node-dev
- npm run build — compile TypeScript to dist
- npm run start — run compiled app from dist
- npm run lint — (if you add ESLint) not included by default

Environment variables (.env)
- PORT=4000
- MONGODB_URI=mongodb://mongo:27017/ai_progress_report
- JWT_SECRET=a_strong_secret_here
- JWT_EXPIRES_IN=1d
- NODE_ENV=development

API Overview
Auth
- POST /api/auth/register — register { name, email, password }
- POST /api/auth/login — login { email, password } -> { token }

Users
- GET /api/users/me — get current user (protected)
- GET /api/users — list users (protected, admin only)

Reports
- GET /api/reports — list reports (supports ?page=&limit=&status=)
- POST /api/reports — create report (protected)
- GET /api/reports/:id — get report
- PUT /api/reports/:id — update report (protected)
- DELETE /api/reports/:id — delete report (protected)

Notes & next steps
- Add HTTPS and stronger token storage for production
- Add rate limiting, request-size limits, and logging to an external service for production
- Add RBAC/permissions for per-user report access if desired
- Add tests (Jest) and CI (GitHub Actions) if needed
