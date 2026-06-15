import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Pencil,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { formatDueDate, getDueStatus } from '../utils/date.js';
import { PRIORITIES } from '../utils/filters.js';
import TaskForm from './TaskForm.jsx';

function TaskItem({ task, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const dueStatus = getDueStatus(task);

  if (isEditing) {
    return (
      <article className="task-item editing" data-priority={task.priority}>
        <TaskForm
          mode="edit"
          initialTask={task}
          onSubmit={(values) => {
            onUpdate(task.id, values);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </article>
    );
  }

  return (
    <article
      className={task.completed ? 'task-item completed' : 'task-item'}
      data-priority={task.priority}
    >
      <button
        className="complete-toggle"
        type="button"
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
        title={task.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {task.completed ? (
          <CheckCircle2 size={24} aria-hidden="true" />
        ) : (
          <Circle size={24} aria-hidden="true" />
        )}
      </button>

      <div className="task-content">
        <div className="task-title-row">
          <h3>{task.title}</h3>
          <span className="priority-badge" data-priority={task.priority}>
            {PRIORITIES[task.priority].label}
          </span>
        </div>

        {task.notes ? <p className="task-notes">{task.notes}</p> : null}

        <div className="task-meta">
          <span className="due-badge" data-status={dueStatus}>
            <CalendarDays size={14} aria-hidden="true" />
            {formatDueDate(task.dueDate)}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button type="button" onClick={() => setIsEditing(true)} aria-label="Edit task" title="Edit task">
          <Pencil size={17} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => onDelete(task.id)} aria-label="Delete task" title="Delete task">
          <Trash2 size={17} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export default TaskItem;
