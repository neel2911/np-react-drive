import { combineReducers } from 'redux';
import HttpReducer from './HttpReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
    httpReducer: HttpReducer,
    authReducer: AuthReducer
});