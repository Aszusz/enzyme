import { OPEN_FILE_REQUEST, OPEN_FILE_SUCCESS, OPEN_FILE_FAILURE } from './types';

// Action creators for file dialog
export const openFileRequest = () => ({
  type: OPEN_FILE_REQUEST,
});

export const openFileSuccess = (filePath: string) => ({
  type: OPEN_FILE_SUCCESS,
  payload: filePath,
});

export const openFileFailure = (error: string) => ({
  type: OPEN_FILE_FAILURE,
  payload: error,
});

// Action types for TypeScript
export interface OpenFileRequestAction {
  type: typeof OPEN_FILE_REQUEST;
}

export interface OpenFileSuccessAction {
  type: typeof OPEN_FILE_SUCCESS;
  payload: string;
}

export interface OpenFileFailureAction {
  type: typeof OPEN_FILE_FAILURE;
  payload: string;
}

export type FileActionTypes = OpenFileRequestAction | OpenFileSuccessAction | OpenFileFailureAction;
