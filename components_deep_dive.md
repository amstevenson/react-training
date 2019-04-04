# Components Deep Dive

## A Better Project Structure

The questions for determining a project structure are:

- What should go into its own component?
- What do you group together in a higher up component (i.e the root)?

The answer lies within determining how much code within a component can be split out into others; if we have a component that returns one element, changes are it has been split down enough.

Typically however, Components that manage state, or higher up ones like the App component, should not be returning UI rendering logic too much. It should be lean and not contain too much JSX. 

## Setting an App into Components

Important to note here is that containers should be used to manage and set the state. So they should only contain code that relates to handlers, events, setting state. Other required logic should be in components.

An example structure for this would be:

```
  App.js (container - sets state, sets properties for called components, defines events/handlers) calls:

    persons.js (component - returns a list of people (props sent from App.js))
    cockpit.js (component - returns html content for the rest of the page(props send from App.js))

```

## Comparing Stateful and Stateless components

Stateful components are components that manage state. Where `setState` is used or where hooks are used. 

Presentational components were called functional components in the past because they used to be unable to manage state before hooks were introduced. If a component can possibly not manage state, it should not, since it is best to restrict yourself to a couple of components that are responsible for state management. 

The majority of components should be presentational/stateless; ones that don't manage state. This is because splitting the app into containers and presentational components makes it manageable. Where the stateful containers very likely call components, so it creates a hierarchical structure and is easier to manage as a result.   

## Class based vs Functional Components

What should be used?

Class based components are ones that extend the Component object. They have access to State and can use lifecycle hooks. Access to state and props is via the `this` keyword. 

Functional objects are ones that have props that return JFX code. Since React 16, they also have access to State (useState()). Functional components have props as an argument. 

See: 

- https://itnext.io/add-state-and-lifecycle-methods-to-function-components-with-react-hooks-8e2bdc44d43d

For how to implement life cycle hooks in functional components. 

In terms of what to use in projects, it really depends. Some argue however that having a split is good. That is to say that classes can be used where the State is updated, or lifecyle hooks are used, and functional components used in presentational contexts. 

- Use classes if you need to manage State or access to Lifecycle Hooks, and you don't want to use React Hooks. 
- Use functional components in all other cases

However, it is still very possible to use functional components in all cases at present, except for when lifecycle hooks need to be used. 

## Component Lifecycle (for class based components)

It is important to note that Lifecycle Hooks have nothing to do with React hooks. 

There are certain functions that can be used within the context of the lifecycle for class components: 

- constructor()
- getDerivedStateFromProps()
- getSnapshotBeforeUpdate()
- componentDidCatch()
- componentWillUnmount()
- shouldComponentUpdate()
- componentDidUpdate()
- componentDidMount()
- render()

### Lifecycle: Component Creation

During the components creation, the constructor is called. When calling this, the `super(props)` method needs to be called. This is good for setting an initial state, but not great if you introduce side effects, such as sending HTTP requests, as it can impact performance and perhaps result in multiple re-render cycles. 

```
  constructor(props) {
    super(props)
    console.log('[APP.js] constructor')
    // set initial state if we have one
  }
```

Next getDerviedStateFromProps(props, state) is called. Which will rarely be used. This can be used when props need to change for the class based components, the state can then be synced to them. An example of using this would be where props of a component will be changing, which will have an effect on the state of a component. Like above, this isn't the place to send HTTP requests. 

```
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props)
    return state // and an update to it beforehand if needed
  }
```

Next render(). Prepare and structure your JSX code around this. Will be used rather often. If using this method, others will be called, including `componentDidMount` which will be the place where side effects should be used; such as making a HTTP request to get new data from the web. However, for `componentDidMount` is not the place to set the state of the class based component, as it will cause another re-render cycle to occur.

```
 componentDidMount() {
    console.log('[App.js] componentDidMount')

    // HTTP Requests...etc (called after the render function)
  }
```

### Lifecycle: Component Update

When a component updates the life cycle order is as follows:

`getDerivedStateFromProps(props, state)`

To get or update state based on outside changes. This is rarely used, there are better practice ways to update state. 

`shouldComponentUpdate(nextProps, nextState)`

Allows us to cancel the updating process. Can decide if React should continue to re-render components. Used mostly for performance optimisation. Should be used carefully as a result and can be powerful in the sense that it can prevent unncessary update cycles. Needs to return True or False. True if React can continue, else False.

`render()`

Afterwards, render is called to update the DOM. Prepare and structure JSX code for this. 

`Update Child Component Props`

Functions are called from the React library that upates the child components when the render() function is called. For example, if a child component of App is People, each person will be updated when the render() function for App.js is called. 

`getSnapshotBeforeUpdate(prevProps, prevState)`

This lifecycle hook takes the prev prop and prev state and returns the snapshot that can be configured. Used for last minute DOM operations. For example, getting the current scrolling position from the user. 

`componentDidUpdate`

A lifecycle hook that signals that the update is now done. This is the place to call HTTP requests. Be careful to not cause an infinite hook that repeats the above cycle over and over again. This would happen if the request is called synchronously. HTTP requests in this context need to be performed asynchronously. 

More on State and Lifecycle:

- https://reactjs.org/docs/state-and-lifecycle.html

### Other Class Based Lifecycle functions

`componentWillUnmount` is called when a component is removed from the DOM: 

```
    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount');
    }
```

This is typically used in scenarios where cleaning up is required. 

### Using shouldComponentUpdate() for optimisation

To determine if a component should be updated, we can check the nextProps parameter and compare it: 

```
   shouldComponentUpdate(nextProps, nextState) {
        console.log('[Persons.js] shouldComponentUpdate');
        if (nextProps.persons !== this.props.persons) {
            return true;
        }
        else {
            return false;
        }
    }
```

If we have a list of people, and they change, we return true to indicate that it needs updating, otherwise we return false. This will only work if the two arrays that are being compared have different addresses in memory. 

There is an easier way of doing this however if checking if any props of a component have changed (in the above case, that would be `if (nextProps.persons !== this.props.persons) {`). In this case, it is recommended that the class in question extends from a `PureComponent` rather than a `Component`. PureComponent is a normal component that already implements `shouldComponentUpdate` that checks if any prop has changed. 

## Component Lifecycle (for functional components) 

### Using useEffect() in functional components

UseEffect is the second most important react hook we can use next to useState. useEffect combines the functionality for the use cases we can cover for all class based life cycle hooks in one React hook. 

A React hook is a function we can add into a functional component. 

```
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');

        // HTTP Request...
    });
```

The logic defined within the useEffect block will be used for every render cycle. This is run when the component is created and/or updated. This combines the effect of `componentDidMount` and `componentDidUpdate` in one effect. 

`getDerivedStateFromProps` is not included in this. However, this can be remedied by referring to the `useState()` function, where props can be passed into it. 

More on useEffect(): 

- https://reactjs.org/docs/hooks-effect.html

### Controlling the useEffect() behaviour 

Assuming we want to only want to use useEffect() on component creation. If used like the above section, it will be used on create and update. To have it only trigger when an object updates, a second parameter can be added: 

```
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        setTimeout(() => {
          alert('Saved data to the cloud!')
        }, 1000);
    }, [props.persons]);
```

In the above, an alert will only be shown when the props.persons array is updated. Based on this, it is perfectly reasonable to have multiple `useEffect()` calls that observe different dependencies. Other dependencies can be added too.

If we want to use useEffect() only once, an empty array can be used instead:

```
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        setTimeout(() => {
          alert('Saved data to the cloud!')
        }, 1000);
    }, []);
```

To use useEffect() for cleanup work (i.e a function that run before the main useEffect function runs, but after the (first) render cycle), a function can be returned from it: 

```
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        setTimeout(() => {
          alert('Saved data to the cloud!')
        }, 1000);
        return () => {
          console.log('cleanup work in useEffect');
        };
    }, [props.persons]);
```

The `console.log('cleanup work in useEffect');` will only be called once, if the component it belongs to is not being removed. 

## Optimising Functional Components With React memo()

Using memo() is a React technique where defaut exports are wrapped with `memo(component)` function call. React will memorise (store) a snapshot of the component. And will only update it if the inputs change. 

It is good practice to wrap functional components this way when working with components that do not change all of the time. A final example of how to use it is:

`export default React.memo(cockpit);`

Based on this though, there may be an assumption that wrapping each functional component in this way is a good idea, however, it is not. They should only be used when there is a parent/child structure where the parent updates the child, but if nothing actually needs to update, then you are adding unnecesary checks by adding `memo` to each component. 

## How React updates the DOM

`render()` does not actually update the DOM. It suggests what the update for the DOM should be. It actually does it by comparing the old virtual DOM, to the re-rendered virtual DOM. The old virtual DOM is faster than the real one. 

A Virtual DOM is essentially a JavaScript representation of the script; React basically has two copies of the DOM, the old one and the one that will be re-rendered. It compares the old virtual DOM to the new one, and checks if there are any differences. If there are changes, then it reaches out and updates it. However, it only updates it in the places where differences were detected. If no differences are found, then it leaves it alone. 

## Rendering Adjacent JSX elements

This concerns how up to this point, we were only able to return JSX that was wrapped up in one single element, with as many children as we would want. 

There is a way around this. We can return an array of JSX elements, however, a key is needed for this. In the examples above, the `Persons` component is an example of this. 

Changing the `Persons` render function to return an array would look like: 

```
    render() {
        console.log('[Person.js] rendering...')
        return [
                <p key="i1" onClick={this.props.click}>I am { this.props.name } and I am { this.props.age } years old!</p>,
                <p key="i2">{ this.props.children }</p>,
                <input key="i3" type="text" onChange={this.props.changed} value={this.props.name}/>
        ];
    }
```

The `key` can be whatever we want. As long as it is unique to each element that is returned. 

The actual recommended approach however is to add an element there that fulfils Reacts requirement. In this sense, an auxillary component should be created, that effectively returns the children (the other html elements in this case): 

```
const aux = props => props.children; 

export default aux;
```

When used in this example, it will fulfil Reacts requirement of having one element returned, and means that we do not have to worry about assigning keys: 

```
import React, { Component } from 'react';
import styles from './person.module.css'
import Aux from '../../../hoc/Auxillary'

class Person extends Component {

  render() {
      console.log('[Person.js] rendering...')
      return  (
          <Aux>
              <p onClick={this.props.click}>I am { this.props.name } and I am { this.props.age } years old!</p>
              <p>{ this.props.children }</p>
              <input type="text" onChange={this.props.changed} value={this.props.name}/>
          </Aux>
      )
  }
}

export default Person;
```

Since React 16.2, there is a build in version of this called `React.Fragment`. So this makes it even simpler. In this case, we can simply do:

```
  return  (
      <React.Fragment>
          <p onClick={this.props.click}>I am { this.props.name } and I am { this.props.age } years old!</p>
          <p>{ this.props.children }</p>
          <input type="text" onChange={this.props.changed} value={this.props.name}/>
      </React.Fragment>
  )
```

## Higher Order Components 

Higher order components should be named as `With<filename>.js`.

These effectively allow us to set up html elements with specific classNames, and return the children. The premise is to use this to wrap around components where we want to add something in particular. Such as styling for classes, or even logic around HTTPRequests to handle errors. 

An example declaration is (WithClass.js):

```
import React from 'react';

const withClass = props => (
    <div className={props.classes}>
        {props.children}
    </div>
);

export default withClass;
```

Which can be used to wrap some HTML elements in a render function: 

```
  return (
    <WithClass classes={styles.App}>
        <button onClick={() => { 
            this.setState({showCockpit: false });
        }}>Remove Cockpit</button>

        { this.state.showCockpit ? (  
          <Cockpit 
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonsHandler}/> ) : null 
        }

        {persons}
    </WithClass>
  );
```

Where `styles.App` is a CSS class. 

More on Higher Order Components: 

- https://reactjs.org/docs/higher-order-components.html

## Setting State Correctly

When using Class based components, make sure to not use it incorrectly by having a `setState` function that uses both a new state and an old state.

The reason for why this is bad is because `setState` does not automatically update the DOM; it only does so when there are resources available to allow for that to happen. This means that by the time it does update, the current state could be different to what the `setState` was expecting it to be, and as a result unpredictable behaviour may occur.

An example of doing it wrong: 

```
  this.setState( {
    persons: persons, 
    changeCounter: this.state.changeCounter + 1 <<<
  } );
```

An arrow function can be used however in the `setState` function to refer to two properties (`prevState` and `props`). So in the scenario where we do need to refer to the previous state, we can use the `prevState` attribute to allow for this. 

```
  this.setState((prevState, props) => {
    return {
      persons: persons, 
      changeCounter: prevState.changeCounter + 1
    }
  });
```

## Using Prop types

This is important when working in teams for declaring what types variables are. It removes the uncertainty around what types are being thrown around. For example, if someone passes in a string number when a child function does a calculation on it, it will fail. 

`prop-types` is useful for this. 

To use it: 

- npm install --save prop-types 

Import at the top of a JavaScript file: 

- import PropTypes from 'prop-types';

Then use it in the code underneath the class or functional component: 

```
class Person extends Component {

    render() {
      ...click, name, age, children, changed props are used
    }
}

Person.PropTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    children: PropTypes.children,
    changed: PropTypes.func
};
```

The `Component.PropType` declarations effect is that any props that are passed to the component will be checked, and warnings will be sent in the event that there is a mismatch. 

More on PropTypes:

- https://reactjs.org/docs/typechecking-with-proptypes.html

## Using Refs (classes) for elements

These are useful when selecting an element for a component. For example, when setting the focus on the page to be the last element returns from a list. 

To achieve this, the `ref` keywork can be added to any element. It is a keywork that is understood by React. It can be used in multiple ways: 

Passing a function:

```
    componentDidMount() {
        // executes after render
        this.inputElement.focus();
    }

    ...code

    <input 
      type="text" 
      ref={(inputEl) => {this.inputElement = inputEl}}
      onChange={this.props.changed} 
      value={this.props.name}/>
```

Another way is to use a constructor:

```
  constructor(props) {
      super(props);
      this.inputElementRef = React.createRef();
  }

  componentDidMount() {
    // executes after render
    this.inputElementRef.current.focus();
  }

  ...code

  <input 
    type="text" 
    ref={this.inputElementRef}
    onChange={this.props.changed} 
    value={this.props.name}/>
```

## Using Refs (functional) for elements

To achieve the above in functional components we can do: 

```
import React, { useEffect, UseRef } from 'react';

const cockpit = props => {

    const toggleBtnRef = useRef(null);

    useEffect(() => {
        toggleBtnRef.current.click();

    }, []);

    ...code

    <button 
      ref={toggleBtnRef}
      className={btnClass}
      onClick={props.clicked}>Toggle People</button>
```

Important to note for the above is that the usage of `toggleBtnRef` has to happen after the rendering has occurred. This is because the value of toggleBtnRef is null until the ref section of the <button> element is utilised. Of course, putting it in `useEffect()` means that it will be used after rendering has occurred. 

More information on Refs:

- https://reactjs.org/docs/refs-and-the-dom.html

## Understanding Prop Chain Problems - Using Context API

Having nested components means that variables at the lowest end need to have the values passed through the chain. This means that there can be an element in redundancy, in the sense that multiple components could simply be forwarding prop attributes on. 

To illustrate the problem:

```
- main component (the states derp attribute is set)
- component 2 (state is sent from main to component 2, derp is NOT used - redundant) 
- component 3 (state is sent from component 2, to component 3, derp IS used)
```

In order to address this, `context` can be used, which was introduced by React. This effectively allows for global variables to be set, the values for which are set in a context component:

```
import React from 'react';

// Globally available context object
const authContext = React.createContext({
    authenticated: false, 
    login: () => {}
});

export default authContext;
```

This context container can then be wrapped around the starting component in a chain (i.e the main component), where you set it as the provider. This means that any child components can use the values within the context component by referring to the values set by the provider: 

```
  <AuthContext.Provider value={{
      authenticated: this.state.authenticated, 
      login: this.loginHandler
  }}>
    { this.state.showCockpit ? (  
      <Cockpit 
        title={this.props.appTitle}
        showPersons={this.state.showPersons}
        personsLength={this.state.persons.length}
        clicked={this.togglePersonsHandler}
        login={this.loginHandler}/>
        ) : null 
    }
    {persons}
  </AuthContext.Provider>
```

Default values in the context container declaration will be used when we dont set any provider values in the element definition. In the above example, we set new values. It is important to note that changing the values in the context will not cause a re-render cycle.

To use the global context values: 

```
  <AuthContext.Consumer>
      {context => 
          context.authenticated ? <p>Authenticated!</p> : <p>Please log in </p>
      }
  </AuthContext.Consumer>
```

Where the `context` object is a reference to the context container's values. 

However, it is recommended to use `contextType` for doing all of this, which is explained in the next section. 

## contextType & useContext()

A more efficient way of using the context container declared in the previous section

### Class based components

React 16.6 added another way of using the context container. There is a special static property called `contextType`. We can set the value of this to be our context container and React will pick it up and use it:

```
class Person extends Component {

    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;
```

We can then refer to the values within the context by:

```
    ...previous code

    componentDidMount() {
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated); <<<
    }

    or 

    { this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in </p> }

```
### Functional components

It is rather simple to access the context in functional components. Simply declare `useContext` in the import, set a const for the actual context object, and then use the values within the code:

```
import React, { useEffect, useRef, >>> useContext <<< } from 'react';
import AuthContext from '../../context/auth-context'

const cockpit = props => {

    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext); <<<

    ...code

    return (     
      <div className={styles.Cockpit}>   
          <h1>{props.title}</h1>
          <p className={classes.join(' ')}>Woo, an application made with React</p>
          <button 
          ref={toggleBtnRef}
          className={btnClass}
          onClick={props.clicked}>Toggle People</button>
          <button onClick={authContext.login}>Log in</button> <<<
      </div>
    );
```

This is definitely the recommended way of accessing context variables in functional components. 
