# Authentication API – Internal Services

A production-ready **internal authentication service** built with **Node.js and TypeScript**, designed for secure user registration and authentication using Redis as the data store.

---

## Project Overview

This API provides a RESTful authentication service for internal systems with the following capabilities:

- User registration with unique username enforcement
- Secure user authentication
- Password complexity requirements
- Redis-backed persistence
- Strong password hashing using **Argon2id**
- Request-level input validation with Zod
- Comprehensive error handling
- Full test coverage

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Express |
| Database | Redis |
| Password Hashing | Argon2id |
| Validation | Zod |
| Testing | Jest + Supertest |
| Containerization | Docker |

---

## Project Structure

```
authentication-api/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   │   ├── env.ts
│   │   └── redis.ts
│   ├── routes/
│   │   └── auth.routes.ts
│   ├── controllers/
│   │   └── auth.controller.ts
│   ├── services/
│   │   └── auth.service.ts
│   ├── validations/
│   │   └── auth.validation.ts
│   ├── utils/
│   │   ├── password.ts
│   │   └── errors.ts
│   ├── types/
│   │   └── index.ts
│   └── tests/
│       └── auth.test.ts
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Docker Desktop (for Redis)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/joemickie/authentication-api.git
cd authentication-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file from the provided example:

```bash
cp .env.example .env
```

**Example `.env` configuration:**

```env
PORT=3000
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
NODE_ENV=development
```

**Important:** Update `REDIS_PASSWORD` to match the password you set when starting Redis.

### 4. Start Redis with Docker

Choose the appropriate command based on your terminal:

**For Git Bash (Recommended for Windows):**

```bash
docker run -d \
  --name redis-auth \
  -p 6379:6379 \
  redis redis-server --requirepass StrongRedisPass123!
```

**Single line version:**

```bash
docker run -d --name redis-auth -p 6379:6379 redis redis-server --requirepass StrongRedisPass123!
```

**For Windows Command Prompt:**

```cmd
docker run -d ^
  --name redis-auth ^
  -p 6379:6379 ^
  redis redis-server --requirepass StrongRedisPass123!
```

**Verify Redis is running:**

```bash
docker ps
```

You should see the `redis-auth` container running.

### 5. Update .env with Redis Password

Make sure your `.env` file has the correct Redis password:

```env
REDIS_PASSWORD=StrongRedisPass123!
```

(Or whatever password you used in the Docker command)

### 6. Run the Application

**Development mode:**

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

---

## Running Tests

Execute the test suite:

```bash
npm test
```
Tests validate:

- Registration logic
- Authentication success/failure paths
- Input validation behavior

## API Endpoints

### Register User

**Endpoint:** `POST /auth/register`

**Request Body:**

```json
{
  "username": "testuser",
  "password": "StrongP@ssword123!"
}
```

**Success Response (201):**

```json
{
  "message": "User created successfully"
}
```

**Error Response (400) - Validation Failed:**

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "password",
      "message": "Must contain uppercase"
    },
    {
      "field": "password",
      "message": "Must contain number"
    }
  ]
}
```

**Error Response (400) - Username Exists:**

```json
{
  "error": "Username already exists"
}
```

### Login User

**Endpoint:** `POST /auth/login`

**Request Body:**

```json
{
  "username": "testuser",
  "password": "StrongP@ssword123!"
}
```

**Success Response (200):**

```json
{
  "message": "Authenticated successfully"
}
```

**Error Response (401) - Invalid Credentials:**

```json
{
  "error": "Invalid credentials"
}
```

---

## Security Features

- **Argon2id password hashing** - Industry-standard, resistant to GPU attacks
- **Unique username enforcement** - Prevents duplicate accounts
- **Input validation** - All inputs validated with Zod schemas
- **Secure error messages** - Login errors don't reveal if username exists (prevents enumeration)
- **Type safety** - Full TypeScript implementation
- **Environment-based configuration** - No hardcoded secrets

---

## Known Limitations & Future Enhancements

To keep scope focused, the following were intentionally deferred but would be expected in future development:

- **JWT token generation** - For stateless authentication
- **Refresh token rotation** - For long-lived sessions
- **Rate limiting** - Prevent brute-force attacks
- **Account lockout** - After N failed login attempts
- **Audit logging** - Track authentication events
- **MFA support** - Two-factor authentication
- **Password reset flow** - Email-based password recovery
- **Role-based access control (RBAC)** - User permissions
- **Session management** - Track active sessions
- **API key authentication** - For service-to-service calls

---

## Architecture Decisions

### Why Redis?

- Fast in-memory operations
- Simple key-value storage for user data
- Production-ready with minimal setup
- Recommended for the assessment

### Why Argon2id?

- Memory-hard algorithm resistant to GPU attacks
- Better security than bcrypt for modern threats

### Why Zod for Validation?

- Type-safe schema validation
- Runtime type checking
- Clear error messages
- Integrates seamlessly with TypeScript

---

## Development Notes

**Time Investment:** 4 hours

**Approach:** Clean architecture with separation of concerns (Controller → Service → Data layer), strong typing, and comprehensive testing.

**Focus Areas:**
- Security best practices
- Code maintainability
- Production readiness
- Clear documentation

---

## Author

Built as a technical assessment demonstrating production-level Node.js/TypeScript development practices.