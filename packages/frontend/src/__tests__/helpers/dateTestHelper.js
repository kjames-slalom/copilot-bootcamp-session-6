export function withFixedDate(dateString, callback) {
  const fixedDate = new Date(dateString);
  jest.useFakeTimers();
  jest.setSystemTime(fixedDate);

  try {
    return callback();
  } finally {
    jest.useRealTimers();
  }
}

export function dateOnlyOffset(baseDateString, offsetDays) {
  const date = new Date(baseDateString);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split('T')[0];
}

describe('date test helpers', () => {
  test('dateOnlyOffset returns the offset date string', () => {
    expect(dateOnlyOffset('2026-03-23T00:00:00Z', 1)).toBe('2026-03-24');
  });

  test('withFixedDate sets and restores fake timers', () => {
    const year = withFixedDate('2026-03-23T10:00:00Z', () => new Date().getUTCFullYear());
    expect(year).toBe(2026);
  });
});
