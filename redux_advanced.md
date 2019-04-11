# Redux Advanced

## Adding Middleware

In this module, middleware is introduced as another function that is calld between the action being dispatched and the reducer.

We can do something with this middleware action `before` it hits the reducer. This is also performed `asynchronously` so as to not disrupt the main application. 

Performing an action between the dispatcher and reducer can be achieved by writing a function before the store is initialised:

```
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
```

Next, we need to import `applyMiddleware` from redux:

- `import { createStore, combineReducers, applyMiddleware } from 'redux';`

And then apply it to our store as an `enhancer`:

- `const store = createStore(rootReducer, applyMiddleware(logger));`

The full file is: 

```
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

const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

```

## Using the Redux Devtools

To always look into the current Redux store. We can look at all of the components and props within the dev tools screen, however that doesn't help too much. 

To work around this, we can install `Redux DevTools` as an extension. This will allow for us to look into the store using dev tools. 

To install the browser extension:

1) Go to: https://github.com/zalmoxisus/redux-devtools-extension
2) Install as an extension
3) Open browser for application, re open and look for the Redux section in Dev Tools

Next, we should see a message indicating that the store was not found. We basically need to follow the next step in the link above, and follow the steps outlined to add it. This will involved a code change, where it is defined in the store as a comment. 

It should be under the section of:

- Advanced Store Setup

Then add the following. Should look something like: 

```
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger)));
```

Pretty shwifty. The State tab is especially useful. 

## Executing Asynchronous Code

`Action Creators` can be used to create asynchronous code in React. 

### Including Action Creators

These are functions that create actions. This would effectively return what we send into a dispatch call as the first parameter. For example: 

- `{type: actionTypes.INCREMENT}`

#### Running Action Creators Synchronously

To run an action creator synchronously, we can export the actions and use them in the `mapDispactToProps` file: 

```
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const STORE_RESULT = 'STORE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT';

// Recieves any payload we want to send with our action
export const increment = () => {
    return {
        type: INCREMENT
    };
};

export const decrement = () => {
    return {
        type: DECREMENT
    };
};

export const add = (value) => {
    return {
        type: ADD,
        val: value
    };
};

export const subtract = (value) => {
    return {
        type: SUBTRACT,
        val: value
    };
};

export const store_result = (result) => {
    return {
        type: STORE_RESULT,
        result: result
    };
};

export const delete_result = (id) => {
    return {
        type: DELETE_RESULT,
        resultElId: id
    };
};
```

And then refer to them in the `mapDispactToProps`: 

```
const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch(actionCreators.increment()),
        onDecrementCounter: () => dispatch(actionCreators.decrement()),
        onAddCounter: () => dispatch(actionCreators.add(10)),
        onSubtractCounter: () => dispatch(actionCreators.subtract(15)),
        onStoreResult: (result) => dispatch(actionCreators.store_result(result)),
        onDeleteResult: (id) => dispatch(actionCreators.delete_result(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

#### Taking The Above - Running Action Creators Asynchronously