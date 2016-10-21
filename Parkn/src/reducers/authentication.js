// Import action handlers
import {
  AUTH_SET_FORM_VALUES,
  AUTH_SIGN_IN,
  AUTH_SET_ERRORS,
  AUTH_FETCH_USER,
  AUTH_IS_FETCHING,
} from '../actions/authentication';

import {REHYDRATE} from 'redux-persist/constants';

const initialState = {
  form: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  formType: '',
  errors: {},
  token: null,
  user: {},
  isFetching: false,
};

// Action Handlers
const REDUCER_ACTION_HANDLERS = {
   [AUTH_SET_FORM_VALUES]: (state, {payload}) => ({
     ...state,
     form: {...state.form, ...payload},
     isFetching: false,
   }),
   [AUTH_SIGN_IN]: (state, {payload: {token}}) => ({
     ...state,
     token,
     isFetching: false,
   }),
   [AUTH_SET_ERRORS]: (state, {payload}) => ({
     ...state,
     errors: payload,
     isFetching: false,
   }),
   [AUTH_FETCH_USER]: (state, {payload}) => ({
     ...state,
     user: payload,
     isFetching: false,
   }),
   [AUTH_IS_FETCHING]: state => ({
     ...state,
     isFetching: true,
   }),
   [REHYDRATE]: (state, {payload}) => ({
     ...initialState,
     token: payload && payload.authentication && payload.authentication.token,
   }),
};

// Reducer
export default function authenticationReducer(state = initialState, action) {
  const handler = REDUCER_ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
