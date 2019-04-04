import React from 'react';

// Globally available context object
const authContext = React.createContext({
    authenticated: false, 
    login: () => {console.log('[auth-context.js] login function clicked')}
});

export default authContext;