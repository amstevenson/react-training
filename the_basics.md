## The Basics

### Using a Build Workflow

We will be using npm. Node package manager. To manage dependencies.

We will be using Webpack to bundle up files together for when we come to deploy the mini projects.

We will be using babel to translate old features to model (babel) and to compile next gen javascript.

We will be using a development server to run code locally.

### Setup / Creating a template React App

Follow steps outlined in: https://github.com/facebook/create-react-app

This will allow for the creation of a facebook react template app to be made.

Simple instructions:

1) npm install create-react-app -g // install
2) create-react-app react-complete-guide // create a new app. Creates a folder with all dependencies included.
3) Navigate to newly created folder
4) npm start // starts up npm and hosts on http://localhost:3000

#### Understanding folder structure

package.json lists all the dependencies and scripts for the project. The scripts can be run with:

- npm run start
- npm run build
- npm run test
- npm run eject

After a change has been made, can use the build command to update the website.

The node modules folder holds all the dependencies for the project. Has loads in there. Should not edit anything
within here.

public folder contains the root folder that contains the files that we should edit for the website.

Index html is the single page we have upon installing the template. This would be where we could branch off and
facilitate the creation of the entire website.

manifest.json contains some metadata about the project.

The src folder contains all the react specific javascript files, which is effectively the react application. It will
contain all of the components that we will be altering/using. Index.js is the starting point and imports all other
required components from other javascript files.

When starting a new project from this, it's important to remove the component code in app.js to start afresh and
then remove the logo.svg file, as we will not be using that either.

Further to this, I can optionally remove all css content from app.css, and simply keep the .App class definition
should I want to clean it up fully.

### Component basics

In terms of the test project created in the step before, the first render method in index.js specifies the App
class which is imported from `./App`. Replacing that with any html would work, however using a component makes
more sense.

From a best practice point of view, `./App` should be the only declaration here within index.js. This is because
it is defined as the root component. This is akin to a hierarchical structure wherein we have a main block component
and subsequent components should be placed within it, rather than alongside it. So in this sense, `App.js` should
have a class called App that has all the component declarations within it.

The render() method within App.js will render something to the screen.

The default import in App.js defines what will be exported from that file by default...go figure.

Its important to note that html within a javascript component is not actually html but jfx. Babel will transpile
this into javascript and does the behind the scenes work for getting it displayed on the DOM.

### Understanding JSX

The html within the component is transpiled to javascript (which is preferred):

```
return (
  <div className="App">
    <h1>Hi, I am a React App</h1>
  </div>
);
```

and the above is a shortcut effectively for:

```
return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'hi i am a react App'))
```

### JSX restrictions

For the example of:

```
return (
  <div className="App">
    <h1>Hi, I am a React App</h1>
  </div>
);
```

We are restricted to using javascript specific terminology with respect to keywords. So `class` cannot be used,
hence why we have `className` instead. React is also converting div and h1 behind the scenes, so h1 and div
are not treated like html at all within the javascript block.

With the above example, another restriction is that only one element can be used. So another h1 element underneath the div would not work. A workaround is to return json, but it is best practice
to return multiple components instead. 

### Creating a functional component

Its important to use the component framework at a later date when we come to the point of being able to control 'state'. Which is effectively the dynamic element for React. 

Adding a new component:

1) Add a new file, starting with an uppercase. For example, Person.js. Then add the component code: 

```
import React from 'react';

const person = () => {
    return <p>I am a Person!</p>
}

export default person;
```

2) Add it to the main root component, or the place where it will be displayed: 

```
import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hi, I am a React App</h1>
        <Person />
      </div>
    );
  }
}

export default App;
```

The above shows that the new component is imported and then declared as `<Person />` which renders it to the screen.

### Components and JSX cheat sheet

When creating components, I have the choice between two different ways:

1) Functional components. `const cmp = () => { return <div>some text</div> }`
2) Class based components `class cmp extends Component { render() {return <div>some text</div>}}`

For the above, the first is recommended. 

### Outputting dynamic components

Running dynamic content on a javscript component can be as simple as having it call some javascript code at runtime. For example: 

`return <p>I am a Person and I am { Math.floor(Math.random() * 30) } years old!</p>`

One line expressions. These can then be updated on dynamic loads for the page through an event handler possibly. 

### Working with props

Props can be used as a parameter for a component and refers to the attributes for the components. Using that can allow for a component to refer to attributes that are passed to it. For example: 

```
const person = (props) => {
    return <p>I am { props.name } and I am { props.age } years old!</p>
}
```

Which can then be declared and rendered using:

`<Person name='Adam' age='29' />`

### Understanding the children property 

React gives us access to a property that gives us access to elements between the opening and closing tags of a defined component. Could even be other React components. 

```
const person = (props) => {
    return (
        <div>
            <p>I am { props.name } and I am { props.age } years old!</p>
            <p>{ props.children }</p>
        </div>
    )
};
```

Which would show on the page the text between the opening and closing elements for: 

`<Person name='Adam' age='29'> Some additional information. </Person>`

### Understanding and using state

State is managed from inside of a component and can only be used on a class that extends from Component. 

React hooks can be used to manage state for functional components. 

Using state with care is important; an app can be unpredictable if state is used everywhere. 

State is a javascript object. Can be declared using: 

```
class App extends Component {
  state = {
    persons: [
      { name: 'Adam', age: 29 },
      { name: 'Herpa', age: 30 },
      { name: 'Derpa', age: 31 }
    ]
  }

  ...other component based code
```

This can then be referred to within the component by using `this.state.persons[0].name` for example. 

state is a property of the component class, you have to call it state - the name is not optional. You can then access it via `this.state` in your class JSX code (which you return in the required render()  method).

Whenever state changes, the component will re-render and reflect the new state. The difference to props is that this happens within one and the same component - you don't receive new data (props ) from outside.

It is important to note that the state would likely be populated in cases where dynamic content would be loaded in for an application. 

### Handling events with methods

Events can be added to objects. A classic example would be adding an `onClick` event to a button that results in a function being called. 

```
  switchNameHandler = () => {
    console.log('Was clicked!');
  }

  <button onClick={this.switchNameHandler}>Switch Name</button>
```

Find a list of supported events here: https://reactjs.org/docs/events.html#supported-events

**__important__**

When calling this.switchNameHandler, if () is added to the end, then it will be called straight away when the DOM is loaded. So definitely do not invoke it.   

The exception to this rule is if it is assigned to a function. So 

`<button onClick={ () => this.switchNameHandler('Super Adam 2') }>Switch Name</button>`

Will not be called when the DOM loads as there is an arrow function `() =>` in place. 

### Manipulating state

The component object happens to have a setState method. It allows us to update the special state property and ensures that React updates the DOM. It takes an object as an argument and merges what is specified with the existing state. 

```
this.setState({
  persons: [
    { name: 'Super Adam', age: 29 },
    { name: 'Herpa', age: 30 },
    { name: 'Derpa', age: 31 }
  ]
})
```

Now when the button is clicked (assuming that the setState function is called on a buttons onClick event), the name will change from Adam to Super Adam. 

There are only two things within React that allow us to update the DOM; changing state and manipulating props. React looks out for props. If either changes, the code is analysed and anything that is different is updated. 

### Using state hook for State manipulation 

Allows us to manage state in functional components. This was introduced in a recent installment of React (v16.8 or higher). 

This relys on us not importing component, but useState instead. Then we can call useState within the function and set it up with some values:

```
  const [ personsState, setPersonsState ] = useState({
    persons: [
      { name: 'Adam', age: 29 },
      { name: 'Herpa', age: 30 },
      { name: 'Derpa', age: 31 }
    ]
  });
```

This will return two values, the first will be the state object. The second element will always be a function that allows us to update the state. So that React is aware of it and therefore will allow for the DOM to be updated. 

SetState can then be used as follows: 

```
  const switchNameHandler = () => {
    setPersonsState({
      persons: [
        { name: 'Super Adam', age: 29 },
        { name: 'Herpa', age: 30 },
        { name: 'Derpa', age: 31 }
      ]
    }) 
  }
```

And the switchNameHandler function can be declared and used when needed to update the DOM. For example, when calling an onClick event for a button. 

Also important to note is that the `this` keyword will no longer be valid if switching from a class to a functional way of creating a component, and in that sense will need to be removed. 

When using hooks, using setState does not merge the existing state with the new state, but will infact replace it instead. So in this case you will need to manually ensure that all required information is there when the state is being changed. An easier approach to solving this problem is to use `useState` multiple times. 

### Stateless vs Stateful components

In terms of best practice, it is deemed better to have fewer components that manage state to avoid unpredictable behaviour and to make it easier to manage. 

Smart and container components are named for components that manage state. Dumb or presentational containers are ones that do not manage state. 

### Passing method references between components

Updating the DOM when a presentational components content is clicked on, can be achieved by passing a reference to a handler that is set up within that container. This is apparently quite a common pattern that is followed. 

```
const person = (props) => {
    return (
        <div>
            <p onClick={props.click}>I am { props.name } and I am { props.age } years old!</p>
            <p>{ props.children }</p>
        </div>
    )
};
```

Where it is being called from the smart container with: 

```
<Person
  name={this.state.persons[1].name}
  age={this.state.persons[1].age}
  click={this.switchNameHandler.bind(this, 'Super herpa 2')}
>
```

It is recommended to not use an arrow function in this case, but to use bind instead, as assigning a function to an onClick event can be inefficient. 

### Adding two way binding

In order to created the ability for a presentational component to use an event handler, it needs to be passed to it. 

```
nameChangedHandler = (event) => {
  this.setState({
    persons: [
      { name: 'Adam', age: 29 },
      { name: event.target.value, age: 30 },
      { name: 'Derpa', age: 31 }
    ]
  });
}

...render code

<Person
  name={this.state.persons[1].name}
  age={this.state.persons[1].age}
  click={this.switchNameHandler.bind(this, 'Super herpa 2')}
  changed={this.nameChangedHandler}
>
```

Then this can be picked up and used. 

```
const person = (props) => {
    return (
        <div>
            <p onClick={props.click}>I am { props.name } and I am { props.age } years old!</p>
            <p>{ props.children }</p>
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    )
};
```

In this sense, the binding between the two components is between the events target that updates the DOM which is on the state, and person that has an effect on that. 