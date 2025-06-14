import { actionDef, makeActionTypes, makeActionCreators, MakeActionUnion } from './action-helper';
import { OPEN_FILE_REQUEST, OPEN_FILE_SUCCESS, OPEN_FILE_FAILURE } from './types';
import { isAction } from 'redux';

const actions = {
  [OPEN_FILE_REQUEST]: actionDef(),
  [OPEN_FILE_SUCCESS]: actionDef<{ filePath: string }>(),
  [OPEN_FILE_FAILURE]: actionDef<{ error: string }>(),
};

export const AT = makeActionTypes(actions);
export const AC = makeActionCreators(actions);

export type AppAction = MakeActionUnion<typeof AC>;

// Type guard to check if action is an AppAction
export const isAppAction = (action: unknown): action is AppAction => {
  if (!isAction(action)) return false;

  // Check if action.type exists as a value in AT object
  return Object.values(AT).some(type => type === action.type);
};
