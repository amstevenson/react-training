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

A third party library can be used for this calle `redux-thunk`. Allows for the action creators to not return the action itself (`actions.js`) but return a function that will eventually dispatch an action. 

With this trick we can run asynchronous code, because the eventually dispatched part is the part that needs to be run synchronously. 

To install this: 

-  `npm install --save redux-thunk`

This can then be imported and applied as middleware given the example in the previous section: 

```
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));
```

Next, assuming we want to run asynchronous code on an action:

```
// Synchronous
export const saveResult = (res) => {
    return {
        type: STORE_RESULT,
        result: res
    };
}

export const store_result = (res) => {

    // Simulate an API call (two seconds) then 
    // only return after it has finished. 
    return dispatch => {

        // Run set timeout before dispatching
        setTimeout(() => {

            // Pass the payload to the store
            dispatch(saveResult(res))
        }, (2000));
    }
};
```

We still return a default action, but at that point thunk steps in, blocks the old action and then dispatches it again in the future. In between, redux thunk is able to wait because it can dispatch the function whenever it want. Using that, we can execute code within the function before dispatching. 

It is important to note that only synchronous actions can update the store.

## Restructuring Actions - Best Practice (Exporting Actions In a More Lean Way)

The above `actions.js` can look a little better. By breaking up the actions into different files (one for counter related actions and another for results). 

Then having a central one that exports everything we need: 

```
// Single file to export all actions
export {
    add,
    subtract,
    increment,
    decrement
} from './counter'

export {
    store_result,
    delete_result
} from './result'
```

## Where to Put Data Transforming Logic 

When creating and sending a HTTPRequest asynchronously, run it in place of set timeout below in an action creator (`result.js`):

```
// Synchronous
export const saveResult = (res) => {
    return {
        type: actionTypes.STORE_RESULT,
        result: res
    };
}

export const store_result = (res) => {

    // Simulate an API call (two seconds) then 
    // only return after it has finished. 
    return dispatch => {

        // Run set timeout before dispatching
        setTimeout(() => {

            // Pass the payload to the store
            dispatch(saveResult(res))
        }, (2000));
    }
};
```

Thinking about saveResult above, if we were manipulating data (for example doing `res * 2` for the above), where should we change it? In the action creator or the reducer?

The preference seems to be the reducer. Mostly because it is the core place for updating state. However, there are arguments for doing it in the other place too. It is best to choose an approach and not deviate from it. Else it gets pretty confusing and hard to maintain. 

![alt text][logo]

[logo]: ./images/redux_state_logic.PNG "Redux State Logic"

### Using Action Creators and Get State

If updated the state in the action creator, we can use `getState` as a parameter in our asynchronous code. This allows us to query the previous state before calling our HTTPRequest for example. 

```
export const store_result = (res) => {

    // Simulate an API call (two seconds) then 
    // only return after it has finished. 
    return (dispatch, getState) => {

        // Run set timeout before dispatching
        setTimeout(() => {
            const oldCounter = getState().ctr.counter;
            console.log(oldCounter)

            // Pass the payload to the store
            dispatch(saveResult(res))
        }, (2000));
    }
};
```

However, best practice is to pass the needed variable as a parameter to the function, rather than using `getState`. In certain cases though, it may be hard to do that. In those cases `getState` is there as a fallback. 

## Using Utility Functions (Making Reducers Cleaner/Leaner)

Advanced Reducers setup. 

Can create a reusable utility file to update the state:

(`utility.js`):

```
export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    }
};
```

Which can then be used in `counter.js` to reduce the amount of code that is used:

```
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    counter: 0
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.INCREMENT:
            return updateObject(state, {counter: state.counter + 1})

        case actionTypes.DECREMENT:
            return updateObject(state, {counter: state.counter - 1})

        case actionTypes.ADD:
            return updateObject(state, {counter: state.counter + action.val})

        case actionTypes.SUBTRACT:
            return updateObject(state, {counter: state.counter - action.val})

    }
    return state;
};

export default reducer;
```

and in `reducer.js`:

```
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'

const initialState = {
    results: []
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.STORE_RESULT:

            return updateObject(state, {results: state.results.concat({id: new Date(), value: action.result})})

        case actionTypes.DELETE_RESULT:
            
            const updatedArray = state.results.filter(result => result.id !== action.resultElId);
            return updateObject(state, {results: updatedArray})
    }
    return state;
};

export default reducer;
```