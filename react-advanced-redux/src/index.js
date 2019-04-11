import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

const logger = store => {

    // Next will be a function we can execute. Afterwards the dispatch call will be 
    // forwarded on to the reducer
    return next => {

        return action => {
            // Recieve action dispatched as the input
            console.log('[Middleware] Dispatching ', action);

            // Return to the dispatcher with next()
            const result = next(action);

            // Log the state after the dispatcher has updated the content
            console.log('[Middleware] next state ', store.getState());
            return result;
        }
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
