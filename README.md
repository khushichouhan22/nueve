# Nueve - Student Registration System

A modern, minimalist semester registration platform built with Next.js and PostgreSQL. It features a student portal for managing registrations and a teacher/admin dashboard for tracking attendance and editing student records.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js App Router (Server Actions & Route Handlers)
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js (Auth.js)
- **Validation**: Zod

---

## Local Development Guide

Follow these instructions to run the application on your local device.

### 1. Prerequisites

- **Node.js** (v18 or higher recommended)
- **PostgreSQL** installed locally on your machine (or via Docker)

### 2. Install Dependencies

Clone the repository and install the NPM dependencies:

```bash
npm install
```

### 3. Setup the Local Database

1. Open your local PostgreSQL instance (using pgAdmin, psql, or another client).
2. Create a new empty database (e.g., `nueve`).
3. Make sure you have the username and password for your local Postgres server.

### 4. Configure Environment Variables

Create a `.env.local` file in the root of the project. You will need to provide the connection string for your local PostgreSQL database and a secret for NextAuth.

```env
# PostgreSQL Connection String
# Format: postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME
DATABASE_URL="postgresql://postgres:password@localhost:5432/nueve"

# NextAuth Configuration
# Run `openssl rand -base64 32` in terminal or use any random secure string
NEXTAUTH_SECRET="your_nextauth_secret_here_for_development"
NEXTAUTH_URL="http://localhost:3000"
```

### 5. Initialize the Database

Push the database schema to your local PostgreSQL database:

```bash
npx drizzle-kit push
```

Then, seed the database with the mock admin and student data:

```bash
npx tsx src/db/seed.ts
```

*Note: The seed script requires `tsx` to run the TypeScript file directly. If you encounter issues, you can install it globally via `npm install -g tsx` or just rely on `npx`.*

### 6. Run the Application

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 7. Test Accounts

You can use the seeded data to log into the application:

**Admin/Teacher Login:**
- **URL**: `/login/teacher`
- **Email**: `admin@nueve.edu`
- **Password**: `Admin@123`

**Student Login:**
- **URL**: `/login/student`
- **Email**: `e.vance@nueve.edu` (or any email from the seed data)
- **DOB**: `2000-05-15` (The DOB serves as the student password)
