# code_standards.md

# Code Standards

These standards apply to the entire Student Semester Registration System.

All developers and AI coding agents must follow them.

---

# Core Principles

## Simplicity First

Write code that is easy to understand.

Prefer:

```ts
const totalStudents = students.length;
```

Over:

```ts
const totalStudents = students?.filter(Boolean)?.length ?? 0;
```

when not necessary.

---

## Readability Over Cleverness

Code should be understandable by a junior developer.

Avoid unnecessary abstractions.

---

## Consistency

Follow existing patterns.

Do not introduce multiple ways of solving the same problem.

---

# TypeScript Standards

## Strict Mode

Must remain enabled.

---

## No Any

❌

```ts
const data: any
```

✅

```ts
const data: unknown
```

---

## Explicit Return Types

Always define return types.

```ts
export async function getStudents(): Promise<Student[]> {
}
```

---

## Shared Types

Place reusable types inside:

```text
src/types
```

---

# File Naming

## Components

PascalCase

```text
LoginForm.tsx
StudentTable.tsx
StatCard.tsx
```

---

## Utilities

camelCase

```text
attendance.ts
validators.ts
auth.ts
```

---

## Folders

kebab-case

```text
student-dashboard
teacher-dashboard
```

---

# React Standards

## Default To Server Components

Use Server Components whenever possible.

---

## Client Components

Only use:

```ts
"use client";
```

when required for:

* useState
* useEffect
* Event handlers
* Browser APIs

---

## Component Size

Maximum target:

```text
200 lines
```

If larger, split into smaller components.

---

# Component Structure

```ts
Imports

Types

Component

Helpers

Export
```

Example:

```ts
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
};

export function StatCard({
  title,
}: Props) {
  return <div>{title}</div>;
}
```

---

# Database Standards

## ORM

Only use:

```text
Drizzle ORM
```

---

## Raw SQL

Allowed only for:

* migrations
* advanced reporting

Not for normal CRUD operations.

---

## Queries

Keep queries inside services.

❌

```tsx
Page
 ↓
DB Query
```

✅

```tsx
Page
 ↓
Service
 ↓
Database
```

---

# Service Layer Rules

All business logic belongs in:

```text
src/services
```

Examples:

```text
auth.service.ts
student.service.ts
analytics.service.ts
registration.service.ts
```

---

# Validation Standards

All requests validated using:

```text
Zod
```

---

Example

```ts
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
```

---

Never trust client input.

---

# Authentication Standards

Passwords are never stored in plain text.

Always use:

```ts
bcrypt.hash()
```

and

```ts
bcrypt.compare()
```

---

# Error Handling

Every async operation must use:

```ts
try {
}
catch(error) {
}
```

---

Example

```ts
try {
  await createStudent();
} catch (error) {
  console.error(error);
}
```

---

# API Standards

## Response Format

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Error message"
}
```

---

## Status Codes

```text
200 Success
201 Created
400 Validation Error
401 Unauthorized
403 Forbidden
404 Not Found
500 Server Error
```

---

# UI Standards

## Forms

Labels always above inputs.

Required fields use:

```text
*
```

---

## Buttons

Reuse:

```text
PrimaryButton
SecondaryButton
```

Never create page-specific button styles.

---

## Tables

Use shared:

```text
StudentTable
```

component.

---

# Styling Standards

## Framework

Tailwind CSS only.

---

❌

```tsx
style={{
  color: "red"
}}
```

✅

```tsx
className="text-red-500"
```

---

## Colors

Use tokens from:

```text
ui_tokens.md
```

Never hardcode colors.

---

# State Management

Version 1 uses:

```text
React State
Server Actions
```

No Redux.

No Zustand.

No MobX.

---

# Logging Standards

Server-side only.

Use:

```ts
console.error()
```

for failures.

Do not expose internal errors to users.

---

# Security Standards

## Protected Routes

All routes under:

```text
/student/*
/teacher/*
```

must require authentication.

---

## Admin Routes

Require:

```text
role === ADMIN
```

---

## Input Sanitization

Validate before:

* Database writes
* Database updates
* Authentication

---

# Performance Standards

## Database

Always query only required columns.

❌

```ts
select *
```

✅

```ts
select({
  id: users.id,
  name: users.name,
})
```

---

## Components

Avoid unnecessary client-side rendering.

Prefer Server Components.

---

# Testing Requirements

Before marking a feature complete:

* Build passes
* TypeScript passes
* No console errors
* Feature works end-to-end

---

# Non-Violation Rules

1. No `any`.
2. No plain-text passwords.
3. No database access inside components.
4. No duplicated business logic.
5. No hardcoded permissions.
6. No direct database calls from client code.
7. No skipped validation.
8. No custom styling outside design tokens.
9. No modifying unrelated files.
10. Follow existing architecture before introducing new patterns.

These standards are mandatory for all future development and AI coding agents.
