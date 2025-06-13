import { combineReducers } from 'redux';
import timeReducer from './timeReducer';

const rootReducer = combineReducers({
  time: timeReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
