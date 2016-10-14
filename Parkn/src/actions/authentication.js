export const SET_NAMES = 'SET_NAMES';
export function setNames(names) {
  return {
    type: SET_NAMES,
    payload: names,
  };
}
