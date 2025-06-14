import { combineReducers } from 'redux';
import fileReducer, { FileState } from './fileReducer';

// Root reducer
const rootReducer = combineReducers({
  file: fileReducer,
});

// Root state type
export type RootState = {
  file: FileState;
};

export default rootReducer;
