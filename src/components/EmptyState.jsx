import { ClipboardList, RotateCcw } from 'lucide-react';

function EmptyState({ isFiltered, onResetFilters }) {
  return (
    <div className="empty-state">
      <ClipboardList size={34} aria-hidden="true" />
      <h2>{isFiltered ? 'No matching tasks' : 'No tasks yet'}</h2>
      <p>
        {isFiltered
          ? 'Try a different search or filter combination.'
          : 'Tasks you create will appear here.'}
      </p>
      {isFiltered ? (
        <button className="secondary-action" type="button" onClick={onResetFilters}>
          <RotateCcw size={16} aria-hidden="true" />
          Reset filters
        </button>
      ) : null}
    </div>
  );
}

export default EmptyState;
