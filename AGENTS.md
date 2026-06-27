# agent.md

# AI Agent Operating Manual

This document is the primary instruction set for all AI coding agents working on the Student Semester Registration System.

Supported Agents:

* Cursor
* Claude Code
* Roo Code
* Cline
* OpenHands
* Devin
* ChatGPT

This file should be read before any implementation begins.

---

# Project Mission

Build a modern semester registration platform that allows returning students to register for the next semester while providing a single administrator with registration analytics and student management tools.

The application must be:

* Simple
* Secure
* Maintainable
* Production-ready
* Consistent with the provided academic design system

---

# Product Goals

The system must allow:

### Students

* Login
* Register for next semester
* View registration status
* View profile information

### Administrator

* Login
* View dashboard metrics
* Manage students
* Search records
* Monitor attendance

---

# Tech Stack Summary

## Frontend

```text id="4qg5kr"
Next.js 15
React 19
TypeScript
Tailwind CSS
shadcn/ui
```

---

## Backend

```text id="p31ox8"
Next.js Route Handlers
Server Actions
```

---

## Database

```text id="8ftrph"
PostgreSQL
Drizzle ORM
Drizzle Kit
```

---

## Authentication

```text id="h9k4u7"
Auth.js
bcrypt
```

---

## Validation

```text id="p1p6mi"
Zod
```

---

# Architecture Summary

Architecture follows:

```text id="6a5psl"
UI
↓
Server Actions
↓
Services
↓
Drizzle ORM
↓
PostgreSQL
```

Business logic belongs only inside services.

Components are presentation only.

---

# Database Summary

Current Version:

```text id="7g1blf"
users
```

table only.

Stores:

* Students
* Admin account
* Registration data
* Attendance data

---

# Authentication Summary

## Student Login

Credentials:

```text id="qu2d8h"
Email
DOB
```

DOB is hashed before storage.

---

## Admin Login

Credentials:

```text id="o7zfx2"
Email
Password
```

Admin role:

```text id="6x1wdx"
ADMIN
```

---

# Design System Summary

The project follows the Academic Architecturalism visual language.

Characteristics:

* Minimalist
* Editorial typography
* Large whitespace
* Thin borders
* Institutional appearance

Use:

```text id="opjsa6"
Inter
EB Garamond
```

only.

---

# Required Reading Order

Before starting any feature, read:

### 1

```text id="qgtrh3"
project_overview.md
```

### 2

```text id="4e6e5q"
architecture.md
```

### 3

```text id="wm1hrq"
database_schema.md
```

### 4

```text id="9s9qfx"
api_contracts.md
```

### 5

```text id="8qmdxt"
build_plan.md
```

### 6

```text id="j21z3s"
ui_tokens.md
```

### 7

```text id="s2l5fd"
ui_rules.md
```

### 8

```text id="ngb7gc"
ui_registry.md
```

### 9

```text id="y0v2v4"
code_standards.md
```

### 10

```text id="z5b55k"
library_docs.md
```

### 11

```text id="v2k4ye"
progress_tracker.md
```

---

# Agent Workflow

## First Run Initialization

If you have just cloned this repository or are starting a fresh environment, perform these steps before any coding:

1. **Environment**: Copy `.env.example` to `.env.local` and configure it.
2. **Setup**: Run `npm run setup` to install dependencies, push the database schema, and seed the database.
3. **Verify**: Run `npm run dev` to ensure the server starts correctly.

---

## Before Coding

### Step 1

Read project documentation.

### Step 2

Identify active feature.

### Step 3

Review dependencies.

### Step 4

Implement only the current feature.

Do not work ahead.

---

## During Coding

### Always

* Follow architecture
* Follow code standards
* Reuse components
* Use TypeScript types

### Never

* Skip validation
* Access database in UI
* Create duplicate components

---

## After Coding

### Verify

* Build succeeds
* TypeScript passes
* Feature works

### Then

Update:

```text id="y4b0m7"
progress_tracker.md
```

---

# File Modification Rules

## Allowed

Modify files directly related to the current feature.

---

## Required

Reuse existing:

* Components
* Services
* Utilities
* Types

---

## Avoid

Creating new abstractions unless clearly necessary.

---

# Service Layer Rules

All business logic belongs in:

```text id="yb9yiv"
src/services
```

Examples:

```text id="jkgkk8"
auth.service.ts
student.service.ts
registration.service.ts
analytics.service.ts
```

---

# Database Rules

Use:

```text id="tlh7gu"
Drizzle ORM
```

only.

---

Never:

```text id="dh8q8z"
query database inside components
```

---

Never:

```text id="x0yqvf"
store plain text passwords
```

---

# UI Rules

All pages must:

* Use design tokens
* Be responsive
* Follow component registry

---

Forms:

* Labels above inputs
* Validation messages visible

---

Dashboard:

Must always display:

```text id="gz1t2z"
Registrations Today
Total Students
Low Attendance
Average Attendance
```

---

# Security Rules

Mandatory:

### Password Hashing

```ts id="jwrfj6"
bcrypt.hash()
```

### Verification

```ts id="h95s1l"
bcrypt.compare()
```

---

### Validation

Every request must use:

```text id="4gdy9q"
Zod
```

---

### Protected Routes

Require authentication:

```text id="0mfrlh"
/student/*
/teacher/*
```

---

### Admin Routes

Require:

```text id="1w5dbf"
role === ADMIN
```

---

# Forbidden Actions

Agents must never:

### 1

Rewrite working systems without reason.

### 2

Modify unrelated files.

### 3

Ignore architecture.

### 4

Skip validation.

### 5

Duplicate business logic.

### 6

Hardcode permissions.

### 7

Store passwords in plain text.

### 8

Bypass middleware.

### 9

Use raw SQL for standard CRUD operations.

### 10

Create UI components that ignore the design system.

---

# Definition Of Done

A feature is complete only when:

### Functionality

* Acceptance criteria pass

### Code Quality

* TypeScript passes
* Build passes

### Architecture

* Follows architecture rules
* Uses services correctly

### Security

* Validation present
* Permissions enforced

### Documentation

* Progress tracker updated

### UI

* Responsive
* Consistent with design system

---

# Final Agent Directive

When uncertain:

1. Follow architecture.md.
2. Follow code_standards.md.
3. Reuse existing components.
4. Keep solutions simple.
5. Do not invent requirements.

The objective is not to build the most complex system.

The objective is to build a reliable, maintainable semester registration application that satisfies the requirements defined in project_overview.md.
