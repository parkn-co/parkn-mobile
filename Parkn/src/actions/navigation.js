// @flow
import {Action} from './flow';

export const NAV_NAVIGATE_TO = 'NAVIGATE_TO';
export function navigateTo(route: Object): Action {
  return {
    type: NAV_NAVIGATE_TO,
    payload: route,
  };
}

export const NAV_DID_NAVIGATE_TO = 'DID_NAVIGATE_TO';
export function didNavigateTo(route: Object): Action {
  return {
    type: NAV_DID_NAVIGATE_TO,
    payload: route,
  }
}

export const NAV_SET_IS_NAVIGATING = 'NAV_SET_IS_NAVIGATING';
export function setIsNavigating(isNavigating: Boolean): Action {
  return {
    type: NAV_SET_IS_NAVIGATING,
    payload: isNavigating,
  }
}
