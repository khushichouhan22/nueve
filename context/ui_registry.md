# ui_registry.md

# UI Component Registry

This document tracks all reusable UI components in the project.

Before creating a new component, developers and AI coding agents must check this file first.

If a similar component already exists, reuse it.

---

# Component Status

| Status     | Meaning                  |
| ---------- | ------------------------ |
| Planned    | Not yet built            |
| Active     | Implemented and reusable |
| Deprecated | No longer used           |

---

# Layout Components

## Navbar

### Path

```text id="y3hpkv"
components/layout/Navbar.tsx
```

### Purpose

Primary application navigation.

### Used By

* Student Dashboard
* Teacher Dashboard
* Student Profile

### Status

```text id="lnx2za"
Active
```

---

## PageContainer

### Path

```text id="dwhonw"
components/layout/PageContainer.tsx
```

### Purpose

Provides consistent width and spacing.

### Props

```ts id="ayvk88"
children: ReactNode
```

### Status

```text id="fybdxk"
Planned
```

---

# Form Components

## LoginForm

### Path

```text id="f48vay"
components/forms/LoginForm.tsx
```

### Purpose

Authentication form.

### Fields

* Email
* Password

### Status

```text id="x0njz4"
Active
```

---

## RegistrationForm

### Path

```text id="w7fw4m"
components/forms/RegistrationForm.tsx
```

### Purpose

Semester registration form.

### Fields

* Name
* Email
* DOB
* Phone Number
* Attendance

### Status

```text id="qcf3kj"
Active
```

---

## StudentProfileForm

### Path

```text id="ok9d5s"
components/forms/StudentProfileForm.tsx
```

### Purpose

Display student information.

### Status

```text id="bj2wq4"
Active
```

---

# Input Components

## TextInput

### Path

```text id="t1j8q7"
components/ui/TextInput.tsx
```

### Purpose

Reusable text input.

### Used For

* Name
* Email
* Phone

### Status

```text id="dt3i4r"
Active
```

### Props

```ts
interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}
```

---

## DateInput

### Path

```text id="d0ajqp"
components/ui/DateInput.tsx
```

### Purpose

DOB selection.

### Status

```text id="6ik9yx"
Active
```

---

## NumberInput

### Path

```text id="q7m1ij"
components/ui/NumberInput.tsx
```

### Purpose

Attendance field.

### Status

```text id="wd1r77"
Active
```

---

# Button Components

## PrimaryButton

### Path

```text id="jlwm7r"
components/ui/PrimaryButton.tsx
```

### Purpose

Primary actions.

### Examples

* Login
* Register
* Save

### Status

```text id="n8c0xm"
Active
```

### Props

```ts
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
```

---

## SecondaryButton

### Path

```text id="dshz9j"
components/ui/SecondaryButton.tsx
```

### Purpose

Secondary actions.

### Examples

* Back
* Cancel
* View Details

### Status

```text id="rqf8he"
Active
```

### Props

```ts
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
```

---

# Card Components

## StatCard

### Path

```text id="x7kvlq"
components/dashboard/StatCard.tsx
```

### Purpose

Dashboard metric display.

### Data

```ts id="gcb35g"
title: string
value: number
```

### Status

```text id="ch5m9s"
Active
```

---

## InfoCard

### Path

```text id="g0ysfd"
components/ui/InfoCard.tsx
```

### Purpose

General content container.

### Status

```text id="c8kqhl"
Active
```

---

# Table Components

## StudentTable

### Path

```text id="tgwv7h"
components/tables/StudentTable.tsx
```

### Purpose

Display all student records.

### Columns

* Name
* Email
* Phone
* Attendance
* Status
* Semester

### Status

```text id="ej0scu"
Planned
```

---

## TablePagination

### Path

```text id="2s4w7r"
components/tables/TablePagination.tsx
```

### Purpose

Reusable pagination.

### Status

```text id="92t9yf"
Planned
```

---

# Badge Components

## AttendanceBadge

### Path

```text id="2pfe2s"
components/ui/AttendanceBadge.tsx
```

### Purpose

Attendance classification display.

### Variants

```text id="rb7u85"
GOOD
WARNING
LOW
```

### Status

```text id="vl72yf"
Active
```

---

# Dashboard Components

## DashboardStats

### Path

```text id="mew20m"
components/dashboard/DashboardStats.tsx
```

### Purpose

Wrapper around stat cards.

### Status

```text id="m4mczj"
Active
```

---

## RegistrationSummary

### Path

```text id="zz9s6f"
components/dashboard/RegistrationSummary.tsx
```

### Purpose

Student registration overview.

### Status

```text id="qrzqj5"
Planned
```

---

# Modal Components

## ConfirmModal

### Path

```text id="xkkgq6"
components/ui/ConfirmModal.tsx
```

### Purpose

Confirmation dialog.

### Usage

* Delete
* Logout
* Update actions

### Status

```text id="5zmknc"
Planned
```

---

# Empty State Components

## EmptyState

### Path

```text id="r5y0kn"
components/ui/EmptyState.tsx
```

### Purpose

No data available screens.

### Examples

* No students
* No registrations

### Status

```text id="x36a7o"
Planned
```

---

# Loading Components

## LoadingSpinner

### Path

```text id="6jsh3g"
components/ui/LoadingSpinner.tsx
```

### Purpose

Loading indicator.

### Status

```text id="p1fcbg"
Planned
```

---

## SkeletonCard

### Path

```text id="nzg8y7"
components/ui/SkeletonCard.tsx
```

### Purpose

Dashboard loading state.

### Status

```text id="3aof0l"
Planned
```

---

# Reusability Rules

## Rule 1

Always reuse existing components before creating new ones.

---

## Rule 2

All buttons must use:

```text id="d0v53t"
PrimaryButton
SecondaryButton
```

---

## Rule 3

All form inputs must use shared input components.

---

## Rule 4

Dashboard metrics must always use:

```text id="4u2k0v"
StatCard
```

---

## Rule 5

Attendance labels must always use:

```text id="lkxk3v"
AttendanceBadge
```

---

# Registry Maintenance

Whenever a component is created:

1. Update status from Planned → Active.
2. Add props definition.
3. Add dependencies.
4. Add usage examples.
5. Keep registry synchronized with codebase.

This registry serves as the single source of truth for all reusable UI components in the Student Semester Registration System.
