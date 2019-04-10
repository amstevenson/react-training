# Redux

## State Can Be Complex

Managing the State can be difficult as an application grows. Especially when passing props between a large amount of components. Redux helps to solve this by making it simpler. 

Imagine a scenario like the below:

To talk between sides would be convoluted if we had to create connections between main components. Likely including a large amount of chained props. 

![alt text][logo]

[logo]: ./state_complex.PNG "State Complex"

## Redux to the Rescue

Redux gives us a certain flow or way of managing data, that we can integrate with another package into the React app. So it does react to changes in data. 

In the end its all about the `central store` we have in each redux application. It is a third party library that works independently with React. This store stores the `entire application state`. Can think about it as a giant JavaScript object. 

In a React application we have components. It doesnt do this by directly manipulating the central store. If we edit it from anywhere in our application, we cant see where we may have broke our application from. 

Redux is essentially a clearly defined process that helps us to manage state. 

Actions are dispatched from JavaScript code. React dispatches these with components. These are essentially packages with a type/description like "add ingrediant" or "remove ingredient". We also need to pass the information related to the data (what ingredient for example). 

The Action doesnt hold any logic, or how to update the store. Its just a messenger. The thing updating the store is the `Reducer`. Multiple Reducers can be used, but ultimately only one is used. 

The Reducer can check the type of the application and then define the code for that type of action in the Reducer. The Reducer in the end is a pure function that thats the action and the previous state, and then returns the updated state. 

The Reducer has to execute `synchronous code only`. Therefore `no` side effects. However, asynchronous code is still possible (more on that further below). 

The Reducer will always return a new state object (as they are references). 

How do we get the updated state back into our component? A `Subscription Model` can be used for this. These are triggered whenever the state is updated in the central store. The component subscribed to it will then recieve an update. We can then use updates to change the UI or to perform other actions. 

![alt text][logo2]

[logo2]: ./redux_rescue.PNG "Redux Rescue"

## Setting up Redux (Outside of a React Application)

### Setting up Reducer and Store

The `redux` package needs to be added to the node_modules:

- `npm install --save redux`

Next, add a JavaScript file to the route directory for the application. This will contain everything we need for redux; store, reducer, action and subscription. 

redux-basis.js:

```
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

    // For now returns the state we already had
    return state;
};

// Store
// Needs to be initialised with a reducer
const store = createStore(rootReducer); 
console.log(store.getState());

// Dispatching Action

// Subscription
```

This is the bare bones setup. Doing this creates a store and assigns a reducer. The console log will let us know what the current state is. 

To run the file go to the directory where the file is an run: 

- `node redux-basics.js`

Should see `{ counter: 0 }` after calling it. 

### Dispatching Actions

To dispatch actions, logic needs to be written for the type within the Reducer:

```
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
```

In the event where the actions type does not match, the previous state will be returned. The types defined in the Reducer can then be used for dispatches to update to the store:

```
// Dispatching Action
// Param 1: A JavaScript function, which needs "type" to be declared. 
//          The "value" is the data alongside it, which can be named anything.
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());
```

This will effectively send two dispatches, both of which will be picked up by the Reducer and will update the Store. This will result in the count returning as `11` rather than `0`.

### Adding Subscriptions

Subscriptions ensure that you don't have to manually call getState in code. Informs a container when it would need to get a new state, should something change. In order to create one: 

```
// Subscription
// Param 1: A function that is executed whenever the state is updated
store.subscribe(() => {
    console.log('[Subscription]', store.getState());
});

```

Each time a dispatch is made, the function defined in the subscription will be called afterwards. 

## Connecting Redux to React (In a React Application)

The above file is used for a test scenario, so this section and onwards will not be using it.

### Creating the Store

The store for a real application should be created just before the application starts. Typically this would be in `index.js` right before the `App` component is created:

```
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducer'

const store = createStore(reducer);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
```

### Creating the Reducer

The creation of the store uses a Reducer that is defined in it's own `reducer.js` file:

```
const initialState = {
    counter: 0
}

const reducer = (state = initialState, action) => {
    return state;
}

export default reducer;
```

### Connecting the Store to React

We need to install a new npm package called `react-redux` to connect redux to react.

- `npm install --save react-redux`

Then in `index.js` we can import a `Provider` and wrap our `App` with it: 

```
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducer'

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

```

`Provider` is a helper component that allows us to inject our store into React components.

Afterwards, each container using the store can set up a subscription. The `react-redux` package gives us a feature to make it simpler. We can import `connect` from `react-redux`. This a function that takes a component as input and returns a Higher Order Component. The idea behind it is that `connect` can then be called as a function. 

`connect` takes two parameters:

1) Which part of the state is of interest to us?
2) Which actions do we want to dispatch?

```
import { connect } from 'react-redux';

// State is not managed inside of the Component, it is managed by Redux
// The state gets mapped to the props so that it can be used in the Component. 
const mapStateToProps = state => {

    // JavaScript object returned with prop names and
    // slices of the state stored in Redux
    return {
        // Give me the states counter in the form of a property called ctr
        ctr: state.counter
    };
};

export default connect(mapStateToProps) (Counter);
```

The `connect` helper function will use the provided state and will send additional props to the container based on what is within the `mapStateToProps` function. 

We can then refer to this property inside of the container:

```
...imports

class Counter extends Component {

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
            </div>
        );
    }
}

...define mapStateToProps and default export
```

It is still important to note that not all components should be maintaining state. Even though Redux makes it simpler to manage it, the application is more manageable still if only a few components have access to it. 

### Dispatching Actions From The Component (Updating The Redux Store)

Dispatching actions should be done within the component. 

Access is granted through the `connect` function. The second parameter for that tells what kind of actions we want to dispatch within the container:

```
const mapDispatchToProps = dispatch => {
    return {
        // THe function is available through the propery
        onIncrementCounter: () => dispatch({type: 'INCREMENT'})
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Counter);
```

The reducer will need to change to include what happens when the INCREMENT type is found:

```
const initialState = {
    counter: 0
}

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                counter: state.counter + 1
            }

        return state;
    }
    
    return state;
}

export default reducer;
```

Note that the default export has been changed to include the dispatch information. This can be used inside of the container:

```
...imports

class Counter extends Component {
    
    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
            </div>
        );
    }
}

... default export, mapStateToProps, mapDispatchToProps
```

### Passing and Retrieving Data With Actions

The dispatch function has a second parameter that be used to pass a value to the `Reducer`: 

```
const mapDispatchToProps = dispatch => {
    return {
        // THe function is available through the propery
        onIncrementCounter: () => dispatch({type: 'INCREMENT', val: 1}),
        onDecrementCounter: () => dispatch({type: 'DECREMENT', val: 1}),
        onAddCounter: () => dispatch({type: 'ADD', val:10}),
        onSubtractCounter: () => dispatch({type: 'SUBTRACT', val: 15})
    };
};
```

To use this in the `Reducer`: 

```
const initialState = {
    counter: 0,
    results: []
}

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                counter: state.counter + action.val
            }
        case 'DECREMENT':
            return {
                ...state,
                counter: state.counter - action.val
            }
        case 'ADD':
            return {
                ...state,
                counter: state.counter + action.val
            }
        case 'SUBTRACT':
            return {
                ...state,
                counter: state.counter - action.val
            }

    }

    return state;
}

export default reducer;
```

## Getting A Value Passed To The mapDispatchToProps Function

Assuming that a `Reducer` type will be using a passed in value, we can send this to the reducer by putting it in the values for a Components `mapDispatchToProps` function: 

```

class Counter extends Component {

    render () {
        return (
            <div>
                <ul>
                    {this.props.storedResults.map(strResult => (
                        <li 
                            key={strResult.id} onClick={() => 
                                this.props.onDeleteResult(strResult.id)}>
                            
                            {strResult.value}
                        </li>
                    ))}
                    <li onClick={this.props.onDeleteResult}>

                    </li>
                </ul>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteResult: (id) => dispatch({type: 'DELETE_RESULT', resultElId: id})
    };
};
```

## Avoiding Mutation When Updating Redux Store State 

### Common Mistake #1: New variables that point to the same objects

Defining a new variable does not create a new actual object - it only creates another reference to the same object. An example of this error would be:

```
function updateNestedState(state, action) {
    let nestedState = state.nestedState;
    // ERROR: this directly modifies the existing object reference - don't do this!
    nestedState.nestedField = action.data;
 
    return {
        ...state,
        nestedState
    };
}
```

This function does correctly return a shallow copy of the top-level state object, but because the nestedState variable was still pointing at the existing object, the state was directly mutated.

### Common Mistake #2: Only making a shallow copy of one level

Another common version of this error looks like this:

```
function updateNestedState(state, action) {
    // Problem: this only does a shallow copy!
    let newState = {...state};
 
    // ERROR: nestedState is still the same object!
    newState.nestedState.nestedField = action.data;
 
    return newState;
}
```

Doing a shallow copy of the top level is not sufficient - the nestedState object should be copied as well.

### Correct Approach: Copying All Levels of Nested Data

Unfortunately, the process of correctly applying immutable updates to deeply nested state can easily become verbose and hard to read. Here's what an example of updating state.first.second[someId].fourth might look like:

```
function updateVeryNestedField(state, action) {
    return {
        ...state,
        first : {
            ...state.first,
            second : {
                ...state.first.second,
                [action.someId] : {
                    ...state.first.second[action.someId],
                    fourth : action.someValue
                }
            }
        }
    }
}
```

Obviously, each layer of nesting makes this harder to read, and gives more chances to make mistakes. This is one of several reasons why you are encouraged to keep your state flattened, and compose reducers as much as possible.

### Inserting and Removing Items in Arrays

Normally, a Javascript array's contents are modified using mutative functions like push, unshift, and splice. Since we don't want to mutate state directly in reducers, those should normally be avoided. Because of that, you might see "insert" or "remove" behavior written like this:

```
function insertItem(array, action) {
    return [
        ...array.slice(0, action.index),
        action.item,
        ...array.slice(action.index)
    ]
}
 
function removeItem(array, action) {
    return [
        ...array.slice(0, action.index),
        ...array.slice(action.index + 1)
    ];
}
```

However, remember that the key is that the original in-memory reference is not modified. As long as we make a copy first, we can safely mutate the copy. Note that this is true for both arrays and objects, but nested values still must be updated using the same rules.

This means that we could also write the insert and remove functions like this:

```
function insertItem(array, action) {
    let newArray = array.slice();
    newArray.splice(action.index, 0, action.item);
    return newArray;
}
 
function removeItem(array, action) {
    let newArray = array.slice();
    newArray.splice(action.index, 1);
    return newArray;
}
```

The remove function could also be implemented as:

```
function removeItem(array, action) {
    return array.filter( (item, index) => index !== action.index);
}
```

### Updating an Item in an Array

Updating one item in an array can be accomplished by using Array.map, returning a new value for the item we want to update, and returning the existing values for all other items:

```
function updateObjectInArray(array, action) {
    return array.map( (item, index) => {
        if(index !== action.index) {
            // This isn't the item we care about - keep it as-is
            return item;
        }
 
        // Otherwise, this is the one we want - return an updated value
        return {
            ...item,
            ...action.item
        };    
    });
}
```

### Immutable Update Utility Libraries

Because writing immutable update code can become tedious, there are a number of utility libraries that try to abstract out the process. These libraries vary in APIs and usage, but all try to provide a shorter and more succinct way of writing these updates. Some, like dot-prop-immutable, take string paths for commands:

`state = dotProp.set(state, 'todos.${index}.complete', true)`

Others, like immutability-helper (a fork of the now-deprecated React Immutability Helpers addon), use nested values and helper functions:

```
var collection = [1, 2, {a: [12, 17, 15]}];
var newCollection = update(collection, {2: {a: {$splice: [[1, 1, 13, 14]]}}});
```

They can provide a useful alternative to writing manual immutable update logic.

Immutable Data#Immutable Update Utilities section of the Redux Addons Catalog.

## Defining Actions as Enums/Constants

When defining actions in `mapDispatchToProps`, the types should be declared as a constant to avoid errors from occuring related to mistypes. These can be declared in an `actions.js` file that will sit alongside the Reducer, with the code being: 

```
export const INCREMENT = 'INCREMENT';
export const INCREMENT = 'DECREMENT';
export const INCREMENT = 'ADD';
export const INCREMENT = 'SUBTRACT';
export const INCREMENT = 'STORE_RESULT';
export const INCREMENT = 'DELETE_RESULT';
```

These can then be used after being imported: 

```
import * as actionTypes from './actions';

const initialState = {
    counter: 0,
    results: []
}

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case actionTypes.INCREMENT:
            return {
                ...state,
                counter: state.counter + action.val
            }
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - action.val
            }
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.val
            }
        case actionTypes.SUBTRACT:
            return {
                ...state,
                counter: state.counter - action.val
            }
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                // Like push, but push manipulates the value, 
                // concat copies it and adds to it (returns a new array immutably)
                results: state.results.concat({id: new Date(), value: state.counter})
            }
        case actionTypes.DELETE_RESULT:
            // Filter returns a new Array, but only populates it with entries
            // that fulfil a certain condition.
            const updatedArray = state.results.filter(result => result.id !== action.resultElId);
            return {
                ...state,
                results: updatedArray
            }
    }

    return state;
}

export default reducer;
```

## Combining Multiple Reducers

Redux with React gives us the ability to merge multiple Reducers into one. 

We can split up our code modularly so that we don't have loads of types within one reducer. We can have one reducer for the counter, and one reducer for the above (given the previous sections example).

reducers/counter.js:

```
import * as actionTypes from '../actions';

const initialState = {
    counter: 0
}

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case actionTypes.INCREMENT:
            return {
                ...state,
                counter: state.counter + action.val
            }
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - action.val
            }
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.val
            }
        case actionTypes.SUBTRACT:
            return {
                ...state,
                counter: state.counter - action.val
            }
    }
    return state;
}

export default reducer;
```

reducers/result.js:

```
import * as actionTypes from '../actions';

const initialState = {
    results: []
}

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                // Like push, but push manipulates the value, 
                // concat copies it and adds to it (returns a new array immutably)
                results: state.results.concat({id: new Date(), value: action.result})
            }
        case actionTypes.DELETE_RESULT:
            // Filter returns a new Array, but only populates it with entries
            // that fulfil a certain condition.
            const updatedArray = state.results.filter(result => result.id !== action.resultElId);
            return {
                ...state,
                results: updatedArray
            }
    }
    return state;
}

export default reducer;
```

We then need to use a new Redux import called `combineReducers` in `index.js` where the store is set up. We configure `combineReducers` so that we have two Reducers: 

```
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});
```

These can then be used in Components (counter.js): 

```
import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions';

class Counter extends Component {
    state = {
        counter: 0
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 10" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 15" clicked={this.props.onSubtractCounter}  />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(strResult => (
                        <li key={strResult.id} onClick={() => this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                    ))}
                    <li onClick={this.props.onDeleteResult}>

                    </li>
                </ul>
            </div>
        );
    }
}

// State is not managed inside of the Component, it is managed by Redux
// The state gets mapped to the props so that it can be used in the Component. 
const mapStateToProps = state => {

    // JavaScript object returned with prop names and
    // slices of the state stored in Redux
    return {
        // Give me the states counter in the form of a property called ctr
        ctr: state.ctr.counter,
        storedResults: state.res.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // THe function is available through the propery
        onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT, val: 1}),
        onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT, val: 1}),
        onAddCounter: () => dispatch({type: actionTypes.ADD, val:10}),
        onSubtractCounter: () => dispatch({type: actionTypes.SUBTRACT, val: 15}),
        onStoreResult: (result) => dispatch({type: actionTypes.STORE_RESULT, result: result}),
        onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, resultElId: id})
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Counter);
```

If a Reducer needs values from another, that these values should be provided by Components. The above JavaScript file required that change, so the `mapDispatchToProps` and button events had to be changed appropriately to accomodate for this. 

## Understanding State Types - Should Every State Be Handled Through Redux?

Depends on the size of the application. If its a small application, the benefits of Redux may be minimal. If it is a large application, it would probably be a good idea to use it. We still then need to ask the question of which State we should manage. 

What is important to note is that Redux is not a replacement for a database. So information related to all posts, blogs, etc, should be kept on a database which is updated with side effects. Every time the user refreshes the page, the state is gone, so that is something to bear in mind too. 

![alt text][logo3]

[logo3]: ./redux_types_of_state.PNG "Redux Types Of State"