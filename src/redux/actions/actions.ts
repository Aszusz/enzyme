import { actionDef, makeActionTypes, makeActionCreators, MakeActionUnion } from './action-helper';
import { isAction } from 'redux';

const actions = {
  ['OPEN_DIRECTORY_REQUEST']: actionDef(),
  ['OPEN_DIRECTORY_SUCCESS']: actionDef<{ directoryPath: string }>(),
  ['OPEN_DIRECTORY_FAILURE']: actionDef<{ error: string }>(),
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
