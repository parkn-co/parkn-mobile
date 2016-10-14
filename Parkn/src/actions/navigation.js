export const NAVIGATE_TO = 'NAVIGATE_TO';
export function navigateTo(route) {
  return {
    type: NAVIGATE_TO,
    payload: route,
  };
}

export const DID_NAVIGATE_TO = 'DID_NAVIGATE_TO';
export function didNavigateTo(route) {
  return {
    type: DID_NAVIGATE_TO,
    payload: route,
  }
}
