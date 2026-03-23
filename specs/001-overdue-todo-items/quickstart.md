# Quickstart: Support for Overdue Todo Items

**Feature**: 001-overdue-todo-items  
**Date**: 2026-03-23

---

## Prerequisites

- Node.js ≥ 16 and npm ≥ 7 installed
- Repository cloned and dependencies installed: `npm install` from repo root
- Both backend and frontend services running: `npm run start` from repo root

---

## Validate the Feature (Manual Acceptance Test)

### Step 1 — Create overdue and non-overdue todos

1. Open the app in a browser (default: http://localhost:3000)
2. Create a todo with **no due date** — should render normally, no overdue indicator.
3. Create a todo with a **future due date** (tomorrow or later) — should render normally, no overdue indicator.
4. Create a todo with a **past due date** (yesterday or earlier) — should render with a red "Overdue" label and appear at the top of the list.

### Step 2 — Verify ordering

5. Verify the overdue todo appears **above** non-overdue todos in the list.
6. Create a second overdue todo with a different past date — verify it appears in the overdue group too, with newest-created first within that group.

### Step 3 — Edit interactions

7. Edit the overdue todo to set its due date to tomorrow — verify the "Overdue" label disappears immediately and the todo moves to the non-overdue group.
8. Edit the due date back to yesterday — verify "Overdue" label reappears and todo moves back to the overdue group.

### Step 4 — Completion toggle

9. Check (complete) the overdue todo — verify the "Overdue" indicator disappears.
10. Uncheck (restore to incomplete) the same todo — verify "Overdue" indicator reappears.

### Step 5 — Reload persistence

11. Reload the page — verify overdue todos still show the indicator at the top without any manual action.

### Step 6 — Theme check

12. Toggle dark mode and verify the "Overdue" label and border color use the dark-mode danger token (#ef5350).
13. Toggle back to light mode and verify they revert to light-mode danger token (#c62828).

---

## Run Tests

```bash
# From repo root — runs all packages
npm test

# Frontend only
npm test --workspace=packages/frontend

# With coverage
npm test --workspace=packages/frontend -- --coverage
```

Expected: all tests pass; frontend coverage ≥ 80%.

---

## Key Files Modified by This Feature

| File | Change |
|---|---|
| `packages/frontend/src/utils/overdueUtils.js` | New — `isOverdue(todo)` and `sortByOverdue(todos)` utilities |
| `packages/frontend/src/components/TodoCard.js` | Modified — applies `overdue` class and "Overdue" badge when applicable |
| `packages/frontend/src/App.js` | Modified — sorts todos via `sortByOverdue` before passing to `TodoList` |
| `packages/frontend/src/App.css` | Modified — adds `.overdue` and `.overdue-badge` styles |
| `packages/frontend/src/__tests__/overdueUtils.test.js` | New — unit tests for overdue utility |
| `packages/frontend/src/components/__tests__/TodoCard.test.js` | Modified — adds overdue rendering tests |
| `packages/frontend/src/__tests__/App.test.js` | Modified — adds sort and indicator integration tests |
