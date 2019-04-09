import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios'

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

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
        axios.get('/posts')
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

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id})
    }
    
    render () {

        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>

        if (!this.state.error) {
            posts = this.state.posts.map(
                post => {
                    return <Post 
                        key={post.id} 
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}/>
                }
            );
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;