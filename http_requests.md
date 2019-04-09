# HTTP Requests - Reaching Out To The Web

## Http Requests in React (Typically)

As would be expected, a React App making a request to a Server would hopefully not be returning a html page, but would be returning some data in a JSON format. 

Typically, an Ajax call would not be interacting directly with a database, but would be hitting another api (ideally an adapter) to perform CRUD operations. 

## Introducing Axios

Axios is a third party library package which you can add to any JavaScript project. It fits nicely into React, this can be found here:

https://github.com/axios/axios

Makes it simpler to make XMLHTTPRequests. 

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

