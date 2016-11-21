// @flow

export type Action = {
  type: string,
  payload?: any,
};

export type AsyncAction = (dispatch: Function, getState: Function) => void
