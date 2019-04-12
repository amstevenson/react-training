import * as actionTypes from './actionTypes'

// Synchronous
export const saveResult = (res) => {

    return {
        type: actionTypes.STORE_RESULT,
        result: res
    };
}

export const store_result = (res) => {

    // Simulate an API call (two seconds) then 
    // only return after it has finished. 
    return (dispatch, getState) => {

        // Run set timeout before dispatching
        setTimeout(() => {
            const oldCounter = getState().ctr.counter;
            console.log(oldCounter)

            // Pass the payload to the store
            dispatch(saveResult(res))
        }, (2000));
    }
};

export const delete_result = (id) => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultElId: id
    };
};