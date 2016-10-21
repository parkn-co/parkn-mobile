// Import action handlers
import {
  NAV_NAVIGATE_TO,
  NAV_DID_NAVIGATE_TO,
  NAV_SET_IS_NAVIGATING,
} from '../actions/navigation';

import {REHYDRATE} from 'redux-persist/constants';

// Action Handlers
const REDUCER_ACTION_HANDLERS = {
   [NAV_NAVIGATE_TO]: (state, {payload}) => ({
     ...state,
     navigateToRoute: payload,
   }),
   [NAV_DID_NAVIGATE_TO]: (state, {payload}) => ({
     ...state,
     navigateToRoute: null,
     route: payload,
     isNavigating: false,
   }),
   [NAV_SET_IS_NAVIGATING]: (state, {payload}) => ({
     ...state,
     isNavigating: payload,
   }),
   [REHYDRATE]: () => initialState,
};

const initialState = {
  navigateToRoute: null,
  route: null,
  isNavigating: false,
};

// Reducer
export default function navigationReducer(state = initialState, action) {
  const handler = REDUCER_ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
