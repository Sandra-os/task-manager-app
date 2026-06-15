import { AlertTriangle, CheckCircle2, CircleDot, Flag, ListFilter } from 'lucide-react';
import { PRIORITY_FILTERS, STATUS_FILTERS } from '../utils/filters.js';

const STATUS_ICONS = {
  all: ListFilter,
  active: CircleDot,
  completed: CheckCircle2,
  overdue: AlertTriangle,
};

function FilterBar({ status, priority, onStatusChange, onPriorityChange }) {
  return (
    <div className="filter-bar" aria-label="Task filters">
      <div className="segmented-control" role="group" aria-label="Status filter">
        {STATUS_FILTERS.map((filter) => {
          const Icon = STATUS_ICONS[filter.value];

          return (
            <button
              className={status === filter.value ? 'filter-button active' : 'filter-button'}
              key={filter.value}
              type="button"
              onClick={() => onStatusChange(filter.value)}
            >
              <Icon size={15} aria-hidden="true" />
              {filter.label}
            </button>
          );
        })}
      </div>

      <label className="priority-select">
        <Flag size={16} aria-hidden="true" />
        <span className="sr-only">Priority filter</span>
        <select value={priority} onChange={(event) => onPriorityChange(event.target.value)}>
          {PRIORITY_FILTERS.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default FilterBar;
