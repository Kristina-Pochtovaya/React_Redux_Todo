import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { TodoListItem } from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import { Store } from './store';
import { TodoItem } from './reducers';
import { deleteTodoRequest, loadTodos, markAsCompleteTodoRequest, MyThunkDispatch } from './thunks';
import { getCompletedTodos, getIncompleteTodos, getTodosLoading } from './selectors';

interface ToDoItems {
    completedTodos?: TodoItem[];
    incompleteTodos?: TodoItem[];
    onRemovePressed: (text: string) => void;
    markAsCompleteTodo: (text: string) => void;
    isLoading: boolean;
    startLoadingTodos: () => void;
}

const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`;

export const TodoList = ({
    completedTodos,
    incompleteTodos,
    onRemovePressed,
    markAsCompleteTodo,
    isLoading,
    startLoadingTodos,
}: ToDoItems) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);

    const loadingMessage = <div>Loading todos...</div>;

    const content = (
        <ListWrapper>
            <NewTodoForm />
            <h3>Incomplete:</h3>
            {incompleteTodos?.map(item =>
                <TodoListItem
                    todo={item}
                    onRemovePressed={onRemovePressed}
                    markAsCompleteTodo={markAsCompleteTodo}
                />
            )}
            <h3>Completed:</h3>
            {completedTodos?.map(item =>
                <TodoListItem
                    todo={item}
                    onRemovePressed={onRemovePressed}
                    markAsCompleteTodo={markAsCompleteTodo}
                />
            )}
        </ListWrapper>)

    return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state: Store) => ({
    isLoading: getTodosLoading(state),
    completedTodos: getCompletedTodos(state),
    incompleteTodos: getIncompleteTodos(state),
});

const mapDispatchToProps = (dispatch: MyThunkDispatch) => ({
    onRemovePressed: (id: string) => dispatch(deleteTodoRequest(id)),
    markAsCompleteTodo: (id: string) => dispatch(markAsCompleteTodoRequest(id)),
    startLoadingTodos: ()=> dispatch(loadTodos()),
});

export default connect(mapStateToProps,mapDispatchToProps)(TodoList);