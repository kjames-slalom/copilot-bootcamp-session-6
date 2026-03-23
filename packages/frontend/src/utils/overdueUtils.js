export function isOverdue(todo, now = new Date()) {
  if (!todo || !todo.dueDate || Boolean(todo.completed)) {
    return false;
  }

  const dueDate = new Date(`${todo.dueDate}T00:00:00`);
  if (Number.isNaN(dueDate.getTime())) {
    return false;
  }

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  return dueDate < startOfToday;
}

function parseCreatedAt(createdAt) {
  const parsed = new Date(createdAt);
  return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
}

export function sortByOverdue(todos, now = new Date()) {
  if (!Array.isArray(todos)) {
    return [];
  }

  return [...todos].sort((a, b) => {
    const aOverdue = isOverdue(a, now);
    const bOverdue = isOverdue(b, now);

    if (aOverdue !== bOverdue) {
      return aOverdue ? -1 : 1;
    }

    return parseCreatedAt(b.createdAt) - parseCreatedAt(a.createdAt);
  });
}
