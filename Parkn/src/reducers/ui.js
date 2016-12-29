// @flow
import type {Action} from 'flow-declarations/redux';

import {
  SWITCH_TO_VIEW,
} from 'actions/ui';

const REDUCER_ACTION_HANDLERS = {
  [SWITCH_TO_VIEW]: (state: Object, payload: Action) => ({
    view: payload.view,
  }),
};

const initialState = {
  view: 'map',
};

export default (state: Object = initialState, action: Action) => {
  const handler = REDUCER_ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
