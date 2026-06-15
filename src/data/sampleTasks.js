import { addDaysToInputDate, getTodayDate } from '../utils/date.js';

const now = () => new Date().toISOString();

export function getStarterTasks() {
  const createdAt = now();

  return [
    {
      id: 'starter-focus-plan',
      title: 'Map the weekly product priorities',
      notes: 'Confirm the top outcomes and break them into shippable work.',
      priority: 'high',
      dueDate: getTodayDate(),
      completed: false,
      createdAt,
      updatedAt: createdAt,
      completedAt: null,
    },
    {
      id: 'starter-design-pass',
      title: 'Review dashboard interaction details',
      notes: 'Check empty states, filters, keyboard focus, and mobile spacing.',
      priority: 'medium',
      dueDate: addDaysToInputDate(2),
      completed: false,
      createdAt,
      updatedAt: createdAt,
      completedAt: null,
    },
    {
      id: 'starter-retro',
      title: 'Send sprint notes to the team',
      notes: '',
      priority: 'low',
      dueDate: addDaysToInputDate(-1),
      completed: true,
      createdAt,
      updatedAt: createdAt,
      completedAt: createdAt,
    },
  ];
}
