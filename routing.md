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
