import { expect } from 'chai';
import { getCompletedTodos } from '../selectors';
import { TodoItem } from '../reducers';

describe('The geCompletedTodos selector', () => {
    it('Returns only completed todos', () => {
        const fakeTodos = [
            { text: 'Say Hello', isCompleted: true },
            { text: 'Say Goodbye', isCompleted: false },
            { text: 'Climb Mount Everest', isCompleted: false },
        ] as TodoItem[];

        const expected = [
            { text: 'Say Hello', isCompleted: true },
        ];

        const actual = getCompletedTodos.resultFunc(fakeTodos);

        expect(actual).to.deep.equal(expected);
    });
});