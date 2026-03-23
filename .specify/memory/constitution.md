<!--
Sync Impact Report
- Version change: template -> 1.0.0
- Modified principles:
	- Template Principle 1 -> I. Code Quality and Readability
	- Template Principle 2 -> II. Scope-First Product Delivery
	- Template Principle 3 -> III. Test-First Verification (NON-NEGOTIABLE)
	- Template Principle 4 -> IV. Integration Reliability Across Frontend and Backend
	- Template Principle 5 -> V. Accessible and Consistent User Experience
- Added sections:
	- Additional Constraints
	- Development Workflow and Quality Gates
- Removed sections:
	- None
- Templates requiring updates:
	- ✅ updated: .specify/templates/plan-template.md
	- ✅ updated: .specify/templates/spec-template.md
	- ✅ updated: .specify/templates/tasks-template.md
	- ⚠ pending review: .specify/templates/commands/*.md (directory not present)
- Follow-up TODOs:
	- None
-->

# Copilot Bootcamp Session 6 Constitution

## Core Principles

### I. Code Quality and Readability
All production code MUST follow the documented coding standards in docs/coding-guidelines.md:
2-space indentation, descriptive naming, logical module responsibility, clean import ordering,
and maintainable error handling. Code changes MUST preserve readability over cleverness and
MUST avoid duplication when a shared utility or reusable component is appropriate.
Rationale: Consistent quality rules reduce defects and review friction in a collaborative
monorepo.

### II. Scope-First Product Delivery
Implementations MUST satisfy the todo app functional requirements in docs/functional-requirements.md
and MUST NOT add out-of-scope capabilities (authentication, multi-user support, filtering,
search, tags, reminders, bulk operations, and other advanced features) unless explicitly
approved through a spec amendment.
Rationale: Enforcing scope prevents churn and keeps delivery focused on core user value.

### III. Test-First Verification (NON-NEGOTIABLE)
Every feature and bug fix MUST include tests that fail before implementation and pass after
implementation, following the Red-Green-Refactor workflow in docs/testing-guidelines.md.
Unit and integration tests are mandatory where applicable, and repository-level coverage MUST
remain at or above 80% unless a documented exception is approved in the plan's complexity
tracking section.
Rationale: Test-first verification protects behavior while enabling safe refactoring.

### IV. Integration Reliability Across Frontend and Backend
Changes that affect data flow, API contracts, or persistence MUST validate frontend/backend
integration behavior, including create, list, update, toggle completion, and delete operations.
Any contract-impacting change MUST include explicit validation of persistence behavior after
refresh and failure handling paths.
Rationale: This application's primary value depends on dependable cross-package interactions.

### V. Accessible and Consistent User Experience
UI work MUST follow docs/ui-guidelines.md, including consistent spacing, design tokens,
component states, keyboard-accessible interactions, visible focus indicators, and WCAG AA
contrast. Theme behavior (light/dark mode) MUST remain functional and persistent when relevant
to the change.
Rationale: Usability and accessibility are quality requirements, not optional enhancements.

## Additional Constraints

- Technology stack MUST remain React frontend plus Express backend in the existing npm
	workspace monorepo unless an approved architecture change is documented.
- Persistence MUST use the existing backend mechanism; schema redesigns or technology swaps
	are prohibited without explicit approval.
- Feature docs and implementation artifacts MUST remain aligned with docs/project-overview.md,
	docs/functional-requirements.md, docs/coding-guidelines.md, docs/testing-guidelines.md,
	and docs/ui-guidelines.md.

## Development Workflow and Quality Gates

- Specs MUST define independently testable user stories and measurable success criteria.
- Plans MUST pass the Constitution Check before implementation tasks begin.
- Tasks MUST include explicit testing tasks per user story and identify parallel work safely.
- Pull requests MUST show evidence that relevant tests pass and that scope boundaries were
	respected.
- Any constitution violation MUST be recorded in Complexity Tracking with rationale and the
	rejected simpler alternative.

## Governance

This constitution is the highest-priority project guidance for planning and implementation
artifacts under .specify and for day-to-day code contributions.

Amendment procedure:
1. Propose the amendment with impacted principles/sections and rationale.
2. Update dependent templates and guidance docs in the same change.
3. Record a Sync Impact Report at the top of this file.
4. Obtain maintainer approval before merging.

Versioning policy (semantic versioning):
- MAJOR: Backward-incompatible governance change, principle removal, or principle redefinition.
- MINOR: New principle/section or materially expanded mandatory guidance.
- PATCH: Clarification, wording improvement, typo fixes, or non-semantic refinements.

Compliance review expectations:
- Every plan MUST explicitly pass Constitution Check gates before and after design.
- Every task list MUST trace work to user stories and required tests.
- Reviewers MUST block merges that violate non-negotiable principles unless an explicit,
	approved exception is documented.

**Version**: 1.0.0 | **Ratified**: 2026-03-23 | **Last Amended**: 2026-03-23
