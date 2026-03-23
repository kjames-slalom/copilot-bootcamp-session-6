# Research: Support for Overdue Todo Items

**Feature**: 001-overdue-todo-items  
**Date**: 2026-03-23  
**Status**: Complete — all NEEDS CLARIFICATION resolved

---

## 1. Overdue Determination Strategy

**Decision**: Client-side derived state using local date-only comparison.

**Rationale**: Due dates are stored as date-only strings (no time component) in the existing SQLite backend. The backend `dueDate` field carries no timezone info. Comparing against the user's local date via `new Date().toLocaleDateString` / date string comparison keeps the logic consistent with the user's experience and avoids UTC offset bugs. No backend change is needed.

**Alternatives considered**:
- UTC-based comparison — rejected: would drift from user's calendar experience by up to ±1 day depending on timezone.
- Server-side overdue flag — rejected: adds backend contract change, persistence of derived state, and sync complexity for no benefit in a single-user app.

**Rule**: `isOverdue = !todo.completed && todo.dueDate && (new Date(todo.dueDate + 'T00:00:00') < startOfLocalToday())`

Where `startOfLocalToday()` returns midnight of the current local date. Using `T00:00:00` suffix on the stored YYYY-MM-DD string forces local timezone parsing in JavaScript (ISO strings without timezone are parsed as UTC by `new Date()`, so the suffix is required for correctness).

---

## 2. List Sorting Strategy

**Decision**: Two-group sort: overdue-incomplete items first (newest-first within group), then all others (newest-first within group). Sort applied in App.js before passing `todos` prop to `TodoList`.

**Rationale**: Minimal change — `TodoList` and `TodoCard` are not modified for sorting; only App.js sort call changes. Newest-first within each group preserves existing mental model.

**Alternatives considered**:
- Sort entirely by due date ascending — rejected: breaks existing creation-order convention and user expectation.
- Sort in `TodoList` component — rejected: App.js already owns the `todos` state array; sorting at the source is simpler and more testable.
- Backend-side ordering — rejected: adds backend contract change; scope violation.

**Implementation pattern**:
```js
function sortTodos(todos) {
  return [...todos].sort((a, b) => {
    const aOverdue = isOverdue(a);
    const bOverdue = isOverdue(b);
    if (aOverdue !== bOverdue) return aOverdue ? -1 : 1;
    // Within same group: newest first (higher createdAt first)
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}
```

---

## 3. Visual Indicator Design

**Decision**: Apply `overdue` CSS class to the `todo-card` element which sets `border-color` and `color` to `var(--danger-color)`, and render an inline `<span class="overdue-badge">Overdue</span>` text label inside the card content area.

**Rationale**: Uses the existing `--danger-color` CSS custom property (light: `#c62828`, dark: `#ef5350`) already defined in `theme.css`; automatically theme-aware with zero new CSS variables. Text label satisfies WCAG non-color-alone requirement. Badge approach is non-disruptive to existing card layout.

**Alternatives considered**:
- Icon-only indicator — rejected: fails WCAG non-color-alone requirement.
- Color-only change — rejected: explicitly excluded by FR-009 and accessibility requirement.
- New warning color token — rejected: existing danger token satisfies the semantic meaning; adding a new token would widen the design system without approval.

---

## 4. Component Modification Scope

**Decision**: Modify `TodoCard.js` only for indicator rendering. Modify `App.js` only for sorting. No changes to `TodoList.js`, backend, or API contracts.

**Rationale**: This is the minimum change set that satisfies all FRs. `TodoList` is a pure renderer and does not need to know about overdue state. Backend contract is unchanged.

**New utility**: `src/utils/overdueUtils.js` — exports `isOverdue(todo)` and `sortByOverdue(todos)` pure functions. Extracted to a utility because the same logic is used in display (TodoCard), sorting (App.js), and tests.

---

## 5. Testing Strategy

**Decision**: Unit tests for `isOverdue` and `sortByOverdue` utility functions; unit tests for `TodoCard` overdue rendering; integration test in `App.test.js` or `TodoList.test.js` for sorted rendering with mixed overdue/non-overdue data.

**Rationale**: Pure utility functions are unit-testable in isolation. Rendering tests use `@testing-library/react` screenshot assertions. All tests must be written to fail before implementation (TDD).

**Coverage target**: Maintain ≥80% across frontend package. The new utility file should reach 100% branch coverage given its small, well-bounded logic.

---

## 6. Graceful Handling of Bad Due Date Values

**Decision**: `isOverdue` returns `false` for any todo where `dueDate` is falsy, unparseable, or produces an `Invalid Date`.

**Implementation**:
```js
export function isOverdue(todo) {
  if (todo.completed || !todo.dueDate) return false;
  const due = new Date(todo.dueDate + 'T00:00:00');
  if (isNaN(due.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return due < today;
}
```

---

## Summary of Resolved Unknowns

| Question | Decision |
|---|---|
| Date comparison timezone | Local date-only, `T00:00:00` suffix for correct JS parsing |
| Sort mechanism | Two-group in App.js, newest-first within each group |
| Visual indicator | `--danger-color` token + "Overdue" text badge |
| Modification scope | `TodoCard.js`, `App.js`, new `overdueUtils.js` — no backend changes |
| Testing approach | TDD: utility unit tests + component render tests + integration sort test |
| Invalid due dates | Return `false` from `isOverdue`, no throw, no list disruption |
