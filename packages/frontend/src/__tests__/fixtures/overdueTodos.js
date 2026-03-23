function toIsoDateWithOffset(daysFromToday) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + daysFromToday);
  return date.toISOString().split('T')[0];
}

export function createOverdueTestTodos() {
  return [
    {
      id: 1,
      title: 'Past due incomplete',
      dueDate: toIsoDateWithOffset(-1),
      completed: 0,
      createdAt: '2025-11-03T00:00:00Z',
    },
    {
      id: 2,
      title: 'Future due incomplete',
      dueDate: toIsoDateWithOffset(1),
      completed: 0,
      createdAt: '2025-11-02T00:00:00Z',
    },
    {
      id: 3,
      title: 'Past due complete',
      dueDate: toIsoDateWithOffset(-2),
      completed: 1,
      createdAt: '2025-11-01T00:00:00Z',
    },
    {
      id: 4,
      title: 'No due date',
      dueDate: null,
      completed: 0,
      createdAt: '2025-11-04T00:00:00Z',
    },
  ];
}

export { toIsoDateWithOffset };

describe('overdue test fixtures', () => {
  test('builds mixed overdue fixture set', () => {
    const todos = createOverdueTestTodos();
    expect(todos).toHaveLength(4);
    expect(todos.some((todo) => todo.dueDate === null)).toBe(true);
  });
});
