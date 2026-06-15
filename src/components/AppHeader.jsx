import { AlertTriangle, CheckCircle2, Flame, ListTodo, Trash2 } from 'lucide-react';
import StatCard from './StatCard.jsx';

function AppHeader({ stats, onClearCompleted }) {
  return (
    <header className="app-header">
      <div className="title-row">
        <div>
          <p className="kicker">Task Manager</p>
          <h1>Today’s Work</h1>
        </div>

        {stats.completed > 0 ? (
          <button className="secondary-action" type="button" onClick={onClearCompleted}>
            <Trash2 size={16} aria-hidden="true" />
            Clear completed
          </button>
        ) : null}
      </div>

      <div className="stats-grid" aria-label="Task summary">
        <StatCard label="Total" value={stats.total} icon={ListTodo} tone="blue" />
        <StatCard label="Active" value={stats.active} icon={Flame} tone="teal" />
        <StatCard label="Completed" value={`${stats.completionRate}%`} icon={CheckCircle2} tone="green" />
        <StatCard label="Overdue" value={stats.overdue} icon={AlertTriangle} tone="red" />
      </div>
    </header>
  );
}

export default AppHeader;
