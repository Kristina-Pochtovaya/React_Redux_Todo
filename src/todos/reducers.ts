import { ActionsType } from './actions';

export interface Payload {
    text: string,
    id: string,
    todo: TodoItem,
    todos: TodoItem[]
}

export interface Actions {
    type: ActionsType,
    payload?: Payload,
}

export interface TodoItem {
    id: string,
    text: string,
    createdAt: Date,
    isCompleted: boolean,
}

export interface InitialState {
    isLoading: boolean,
    data: TodoItem[],
}

const initialState = {
    isLoading: false,
    data: [],
};

export const todos = (state: InitialState = initialState, actions: Actions) => {
    const { type, payload } = actions;

    switch (type) {
        case ActionsType.CREATE_TODO: {
            return {
                ...state,
                data: [ ...state.data,payload.todo]
            };
        }
        case ActionsType.REMOVE_TODO: {
            const { todo } = payload;

            return {
                ...state,
                data: state.data.filter(item => item.id !== todo.id)
            };
        }
        case ActionsType.MAKE_TODO_COMPLETED: {
            const { todo } = payload;

            return {
                ...state,
                data: state.data.map(item => {
                    if(item.id === todo.id) {
                        return {...item, isCompleted: true}
                    }
                    return item;
                })
            }
        }
        case ActionsType.LOAD_TODOS_SUCCESS: {
            const { todos } = payload;

            return {
                ...state,
                isLoading: false,
                data: todos,
            }
        }
        case ActionsType.LOAD_TODOS_IN_PROGRESS: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case ActionsType.LOAD_TODOS_FAILURE: {
            return {
                ...state,
                isLoading: false,
            }
        }
        default:
            return state;
    }
};