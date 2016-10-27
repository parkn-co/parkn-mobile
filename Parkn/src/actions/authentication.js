// @flow
import {Action, AsyncAction} from './flow';
import * as AuthApi from '../api/authentication';

export const AUTH_IS_FETCHING = 'AUTH_IS_FETCHING';
export function setIsFetching(): Action {
  return {
    type: AUTH_IS_FETCHING,
  };
}

export const AUTH_SET_FORM_VALUES = 'AUTH_SET_FORM_VALUES';
export function setFormValues(values: Object): Action {
  return {
    type: AUTH_SET_FORM_VALUES,
    payload: values,
  };
}

export const AUTH_SIGN_IN = 'AUTH_SIGN_IN';
export const AUTH_SET_ERRORS = 'AUTH_SET_ERRORS';
export function authenticateWithValues(isSignUp: boolean, values: Object): Action {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: AUTH_SET_FORM_VALUES,
      payload: values
    });

    dispatch(setIsFetching());

    const {
      authentication: {form}
    } = getState();

    let method = 'signIn';
    if (isSignUp) {
      method = 'signUp';
    }

    AuthApi[method]({...form, ...values})
    .then(token => dispatch({
      type: AUTH_SIGN_IN,
      payload: token,
    }))
    .catch(err => {
      let payload = err;

      if (err.status === 409) {
        payload = {...err, email: err.error};
      } else if (err.status === 404 || err.status === 500) {
        payload = {...err, email: 'Incorrect email or password'};
      }

      dispatch({
        type: AUTH_SET_ERRORS,
        payload,
      })
    });
  }
}

export const AUTH_SIGN_OUT = 'AUTH_SIGN_OUT';
export function signOut(): AsyncAction {
  return (dispatch, getState) => {
    // Get rid of token and user not matter what
    AuthApi.signOut(getState)
    .then(token => dispatch({
      type: AUTH_SIGN_OUT,
    }))
    .catch(err => dispatch({
      type: AUTH_SIGN_OUT,
    }));
  }
}

export const AUTH_FETCH_USER = 'AUTH_FETCH_USER';
export function fetchUser(): AsyncAction {
  return (dispatch: (action: Action) => void, getState: () => void) => {
    dispatch(setIsFetching());

    AuthApi.fetchUser(getState)
    .then(token => dispatch({
      type: AUTH_FETCH_USER,
      payload: token,
    }))
    .catch(err => dispatch({
      type: AUTH_SET_ERRORS,
      payload: err,
    }));
  }
}
