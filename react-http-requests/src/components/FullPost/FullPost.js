import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    
    state = { 
        loadedPost: null
    }

    deletePostHandler = () => {
        // First is URL
        axios.delete('/posts/' + this.props.id)
            .then(response => {
                console.log('[FullPost.js] deleting post response: ', response)
            });
    }

    componentDidUpdate() {
        if (this.props.id) {
            
            // If the post is loaded, and if the id is not equal to the one set, get a resource
            if (!this.state.loadedPost || 
                (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {

                axios.get('/posts/' + this.props.id)
                .then(response => {
                    this.setState({loadedPost: response.data})
                });
            }
        }
    }
    
    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading...!</p>;
        }

        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button 
                            className="Delete" 
                            onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
    
            );
        }

        return post;
    }
}

export default FullPost;