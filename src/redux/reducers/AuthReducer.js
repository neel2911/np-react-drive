import * as _const from '../../utilities/shared/ConstType';

const initialState = {
    isAuthorized: false
}

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case _const.LOGIN:
            return {
                isAuthorized: action.payload
            }
        case _const.LOGOUT:
            return {
                isAuthorized: false
            }
        default:
            break;
    }
    return state;
}