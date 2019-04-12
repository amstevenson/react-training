# HTTP Requests - Reaching Out To The Web

## Http Requests in React (Typically)

As would be expected, a React App making a request to a Server would hopefully not be returning a html page, but would be returning some data in a JSON format. 

Typically, an Ajax call would not be interacting directly with a database, but would be hitting another api (ideally an adapter) to perform CRUD operations. 

## Introducing Axios

Axios is a third party library package which you can add to any JavaScript project. It fits nicely into React, this can be found here:

https://github.com/axios/axios

Make sure to install it with:

- npm install axios --save

### Cool Way to Test HTTP Requests

https://jsonplaceholder.typicode.com/

A background REST api backend where you can send requests to to get some dummy data, or to simulate storing dummy data. It's great for sending test HTTP requests and making sure that API's can connect as expected or talk to the internet. 

## Creating a HTTP Request to GET Data

Use the link:

https://jsonplaceholder.typicode.com/posts for this. 

It is important to note that side effects should be handled by a specific life cycle event. We should use `componentDidMount` for this, as it causes a re-render. However, if a side effect is not causing a re-render, then another life cycle event should be used.  

Axios uses `promises`. A default JavaScript object introduced with ES6. `Axios.get()` returns a promise, which can then be used alongside the `.then()` function. 

```
class Blog extends Component {
    
    componentDidMount() {
        // 1st argument URL. 2nd to configure request. 
        // .then() is called after the data has been collected from the API. 
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                console.log('[Blog.js] blogs: ', response)
            });
    }

    ...
```

For the above, we would want to update the UI by using the `.then()` function that we set up. 

## Rendering Fetched Data To The Screen

State is needed to accomplish this, and is updated when the GET request is sent to the server and the function configured with `.then()` is called. 

```
class Blog extends Component {
    
    state = {
        posts: []
    }

    componentDidMount() {
        // Remember this triggers a render() function call after it has finished.
        // 1st argument URL. 2nd to configure request. 
        // .then() is called after the data has been collected from the API. 
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                this.setState({posts: response.data})
            });
    }
    
    render () {
        const posts = this.state.posts.map(
            post => {
                return <Post key={post.id} title={post.title}/>
            }
        );

        return (
            <div>
                <section className="Posts">
                    {posts} 

        ... other render stuff
```

## Transforming Data

One example of only getting back a certain amount of posts is:

```
    componentDidMount() {
        // Remember this triggers a render() function call after it has finished.
        // 1st argument URL. 2nd to configure request. 
        // .then() is called after the data has been collected from the API. 
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Adam'
                    }
                });
                this.setState({posts: updatedPosts});
            });
    }
```

It would be assumed that pagination would be used alongside this sort of transformation approach. 

## Fetching Data on Update (Without Creating Infinite Loops)

![alt text][logo]

[logo]: ./lifecycle_class.PNG "Life Cycle classes"

It would be assumed that performing a HTTP Request in `componentDidUpdate()` would make sense. However, if the component making this request was called by another component that also makes a request. It will go in an infinite loop:

```
Post -> HTTPRequest to get all posts 
post -> render() called
post -> render() creates posts, full posts etc
full post (a page for the entire post) -> call HTTPRequest

Afterwards, we get an infinite loop surrounding the render function:

full post -> render()
post -> render()
full post -> render() 

...forever

```

To identify if this is happening, select the `Network` tab on Developer Tools. If you see a million requests going off at once, you know there is a problem with potentially nested side effects.

Which is definitely something to look out for. To get around this, we can still use `componentDidUpdate`, but we need to check and make sure that we only send another request if we need to get a new resource:

```
class FullPost extends Component {
    
    state = { 
        loadedPost: null
    }

    componentDidUpdate() {
        if (this.props.id) {
            
            // If the post is loaded, and if the id is not equal to the one set, get a resource
            if (!this.state.loadedPost || 
                (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                    
                axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                .then(response => {
                    this.setState({loadedPost: response.data})
                });
            }
        }
    }
```

## POSTing Data to the Server

There is only a slight difference here between POST and GET:

```
class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Adam'
    }

    postDataHandler = () => {

        const data = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        }

        // First is url
        // Second is data we want to send - It will convert the object to JSON for us
        // Third argument can be used to configure the request
        axios.post('https://jsonplaceholder.typicode.com/posts', data)
            .then(response => {
                console.log('[NewPost.js] posting new blog response: ', response)
            });
    }

    ...the rest...including configured button with an onClick() event that calls the above handler
```

## Sending a DELETE Request

This is effectively the same as before, except using delete rather than post or get:

```
class FullPost extends Component {
    
    state = { 
        loadedPost: null
    }

    deletePostHandler = () => {
        // First is URL
        axios.delete('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
            .then(response => {
                console.log('[FullPost.js] deleting post response: ', response)
            });
    }

    ...the rest...including configured button with an onClick() event that calls the above handler
```

## Handling Errors Locally

A really useful feature of Axios is the `.catch` function. It allows you to declare a function that is called when a XMLHttpRequest fails:

```
class Blog extends Component {
    
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount() {
        // Remember this triggers a render() function call after it has finished.
        // 1st argument URL. 2nd to configure request. 
        // .then() is called after the data has been collected from the API. 
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Adam'
                    }
                });
                this.setState({posts: updatedPosts});
            })
            .catch(error => {
                console.log(error);
                this.setState({error: true})
            });
    }
```

This can then be used to update the UI or state as appropriate. 

## Adding Interceptors to Execute Code Globally 

Intereptors can be used in cases where you want to add global functionality that is called when an axios request is used anywhere within your code. These functions can be declared globally and can be called for every request leaving the app and every response coming back. 

Especially useful for common headers (auth header) or responses if we want to log them, or want to handle errors globally. 

These should be declared at the highest possibe point, so possibly in `index.js` or `app.js` respectively. 

Requests going out of the application example (index.js):

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// Use registers a new Interceptor and takes a configuration/function as an argument
// This is for requests going out
axios.interceptors.request.use(request => {
    console.log('[index.js] Interceptor request: ', request);

    // Edit the request as needed

    // Need to always return the request, otherwise we are blocking it.
    return request
}, error => {
    // Handle any errors that occur
    console.log('[index.js] Interceptor error found: ', error);

    // By rejecting, we are returning the error to the local file that called
    // the HTTPRequest. Therefore if that JavaScript file has a local error handler,
    // that function will be called instead.
    return Promise.reject(error);
});
```

Requests coming back from an API example (index.js):

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.interceptors.response.use(response => {
    console.log('[index.js] Interceptor response: ', response);

    // Edit the request as needed

    // Need to always return the response, otherwise we are blocking it.
    return response
}, error => {
    // Handle any errors that occur
    console.log('[index.js] Interceptor error found: ', error);

    // By rejecting, we are returning the error to the local file that called
    // the HTTPRequest. Therefore if that JavaScript file has a local error handler,
    // that function will be called instead.
    return Promise.reject(error);
});
```

More info:

- https://github.com/axios/axios#interceptors

## Setting Default Configuration for Axios

We can set a default baseURL for axios:

- `axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';`

Which will effectively mean that any axios.get, delete or post request will use that automatically. Therefore after making that change, to do a get, all we need is: 

```
    axios.get('/posts')
        .then(response => {
```

Rather than having to also include the URL. 

### Creating your own Axios Instance !Important

If we don't want to use the baseURL for the entire application, but only for parts of it, and for other parts a different URL, we can use a feature by axios called instances. This effectively means creating an new axios object and changing specific variables.

axios.js:

```
import axios from 'axios';

// Create an instance of axios, or a copy
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';
instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;
```

To use it in a file, it simply needs to be imported and then used like normal:

- `import axios from '../../axios';`

Afterwards, any reference to `axios` will be treated the same as before. 
