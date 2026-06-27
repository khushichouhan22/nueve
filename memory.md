# Memory — Course Selection & UI Overhaul

Last updated: 2026-06-27 14:07:00 +05:30

## What was built
- Overhauled the Student Dashboard layout to enforce a strict 12-column CSS grid, preventing the profile card from expanding excessively and breaking the design.
- Realigned the Profile Edit page to match the proportions of the Registration page (max-w-3xl, centered).
- Added a full-stack **Course Selection** feature:
  - Updated the PostgreSQL users table schema to include a courses: text("courses").array() field.
  - Updated Zod validation schemas (RegistrationSchema, UpdateStudentSchema) to accept a string array of courses.
  - Updated the server actions (submitRegistration, updateStudent, updateStudentProfile) to correctly save and update the courses in the database.
  - Bound the course checkboxes to eact-hook-form in RegistrationForm.tsx and duplicated the selection block to StudentProfileForm.tsx.
  - Displayed selected courses in a new "My Courses" widget on the Student Dashboard.
  - Displayed selected courses in the Teacher Dashboard's StudentDetailPanel.tsx.
- Overhauled the PDF Transcript generator (exportTranscript in StudentDetailPanel.tsx) using jsPDF to create a highly professional, brutalist-inspired document that includes the newly added courses. 
- Removed "Program" and "Credits" from the Teacher UI and the generated PDF transcript.

## Decisions made
- Chose to use a simple text array field for courses in the users table instead of creating a normalized relational structure (e.g., separate courses and student_courses tables) to keep the architecture simple and aligned with the current feature scope.
- Enforced a hard 12-column grid (lg:grid-cols-12) with strict column spans instead of Flexbox on the Student Dashboard to ensure the layout remains identical to the design mockups across all large screens.

## Problems solved
- Fixed a layout collapse on the Student Dashboard where the yellow profile card was taking up too much horizontal space and squashing the internal stats grid into single rows.
- Corrected a visual misalignment in the Teacher's StudentDetailPanel.tsx where the "Registration Date" was stacked instead of rendering inline alongside the other data points.

## Current state
- The UI perfectly matches the requested mockups, employing a high-contrast brutalist design with thick borders and drop shadows.
- Students can register with courses, view them on their dashboard, and edit them via their profile page.
- Teachers can view student details and download a well-formatted PDF transcript that includes the student's selected courses.
- The codebase builds successfully without TypeScript errors.

## Next session starts with
- Review the progress_tracker.md to identify the next pending feature, or proceed with hooking up real data to the Administrator Dashboard metrics (e.g., Registrations Today, Total Students).

## Open questions
- None.
