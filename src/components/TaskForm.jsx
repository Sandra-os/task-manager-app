import { CalendarDays, Check, FileText, Flag, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PRIORITIES } from '../utils/filters.js';

const BLANK_TASK = {
  title: '',
  notes: '',
  dueDate: '',
  priority: 'medium',
};

function getFormState(initialTask) {
  if (!initialTask) {
    return BLANK_TASK;
  }

  return {
    title: initialTask.title,
    notes: initialTask.notes,
    dueDate: initialTask.dueDate,
    priority: initialTask.priority,
  };
}

function TaskForm({ initialTask, mode = 'create', onSubmit, onCancel }) {
  const [form, setForm] = useState(() => getFormState(initialTask));
  const [error, setError] = useState('');

  useEffect(() => {
    setForm(getFormState(initialTask));
    setError('');
  }, [initialTask]);

  const isEditing = mode === 'edit';

  function updateField(field, value) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError('Add a task title before saving.');
      return;
    }

    try {
      onSubmit({
        title: form.title,
        notes: form.notes,
        dueDate: form.dueDate,
        priority: form.priority,
      });

      if (!isEditing) {
        setForm(BLANK_TASK);
      }

      setError('');
    } catch (submitError) {
      setError(submitError.message);
    }
  }

  return (
    <form className={isEditing ? 'task-form compact' : 'task-form'} onSubmit={handleSubmit}>
      {!isEditing ? (
        <div className="form-heading">
          <h2 id="task-form-heading">Add task</h2>
        </div>
      ) : null}

      <label className="field">
        <span>Title</span>
        <input
          type="text"
          value={form.title}
          onChange={(event) => updateField('title', event.target.value)}
          placeholder="Write task title"
          maxLength={90}
        />
      </label>

      <label className="field">
        <span>Notes</span>
        <span className="textarea-shell">
          <FileText size={16} aria-hidden="true" />
          <textarea
            value={form.notes}
            onChange={(event) => updateField('notes', event.target.value)}
            placeholder="Optional context"
            maxLength={220}
            rows={isEditing ? 2 : 4}
          />
        </span>
      </label>

      <div className="form-grid">
        <label className="field">
          <span>Due date</span>
          <span className="input-with-icon">
            <CalendarDays size={16} aria-hidden="true" />
            <input
              type="date"
              value={form.dueDate}
              onChange={(event) => updateField('dueDate', event.target.value)}
            />
          </span>
        </label>

        <label className="field">
          <span>Priority</span>
          <span className="input-with-icon">
            <Flag size={16} aria-hidden="true" />
            <select
              value={form.priority}
              onChange={(event) => updateField('priority', event.target.value)}
            >
              {Object.entries(PRIORITIES).map(([value, priority]) => (
                <option key={value} value={value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </span>
        </label>
      </div>

      {error ? <p className="form-error">{error}</p> : null}

      <div className="form-actions">
        {isEditing ? (
          <button className="ghost-action" type="button" onClick={onCancel}>
            <X size={16} aria-hidden="true" />
            Cancel
          </button>
        ) : null}

        <button className="primary-action" type="submit">
          {isEditing ? <Check size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
          {isEditing ? 'Save changes' : 'Add task'}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
