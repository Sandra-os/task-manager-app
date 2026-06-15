import { useCallback, useMemo, useState } from 'react';
import { getStarterTasks } from '../data/sampleTasks.js';
import { createTask, updateTaskRecord } from '../utils/task.js';
import { useLocalStorage } from './useLocalStorage.js';

const STORAGE_KEY = 'task-manager-app.tasks.v1';

export function useTasks() {
  const [tasks, setTasks, storage] = useLocalStorage(STORAGE_KEY, getStarterTasks);
  const [actionError, setActionError] = useState(null);

  const addTask = useCallback(
    (values) => {
      try {
        const task = createTask(values);
        setTasks((currentTasks) => [task, ...currentTasks]);
        setActionError(null);
        return task;
      } catch (error) {
        setActionError(error.message);
        throw error;
      }
    },
    [setTasks],
  );

  const updateTask = useCallback(
    (taskId, values) => {
      try {
        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task.id === taskId ? updateTaskRecord(task, values) : task,
          ),
        );
        setActionError(null);
      } catch (error) {
        setActionError(error.message);
        throw error;
      }
    },
    [setTasks],
  );

  const deleteTask = useCallback(
    (taskId) => {
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
      setActionError(null);
    },
    [setTasks],
  );

  const toggleTask = useCallback(
    (taskId) => {
      const updatedAt = new Date().toISOString();

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                completed: !task.completed,
                completedAt: task.completed ? null : updatedAt,
                updatedAt,
              }
            : task,
        ),
      );
      setActionError(null);
    },
    [setTasks],
  );

  const clearCompleted = useCallback(() => {
    setTasks((currentTasks) => currentTasks.filter((task) => !task.completed));
    setActionError(null);
  }, [setTasks]);

  const clearError = useCallback(() => {
    setActionError(null);
    storage.clearError();
  }, [storage]);

  const error = useMemo(() => actionError || storage.error, [actionError, storage.error]);

  return {
    tasks,
    isLoading: storage.isLoading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearCompleted,
    clearError,
  };
}
