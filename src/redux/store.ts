import { legacy_createStore as createStore, applyMiddleware, compose, Store } from 'redux';
import rootReducer, { RootState } from './reducers';
import timeMiddleware from './middleware/timeMiddleware';

// Create the Redux store with middleware
const store: Store<RootState> = createStore(
  rootReducer,
  compose(applyMiddleware(timeMiddleware))
);

export default store;
