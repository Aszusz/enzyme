import { describe, it, expect } from 'vitest';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { mockFileMiddleware, mockFileMiddlewareWithError } from './mocks/fileMiddleware.mock';
import { AC } from '../redux/actions/actions';
import fileReducer from '../redux/reducers/fileReducer';

describe('File Middleware Tests', () => {
  describe('Success Middleware', () => {
    it('should handle file open request and dispatch success action', async () => {
      // Create a store with the success middleware
      const store = createStore(fileReducer, applyMiddleware(mockFileMiddleware));

      // Initial state check
      expect(store.getState().loading).toBe(false);
      expect(store.getState().selectedPath).toBe('');
      expect(store.getState().error).toBe(null);

      // Dispatch the open file request action
      store.dispatch(AC.OPEN_FILE_REQUEST({}));

      // Check loading state
      expect(store.getState().loading).toBe(true);
      expect(store.getState().error).toBe(null);

      // Wait for the async action to complete
      await new Promise(resolve => setTimeout(resolve, 10));

      // Check final state after success
      expect(store.getState().loading).toBe(false);
      expect(store.getState().selectedPath).toBe('/mock/path/to/test-file.txt');
      expect(store.getState().error).toBe(null);
    });
  });

  describe('Error Middleware', () => {
    it('should handle file open request and dispatch error action', async () => {
      // Create a store with the error middleware
      const store = createStore(fileReducer, applyMiddleware(mockFileMiddlewareWithError));

      // Initial state check
      expect(store.getState().loading).toBe(false);
      expect(store.getState().selectedPath).toBe('');
      expect(store.getState().error).toBe(null);

      // Dispatch the open file request action
      store.dispatch(AC.OPEN_FILE_REQUEST({}));

      // Check loading state
      expect(store.getState().loading).toBe(true);
      expect(store.getState().error).toBe(null);

      // Wait for the async action to complete
      await new Promise(resolve => setTimeout(resolve, 10));

      // Check final state after error
      expect(store.getState().loading).toBe(false);
      expect(store.getState().selectedPath).toBe('');
      expect(store.getState().error).toBe('Mock file dialog error');
    });
  });
});
