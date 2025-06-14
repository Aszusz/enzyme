import { Middleware } from 'redux';
import { invoke } from '@tauri-apps/api/core';
import { AC, AT, isAppAction } from '../actions/actions';

// Directory dialog middleware to interact with Rust backend
const fileMiddleware: Middleware = store => next => async action => {
  // Pass the action to the next middleware or reducer
  const result = next(action);

  // Check if it's a valid AppAction
  if (!isAppAction(action)) {
    return result;
  }

  // Check if the action is a directory dialog request
  if (action.type === AT.OPEN_DIRECTORY_REQUEST) {
    try {
      // Call the Rust backend open directory dialog command
      // We don't need to pass any parameters as the app_handle is automatically injected
      const directoryPath = await invoke<string>('open_directory_dialog');

      // Dispatch success action with the directory path from the backend
      store.dispatch(AC.OPEN_DIRECTORY_SUCCESS({ directoryPath }));
    } catch (error) {
      // Dispatch failure action with the error message
      store.dispatch(
        AC.OPEN_DIRECTORY_FAILURE({
          error: error instanceof Error ? error.message : 'Failed to open directory dialog',
        })
      );
    }
  }

  return result;
};

export default fileMiddleware;
