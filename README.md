# React Training

## Websites to run test code on

1) codepen.io is great for creating/editing html,css, javascript on the side.
2) jsbin.com for running javascript/html

## Behind the scenes

1) Babel transforms html within React blocks to javascript in the background, so 'class' is transformed to
className by default.

2) On multi page applications, the assumption is that a server will be involved with supplying the logic.
The preferred approach is to have single page applications (individual html pages) managed with widgets
containing business logic.

- Single: widgets in a hierarchical structure, only one ReactDOM.render call.
- multiple: only segments are widgets, multiple ReactDOM.render calls.

3) When hooks are used, the virtual DOM will check to see if the real DOM needs to be updated or not before proceeding to do so. It does this by checking if the State has changed, or if any props have changed (more on this in later sections below). 

## List of Modules

[Next-Gen JavaScript](./next_gen_js.md)

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

## Working with lists and conditionals 

### Rendering content conditionally 

Wrapping some content within a sec of curly braces gives the ability to write JavaScript within it. 

```
{<div>
</div>}
```

For the purposes of conditionals, ternary expressions can be used. In the example below, the content is rendered if showPersons is true, else it does nothing. 

```
return ( 
  { this.state.showPersons ? 
    <div>
      <Person
        name={this.state.persons[0].name}
        age={this.state.persons[0].age}
      />
    </div> : null
  }
);
```

The null at the end denotes what happens if the expression does not return true. 

### Handling dynamic content "The JavaScript way"

The above section shows an example of using a ternary expression in React. This is great, but can be confusing if we need nested statements. It can be hard to keep track of what expression is doing what. 

The cleaner solution for this is to keep in mind that the render function is called everytime the DOM is updated. So the logic surrounding what content is returned could be done before the return statement. Changing the example above this would look like: 

```
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          <Person
            name={this.state.persons[0].name}
            age={this.state.persons[0].age}
          />
        </div> 
      );
    }

    return (
      <div className="App">
        <h1>Hi, I am a React App</h1>
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>Toggle People</button>
          {persons}
      </div>
    );
```

Which is the more preferred way of doing it, as it makes it look cleaner and is easier to manage. Be aware that there is also a toggle that switches the state of this.state.showPersons between true and false each time a button is clicked. 

### Outputting lists 

A conversion between a JavaScript array and JSX may be needed before React can work with it. It can be declared as: 

```
    persons: [
      { name: 'Adam', age: 29 },
      { name: 'Herpa', age: 30 },
      { name: 'Derpa', age: 31 }
    ]
```

In JavaScript. The above example would need to be converted before being used inside of a React Component, the map function can allow us to do this. 

```
...Component code

// Show contents of array
{this.state.persons.map(person => {
  return <Person 
    name={person.name}
    age={person.age}
  />
})}

```

Map takes the element array index as an input. Using an arrow function means that it is called for each element in the array. By specifying `return`, it will attempt to return everything for that index, in our case we will be returning a Person object for each Person found in the array. 

Be wary that using the above will introduce a warning about how a key was not assigned, which should be addressed, to address this, we need to use the key prop, which is a default property that React expects to find on a component. It helps React update the list efficiently. 

This is as simple as assigning the key property to what is returned:

```
  {this.state.persons.map((person) => {
    return <Person 
      name={person.name}
      age={person.age}
      key={person.id} // Tell React what index to update on
    />
  })}
```

An index on the list can also be returned when specifying the second parameter for the map function: 

```
  {this.state.persons.map((person, index) => {
    return <Person 
      click={() => this.deletePersonHandler(index)}
      name={person.name}
      age={person.age}
      key={person.id} // Tell React what key to expect
    />
  })}
```

Which is useful for when you need to pass an identifer through to another function that is relative to the index for the list, rather than for metadata related to an object. 

This could be improved even further by using flexible lists to clean up how the data is presented above.

### Updating State Immutability 

When updating a variable and setting the state, make sure to use the slice method to copy the values from the object, rather than altering the references variable. 

So don't do: 

```
  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons;
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }
```

And instead do: 

```
  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons]; <<<
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }
```

### Flexible Lists

If we need to update a specific rows value for a given list of People, we can set up a function that can be used to update content dynamically. 

```
  {this.state.persons.map((person, index) => {
    return <Person 
      click={() => this.deletePersonHandler(index)}
      name={person.name}
      age={person.age}
      key={person.id}
      changed={(event) => this.nameChangedHandler(event, person.id)}
    />
  })}
```

The changed property declares a binding to a handler function that can used for specific events on input elements: 

```
<input type="text" onChange={props.changed} value={props.name}/>
```

In this example, when the input box is clicked on and text is entered, the nameChangedHandler function is evoked, which will update the props.name value. When Props change, React detects this and the DOM is re-rendered. 

To change the name, the follow code assumes that there is a set state for a component where an array of people are declared: 

```
  // A person has an id, a name, and an age. 
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    
    const person = { 
      // Slice the value of the person to create a new variable
      // rather than a reference
      ...this.state.persons[personIndex]
    };
    
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person; 

    // Update the `person.name` value for the object with the events target value,
    // which will be relative to what is entered within the text box. 
    this.setState( {persons: persons} );
  }
```

## Styling React Components

### General CSS

Pretty much the same as you presume it would be. Use logic to determine what classes are used for elements. If declaring an array of classes, using the `.join(' ')` method is required.  

Otherwise, use stylesheets and declare classes, id's etc, as I would for any other web based application/site. 

React can work with Radium for inline based CSS changes, that is, where CSS is defined and used in a React component.

### Adding and using Radium

The problem with combining CSS and React natively inline is that sudo selectors (`button:hover` for example) are not compatiable, since React transpiles what is inside the render function. 

Can get around this by using distinct css class names to allow it to be inscope. 

A third party application is required  however to allow for inline css to be used for sudo selectors: `Radium`. 

To install it: 

- npm install --save radium 

Then to use it, import the dependency:

`import Radium from 'radium';`

and wrap the Radium component around the App component that is returned by default: 

`export default Radium(App);`

This will inject some functionality that will parse the styles we use so that sudo selectors work as we expect. 

To use within an inline style, it needs to start with a colon, and be wrapped within a string; as they are not valid JavaScript names, but as strings they are:

```
  const style = {
    backgroundColor: 'green',
    color: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    marginBottom: '10px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'blue',
      color: 'white'
    }
  };

  <button style={style}>Hover button</button>
```

### Using Radium for media related css

Media queries can be used inline when Radium is used: 

```
const person = (props) => {

    const style = {
        '@media (min-width: 500px)': {
            width: '450px'
        }
    };

    return (
        <div className="Person" style={style}>
            <p onClick={props.click}>I am { props.name } and I am { props.age } years old!</p>
            <p>{ props.children }</p>
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    )
};
```

However, this will not work unless the rendered element is wrapped inside of a StyleRoot element:

```
  return (
    <StyleRoot>
    <div className="App">
      <h1>Hi, I am a React App</h1>
      <p className={classes.join(' ')}>Woo, an application made with React</p>
      <button 
        style={style}
        onClick={this.togglePersonsHandler}>Toggle People</button>
        {persons}
    </div>
    </StyleRoot>
  );
```

The `{persons}` output defines a list of elements derived from the component that uses the media css that Radium and StyleRoot work together to facilitate. 

### Using CSS stylesheets

Follow the steps outlined in: 

- https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet

To allow for different css sheets to be used, where certain class names may be the same, but where  the values could differ from one another.

CSS Modules are a relatively new concept (you can dive super-deep into them here: https://github.com/css-modules/css-modules). With CSS modules, you can write normal CSS code and make sure, that it only applies to a given component.

It's not using magic for that, instead it'll simply automatically generate unique CSS class names for you. And by importing a JS object and assigning classes from there, you use these dynamically generated, unique names. So the imported JS object simply exposes some properties which hold the generated CSS class names as values.

Example:

In the post.module.css file

```
.Post {
    color: red;
}
```

In Post Component File

`import styles from './post.module.css';`
 
const post = () => (
    <div className={styles.Post}>...</div>
);

Here, styles.Post  refers to an automatically generated Post  property on the imported styles  object. That property will in the end simply hold a value like Post__Post__ah5_1 .

So your .Post  class was automatically transformed to a different class (Post__Post__ah5_1 ) which is unique across the application. You also can't use it accidentally in other components because you don't know the generated string! You can only access it through the styles object. And if you import the CSS file (in the same way) in another component, the styles  object there will hold a Post  property which yields a different (!) CSS class name. Hence it's scoped to a given component.

By the way, if you somehow also want to define a global (i.e. un-transformed) CSS class in such a .css  file, you can prefix the selector with :global .

Example:

`:global .Post { ... } `

Now you can use className="Post"  anywhere in your app and receive that styling.

## Debugging

### Understanding error messages

When an error is introduced into the code, a stack trace is likely shown which will help debug what the problem is. Also, inspecting and going to the console tab will give a stack trace. 

In this case, the first step is to find the stack trace line that indicates what line the code is breaking on. 

### Finding logical Errors using Dev tools and Sourcemap 

In the sources tab on developer tools, you can navigate through the file explorer on the left hand side to the JavaScript file that has the component in. 

After logically determining what line(s) could be interferring with the functionality in question, break points can be added by clicking on the numbered lines. 

The web site will pause when the logic is being invoked, and the data will show in the developer tools that may help to debug the error. 

In some cases this can be hard to find because there can be two folders generated that have the same JavaScript file within them. In this case I found that the folder containing the right JavaScript file to breakpoint within was the one named `static/js`.

Read more about Devtool Debugging: 

- https://developers.google.com/web/tools/chrome-devtools/javascript/

#### React Developer Tools

In addition to using Dev tools and breakpoints, an extension can be added to chrome to help debug even further. This is called `React Developer Tools`. 

This adds another menu to developer tools that inspects all React components and gives information about object data, state and props. 

### Showing an error to the user

Exceptions being thrown in specific parts of code can help debug potential problems as they arise. Especially in large applications. These can be declared in a React component rather easilly: 

```
const person = (props) => {

    const rnd = Math.random();

    if ( rnd > 0.7 ) {
        throw new Error('something went wrong')
    }

    ...other code
```

The nice thing about this too, is that it will not appear in a production build. However, if a development build is hosted on a live server/box, it does mean that the user will see the stack trace, which may not be ideal. So in this case an ErrorBoundary component would be more preferable. 

With React 16, error boundaries can be created. React 16 introduces a new method called `componentDidCatch` that takes an error and info as arguments. This then means that whenever the component configured with that method throws an error, the logic within the function is called:

```
import React, { Component } from 'react';

class ErrorBoundary extends Component {

    state = {
        hasError: false,
        errorMessage: ''
    }

    componentDidCatch = (error, info) => {
        this.setState({
            hasError: true, errorMessage: error
        });
    }

    render() {
        if (this.state.hasError){
            return <h1>{this.state.errorMessage}</h1>;
        } else {
            return this.props.children; // Children are whatever we wrap inside of error boundary
        }
    }
}

export default ErrorBoundary;
```

An ErrorBoundary component is known as a wrapper component, the goal being that it wraps around another element to handle any errors that are thrown within those elements. In the example below, if the Person component throws an error, the ErrorBoundary component's `componentDidCatch` function will be called:

```
return <ErrorBoundary>
    <Person 
      click={() => this.deletePersonHandler(index)}
      name={person.name}
      age={person.age}
      key={person.id}
      changed={(event) => this.nameChangedHandler(event, person.id)}/>
  </ErrorBoundary>
```
Only use ErrorBoundaries in cases where we expect there to be behaviour that needs to be handled in a certain way. If not, there is no real reason to wrap everything around an ErrorBoundary. 

It is also worth mentioning that these will only be shown in a production build, and in a developer build the stack trace will still be shown rather than the error message within the ErrorBoundary. 

Read more:  

- https://reactjs.org/docs/error-boundaries.html

### Other ways to debug using developer tools

Near the bottom of developer tools will be two tabs by default (Console and What's New). Clicking on the burger icon to the left of it will bring up more menu's. By clicking on Rendering, and then ticking on `Paint flashing` you can pinpoint areas of the screen that are being rendered on the real DOM. Which may be helpful when trying to diagnose how often particular parts of the page are being rendered. 

## Components Deep Dive

### A Better Project Structure

The questions for determining a project structure are:

- What should go into its own component?
- What do you group together in a higher up component (i.e the root)?

The answer lies within determining how much code within a component can be split out into others; if we have a component that returns one element, changes are it has been split down enough.

Typically however, Components that manage state, or higher up ones like the App component, should not be returning UI rendering logic too much. It should be lean and not contain too much JSX. 

### Setting an App into Components

Important to note here is that containers should be used to manage and set the state. So they should only contain code that relates to handlers, events, setting state. Other required logic should be in components.

An example structure for this would be:

```
  App.js (container - sets state, sets properties for called components, defines events/handlers) calls:

    persons.js (component - returns a list of people (props sent from App.js))
    cockpit.js (component - returns html content for the rest of the page(props send from App.js))

```

### Comparing Stateful and Stateless components

Stateful components are components that manage state. Where `setState` is used or where hooks are used. 

Presentational components were called functional components in the past because they used to be unable to manage state before hooks were introduced. If a component can possibly not manage state, it should not, since it is best to restrict yourself to a couple of components that are responsible for state management. 

The majority of components should be presentational/stateless; ones that don't manage state. This is because splitting the app into containers and presentational components makes it manageable. Where the stateful containers very likely call components, so it creates a hierarchical structure and is easier to manage as a result.   

### Class based vs Functional Components

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

### Component Lifecycle (for class based components)

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

#### Lifecycle: Component Creation

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

#### Lifecycle: Component Update

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

#### Other Class Based Lifecycle functions

`componentWillUnmount` is called when a component is removed from the DOM: 

```
    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount');
    }
```

This is typically used in scenarios where cleaning up is required. 

#### Using shouldComponentUpdate() for optimisation

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

### Component Lifecycle (for functional components) 

#### Using useEffect() in functional components

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

#### Controlling the useEffect() behaviour 

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

### Optimising Functional Components With React memo()

Using memo() is a React technique where defaut exports are wrapped with `memo(component)` function call. React will memorise (store) a snapshot of the component. And will only update it if the inputs change. 

It is good practice to wrap functional components this way when working with components that do not change all of the time. A final example of how to use it is:

`export default React.memo(cockpit);`

Based on this though, there may be an assumption that wrapping each functional component in this way is a good idea, however, it is not. They should only be used when there is a parent/child structure where the parent updates the child, but if nothing actually needs to update, then you are adding unnecesary checks by adding `memo` to each component. 

### How React updates the DOM

`render()` does not actually update the DOM. It suggests what the update for the DOM should be. It actually does it by comparing the old virtual DOM, to the re-rendered virtual DOM. The old virtual DOM is faster than the real one. 

A Virtual DOM is essentially a JavaScript representation of the script; React basically has two copies of the DOM, the old one and the one that will be re-rendered. It compares the old virtual DOM to the new one, and checks if there are any differences. If there are changes, then it reaches out and updates it. However, it only updates it in the places where differences were detected. If no differences are found, then it leaves it alone. 

### Rendering Adjacent JSX elements

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

### Higher Order Components 

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

### Setting State Correctly

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

### Using Prop types

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

### Using Refs (classes) for elements

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

### Using Refs (functional) for elements

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

### Understanding Prop Chain Problems - Using Context API

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

### contextType & useContext()

A more efficient way of using the context container declared in the previous section

#### Class based components

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
#### Functional components

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

## Building the burger app

### Layout/Design

Things to keep in mind:

- Media CSS

Layout:

```
- App.js
  - Layout.js
    - Toolbar (component)
      - Drawer Toggle (button)
      - Logo
      - Navigation items (component/list)
    - Side Drawer (component)
      - Logo
      - Navigation items (component/list)
    - Backdrop (component)
     - Some html code, no nested children
    - {props.children} (component) (the content for each page clicked on)
      - Burger Builder page (component)
        - Build Controls components (ingredient buttons)
          - Build control component (remove/add ingredient)
          - Order control component 
        - Burger component (preview of burger)
          - A list of ingredients
        - Modal component (checkout)
          - A wrapper component taking {props.children}. May write messages, alerts, summaries etc
```

Identifying state of the application: 



## HTTP Requests

## Routing

## Forms and Validation

## Redux

## Authentication

## Testing Introduction

## Deployment

## Bonus section

