import * as AuthApi from '../api/authentication';

export const AUTH_IS_FETCHING = 'AUTH_IS_FETCHING';
export function setIsFetching() {
  return {
    type: AUTH_IS_FETCHING,
  };
}

export const AUTH_SET_FORM_VALUES = 'AUTH_SET_FORM_VALUES';
export function setFormValues(values) {
  return {
    type: AUTH_SET_FORM_VALUES,
    payload: values,
  };
}

export const AUTH_SIGN_IN = 'AUTH_SIGN_IN';
export const AUTH_SET_ERRORS = 'AUTH_SET_ERRORS';
export function authenticateWithValues(isSignUp, values) {
  return (dispatch, getState) => {
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

export const AUTH_FETCH_USER = 'AUTH_FETCH_USER';
export function fetchUser() {
  return (dispatch, getState) => {
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
