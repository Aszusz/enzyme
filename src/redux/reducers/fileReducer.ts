import { AT, isAppAction } from '../actions/actions';
import { UnknownAction } from 'redux';

// Define the state interface
export interface FileState {
  selectedDirectoryPath: string;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: FileState = {
  selectedDirectoryPath: '',
  loading: false,
  error: null,
};

// File reducer
const fileReducer = (state = initialState, action: UnknownAction): FileState => {
  // Check if it's a valid AppAction
  if (!isAppAction(action)) {
    return state;
  }

  // Now TypeScript knows this is an AppAction
  switch (action.type) {
    case AT.OPEN_DIRECTORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AT.OPEN_DIRECTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedDirectoryPath: action.payload.directoryPath,
        error: null,
      };
    case AT.OPEN_DIRECTORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: (action.payload as { error: string }).error,
      };
    default:
      return state;
  }
};

export default fileReducer;
