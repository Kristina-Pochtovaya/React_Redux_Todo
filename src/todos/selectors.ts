import { Store } from './store';
import { createSelector } from 'reselect';

export const getTodos = (state: Store) => state.todos.data;
export const getTodosLoading = (state: Store) => state.todos.isLoading;

export const getIncompleteTodos = createSelector(
    getTodos,
    (todos) => todos.filter(item => !item.isCompleted),
);

export const getCompletedTodos = createSelector(
    getTodos,
    (todos) => todos.filter(item => item.isCompleted),
);