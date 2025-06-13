import { Middleware } from 'redux';
import { invoke } from '@tauri-apps/api/core';
import { FETCH_TIME_REQUEST } from '../actions/types';
import { 
  fetchTimeSuccess, 
  fetchTimeFailure 
} from '../actions/timeActions';

// Time middleware to interact with Rust backend
const timeMiddleware: Middleware = store => next => async (action) => {
  // Pass the action to the next middleware or reducer
  const result = next(action);
  
  // Check if the action is a time request
  if (action && typeof action === 'object' && 'type' in action && action.type === FETCH_TIME_REQUEST) {
    try {
      // Call the Rust backend ping command
      const time = await invoke('ping');
      
      // Dispatch success action with the time from the backend
      store.dispatch(fetchTimeSuccess(time as string));
    } catch (error) {
      // Dispatch failure action with the error message
      store.dispatch(fetchTimeFailure(error instanceof Error ? error.message : 'Failed to fetch time'));
    }
  }
  
  return result;
};

export default timeMiddleware;
