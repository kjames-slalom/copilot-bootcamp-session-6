# Feature Specification: Support for Overdue Todo Items

**Feature Branch**: `001-overdue-todo-items`  
**Created**: 2026-03-23  
**Status**: Draft  
**Input**: User description: "Support for Overdue Todo Items"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Identify Overdue Todos at a Glance (Priority: P1)

As a user viewing my todo list, I can immediately tell which incomplete todos are overdue through clear visual distinction.

**Why this priority**: This is the core user value of the feature and directly enables prioritization decisions.

**Independent Test**: Create multiple todos with past, current, and future due dates; verify only incomplete items with due dates earlier than today are shown as overdue.

**Acceptance Scenarios**:

1. **Given** an incomplete todo with a due date before today, **When** the user views the list, **Then** the todo is shown with an overdue visual indicator.
2. **Given** an incomplete todo with a due date equal to or after today, **When** the user views the list, **Then** the todo is not shown as overdue.
3. **Given** an incomplete todo with no due date, **When** the user views the list, **Then** the todo is not shown as overdue.

---

### User Story 2 - Keep Overdue State Accurate After Edits (Priority: P2)

As a user updating todos, overdue status updates correctly when I edit due dates or completion status.

**Why this priority**: Users need trustworthy status after common interactions, not just on initial load.

**Independent Test**: Edit an overdue todo to a future date, then mark/unmark completion, and verify overdue indicator updates correctly after each change.

**Acceptance Scenarios**:

1. **Given** an overdue incomplete todo, **When** the user changes the due date to today or a future date, **Then** the overdue indicator is removed.
2. **Given** an overdue incomplete todo, **When** the user marks it complete, **Then** the overdue indicator is removed.
3. **Given** a completed todo with a past due date, **When** the user marks it incomplete, **Then** the overdue indicator appears.

---

### User Story 3 - Preserve Clarity Across Sessions (Priority: P3)

As a user returning to the app later, overdue indication remains accurate after data reload so I can resume prioritization immediately.

**Why this priority**: Persistence accuracy prevents confusion and reinforces trust in the app.

**Independent Test**: Create an overdue todo, refresh/reload the app, and confirm overdue indication remains correct for persisted data.

**Acceptance Scenarios**:

1. **Given** persisted todos that include overdue incomplete items, **When** the app reloads the list, **Then** overdue indicators are correctly shown without manual interaction.
2. **Given** persisted todos that are completed or not yet due, **When** the app reloads the list, **Then** those todos are not incorrectly flagged as overdue.

---

### Edge Cases

- Todo due exactly on today's date is not overdue.
- Todo transitions from not overdue to overdue when the date changes to the next day.
- Todo with an invalid or missing due date value is treated as not overdue and does not break list rendering.
- Overdue state is never shown for completed todos, regardless of due date.
- Rapid updates (toggle complete plus due-date edit) do not leave stale overdue indicators.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST determine overdue status for each todo using this rule: due date is earlier than the user's current date and completion status is incomplete.
- **FR-002**: System MUST display a clear visual overdue indicator for every overdue todo in list views.
- **FR-003**: System MUST NOT display overdue indicators for todos that are completed.
- **FR-004**: System MUST recalculate and update overdue status whenever a todo's due date or completion status changes.
- **FR-005**: System MUST maintain overdue status accuracy when persisted todos are reloaded.
- **FR-006**: System MUST treat todos without due dates as not overdue.
- **FR-007**: Users MUST continue to create, edit, complete, and delete todos without additional steps introduced by overdue support.
- **FR-008**: System MUST handle unparseable due-date values gracefully by avoiding incorrect overdue flagging and preserving list usability.
- **FR-009**: Overdue indication MUST be distinguishable in both available themes and must not rely on color alone.

### Key Entities *(include if feature involves data)*

- **Todo Item**: A user task containing title, optional due date, completion status, and creation metadata.
- **Overdue Presentation State**: A derived, non-persisted state indicating whether a todo should be visually marked as overdue based on due date and completion status.

## Constitution Alignment *(mandatory)*

- **CA-001 Scope Alignment**: This feature extends existing due-date and completion behavior only; it does not introduce filtering, search, reminders, or multi-user functionality.
- **CA-002 Test-First Plan**: Failing-first tests will cover overdue rule evaluation, visual indicator rendering, status recalculation after edits, and persisted reload behavior.
- **CA-003 Integration Impact**: No new data contract is required; overdue indication is derived from existing todo attributes and validated against persisted responses.
- **CA-004 UX and Accessibility**: Overdue indication will remain keyboard-accessible and theme-compatible, with visible distinction that is not color-only.

## Assumptions & Dependencies

- The application continues to operate as a single-user todo app.
- Due dates are interpreted against the user's current local calendar date.
- Existing persistence already stores due date and completion status reliably.
- The feature depends on existing list rendering and todo update flows.
- No policy or compliance constraints beyond current project documentation are introduced by this feature.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In acceptance testing, 100% of incomplete todos with past due dates are visibly identified as overdue.
- **SC-002**: In acceptance testing, 0 completed todos are incorrectly shown as overdue.
- **SC-003**: In a usability check with representative test users, at least 90% can correctly identify overdue items within 10 seconds of opening the list.
- **SC-004**: After release, at least 90% of edit/toggle operations reflect the correct overdue state immediately without requiring page reload.
