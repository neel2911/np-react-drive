import * as _const from '../../utilities/shared/ConstType';

// Action
const login = (isLogin) => {
    return (dispatch) => {
        dispatch({ type: _const.LOGIN, payload: isLogin });
    }
}

const logout = () => {
    return (dispatch) => {
        dispatch({ type: _const.LOGOUT });
    }
}

export default {
    login,
    logout
};