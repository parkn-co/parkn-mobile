// @flow
import type {Action} from 'flow-declarations/redux';

// Import action handlers
import {
  AUTH_SET_FORM_VALUES,
  AUTH_SIGN_IN,
  AUTH_SIGN_OUT,
  AUTH_SET_ERRORS,
  AUTH_FETCH_USER,
  AUTH_IS_FETCHING,
} from 'actions/authentication';

import {REHYDRATE} from 'redux-persist/constants';

const initialState = {
  form: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  errors: {},
  token: null,
  user: {},
  isFetching: false,
};

// Action Handlers
const REDUCER_ACTION_HANDLERS = {
   [AUTH_SET_FORM_VALUES]: (state: Object, {payload}: Action): Object => ({
     ...state,
     form: {...state.form, ...payload},
     isFetching: false,
   }),
   [AUTH_SIGN_IN]: (state: Object, {payload: {token}}) => ({
     ...initialState,
     token: token,
     isFetching: false,
   }),
   [AUTH_SIGN_OUT]: () => initialState,
   [AUTH_SET_ERRORS]: (state: Object, {payload}: Action) => ({
     ...state,
     errors: payload,
     isFetching: false,
   }),
   [AUTH_FETCH_USER]: (state: Object, {payload}: Action) => ({
     ...state,
     user: payload,
     isFetching: false,
   }),
   [AUTH_IS_FETCHING]: (state: Object) => ({
     ...state,
     isFetching: true,
   }),
   [REHYDRATE]: (state: Object, {payload}: Action) => ({
     ...initialState,
     token: payload && payload.authentication && payload.authentication.token,
   }),
};

// Reducer
export default function authenticationReducer(state: Object = initialState, action: Action) {
  const handler = REDUCER_ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state;
}
