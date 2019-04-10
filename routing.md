# Routing

Routing is about being able to show different pages to the user. Most applications have more than one page. Multiple pages in a single page application. What happens is that the single page is reloaded with the content for the provided route, and showing the appropriate JSX. 

The effective outcome is that a user will go to a route, a config will be read, and the appropriate JSX will be rendered. 

![alt text][logo]

[logo]: ./routing_intro.PNG "Routing intro"

## Setting Up the Router Package

Steps:

- `"npm install --save react-router react-router-dom"` contains the logic we need for routing and to tell React what to render.

The above is not created by Facebook, but is the defacto standard for implementing Routing in React. 

We next need to wrap the part of our app that should be able to render or read routes, which should either be in `index.js` or `app.js` respectively:

```
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
```

Once wrapped, it becomes the Router for the application, meaning that the functionality can be used from within the <BrowserRouter> component, and the effect persists to all sub components.

## Setting Up and Rendering Routes

### Rendering JSX in Routes

In it's simplest form, using the setup from the last section, we can achieve routing by importing `route` from `react-router-dom` and then wrapping some functionality the component:

```
import { Route } from 'react-router-dom';

class Blog extends Component {

    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li> // Don't <a> with react-router
                            <li><a href="/new-post">New Post</a></li>
                        </ul>
                    </nav>
                </header>

                <Route path="/" render={() => <h1>Home</h1>}/>
```

The `path` attribute for the `Route` component by default checks if the URL starts with the supplied string. In the event of `/`, it will always match because of this. To get around this, the `exact` attribute can be used, which means it the URL has to match the path exactly: 

- `<Route path="/" exact render={() => <h1>Home</h1>}/>`

The `<Route>` components content is effectively replaced by what the function within the `render` attribute returns. 

A case when you wouldn't use the exact attribute, would be if you had a path that is appended with a resource. For example `/post/<id>`. 

### Rendering Components in Routes

Like the previous section, the `Route` component can be used. However, instead of using the `render` attribute, the `component` attribtue is used when returning a component:

```
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts'

class Blog extends Component {

    render () {

        return (
            <div className="Blog">
                <Route path="/" exact component={Posts} />        
            </div>
        );
    }
}

export default Blog;
```

## Using Links to Switch Pages

One of the main problems of the previous sections is State. When using `<a>` elements to switch between pages, one of the main problems that can be encountered is that the `state` is lost. 

When using `react-router` it is important not to use `<a>` elements, but instead to import `Link` from react-router and use that instead: 

```
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts'
import NewPost from './NewPost/NewPost'

class Blog extends Component {

    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to={{
                                pathname: '/new-post', 
                                hash: '#submit',
                                search: '?quick-submit=true' // Where we are going to when we click
                            }}>New Post</Link></li>
                        </ul>
                    </nav>
                </header>

                <Route path="/" exact component={Posts} />        
                <Route path="/new-post" component={NewPost} />   
            </div>
        );
    }
}

export default Blog;
```

The `Link` component gives us the `to` attribute and makes it simple for us to navigate. We can either use a string to determine where to go to, or customise it in more depth to allow us to use a more advanced configuration. 

## Using Routing Related Props

Console logging `this.props` within a wrapped Route component, gives more details related to whether the URL matched exactly, what hash was setup, and other useful attributes that may be useful for debugging purposes. 

## Passing Down Router Props to Nested Components

The Route component will pass the props down to it's child component. However, the child component will not. A way to get around this is to use the `withRouter` import from `react-router-dom`: 

```
import React from 'react';
import { withRouter } from 'react-router-dom';

import './Post.css';

const post = (props) => {

    // console.log(props);

    return (
        <article className="Post" onClick={props.clicked}>
            <h1>{props.title}</h1>
            <div className="Info">
                <div className="Author">{props.author}</div>
            </div>
        </article>
    );
};

export default withRouter(post);
```

Afterwards, console logging out props will include Router specific attributes too.

## Absolute vs Relative Paths

The path you can use for a `Link` container can either absolute or relative. 

### Absolute Paths

By default, if you just enter to="/some-path"  or to="some-path" , that's an absolute path. 

Absolute path means that it's always appended right after your domain. Therefore, both syntaxes (with and without leading slash) lead to example.com/some-path .

### Relative Paths

Sometimes, you might want to create a relative path instead. This is especially useful, if your component is already loaded given a specific path (e.g. posts ) and you then want to append something to that existing path (so that you, for example, get /posts/new ).

If you're on a component loaded via /posts , to="new"  would lead to example.com/new , NOT example.com/posts/new . 

To change this behavior, you have to find out which path you're on and add the new fragment to that existing path. You can do that with the url property of props.match :

<Link to={props.match.url + '/new'}>  will lead to example.com/posts/new  when placing this link in a component loaded on /posts . If you'd use the same <Link>  in a component loaded via /all-posts , the link would point to /all-posts/new .

There's no better or worse way of creating Link paths - choose the one you need. Sometimes, you want to ensure that you always load the same path, no matter on which path you already are => Use absolute paths in this scenario.

Use relative paths if you want to navigate relative to your existing path.

### Making a Link Relative, not Absolute

It is best practice when configuring the pathName for a Link container to provide a relative path:

```
    <li><Link to={{
        pathname: this.props.match.url + '/new-post',  <<<
        hash: '#submit',
        search: '?quick-submit=true' // Where we are going to when we click
    }}>New Post</Link></li>
```

This is achived by using the `this.props.match.url` value and appending the route on the end. However, this needs to be set for this functionality to be available. 

## Using NavLink - Styling the Active Route

This is basically the same as `Link` except it has some special styling to it: 

```
    <nav>
        <ul>
            <li><NavLink 
                exact 
                to="/"
                activeClassName="active"
                activeStyle={{
                    color: '#fa923f',
                    textDecoration: 'underline'
                }}>Home</NavLink></li>
            <li><NavLink to={{
                pathname: '/new-post', 
                hash: '#submit',
                search: '?quick-submit=true' // Where we are going to when we click
            }}>New Post</NavLink></li>
        </ul>
    </nav>
```

The active class allows for styling to be added. Akin to the whole "if this page is selected", show this colour or these styles. 

Exact needs to be used, else both navigation links in the example will be highlighted. This is because both will be treated as being valid else. 

## Ordering of Routes

It is important to note that Routes are rendered from top to bottom:

```
// The order is "/", "/new-post" and then "/:id".
<Route path="/" exact component={Posts} />  
<Route path="/new-post" component={NewPost} />  
<Route path="/:id" exact component={Posts} /> 
```

## Extracting Route Parameters

This section describes how to get parameters that are part of the url, and use them. For example:

- `/post/1` - How do we get the `1` and use it? 

Defined in Blog.js:

```
<Route path="/:id" exact component={FullPost} />
```

Calls FullPost.js:

```
class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount () {
        if ( this.props.id ) {
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id) ) {
                axios.get( '/posts/' + this.props.id )
                    .then( response => {
                        // console.log(response);
                        this.setState( { loadedPost: response.data } );
                    } );
            }
        }
    }

    ...the rest
```

`componentDidMount` is used on initialisation. Therefore we can hook into the parameters of the Route container to find out what the passed in `:id` is. 

### More Information on Parsing Query Parameters & the Fragment

How do you extract search (also referred to as "query") parameters (=> ?something=somevalue  at the end of the URL)? How do you extract the fragment (=> #something  at the end of the URL)?

#### Query Params

You can pass them easily like this:

```
<Link to="/my-path?start=5">Go to Start</Link> 
```

or

```
<Link 
    to={‌{
        pathname: '/my-path',
        search: '?start=5'
    }}
    >Go to Start</Link>
```

React router makes it easy to get access to the search string: `props.location.search` .

But that will only give you something like `?start=5`

You probably want to get the key-value pair, without the ?  and the = . Here's a snippet which allows you to easily extract that information:

```
componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    for (let param of query.entries()) {
        console.log(param); // yields ['start', '5']
    }
}
```

`URLSearchParams` is a built-in object, shipping with vanilla JavaScript. It returns an object, which exposes the `entries()`  method. `entries()` returns an Iterator - basically a construct which can be used in a for loop (as shown above).

When looping through `query.entries()` , you get arrays where the first element is the key name (e.g. start ) and the second element is the assigned value (e.g. 5 ).

#### Fragment

You can pass it easily like this:

```
<Link to="/my-path#start-position">Go to Start</Link> 
```

or

```
<Link 
    to={‌{
        pathname: '/my-path',
        hash: 'start-position'
    }}
    >Go to Start</Link>
```

React router makes it easy to extract the fragment. You can simply access `props.location.hash` .

## Switching with Routes - render only one

Wrapping routes with a Switch means that only one is rendered, instead of all of them.

```
import { Route, NavLink, Switch } from 'react-router-dom';

    <Switch>
        <Route path="/" exact component={Posts} />  
        <Route path="/new-post" component={NewPost} />  
        <Route path="/:id" exact component={FullPost} /> 
    </Switch>
```

## Navigating Programatically

Useful for if you want to go to another page after something has happened, like a HTTP Request for example. 

```
    postSelectedHandler = (id) => {
        this.props.history.push({pathname: '/' + id});
    }

    ... render()
        return <Post 
                    key={post.id}
                    title={post.title} 
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)}  />
```

## Understanding Nested Routes

When we want to load a component inside of another component, both of which use Routing. 

`Blog.js`

```
    <Switch> 
        <Route path="/new-post" component={NewPost} />  
        <Route path="/posts" component={Posts} /> 
    </Switch>
```

calls `Posts.js`

```
    return (
        <div>
            <section className="Posts">
                {posts}
            </section>
            <Route path={this.props.match.url + '/:id'} exact component={FullPost} /> 
        </div>
    );
```

The props url property allows us to find the dynamic url to append the id to. 

!Important

`componentDidMount` will not be called every time a button is clicked. So if stuff doesn't look like it is refreshing, `componentDidUpdate` can be used instead. However, be cautious of causing an infinite loop, make sure to add conditions to prevent this from occurring. 

When using nested routes, the `props.match.params.id` property should be used to get the value of an attribute, which makes sense because you will be fetching it from there, as opposed to state. 

## Redirecting Requests - Defaults

The `Redirect` import can be used to achieve redirecting. Ensures that the user is moved/navigated to the routes we want to have him or her on. 

```
import { Redirect } from 'react-router-dom';

    <Switch> 
        <Route path="/new-post" component={NewPost} />  
        <Route path="/posts" component={Posts} /> 
        <Redirect from ='/' to ='/posts' />
    </Switch>
```

Conditional Redirects can also be used:

```
    render () {

        let redirect = null;
        if (this.state.submitted) {
            redirect = <Redirect to ='/posts' />
        }

        return (
            <div className="NewPost">
                {redirect}
```

This may be useful when the user needs to be moved once an action has been performed; like submitting a form. 

Alternatively, the history prop can be used:

```
    postDataHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        };
        axios.post('/posts', data)
            .then(response => {
                console.log(response);

                this.props.history.replace('/posts') <<<
            });
    }
```

This will put a page on the history stack, and after it is added, the user will be redirected. Using replace means that the back button will not return the user to the page they were on. To allow for back button functionality, `push` can be used instead of `replace`.

## Working With Guards

A Guard is used when we are not sure if a user is authenticated or not. Some Routes are only allowed to be visited if they are authenticated. 

In React, it's different to Angular in the sense that this should be achieved conditionally. For example, use state to store if a user is authenticated and then only redirect to a page if they are allowed there. 

## Code Splitting / Lazy Loading

### Before 16.6

This allows us to only load code to a JavaScript file when we need it. Useful in larger applications when a lot of information is being used. 

For this a Higher Order Component is needed. This will effectively import and return a component back:

```
import React, { Component } from 'react';

// Load a component only when needed. importComponent should be a func reference
const asyncComponent = (importComponent) => {
    return class extends Component {
        
        state = {
            // Will be set to the dynamically loaded component
            component: null
        }
        
        componentDidMount() {
            // Function returns a promise. 
            // Therefore this relys on the type of the component
            importComponent()
                .then(cmp => {
                    this.setState({component: cmp.default});
                });
        }
        
        render () {
            const C = this.state.component;

            // Return C with splitted props (if any) or nothing if not set
            return C ? <C {...this.props}/> : null;
        }
    }
}

export default asyncComponent;
```

We can then use `asyncComponent` to manage when a particular component is imported:

```
    ... other imports
    const AsyncNewPost = asyncComponent(() => {

        // Only import when the function is executed (once asyncComponent is used)
        return import('./NewPost/NewPost');
    });

    ... code

    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null }

```

In terms of what is stored relative to this file, it will only primarilly include `asyncComponent`. It will then only import `'./NewPost/NewPost'` when the code related to the Route component is executed. 

### After 16.6

React 16.6 introduced `React.lazy()`. Which effectively provides the functionality that the `asyncComponent` in the above section gives us. 

```
... imports
import React, { Component, Suspense } from 'react';

const Posts = React.lazy(() => import('./containers/Posts'));

...code
render() {
    <Route path="/posts" render={() => (
        <Suspense fallback={<div>Loading...</div>}>
            <Post />
        </Suspense>
    )}>
}

```

Fallback is used if React postpones the rendering of the React component.

Effectively, `Suspense` and `React.lazy()` are needed to achieve this. It will then only load the file when needed. 

## Routing and The Server (Deployment)

Important to note when hosting a React app, is that a 404 will be returned for a Route by default. This is because the Server will attempt to get the HTML representation for a path (for example `/posts`). 

React however (and probably other frameworks too) works in a way where the application gets the incoming request and then determines what the HTML content would be based on the URL that the request forwards on. This effectively is shown as: 

```
Server -> React App
Server (404 not found)

React App -> figures out content based on request
```

To get past this problem, the configuration for the server being used will need to change to allow requests to go through to the application even if a 404 is found. 

![alt text][logo2]

[logo2]: ./route_deploy.PNG "Routing deployment"

You also need to configure the base path for the React app too, so for `example.com/my-app`, the base url would be `my-app`. Otherwise, the likely scenario is that the URL will not be prefixed correctly. 

Using `BrowerRouter` this can be quite a simple change:

```
<BrowserRouter basename="/my-app">
    <The App>
</BrowserRouter>
```

Then for all requests they will have the prefix of `"/my-app"`. 
