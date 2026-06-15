function createId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeTaskInput(values) {
  const title = values.title.trim();
  const notes = values.notes.trim();

  if (!title) {
    throw new Error('Task title is required.');
  }

  return {
    title,
    notes,
    dueDate: values.dueDate || '',
    priority: values.priority || 'medium',
  };
}

export function createTask(values) {
  const timestamp = new Date().toISOString();

  return {
    id: createId(),
    ...normalizeTaskInput(values),
    completed: false,
    createdAt: timestamp,
    updatedAt: timestamp,
    completedAt: null,
  };
}

export function updateTaskRecord(task, values) {
  return {
    ...task,
    ...normalizeTaskInput(values),
    updatedAt: new Date().toISOString(),
  };
}
