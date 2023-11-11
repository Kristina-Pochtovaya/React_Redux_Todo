import { TodoItem } from './reducers';

export enum ActionsType {
    CREATE_TODO = 'CREATE_TODO',
    REMOVE_TODO = 'REMOVE_TODO',
    MAKE_TODO_COMPLETED = 'MAKE_TODO_COMPLETED',
    LOAD_TODOS_IN_PROGRESS = 'LOAD_TODOS_IN_PROGRESS',
    LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS',
    LOAD_TODOS_FAILURE = 'LOAD_TODOS_FAILURE',
}

export const createTodo = (todo: TodoItem) => ({
    type: ActionsType.CREATE_TODO,
    payload: { todo },
});

export const removeTodo = (todo: TodoItem) => ({
    type: ActionsType.REMOVE_TODO,
    payload: { todo },
});

export const completeTodo = (todo: TodoItem) => ({
    type: ActionsType.MAKE_TODO_COMPLETED,
    payload: { todo },
});

export const loadTodosInProgress = () => ({
    type: ActionsType.LOAD_TODOS_IN_PROGRESS,
});

export const loadTodosSuccess = (todos: TodoItem[]) => ({
    type: ActionsType.LOAD_TODOS_SUCCESS,
    payload: { todos }
});

export const loadTodosFailure = () => ({
    type: ActionsType.LOAD_TODOS_FAILURE,
});