// Import action handlers
import {NAVIGATE_TO, DID_NAVIGATE_TO} from '../actions/navigation';

// Action Handlers
const REDUCER_ACTION_HANDLERS = {
   [NAVIGATE_TO]: (state, action) => ({
     ...state,
     navigateToRoute: action.payload
   }),
   [DID_NAVIGATE_TO]: (state, action) => ({
     ...state,
     navigateToRoute: null,
     route: action.payload,
   }),
};

const initialState = {
  navigateToRoute: null,
  route: null,
};

// Reducer
export default function userReducer (state = initialState, action) {
  const handler = REDUCER_ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
