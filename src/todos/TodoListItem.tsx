import React from 'react';
import styled from 'styled-components';
import { TodoItem } from './reducers';

interface Props {
    todo: TodoItem;
    onRemovePressed: (text: string) => void;
    markAsCompleteTodo: (text: string) => void;
}


interface PropsTodoItemContainer {
    createdAt: Date;
}

export const getBorderStyleForDate = (startingDate: Date, currentDate: number) => (
    startingDate > new Date(currentDate - 8640000 * 5) ?
        'none' :
        '2px solid red'
    );

const TodoItemContainer = styled.div<PropsTodoItemContainer>`
  background: #fff;
  border-radius: 8px;
  margin-top: 8px;
  padding: 16px;
  position: relative;
  box-shadow: 0 4px 8px grey;
`;

const TodoItemContainerWithWarning = styled(TodoItemContainer)`
  border-bottom: ${props => getBorderStyleForDate(new Date(props.createdAt), Date.now())};
`;

const ButtonsContainer = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
`;

const Button = styled.button`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  display: inline-block;
`;

const CompletedButton = styled(Button)`
  background-color: #22ee22;
`;

const RemoveButton = styled(Button)`
  background-color: #ee2222;
  margin-left: 8px;
`;

export const TodoListItem = ({ todo, onRemovePressed, markAsCompleteTodo }: Props) => {
    const Container = todo.isCompleted ? TodoItemContainer : TodoItemContainerWithWarning;

    return (
        <Container createdAt={todo.createdAt}>
            <h3>{todo.text}</h3>
            <p>Created at:&nbsp;{(new Date(todo.createdAt).toLocaleDateString())}</p>
            <ButtonsContainer>
                {!todo.isCompleted &&
                    <CompletedButton onClick={() => markAsCompleteTodo(todo.id)}>
                        Mark as completed
                    </CompletedButton>}
                <RemoveButton onClick={() => onRemovePressed(todo.id)}>
                    Remove
                </RemoveButton>
            </ButtonsContainer>
        </Container>
    )
};