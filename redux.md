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

