import { useMemo, useState } from 'react';
import AppHeader from './components/AppHeader.jsx';
import ErrorState from './components/ErrorState.jsx';
import FilterBar from './components/FilterBar.jsx';
import SearchBar from './components/SearchBar.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import { filterTasks, getTaskStats } from './utils/filters.js';
import { useTasks } from './hooks/useTasks.js';

const DEFAULT_FILTERS = {
  status: 'all',
  priority: 'all',
  query: '',
};

function App() {
  const {
    tasks,
    isLoading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearCompleted,
    clearError,
  } = useTasks();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const stats = useMemo(() => getTaskStats(tasks), [tasks]);
  const visibleTasks = useMemo(() => filterTasks(tasks, filters), [tasks, filters]);

  const hasActiveFilters =
    filters.status !== DEFAULT_FILTERS.status ||
    filters.priority !== DEFAULT_FILTERS.priority ||
    filters.query.trim() !== DEFAULT_FILTERS.query;

  function updateFilters(nextFilters) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      ...nextFilters,
    }));
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  return (
    <main className="app-shell">
      <section className="workspace" aria-label="Task manager workspace">
        <AppHeader stats={stats} onClearCompleted={clearCompleted} />

        {error ? <ErrorState message={error} onDismiss={clearError} /> : null}

        <div className="app-layout">
          <section className="composer-panel" aria-labelledby="task-form-heading">
            <TaskForm onSubmit={addTask} />
          </section>

          <section className="tasks-panel" aria-label="Tasks">
            <div className="task-toolbar">
              <SearchBar
                value={filters.query}
                onChange={(query) => updateFilters({ query })}
              />
              <FilterBar
                status={filters.status}
                priority={filters.priority}
                onStatusChange={(status) => updateFilters({ status })}
                onPriorityChange={(priority) => updateFilters({ priority })}
              />
            </div>

            <TaskList
              tasks={visibleTasks}
              isLoading={isLoading}
              isFiltered={hasActiveFilters}
              onResetFilters={resetFilters}
              onToggleTask={toggleTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
            />
          </section>
        </div>
      </section>
    </main>
  );
}

export default App;
