# ui_rules.md

# UI Rules

These rules define how the interface behaves across the application.

All pages must follow the Academic Architecturalism design system and remain clean, minimal, and institutional.

---

# Layout Rules

## Page Structure

All pages follow:

```text
Navbar
↓
Page Content
↓
Footer (optional)
```

---

## Maximum Width

```css
max-width: 1440px;
margin: auto;
```

---

## Page Padding

### Desktop

```css
padding: 64px;
```

### Mobile

```css
padding: 20px;
```

---

## Section Spacing

```css
gap: 48px;
```

Between major page sections.

---

# Navigation Rules

## Top Navigation

Visible on every authenticated page.

Links:

```text
Dashboard
Students
Profile
Logout
```

---

## Active Navigation

```css
font-weight: 700;
border-bottom: 1px solid black;
```

---

## Mobile Navigation

Collapse into menu button below 768px.

---

# Card Rules

All dashboard content lives inside cards.

---

## Standard Card

```css
background: var(--surface);
border: 1px solid var(--border);
padding: 24px;
```

---

## Dashboard Stat Card

Contains:

* Metric Label
* Metric Value
* Optional Trend

Example:

```text
Total Students

1,245
```

---

# Form Rules

## Form Width

```css
max-width: 720px;
```

---

## Labels

Always above inputs.

Example:

```text
Full Name
[ Input ]
```

Never use floating labels.

---

## Required Fields

Display:

```text
*
```

after label.

Example:

```text
Email *
```

---

## Input Fields

Use:

* Full width
* Consistent height
* Clear borders

```css
height: 48px;
```

---

## Validation Errors

Show directly below field.

Example:

```text
Please enter a valid email address.
```

Color:

```css
var(--error)
```

---

# Registration Form Rules

Field order must always be:

1. Name
2. Email
3. DOB
4. Phone Number
5. Attendance

Never change order.

---

## Attendance Input

Use:

```text
0 – 100
```

number input.

---

# Button Rules

## Primary Button

Used for:

* Login
* Register
* Save

Style:

```css
background: black;
color: white;
```

---

## Secondary Button

Used for:

* Cancel
* Back
* View Details

---

## Loading State

Replace text with:

```text
Processing...
```

Disable button while request runs.

---

# Dashboard Rules

## Teacher Dashboard

Always show:

### Card 1

Registrations Today

### Card 2

Total Students

### Card 3

Low Attendance

### Card 4

Average Attendance

---

## Card Layout

Desktop:

```text
4 Columns
```

Mobile:

```text
1 Column
```

---

# Table Rules

## Student Table Columns

```text
Name
Email
Phone
Attendance
Status
Semester
Actions
```

---

## Attendance Status Badge

### GOOD

Green

### WARNING

Orange

### LOW

Red

---

## Row Actions

Actions menu:

```text
View
Edit
```

---

# Search Rules

Search by:

* Name
* Email

Search updates table immediately after submit.

---

# Empty States

## No Students

Display:

```text
No student records found.
```

Show button:

```text
Refresh
```

---

## No Registrations

Display:

```text
No registrations available.
```

---

# Loading States

## Dashboard

Show skeleton cards.

Count:

```text
4 skeleton cards
```

---

## Tables

Show loading rows.

Count:

```text
5 rows
```

---

# Error States

## Server Error

Display:

```text
Something went wrong.
Please try again.
```

---

## Database Error

Display:

```text
Unable to load records.
```

---

# Success States

## Registration Success

Display:

```text
Registration Completed
```

Show:

* Name
* Semester
* Registration Date

---

# Accessibility Rules

Every form field must have:

```html
<label>
```

association.

---

All buttons must have:

```html
aria-label
```

when needed.

---

Minimum touch target:

```css
44px
```

---

# Responsive Rules

## Mobile (<768px)

* Single column layouts
* Stacked cards
* Full width buttons

---

## Tablet (768px–1024px)

* Two column layouts
* Reduced spacing

---

## Desktop (>1024px)

* Full dashboard grid
* Expanded tables

---

# Dark Mode

Version 1:

```text
Not Supported
```

All pages use light mode only.

---

# UI Non-Violation Rules

1. Never place business logic inside UI components.
2. Never fetch database data directly from components.
3. Never use custom colors outside design tokens.
4. Never change registration form field order.
5. Always show validation feedback.
6. Always maintain responsive layouts.
7. Preserve whitespace-heavy academic aesthetic.
8. Keep interfaces minimal and distraction-free.
