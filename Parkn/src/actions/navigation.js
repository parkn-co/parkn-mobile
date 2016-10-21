export const NAV_NAVIGATE_TO = 'NAVIGATE_TO';
export function navigateTo(route) {
  return {
    type: NAV_NAVIGATE_TO,
    payload: route,
  };
}

export const NAV_DID_NAVIGATE_TO = 'DID_NAVIGATE_TO';
export function didNavigateTo(route) {
  return {
    type: NAV_DID_NAVIGATE_TO,
    payload: route,
  }
}

export const NAV_SET_IS_NAVIGATING = 'NAV_SET_IS_NAVIGATING';
export function setIsNavigating(isNavigating) {
  return {
    type: NAV_SET_IS_NAVIGATING,
    payload: isNavigating,
  }
}
