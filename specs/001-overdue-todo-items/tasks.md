# Tasks: Support for Overdue Todo Items

**Input**: Design documents from `/specs/001-overdue-todo-items/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: Tests are REQUIRED. Each user story includes failing-first test tasks.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare deterministic test data/utilities for overdue behavior.

- [x] T001 Review current todo state/render flow in packages/frontend/src/App.js
- [x] T002 [P] Create shared overdue test fixtures in packages/frontend/src/__tests__/fixtures/overdueTodos.js
- [x] T003 [P] Create deterministic local-date test helper in packages/frontend/src/__tests__/helpers/dateTestHelper.js

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared overdue logic and test harness before user-story work.

**⚠️ CRITICAL**: No user story work starts before this phase is complete.

- [x] T004 Create overdue utility module scaffold in packages/frontend/src/utils/overdueUtils.js
- [x] T005 Create overdue utility test scaffold in packages/frontend/src/utils/__tests__/overdueUtils.test.js
- [x] T006 Create overdue integration test scaffold in packages/frontend/src/__tests__/App.test.js
- [x] T007 Create overdue component test scaffold in packages/frontend/src/components/__tests__/TodoCard.test.js

**Checkpoint**: Utility/test scaffolds ready for story implementation.

---

## Phase 3: User Story 1 - Identify Overdue Todos at a Glance (Priority: P1) 🎯 MVP

**Goal**: Show overdue todos clearly and order overdue todos before non-overdue todos.

**Independent Test**: Add past/today/future/no-due todos and verify only incomplete past-due items show overdue indicator and appear at top (newest-first within groups).

### Tests for User Story 1 ⚠️

- [x] T008 [P] [US1] Add failing unit tests for overdue rule and two-group sorting in packages/frontend/src/utils/__tests__/overdueUtils.test.js
- [x] T009 [P] [US1] Add failing component test for overdue badge/class rendering in packages/frontend/src/components/__tests__/TodoCard.test.js
- [x] T010 [P] [US1] Add failing integration test for overdue-first and newest-first ordering in packages/frontend/src/__tests__/App.test.js

### Implementation for User Story 1

- [x] T011 [US1] Implement isOverdue and sortByOverdue in packages/frontend/src/utils/overdueUtils.js
- [x] T012 [US1] Apply sortByOverdue before list rendering in packages/frontend/src/App.js
- [x] T013 [US1] Render overdue badge and overdue class for overdue todos in packages/frontend/src/components/TodoCard.js
- [x] T014 [US1] Add overdue visual styles using danger token in packages/frontend/src/App.css

**Checkpoint**: US1 is independently functional and testable.

---

## Phase 4: User Story 2 - Keep Overdue State Accurate After Edits (Priority: P2)

**Goal**: Recompute overdue status/order correctly after due-date edits and completion toggles.

**Independent Test**: Edit due date and toggle completion on overdue todos; verify badge visibility and group ordering update immediately.

### Tests for User Story 2 ⚠️

- [x] T015 [US2] Add failing integration tests for edit/toggle overdue transitions in packages/frontend/src/__tests__/App.test.js

### Implementation for User Story 2

- [x] T016 [US2] Update edit/toggle state update paths to preserve overdue regrouping in packages/frontend/src/App.js
- [x] T017 [US2] Ensure overdue indicator reflects post-edit/post-toggle todo state in packages/frontend/src/components/TodoCard.js

**Checkpoint**: US2 works independently with accurate transition behavior.

---

## Phase 5: User Story 3 - Preserve Clarity Across Sessions (Priority: P3)

**Goal**: Ensure persisted todos render with correct overdue indicators and ordering after reload.

**Independent Test**: Reload with persisted mixed todos and verify overdue indicators/order are correct without manual actions.

### Tests for User Story 3 ⚠️

- [x] T018 [P] [US3] Add failing integration test for fetch-on-load overdue ordering in packages/frontend/src/__tests__/App.test.js
- [x] T019 [P] [US3] Add failing regression test that completed todos never show overdue badge in packages/frontend/src/components/__tests__/TodoCard.test.js

### Implementation for User Story 3

- [x] T020 [US3] Ensure fetchTodos render path uses overdue sort pipeline after reload in packages/frontend/src/App.js
- [x] T021 [US3] Harden invalid/missing dueDate handling for reload scenarios in packages/frontend/src/utils/overdueUtils.js

**Checkpoint**: US3 independently validates persistence/reload behavior.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final quality checks, documentation, and regression hardening.

- [x] T022 [P] Update manual acceptance steps to match implementation in specs/001-overdue-todo-items/quickstart.md
- [x] T023 Run frontend tests and capture execution notes in specs/001-overdue-todo-items/quickstart.md
- [x] T024 [P] Confirm no backend/API contract change note in specs/001-overdue-todo-items/research.md
- [x] T025 [P] Refresh overdue accessibility wording in docs/ui-guidelines.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup; blocks all user stories.
- **User Stories (Phase 3-5)**: Depend on Foundational completion.
- **Polish (Phase 6)**: Depends on completion of desired user stories.

### User Story Dependencies

- **US1 (P1)**: Starts after Phase 2; no dependency on other stories.
- **US2 (P2)**: Starts after US1 implementation baseline (utility + rendering) from Phase 3.
- **US3 (P3)**: Starts after US1 baseline; can proceed in parallel with late US2 work if shared files are coordinated.

### Within Each User Story

- Write tests first and verify they fail.
- Implement utility/state logic next.
- Implement UI rendering/styling next.
- Re-run tests and confirm pass.

---

## Parallel Opportunities

- **Setup**: T002 and T003 can run in parallel.
- **US1 tests**: T008, T009, T010 can run in parallel.
- **US3 tests**: T018 and T019 can run in parallel.
- **Polish**: T022, T024, and T025 can run in parallel.

---

## Parallel Example: User Story 1

```bash
Task: "T008 [US1] Add failing unit tests for overdue rule and two-group sorting in packages/frontend/src/utils/__tests__/overdueUtils.test.js"
Task: "T009 [US1] Add failing component test for overdue badge/class rendering in packages/frontend/src/components/__tests__/TodoCard.test.js"
Task: "T010 [US1] Add failing integration test for overdue-first and newest-first ordering in packages/frontend/src/__tests__/App.test.js"
```

---

## Implementation Strategy

### MVP First (US1)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1).
3. Validate independent test criteria for US1.
4. Demo/review MVP behavior.

### Incremental Delivery

1. Add US1 (overdue identification + ordering).
2. Add US2 (accurate transitions on edits/toggles).
3. Add US3 (reload/persistence correctness).
4. Finish with Phase 6 polish.

### Team Parallelism

1. One developer handles utility + App state pipeline.
2. One developer handles TodoCard rendering + styles.
3. One developer handles test authoring in parallel where file boundaries allow.

---

## Notes

- Tasks follow strict checklist format with sequential IDs.
- Story-labeled tasks only appear in user story phases.
- File paths are explicit for each task.
- Backend and API contracts remain unchanged for this feature.
