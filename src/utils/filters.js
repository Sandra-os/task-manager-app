import { isTaskOverdue, parseInputDate } from './date.js';

export const STATUS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'overdue', label: 'Overdue' },
];

export const PRIORITIES = {
  high: {
    label: 'High',
    weight: 3,
  },
  medium: {
    label: 'Medium',
    weight: 2,
  },
  low: {
    label: 'Low',
    weight: 1,
  },
};

export const PRIORITY_FILTERS = [
  { value: 'all', label: 'All priorities' },
  { value: 'high', label: 'High priority' },
  { value: 'medium', label: 'Medium priority' },
  { value: 'low', label: 'Low priority' },
];

function normalize(value) {
  return value.trim().toLowerCase();
}

function getDateTime(value) {
  const date = parseInputDate(value);
  return date ? date.getTime() : Number.POSITIVE_INFINITY;
}

export function filterTasks(tasks, filters) {
  const query = normalize(filters.query || '');

  return tasks
    .filter((task) => {
      if (filters.status === 'active' && task.completed) {
        return false;
      }

      if (filters.status === 'completed' && !task.completed) {
        return false;
      }

      if (filters.status === 'overdue' && !isTaskOverdue(task)) {
        return false;
      }

      if (filters.priority !== 'all' && task.priority !== filters.priority) {
        return false;
      }

      if (!query) {
        return true;
      }

      return `${task.title} ${task.notes}`.toLowerCase().includes(query);
    })
    // Keep the most actionable work first: active, overdue, higher priority, then nearest due date.
    .sort((firstTask, secondTask) => {
      if (firstTask.completed !== secondTask.completed) {
        return firstTask.completed ? 1 : -1;
      }

      const firstOverdue = isTaskOverdue(firstTask);
      const secondOverdue = isTaskOverdue(secondTask);

      if (firstOverdue !== secondOverdue) {
        return firstOverdue ? -1 : 1;
      }

      const priorityDifference =
        PRIORITIES[secondTask.priority].weight - PRIORITIES[firstTask.priority].weight;

      if (priorityDifference !== 0) {
        return priorityDifference;
      }

      const dueDateDifference = getDateTime(firstTask.dueDate) - getDateTime(secondTask.dueDate);

      if (dueDateDifference !== 0) {
        return dueDateDifference;
      }

      return new Date(secondTask.createdAt).getTime() - new Date(firstTask.createdAt).getTime();
    });
}

export function getTaskStats(tasks) {
  const completed = tasks.filter((task) => task.completed).length;
  const active = tasks.length - completed;

  return {
    total: tasks.length,
    active,
    completed,
    overdue: tasks.filter(isTaskOverdue).length,
    highPriority: tasks.filter((task) => task.priority === 'high' && !task.completed).length,
    completionRate: tasks.length ? Math.round((completed / tasks.length) * 100) : 0,
  };
}
