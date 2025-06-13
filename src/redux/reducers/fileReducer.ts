import { 
  OPEN_FILE_REQUEST, 
  OPEN_FILE_SUCCESS, 
  OPEN_FILE_FAILURE
} from '../actions/types';
import { AnyAction } from 'redux';

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
  error: null
};

// File reducer
const fileReducer = (state = initialState, action: AnyAction): FileState => {
  switch (action.type) {
    case OPEN_FILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case OPEN_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedPath: action.payload,
        error: null
      };
    case OPEN_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default fileReducer;
