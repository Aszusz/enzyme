import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import rootReducer, { RootState } from "./reducers";
import fileMiddleware from "./middleware/fileMiddleware";
import { Store } from "redux";

// Create the Redux store with middleware
const store: Store<RootState> = createStore(
  rootReducer,
  compose(applyMiddleware(fileMiddleware))
);

export default store;
