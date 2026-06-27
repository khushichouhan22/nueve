# api_contracts.md

# API Contracts

This document defines all API endpoints used by the Student Semester Registration System.

---

# Base Response Format

## Success

```json
{
  "success": true,
  "data": {}
}
```

## Error

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

---

# Authentication

## POST /api/auth/login

Purpose:

Authenticate student or administrator.

### Request

```json
{
  "email": "student@nueve.edu",
  "password": "2001-10-14"
}
```

### Response

```json
{
  "success": true,
  "role": "STUDENT",
  "redirect": "/student/dashboard"
}
```

### Validation

* Email required
* Password required

---

## POST /api/auth/logout

Purpose:

Destroy user session.

### Response

```json
{
  "success": true
}
```

---

# Registration

## POST /api/register

Purpose:

Create semester registration.

### Request

```json
{
  "name": "Eleanor Vance",
  "email": "eleanor@nueve.edu",
  "dob": "2001-10-14",
  "phone": "+15550192834",
  "attendance": 92,
  "semester": "Fall 2025"
}
```

### Response

```json
{
  "success": true,
  "message": "Registration completed"
}
```

### Validation

* Name required
* Email required
* DOB required
* Phone required
* Attendance between 0–100

---

# Dashboard

## GET /api/dashboard/stats

Purpose:

Fetch dashboard statistics.

### Authentication

ADMIN only.

### Response

```json
{
  "success": true,
  "data": {
    "registeredToday": 25,
    "totalStudents": 620,
    "lowAttendance": 31,
    "averageAttendance": 88
  }
}
```

---

# Students

## GET /api/students

Purpose:

Fetch all students.

### Query Params

```text
?page=1
&search=john
&attendance=LOW
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "123",
      "name": "John Doe",
      "email": "john@nueve.edu",
      "attendance": 72
    }
  ]
}
```

---

## GET /api/students/:id

Purpose:

Fetch single student.

### Response

```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "John Doe",
    "email": "john@nueve.edu",
    "attendance": 72,
    "semester": "Fall 2025"
  }
}
```

---

## PATCH /api/students/:id

Purpose:

Update student information.

### Request

```json
{
  "phone": "+15550192834",
  "attendance": 95
}
```

### Response

```json
{
  "success": true,
  "message": "Student updated"
}
```

### Authentication

ADMIN only.

---

# Health Check

## GET /api/health

Purpose:

Verify application status.

### Response

```json
{
  "success": true,
  "status": "healthy"
}
```

---

# Error Codes

| Code | Meaning               |
| ---- | --------------------- |
| 400  | Validation Error      |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 500  | Internal Server Error |

---

# Authentication Rules

## STUDENT

Allowed:

* Login
* Register
* View own dashboard
* View own profile

---

## ADMIN

Allowed:

* Dashboard access
* Student management
* Student updates
* Analytics access

---

# API Development Rules

1. All requests validated using Zod.
2. All endpoints return standard response format.
3. Protected routes require session validation.
4. Admin routes require role verification.
5. No database access outside service layer.
6. Every endpoint must have error handling.
