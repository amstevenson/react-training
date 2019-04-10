// Node js syntax structure here
const redux = require('redux');
const createStore = redux.createStore; // Don't execute this yet

const initialState = {
    counter: 0
};

// Reducer
// The only thing that can update the Store
// Param 1: previous state (default is = initialisedState)
// Param 2: the action
const rootReducer = (state = initialState, action) => {

    // Add logic for actions
    // Very important here is that you create a new state object
    // Else you will be updating the original (passed in by reference). 
    if (action.type === 'INC_COUNTER') {

        return {
            ...state,
            counter: state.counter +1
        }
    }

    if (action.type === 'ADD_COUNTER') {

        return {
            ...state,
            counter: state.counter + action.value
        }
    }

    // For now returns the state we already had
    return state;
};

// Store
// Needs to be initialised with a reducer
const store = createStore(rootReducer); 
console.log(store.getState());

// Subscription
// Param 1: A function that is executed whenever the state is updated
store.subscribe(() => {
    console.log('[Subscription]', store.getState());
});

// Dispatching Action
// Param 1: A JavaScript function, which needs "type" to be declared. 
//          The "value" is the data alongside it, which can be named anything.
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());
