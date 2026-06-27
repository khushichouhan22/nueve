# library_docs.md

# Library Documentation

This document explains how each major library should be used within the Student Semester Registration System.

The goal is consistency across all developers and AI coding agents.

---

# Next.js

## Purpose

Core application framework.

Used for:

* Routing
* Pages
* Server Components
* API Routes
* Server Actions

---

## Rules

### Use App Router

Always use:

```text
src/app
```

Never use:

```text
src/pages
```

---

### Prefer Server Components

Default:

```tsx
export default async function Page() {}
```

Only use Client Components when necessary.

---

### Route Structure

```text
app
├── login
├── student
├── teacher
└── api
```

Keep routes organized by feature.

---

# PostgreSQL

## Purpose

Primary database.

Stores:

* Users
* Registrations
* Attendance
* Roles

---

## Rules

### Source Of Truth

PostgreSQL is the only persistent data source.

Never duplicate data elsewhere.

---

### Naming Convention

Tables:

```sql
users
```

Columns:

```sql
created_at
updated_at
registered_at
```

Use snake_case.

---

# Drizzle ORM

## Purpose

Database access layer.

---

## Database Connection

```ts
import { drizzle } from "drizzle-orm/node-postgres";
```

---

## Queries

### Insert

```ts
await db.insert(users).values({
  name,
  email,
});
```

---

### Select

```ts
await db
  .select()
  .from(users);
```

---

### Update

```ts
await db
  .update(users)
  .set({
    attendance: 90,
  });
```

---

## Rules

### Use Services

Database access belongs inside:

```text
src/services
```

Never inside components.

---

### Use Typed Queries

Always use schema references.

Good:

```ts
users.email
```

Bad:

```ts
"email"
```

---

# Drizzle Kit

## Purpose

Database migrations.

---

## Generate Migration

```bash
npx drizzle-kit generate
```

---

## Run Migration

```bash
npx drizzle-kit migrate
```

---

## Rules

Schema changes must always go through migrations.

Never manually modify production databases.

---

# Auth.js

## Purpose

Authentication and session management.

---

## Responsibilities

* Login
* Logout
* Sessions
* Route protection

---

## Rules

### Student Login

Credentials:

```text
Email
DOB
```

---

### Admin Login

Credentials:

```text
Email
Password
```

---

### Session Checks

Always verify session before loading protected pages.

---

# bcrypt

## Purpose

Password hashing.

---

## Hash Password

```ts
const hash =
  await bcrypt.hash(
    password,
    10
  );
```

---

## Verify Password

```ts
await bcrypt.compare(
  password,
  hash
);
```

---

## Rules

Never store:

```text
DOB
Password
```

in plain text.

---

# Zod

## Purpose

Validation.

Used for:

* Forms
* API requests
* Server actions

---

## Example

```ts
import { z } from "zod";

const RegisterSchema =
  z.object({
    name: z.string(),
    email: z.string().email(),
    attendance: z.number(),
  });
```

---

## Rules

Every incoming request must be validated.

No exceptions.

---

# Tailwind CSS

## Purpose

Styling system.

---

## Rules

### Use Design Tokens

Use values from:

```text
ui_tokens.md
```

---

### Prefer Utilities

Good:

```tsx
className="
bg-surface
border
p-6
"
```

Avoid inline styles.

---

# shadcn/ui

## Purpose

Reusable UI components.

---

## Components To Use

### Form

```tsx
<Form />
```

---

### Input

```tsx
<Input />
```

---

### Button

```tsx
<Button />
```

---

### Table

```tsx
<Table />
```

---

### Dialog

```tsx
<Dialog />
```

---

## Rules

Customize using project tokens.

Do not redesign components on every page.

---

# React Hook Form

## Purpose

Form state management.

---

## Use For

* Login Form
* Registration Form
* Student Edit Form

---

## Example

```ts
const form = useForm();
```

---

## Rules

Always pair with:

```text
Zod
```

for validation.

---

# date-fns

## Purpose

Date formatting.

---

## Example

```ts
format(
  new Date(),
  "dd MMM yyyy"
);
```

---

## Use Cases

* Registration dates
* Dashboard dates
* Student details

---

# Recommended Installation

```bash
npm install

drizzle-orm
drizzle-kit
pg

next-auth

bcryptjs

zod

react-hook-form

@hookform/resolvers

date-fns

lucide-react

class-variance-authority

clsx

tailwind-merge
```

---

# Library Rules Summary

## Database

Use:

```text
PostgreSQL
Drizzle ORM
```

Only.

---

## Validation

Use:

```text
Zod
```

Everywhere.

---

## Authentication

Use:

```text
Auth.js
bcrypt
```

Only.

---

## Forms

Use:

```text
React Hook Form
+
Zod
```

---

## Styling

Use:

```text
Tailwind
shadcn/ui
```

Only.

---

# Non-Violation Rules

1. No raw SQL for normal CRUD operations.
2. No database access in UI components.
3. No form without validation.
4. No plain-text passwords.
5. No direct API calls from components when Server Actions are available.
6. No custom component library outside shadcn/ui.
7. All libraries must follow project architecture.

This document serves as the official guide for using third-party libraries within the Student Semester Registration System.
