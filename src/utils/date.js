const DAY_IN_MS = 24 * 60 * 60 * 1000;

function pad(value) {
  return String(value).padStart(2, '0');
}

export function toInputDate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function getTodayDate() {
  return toInputDate(new Date());
}

export function addDaysToInputDate(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return toInputDate(date);
}

export function parseInputDate(value) {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split('-').map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

export function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function isTaskOverdue(task) {
  const dueDate = parseInputDate(task.dueDate);
  return Boolean(dueDate && !task.completed && dueDate < startOfToday());
}

export function getDueStatus(task) {
  const dueDate = parseInputDate(task.dueDate);

  if (!dueDate) {
    return 'none';
  }

  if (task.completed) {
    return 'complete';
  }

  const today = startOfToday();
  const diffDays = Math.round((dueDate - today) / DAY_IN_MS);

  if (diffDays < 0) {
    return 'overdue';
  }

  if (diffDays === 0) {
    return 'today';
  }

  return 'upcoming';
}

export function formatDueDate(value) {
  const dueDate = parseInputDate(value);

  if (!dueDate) {
    return 'No due date';
  }

  const today = startOfToday();
  const diffDays = Math.round((dueDate - today) / DAY_IN_MS);

  if (diffDays === -1) {
    return 'Yesterday';
  }

  if (diffDays === 0) {
    return 'Today';
  }

  if (diffDays === 1) {
    return 'Tomorrow';
  }

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: dueDate.getFullYear() === today.getFullYear() ? undefined : 'numeric',
  }).format(dueDate);
}
