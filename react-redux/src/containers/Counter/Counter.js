import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions';

class Counter extends Component {
    state = {
        counter: 0
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 10" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 15" clicked={this.props.onSubtractCounter}  />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(strResult => (
                        <li key={strResult.id} onClick={() => this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                    ))}
                    <li onClick={this.props.onDeleteResult}>

                    </li>
                </ul>
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
        ctr: state.ctr.counter,
        storedResults: state.res.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // THe function is available through the propery
        onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT, val: 1}),
        onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT, val: 1}),
        onAddCounter: () => dispatch({type: actionTypes.ADD, val:10}),
        onSubtractCounter: () => dispatch({type: actionTypes.SUBTRACT, val: 15}),
        onStoreResult: (result) => dispatch({type: actionTypes.STORE_RESULT, result: result}),
        onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, resultElId: id})
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Counter);