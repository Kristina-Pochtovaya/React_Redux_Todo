import {loadTodosInProgress, loadTodosSuccess, loadTodosFailure, createTodo, removeTodo, completeTodo} from './actions';
import { TodoItem } from './reducers';
import { Action, Dispatch } from 'redux';
import { Store } from './store';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

type MyRootState = Store;
type MyExtraArg = undefined;
export type MyThunkResult<R> = ThunkAction<R, MyRootState, MyExtraArg, Action>;
export type MyThunkDispatch = ThunkDispatch<MyRootState, MyExtraArg, Action>;

export const loadTodos = () => async (dispatch: Dispatch) => {
   try{
       dispatch(loadTodosInProgress());
       const response = await fetch('http://localhost:8080/todos');
       const todos = await response.json() as TodoItem[];

       dispatch(loadTodosSuccess(todos));
   } catch (error) {
       dispatch(loadTodosFailure());
       displayAlert(error)
   }
};

export const addTodoRequest = (text: string) => async(dispatch: Dispatch, getState: () => Store) => {
    try {
        const body = JSON.stringify({ text });
        const response = await fetch('http://localhost:8080/todos', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body
        });

        const todo = await response.json() as TodoItem;

        dispatch(createTodo(todo));
    } catch (error) {
        displayAlert(error)
    }
};

export const deleteTodoRequest = (id: string) => async(dispatch: Dispatch, getState: () => Store) => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
            method: 'delete',
        });

        const removedTodo = await response.json() as TodoItem;

        dispatch(removeTodo(removedTodo));
    } catch (error) {
        displayAlert(error)
    }
};

export const markAsCompleteTodoRequest = (id: string) => async(dispatch: Dispatch, getState: () => Store) => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}/completed`, {
            method: 'post',
        });

        const updatedTodo = await response.json() as TodoItem;

        dispatch(completeTodo(updatedTodo));
    } catch (error) {
        displayAlert(error)
    }
};

export const displayAlert = (error: string) => () => {
    alert(error)
};