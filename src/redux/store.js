import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './reducers/RootReducer';

const store = createStore(RootReducer, compose(applyMiddleware(thunk)));
export default store;