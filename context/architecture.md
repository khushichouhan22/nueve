# architecture.md

# Student Semester Registration System Architecture

---

# Architecture Overview

The Student Semester Registration System is a modern full-stack web application built using Next.js App Router, PostgreSQL, and Drizzle ORM.

The architecture follows a layered design that separates:

* Presentation Layer
* Business Logic Layer
* Data Access Layer
* Database Layer

This separation ensures maintainability, scalability, testability, and compatibility with AI coding agents.

---

# Architecture Principles

The system follows these principles:

## Simplicity First

The application solves a single business problem:

> Register returning students for the next semester.

Avoid unnecessary complexity.

---

## Server-First Architecture

Business logic executes on the server.

The browser is responsible only for:

* Displaying data
* Collecting input
* Triggering actions

---

## Type Safety Everywhere

TypeScript is used across:

* Components
* API routes
* Database schema
* Validation
* Server actions

No `any` types are allowed.

---

## Database Driven

PostgreSQL acts as the single source of truth.

All dashboards and analytics derive from stored data.

---

# Technology Stack

## Frontend

### Next.js 15

Purpose:

* Full-stack framework
* Routing
* API endpoints
* Server Actions

Reason:

* Modern React architecture
* Excellent TypeScript support
* App Router support

---

### React 19

Purpose:

* UI rendering

Reason:

* Industry standard
* Server Components support

---

### Tailwind CSS

Purpose:

* Styling

Reason:

* Rapid development
* Consistent design system

---

### shadcn/ui

Purpose:

* Reusable UI components

Reason:

* Accessible
* Customizable
* Tailwind-native

---

## Backend

### Next.js Route Handlers

Purpose:

* API endpoints

Reason:

* No separate backend required

---

### Server Actions

Purpose:

* Mutations
* Form submissions

Reason:

* Simpler architecture
* Reduced API boilerplate

---

## Database

### PostgreSQL

Purpose:

* Primary database

Reason:

* Reliable
* Relational
* Excellent reporting capabilities

---

### Drizzle ORM

Purpose:

* Database abstraction layer

Reason:

* Type safety
* SQL visibility
* Excellent developer experience

---

### Drizzle Kit

Purpose:

* Schema migrations

Reason:

* Version-controlled database changes

---

## Authentication

### Auth.js

Purpose:

* Session management
* Authentication

Reason:

* Production-ready
* Next.js integration

---

### bcrypt

Purpose:

* Password hashing

Reason:

* Secure password storage

---

## Validation

### Zod

Purpose:

* Request validation
* Form validation

Reason:

* Type-safe schemas

---

# High-Level Architecture

```text
┌────────────────────┐
│     Browser        │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│      Next.js       │
│   App Router UI    │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│   Server Actions   │
│    API Routes      │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Business Services  │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│    Drizzle ORM     │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│    PostgreSQL      │
└────────────────────┘
```

---

# Folder Structure

```text
src
│
├── app
│   │
│   ├── (public)
│   │   ├── login
│   │   │   └── page.tsx
│   │   │
│   │   └── register
│   │       └── page.tsx
│   │
│   ├── student
│   │   ├── dashboard
│   │   │   └── page.tsx
│   │   │
│   │   ├── profile
│   │   │   └── page.tsx
│   │   │
│   │   └── success
│   │       └── page.tsx
│   │
│   ├── teacher
│   │   ├── dashboard
│   │   │   └── page.tsx
│   │   │
│   │   ├── students
│   │   │   └── page.tsx
│   │   │
│   │   └── student
│   │       └── [id]
│   │           └── page.tsx
│   │
│   ├── api
│   │   ├── auth
│   │   │   └── login
│   │   │       └── route.ts
│   │   │
│   │   ├── register
│   │   │   └── route.ts
│   │   │
│   │   ├── dashboard
│   │   │   └── stats
│   │   │       └── route.ts
│   │   │
│   │   └── students
│   │       └── route.ts
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── actions
│   ├── auth.ts
│   ├── registration.ts
│   └── students.ts
│
├── components
│   ├── layout
│   ├── forms
│   ├── dashboard
│   ├── tables
│   ├── cards
│   └── ui
│
├── db
│   ├── schema
│   ├── migrations
│   ├── seed.ts
│   └── index.ts
│
├── lib
│   ├── auth.ts
│   ├── validators.ts
│   ├── permissions.ts
│   ├── attendance.ts
│   └── constants.ts
│
├── services
│   ├── auth.service.ts
│   ├── registration.service.ts
│   ├── student.service.ts
│   └── analytics.service.ts
│
├── types
│   ├── auth.ts
│   ├── student.ts
│   └── dashboard.ts
│
└── middleware.ts
```

---

# Frontend Architecture

## Public Pages

### Login

Purpose:

* Authentication

Users:

* Students
* Teacher

---

### Registration

Purpose:

* New semester registration

---

# Student Area

## Student Dashboard

Displays:

* Registration status
* Attendance
* Semester information

---

## Student Profile

Displays:

* Personal information
* Registration information

---

## Success Page

Displays:

* Registration completed
* Registration summary

---

# Teacher Area

## Dashboard

Displays:

### Registrations Today

### Total Students

### Low Attendance Students

### Average Attendance

---

## Student Management

Displays:

* Search
* Filters
* Table view

---

## Student Detail Page

Displays:

* Full student record
* Attendance information
* Registration details

---

# Backend Architecture

Business logic never exists inside pages.

Pages only:

* Display information
* Trigger actions

---

## Auth Service

Responsibilities:

* Login
* Session creation
* Password verification
* Role validation

---

## Registration Service

Responsibilities:

* Student registration
* Attendance classification
* Data persistence

---

## Student Service

Responsibilities:

* Student retrieval
* Student update
* Student search

---

## Analytics Service

Responsibilities:

* Dashboard metrics
* Aggregated queries
* Reporting

---

# Request Lifecycle

## Student Registration

```text
Student
   ↓
Registration Form
   ↓
Server Action
   ↓
Zod Validation
   ↓
Registration Service
   ↓
Drizzle ORM
   ↓
PostgreSQL
   ↓
Success Response
```

---

## Teacher Dashboard

```text
Dashboard Request
      ↓
Analytics Service
      ↓
Drizzle Query
      ↓
PostgreSQL
      ↓
Metrics Returned
      ↓
Dashboard Render
```

---

# Authentication Architecture

## Student Authentication

Credentials:

```text
Email
DOB
```

During registration:

```text
DOB
↓
bcrypt hash
↓
password_hash column
```

During login:

```text
Entered DOB
↓
bcrypt compare
↓
Authentication Result
```

---

## Administrator Authentication

Single administrator account.

```text
admin@institution.edu
Admin Password
```

Role:

```text
ADMIN
```

---

# Authorization Model

## Roles

### STUDENT

Permissions:

* View own dashboard
* Register semester
* View profile

---

### ADMIN

Permissions:

* View dashboard
* View all students
* Edit students
* View analytics

---

# Database Architecture

Single-table design for Version 1.

```text
users
```

Contains:

* Student records
* Admin account
* Attendance data
* Registration information

Future versions may separate:

```text
users
registrations
attendance
semesters
```

---

# Security Architecture

## Password Security

Passwords never stored in plain text.

Always:

```text
bcrypt hash
```

---

## Input Validation

Every request validated with Zod.

---

## Route Protection

Protected routes:

```text
/student/*
/teacher/*
```

---

## Session Validation

Every request validates session.

---

# Performance Strategy

## Database Indexes

Indexes on:

* Email
* Role
* Registration Date

---

## Server Components

Default rendering strategy.

Benefits:

* Smaller client bundle
* Faster loading

---

## Query Optimization

Dashboard metrics use aggregate queries.

Avoid loading entire student tables.

---

# Deployment Architecture

## Development

```text
Next.js
PostgreSQL Local
```

---

## Production

```text
Vercel
PostgreSQL
```

---

# Monitoring Strategy

Track:

* Login failures
* Registration submissions
* Dashboard load errors
* Database failures

Log all server errors.

---

# Architectural Constraints

## Rule 1

Business logic never inside React components.

---

## Rule 2

Database access only inside services.

---

## Rule 3

Pages never perform database queries directly.

---

## Rule 4

Validation happens before service execution.

---

## Rule 5

Drizzle ORM is the only database access layer.

---

## Rule 6

Role checks happen in middleware and services.

Never in UI components.

---

# Non-Violation Rules

The following rules are mandatory.

* No raw SQL in application code.
* No database calls in components.
* No direct fetches from client to database.
* No duplicated business logic.
* No hardcoded permissions.
* No storing plain DOB passwords.
* No bypassing validation.
* No bypassing middleware.

These rules apply to all future AI coding agents working on the project.