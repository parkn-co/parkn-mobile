// @flow
import type {Action} from 'flow-declarations/redux';
import {REHYDRATE} from 'redux-persist/constants';

// Action Handlers
const REDUCER_ACTION_HANDLERS = {
   [REHYDRATE]: () => { console.log('persisting'); return true},
};

const initialState = false;

// Reducer
export default function persistReducer(state: boolean = initialState, action: Action) {
  const handler = REDUCER_ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
