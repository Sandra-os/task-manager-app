import { Search, X } from 'lucide-react';

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <Search size={18} aria-hidden="true" />
      <label className="sr-only" htmlFor="task-search">
        Search tasks
      </label>
      <input
        id="task-search"
        type="search"
        placeholder="Search tasks"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          title="Clear search"
        >
          <X size={16} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}

export default SearchBar;
