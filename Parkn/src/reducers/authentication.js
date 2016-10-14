// Import action handlers
import {SET_NAMES} from '../actions/authentication';

// Action Handlers
const REDUCER_ACTION_HANDLERS = {
   [SET_NAMES]: (state, {payload: {firstName, lastName}}) => ({
     ...state,
     firstName,
     lastName,
   }),
};

const initialState = {
  firstName: '',
  lastName: '',
};

// Reducer
export default function userReducer (state = initialState, action) {
  const handler = REDUCER_ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
