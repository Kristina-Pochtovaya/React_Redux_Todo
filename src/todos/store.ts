import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { InitialState, todos } from './reducers';

export interface Store {
    todos: InitialState
}

const reducers = {
    todos,
};

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

export const rootReducer = combineReducers(reducers);
export const persistedReducer = persistReducer(persistConfig, rootReducer);
export const configureStore = () => createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));