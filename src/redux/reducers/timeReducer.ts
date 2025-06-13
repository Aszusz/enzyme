import { 
  FETCH_TIME_REQUEST, 
  FETCH_TIME_SUCCESS, 
  FETCH_TIME_FAILURE 
} from '../actions/types';
import { AnyAction } from 'redux';

// Define the state interface
export interface TimeState {
  currentTime: string;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TimeState = {
  currentTime: '',
  loading: false,
  error: null
};

// Time reducer
const timeReducer = (state = initialState, action: AnyAction): TimeState => {
  switch (action.type) {
    case FETCH_TIME_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_TIME_SUCCESS:
      return {
        ...state,
        loading: false,
        currentTime: action.payload,
        error: null
      };
    case FETCH_TIME_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default timeReducer;
