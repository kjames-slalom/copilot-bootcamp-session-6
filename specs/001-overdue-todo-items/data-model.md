# Data Model: Support for Overdue Todo Items

**Feature**: 001-overdue-todo-items  
**Date**: 2026-03-23

---

## Existing Entity: Todo Item

No schema changes are required. All overdue behavior is derived client-side from existing fields.

| Field | Type | Constraints | Notes |
|---|---|---|---|
| `id` | integer | primary key, auto-increment | Unchanged |
| `title` | string | required, max 255 chars | Unchanged |
| `dueDate` | string (YYYY-MM-DD) | optional, nullable | Stored as date-only text; used by overdue rule |
| `completed` | boolean (0/1) | required, default false | Used by overdue rule |
| `createdAt` | string (ISO datetime) | auto-set on insert | Used for newest-first ordering within groups |

---

## Derived State: Overdue Presentation State

This is a **non-persisted, client-side derived state**. It is never stored in the database or included in API responses.

| Property | Type | Derivation Rule |
|---|---|---|
| `isOverdue` | boolean | `!todo.completed && !!todo.dueDate && new Date(todo.dueDate + 'T00:00:00') < startOfLocalToday()` |

### Overdue Rule

- A todo is overdue when all three conditions hold simultaneously:
  1. `completed` is `false`
  2. `dueDate` is a non-null, valid date-only string
  3. The due date (interpreted in local timezone via `T00:00:00` suffix) is strictly before midnight of today's local date

- A todo is **not** overdue if:
  - It is completed
  - It has no due date
  - Its due date is today or a future date
  - Its `dueDate` value is unparseable (treated as not overdue; never throws)

---

## Sort Order State

Derived at render time in `App.js`, not persisted.

**Algorithm**:
1. Group 1: todos where `isOverdue === true`, sorted by `createdAt` descending
2. Group 2: all other todos, sorted by `createdAt` descending
3. Concatenate Group 1 then Group 2

---

## Entity Validation Rules (unchanged)

- Title: required, string, 1–255 characters, trimmed
- Due Date: optional; if provided, YYYY-MM-DD format; null/omitted treated as no due date
- Completed: boolean; defaults to false on creation

---

## State Transitions

```
Todo created (completed: false, dueDate: null)
  -> isOverdue: false (no due date)

Todo created (completed: false, dueDate: future)
  -> isOverdue: false (future date)

Date passes due date at local 00:00
  -> isOverdue: true (local clock crosses threshold)

User marks todo complete
  -> isOverdue: false (completed overrides date rule)

User marks todo incomplete (was completed, past due date)
  -> isOverdue: true (reverts to date-based rule)

User edits due date to today or future
  -> isOverdue: false

User edits due date to past date
  -> isOverdue: true (if still incomplete)
```
