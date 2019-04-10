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