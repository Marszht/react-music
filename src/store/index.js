import { createStore, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import reducer from './reducer';

// 让 redux-tools有用  一个插件
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
));
export default store;