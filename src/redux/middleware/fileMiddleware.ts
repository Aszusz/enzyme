import { Middleware } from 'redux';
import { invoke } from '@tauri-apps/api/core';
import { OPEN_FILE_REQUEST } from '../actions/types';
import { openFileSuccess, openFileFailure } from '../actions/fileActions';

// File dialog middleware to interact with Rust backend
const fileMiddleware: Middleware = store => next => async (action) => {
  // Pass the action to the next middleware or reducer
  const result = next(action);
  
  // Check if the action is a file dialog request
  if (action && typeof action === 'object' && 'type' in action && action.type === OPEN_FILE_REQUEST) {
    try {
      // Call the Rust backend open file dialog command
      // We don't need to pass any parameters as the app_handle is automatically injected
      const filePath = await invoke('open_file_dialog');
      
      // Dispatch success action with the file path from the backend
      store.dispatch(openFileSuccess(filePath as string));
    } catch (error) {
      // Dispatch failure action with the error message
      store.dispatch(openFileFailure(error instanceof Error ? error.message : 'Failed to open file dialog'));
    }
  }
  
  return result;
};

export default fileMiddleware;
