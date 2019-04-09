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

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
