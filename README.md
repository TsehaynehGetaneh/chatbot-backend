# ChatBot Backend API

A robust and scalable backend API for the ChatBot application built with Express.js, TypeScript, Prisma, and PostgreSQL.

## Features

- **RESTful API** with comprehensive CRUD operations
- **Real-time Chat Simulation** with 2-second response delay
- **Database Integration** using Prisma ORM with PostgreSQL
- **Input Validation** using Zod schemas
- **API Documentation** with Swagger/OpenAPI
- **Security** with Helmet, CORS, and rate limiting
- **Error Handling** with comprehensive error middleware
- **Docker Support** for easy deployment
- **TypeScript** for type safety and better development experience

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS, Rate Limiting
- **Containerization**: Docker

## Prerequisites

- Node.js 18 or higher
- PostgreSQL 12 or higher
- npm or yarn package manager

## Quick Start

### 1. Clone the Repository

Choose HTTPS or SSH:

```bash
# HTTPS
git clone https://github.com/TsehaynehGetaneh/chatbot-backend.git
# OR
# SSH
git clone git@github.com:TsehaynehGetaneh/chatbot-backend.git

cd chatbot-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the backend directory:

```bash
cp env.example .env
```

Update the `.env` file with your database credentials:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/chatbot_db?schema=public"
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Database Setup

```bash
npm run db:generate

npm run db:push

npm run db:studio
```

### 5. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3001`

## API Documentation

Once the server is running, visit:

- **Swagger UI**: `http://localhost:3001/api-docs`
- **Health Check**: `http://localhost:3001/health`

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Start all services (PostgreSQL + Backend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Using Docker Only

```bash
# Build the image
docker build -t chatbot-backend .

# Run the container
docker run -p 3001:3001 \
  -e DATABASE_URL="postgresql://username:password@host:5432/chatbot_db" \
  chatbot-backend
```

## API Endpoints

### Conversations

| Method | Endpoint                 | Description             |
| ------ | ------------------------ | ----------------------- |
| GET    | `/api/conversations`     | Get all conversations   |
| GET    | `/api/conversations/:id` | Get conversation by ID  |
| POST   | `/api/conversations`     | Create new conversation |
| PUT    | `/api/conversations/:id` | Update conversation     |
| DELETE | `/api/conversations/:id` | Delete conversation     |

### Messages

| Method | Endpoint                        | Description                  |
| ------ | ------------------------------- | ---------------------------- |
| GET    | `/api/messages/:conversationId` | Get messages by conversation |
| POST   | `/api/messages`                 | Create new message           |
| GET    | `/api/messages/single/:id`      | Get message by ID            |

## Available Scripts

```bash
# Development
npm run serve       # Start development server with nodemon
npm run build       # Build TypeScript to JavaScript
npm start           # Start production server

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Prisma Studio
```

## Project Structure

```
chatbot-backend/
├── src/
│   ├── config/          # Configuration files
│   │   └── swagger.ts   # Swagger documentation setup
│   ├── controllers/     # Route controllers
│   │   ├── conversationController.ts
│   │   └── messageController.ts
│   ├── lib/            # Utility libraries
│   │   ├── database.ts # Prisma client setup
│   │   └── validation.ts # Zod schemas
│   ├── middleware/     # Express middleware
│   │   ├── errorHandler.ts
│   │   └── validation.ts
│   ├── routes/         # API routes
│   │   ├── conversationRoutes.ts
│   │   └── messageRoutes.ts
│   ├── services/       # Business logic
│   │   ├── conversationService.ts
│   │   └── messageService.ts
│   ├── app.ts          # Express app configuration
│   └── index.ts        # Server entry point
├── prisma/
│   ├── migrations/     # Database migrations
│   │   ├── 20250919065226_create/
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma   # Database schema
├── init.sql/          # Database initialization scripts (empty)
├── docker-compose.yml # Docker services configuration
├── Dockerfile         # Docker image configuration
├── Dockerfile.dev     # Development Docker configuration
├── env.example        # Environment variables template
├── nodemon.json       # Nodemon configuration
├── tsconfig.json      # TypeScript configuration
├── package.json       # Node.js dependencies and scripts
├── package-lock.json  # Locked dependency versions
└── README.md          # This file
```

## Environment Variables

| Variable                  | Description                  | Default               |
| ------------------------- | ---------------------------- | --------------------- |
| `DATABASE_URL`            | PostgreSQL connection string | Required              |
| `PORT`                    | Server port                  | 3001                  |
| `NODE_ENV`                | Environment mode             | development           |
| `FRONTEND_URL`            | Frontend URL for CORS        | http://localhost:3000 |
| `RATE_LIMIT_WINDOW_MS`    | Rate limit window            | 900000                |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window      | 100                   |

## Chatbot Behavior

The chatbot follows these rules:

1. **Initial Message**: Every new conversation starts with "How can I help you?"
2. **Response Delay**: 2-second delay before responding to user messages
3. **Response Content**: Always responds with "This is an AI generated response"
4. **Message Storage**: All messages (user and bot) are stored in the database
5. **Typing Indicator**: Frontend should show typing animation during the 2-second delay
