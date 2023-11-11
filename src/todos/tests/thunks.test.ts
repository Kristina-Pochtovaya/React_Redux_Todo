import 'node-fetch';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import { expect } from 'chai';
import { ActionsType } from '../actions';
import { loadTodos } from '../thunks';

describe('The loadTodos thunk', () => {
    it('Dispatches the correct actions in the success scenario', async () => {
        const fakeDispatch = sinon.spy();

        const fakedTodos = [{text: '1'}, {text: '2'}];
        fetchMock.get('http://localhost:8080/todos', fakedTodos);

        const expectedFirstAction = {type: ActionsType.LOAD_TODOS_SUCCESS};
        const expectedSecondAction = {type: ActionsType.LOAD_TODOS_SUCCESS, payload: {todos: fakedTodos}};

        await loadTodos()(fakeDispatch);

        expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);
        expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedSecondAction);

        fetchMock.reset();
    });
});