import { isOverdue, sortByOverdue } from '../overdueUtils';

describe('overdueUtils', () => {
  const now = new Date('2026-03-23T10:00:00');

  describe('isOverdue', () => {
    test('returns true for incomplete todo due before today', () => {
      const todo = { dueDate: '2026-03-22', completed: 0 };
      expect(isOverdue(todo, now)).toBe(true);
    });

    test('returns false for todo due today', () => {
      const todo = { dueDate: '2026-03-23', completed: 0 };
      expect(isOverdue(todo, now)).toBe(false);
    });

    test('returns false for future due date', () => {
      const todo = { dueDate: '2026-03-24', completed: 0 };
      expect(isOverdue(todo, now)).toBe(false);
    });

    test('returns false for completed todo even if due date is past', () => {
      const todo = { dueDate: '2026-03-20', completed: 1 };
      expect(isOverdue(todo, now)).toBe(false);
    });

    test('returns false when due date is missing', () => {
      const todo = { completed: 0 };
      expect(isOverdue(todo, now)).toBe(false);
    });

    test('returns false when due date is invalid', () => {
      const todo = { dueDate: 'not-a-date', completed: 0 };
      expect(isOverdue(todo, now)).toBe(false);
    });
  });

  describe('sortByOverdue', () => {
    test('puts overdue incomplete todos first, then newest-first within groups', () => {
      const todos = [
        {
          id: 1,
          title: 'Non-overdue newer',
          dueDate: '2026-03-24',
          completed: 0,
          createdAt: '2026-03-22T10:00:00Z',
        },
        {
          id: 2,
          title: 'Overdue older',
          dueDate: '2026-03-21',
          completed: 0,
          createdAt: '2026-03-20T10:00:00Z',
        },
        {
          id: 3,
          title: 'Overdue newer',
          dueDate: '2026-03-22',
          completed: 0,
          createdAt: '2026-03-21T10:00:00Z',
        },
      ];

      const sorted = sortByOverdue(todos, now);
      expect(sorted.map((todo) => todo.id)).toEqual([3, 2, 1]);
    });

    test('returns empty array for non-array input', () => {
      expect(sortByOverdue(null, now)).toEqual([]);
      expect(sortByOverdue(undefined, now)).toEqual([]);
    });
  });
});
