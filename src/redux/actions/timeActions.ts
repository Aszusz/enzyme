import { 
  FETCH_TIME_REQUEST, 
  FETCH_TIME_SUCCESS, 
  FETCH_TIME_FAILURE 
} from './types';

// Action creators for time
export const fetchTimeRequest = () => ({
  type: FETCH_TIME_REQUEST
});

export const fetchTimeSuccess = (time: string) => ({
  type: FETCH_TIME_SUCCESS,
  payload: time
});

export const fetchTimeFailure = (error: string) => ({
  type: FETCH_TIME_FAILURE,
  payload: error
});

// Action types for TypeScript
export interface FetchTimeRequestAction {
  type: typeof FETCH_TIME_REQUEST;
}

export interface FetchTimeSuccessAction {
  type: typeof FETCH_TIME_SUCCESS;
  payload: string;
}

export interface FetchTimeFailureAction {
  type: typeof FETCH_TIME_FAILURE;
  payload: string;
}

export type TimeActionTypes = 
  | FetchTimeRequestAction 
  | FetchTimeSuccessAction 
  | FetchTimeFailureAction;
