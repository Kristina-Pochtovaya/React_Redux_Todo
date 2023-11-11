import React from 'react';
import { createRoot } from 'react-dom/client';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from './todos/store';

const store = configureStore();
const persistor = persistStore(store);

const element = document.getElementById('root') || document.createElement('div');
const root = createRoot(element);
root.render(
    <Provider store={store}>
     <PersistGate
               loading={<div>Loading...</div>}
               persistor={persistor}
            >
            <App />
    </PersistGate>
    </Provider>
);