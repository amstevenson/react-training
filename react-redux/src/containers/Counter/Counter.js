import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={() => this.counterChangedHandler( 'inc' )} />
                <CounterControl label="Decrement" clicked={() => this.counterChangedHandler( 'dec' )}  />
                <CounterControl label="Add 5" clicked={() => this.counterChangedHandler( 'add', 5 )}  />
                <CounterControl label="Subtract 5" clicked={() => this.counterChangedHandler( 'sub', 5 )}  />
            </div>
        );
    }
}

// State is not managed inside of the Component, it is managed by Redux
// The state gets mapped to the props so that it can be used in the Component. 
const mapStateToProps = state => {

    // JavaScript object returned with prop names and
    // slices of the state stored in Redux
    return {
        // Give me the states counter in the form of a property called ctr
        ctr: state.counter
    };
};

export default connect(mapStateToProps) (Counter);