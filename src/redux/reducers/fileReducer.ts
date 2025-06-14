import { AT, isAppAction } from '../actions/actions';
import { UnknownAction } from 'redux';

// Define the state interface
export interface FileState {
  selectedPath: string;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: FileState = {
  selectedPath: '',
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
    case AT.OPEN_FILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AT.OPEN_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedPath: action.payload.filePath,
        error: null,
      };
    case AT.OPEN_FILE_FAILURE:
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
