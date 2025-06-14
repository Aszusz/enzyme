import { Middleware } from 'redux';
import { AT, AC, isAppAction } from '../../redux/actions/actions';

/**
 * Mock implementation of the fileMiddleware for testing
 * This middleware intercepts OPEN_DIRECTORY_REQUEST actions and simulates a successful response
 */
export const mockFileMiddleware: Middleware = store => next => action => {
  // Pass the action to the next middleware or reducer
  const result = next(action);

  // Check if it's a valid AppAction
  if (!isAppAction(action)) {
    return result;
  }

  // Check if the action is a directory dialog request
  if (action.type === AT.OPEN_DIRECTORY_REQUEST) {
    // Mock successful response with a test directory path
    setTimeout(() => {
      store.dispatch(AC.OPEN_DIRECTORY_SUCCESS({ directoryPath: '/mock/path/to/test-directory' }));
    }, 0);
  }

  return result;
};

/**
 * Mock implementation that simulates a failure response
 * This middleware intercepts OPEN_DIRECTORY_REQUEST actions and simulates an error response
 */
export const mockFileMiddlewareWithError: Middleware = store => next => action => {
  // Pass the action to the next middleware or reducer
  const result = next(action);

  // Check if it's a valid AppAction
  if (!isAppAction(action)) {
    return result;
  }

  // Check if the action is a directory dialog request
  if (action.type === AT.OPEN_DIRECTORY_REQUEST) {
    // Mock error response
    setTimeout(() => {
      store.dispatch(
        AC.OPEN_DIRECTORY_FAILURE({
          error: 'Mock directory dialog error',
        })
      );
    }, 0);
  }

  return result;
};

/**
 * Mock for the Tauri invoke function
 * This function simulates the behavior of the Tauri invoke function
 * for the open_directory_dialog command
 */
export const mockTauriInvoke = (command: string): Promise<string> => {
  if (command === 'open_directory_dialog') {
    return Promise.resolve('/mock/path/to/test-directory');
  }
  return Promise.reject(new Error(`Unknown command: ${command}`));
};

/**
 * Mock that always throws an error
 * This function simulates a failure when invoking the Tauri API
 */
export const mockTauriInvokeWithError = (): Promise<never> => {
  return Promise.reject(new Error('Mock directory dialog error'));
};
