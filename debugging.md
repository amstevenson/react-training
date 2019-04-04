# Debugging

## Understanding error messages

When an error is introduced into the code, a stack trace is likely shown which will help debug what the problem is. Also, inspecting and going to the console tab will give a stack trace. 

In this case, the first step is to find the stack trace line that indicates what line the code is breaking on. 

## Finding logical Errors using Dev tools and Sourcemap 

In the sources tab on developer tools, you can navigate through the file explorer on the left hand side to the JavaScript file that has the component in. 

After logically determining what line(s) could be interferring with the functionality in question, break points can be added by clicking on the numbered lines. 

The web site will pause when the logic is being invoked, and the data will show in the developer tools that may help to debug the error. 

In some cases this can be hard to find because there can be two folders generated that have the same JavaScript file within them. In this case I found that the folder containing the right JavaScript file to breakpoint within was the one named `static/js`.

Read more about Devtool Debugging: 

- https://developers.google.com/web/tools/chrome-devtools/javascript/

### React Developer Tools

In addition to using Dev tools and breakpoints, an extension can be added to chrome to help debug even further. This is called `React Developer Tools`. 

This adds another menu to developer tools that inspects all React components and gives information about object data, state and props. 

## Showing an error to the user

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

## Other ways to debug using developer tools

Near the bottom of developer tools will be two tabs by default (Console and What's New). Clicking on the burger icon to the left of it will bring up more menu's. By clicking on Rendering, and then ticking on `Paint flashing` you can pinpoint areas of the screen that are being rendered on the real DOM. Which may be helpful when trying to diagnose how often particular parts of the page are being rendered. 