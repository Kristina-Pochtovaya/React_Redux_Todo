import { expect } from 'chai';
import { ActionsType } from '../actions';
import { Actions, todos } from '../reducers';

describe('The todos reducer', () => {
    it('Adds a new todo when CREATE_TODO action is received', () => {
        const fakeTodo = { text: 'hello', isCompleted: false };
        const fakeAction = {
            type: ActionsType.CREATE_TODO,
            payload: { todo: fakeTodo },
        } as Actions;
        const originalState = { isLoading: false, data: [] };

        const expected = { isLoading: false, data: [ fakeTodo ] };
        const actual = todos(originalState, fakeAction);

        expect(actual).to.deep.equal(expected);
    });
});