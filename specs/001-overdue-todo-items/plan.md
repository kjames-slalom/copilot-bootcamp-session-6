# Implementation Plan: Support for Overdue Todo Items

**Branch**: `001-overdue-todo-items` | **Date**: 2026-03-23 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-overdue-todo-items/spec.md`

## Summary

Add visual overdue indication and overdue-first list sorting to the React todo app. A todo is overdue when it is incomplete and its date-only due date (interpreted in the user's local timezone) is strictly before today. Overdue todos sort to the top of the list (newest-first within overdue group, then remaining todos newest-first). The indicator uses the existing `--danger-color` CSS token plus an explicit "Overdue" text label. All logic is client-side derived; no backend or API contract changes are required.

## Technical Context

**Language/Version**: JavaScript (ES2020+), React 18, Node.js 16+  
**Primary Dependencies**: React, @testing-library/react, Jest (frontend); Express, better-sqlite3 (backend — unchanged)  
**Storage**: SQLite via better-sqlite3 — no schema changes; `dueDate` and `completed` fields already exist  
**Testing**: Jest + @testing-library/react (frontend); Jest (backend — no backend tests for this feature)  
**Target Platform**: Web browser (desktop-focused), served from Node.js/Express dev server  
**Project Type**: Web application — React SPA frontend + Express REST backend (monorepo)  
**Performance Goals**: Client-side sort and derived state only; no latency targets; renders synchronously with existing state  
**Constraints**: No UTC conversion for overdue determination; WCAG AA contrast; light+dark theme support  
**Scale/Scope**: Single-user; small todo list; no pagination concern

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Code quality approach is defined: 2-space indent, camelCase, `overdueUtils.js` utility extracted for SRP, consistent import order, no duplication of due-date logic.
- [x] Scope control is explicit: feature adds only overdue indication and sorting; no authentication, filtering, search, reminders, or bulk ops; backend unchanged.
- [x] Test-first strategy is defined: failing unit tests for `isOverdue`/`sortByOverdue` utilities, failing render tests for `TodoCard` overdue state, failing integration test for sorted list output — all written before implementation; coverage target ≥80%.
- [x] Integration reliability covered: no API contract change; overdue is derived from existing `dueDate` and `completed` fields returned by `GET /api/todos`; persistence validated in quickstart acceptance test.
- [x] UI/accessibility addressed: `--danger-color` token used (theme-aware), "Overdue" text label satisfies non-color-alone rule, keyboard access unchanged, WCAG AA maintained.
- [x] No constitution violations — Complexity Tracking table not required.

## Project Structure

### Documentation (this feature)

```text
specs/001-overdue-todo-items/
├── plan.md         ✅ this file
├── research.md     ✅ Phase 0 complete
├── data-model.md   ✅ Phase 1 complete
├── quickstart.md   ✅ Phase 1 complete
├── contracts/      N/A — no new API contract; overdue is client-side derived state only
└── tasks.md        Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
packages/
├── frontend/
│   └── src/
│       ├── utils/
│       │   └── overdueUtils.js          NEW  — isOverdue(todo), sortByOverdue(todos)
│       ├── components/
│       │   └── TodoCard.js              MODIFIED — overdue class + "Overdue" badge
│       ├── App.js                       MODIFIED — sortByOverdue applied before render
│       ├── App.css                      MODIFIED — .overdue, .overdue-badge styles
│       └── __tests__/
│           ├── overdueUtils.test.js     NEW  — unit tests for overdue utility
│           ├── App.test.js              MODIFIED — sort + indicator integration tests
│           └── components/
│               └── __tests__/
│                   └── TodoCard.test.js MODIFIED — overdue rendering tests
└── backend/                             NO CHANGES
```

**Structure Decision**: Web application (Option 2 layout). Only the frontend package is modified. No backend changes required.

## Complexity Tracking

No constitution violations. Table not required.
