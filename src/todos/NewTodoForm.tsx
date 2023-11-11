import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { TodoItem } from './reducers';
import { Store } from './store';
import { addTodoRequest, MyThunkDispatch } from './thunks';
import { getTodos } from './selectors';

interface Props {
    todos: TodoItem[],
    onCreatePressed?: (text: string) => void,
}

const FormContainer = styled.div`
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 8px grey;
`;

const NewTodoInput = styled.input`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-bottom: 2px solid #ddd;
  border-radius: 8px;
  width: 70%;
  outline: none;
`;

const NewTodoButton = styled.button`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  margin-left: 8px;
  width: 20%;
  background-color: #22ee22;
`;

export const NewTodoForm = ({ todos, onCreatePressed= () => {} } : Props) => {
    const [inputValue, setInputValue] = useState('');

    return (
        <FormContainer>
            <NewTodoInput
                value={inputValue}
                onChange={(e: React.ChangeEvent<{ value: string }>) => setInputValue(e.target.value)}
                placeholder='Type your new todo here'
                type='text'
            />
            <NewTodoButton
                onClick={() => {
                    const isDuplicatedText = todos.some(item => item.text === inputValue);
                    if (!isDuplicatedText) {
                        onCreatePressed(inputValue);
                        setInputValue('');
                    }

                }}
            >
                Create Todo
            </NewTodoButton>
        </FormContainer>
    )
};

const mapStateToProps = (state: Store) => ({
    todos: getTodos(state),
});

const mapDispatchToProps = (dispatch: MyThunkDispatch) => ({
    onCreatePressed: (text: string) => dispatch(addTodoRequest(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);