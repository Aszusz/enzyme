import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import fileMiddleware from './middleware/fileMiddleware';

// Create the Redux store with middleware
const store = createStore(rootReducer, compose(applyMiddleware(fileMiddleware)));

export default store;
