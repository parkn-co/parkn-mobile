// Import action handlers
import {SET_FORM_VALUES} from '../actions/authentication';

// Action Handlers
const REDUCER_ACTION_HANDLERS = {
   [SET_FORM_VALUES]: (state, {payload}) => ({
     ...state,
     form: {...state.form, ...payload},
   }),
};

const initialState = {
  form: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  authenticationErrors: {},
  token: null,
};

// Reducer
export default function userReducer (state = initialState, action) {
  const handler = REDUCER_ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
