// @flow
import type {Action} from 'flow-declarations/redux';

export const SWITCH_TO_VIEW = 'SWITCH_TO_VIEW';
export const switchToView = (payload: Object): Action => ({
  type: SWITCH_TO_VIEW,
  payload,
});
