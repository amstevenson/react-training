import * as actionTypes from '../actions';

const initialState = {
    results: []
}

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                // Like push, but push manipulates the value, 
                // concat copies it and adds to it (returns a new array immutably)
                results: state.results.concat({id: new Date(), value: action.result})
            }
        case actionTypes.DELETE_RESULT:
            // Filter returns a new Array, but only populates it with entries
            // that fulfil a certain condition.
            const updatedArray = state.results.filter(result => result.id !== action.resultElId);
            return {
                ...state,
                results: updatedArray
            }
    }
    return state;
}

export default reducer;