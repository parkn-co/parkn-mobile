export type Action = {
  type: String,
  payload: ?Any
};

export type AsyncAction = (dispatch: Function, getState: Function) => void
