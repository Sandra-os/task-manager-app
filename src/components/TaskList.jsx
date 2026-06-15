import EmptyState from './EmptyState.jsx';
import LoadingState from './LoadingState.jsx';
import TaskItem from './TaskItem.jsx';

function TaskList({
  tasks,
  isLoading,
  isFiltered,
  onResetFilters,
  onToggleTask,
  onUpdateTask,
  onDeleteTask,
}) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (!tasks.length) {
    return <EmptyState isFiltered={isFiltered} onResetFilters={onResetFilters} />;
  }

  return (
    <div className="task-list" aria-live="polite">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onUpdate={onUpdateTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
