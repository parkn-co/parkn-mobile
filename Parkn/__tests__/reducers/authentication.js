/* eslint-env jest */

import 'react-native';
import React from 'react';
import { REHYDRATE } from 'redux-persist/constants';
import * as authenticationActions from '../../src/actions/authentication';
import authenticationReducer from '../../src/reducers/authentication';

describe('Authentication reducer', () => {
  const blankState = {
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

  it('returns the correct new state when AUTH_SET_FORM_VALUES is dispatched', () => {
    const action = {
      type: authenticationActions.AUTH_SET_FORM_VALUES,
      payload: {
        firstName: 'jared',
        lastName: 'ramirez',
        email: 'jared@example.com',
        password: 'foo',
        confirmPassword: 'foo',
      },
    };
    expect(authenticationReducer(blankState, action)).toMatchSnapshot();
  });

  it('returns the correct new state when AUTH_SIGN_IN is dispatched', () => {
    const action = {
      type: authenticationActions.AUTH_SIGN_IN,
      payload: {
        token: 'WOOT_THIS_TOKEN_GIVES_YOU_ALLLLLLL_ACCESS_;)',
      },
    };
    expect(authenticationReducer(blankState, action)).toMatchSnapshot();
  });

  it('returns the correct new state when AUTH_SIGN_OUT is dispatched', () => {
    const action = {
      type: authenticationActions.AUTH_SIGN_OUT,
    };
    expect(authenticationReducer(blankState, action)).toMatchSnapshot();
  });

  it('returns the correct new state when AUTH_SET_ERRORS is dispatched', () => {
    const action = {
      type: authenticationActions.AUTH_SET_ERRORS,
      payload: {
        firstName: 'Homie, firstname can\'t be more than 1000 characters',
        lastName: 'You forgot to enter you last name!!!!',
      },
    };
    expect(authenticationReducer(blankState, action)).toMatchSnapshot();
  });

  it('returns the correct new state when AUTH_FETCH_USER is dispatched', () => {
    const action = {
      type: authenticationActions.AUTH_FETCH_USER,
      payload: {
        id: 1029581035,
        firstName: 'jared',
        lastName: 'ramirez',
      },
    };
    expect(authenticationReducer(blankState, action)).toMatchSnapshot();
  });

  it('returns the correct new state when AUTH_IS_FETCHING is dispatched', () => {
    const action = {
      type: authenticationActions.AUTH_IS_FETCHING,
    };
    expect(authenticationReducer(blankState, action)).toMatchSnapshot();
  });

  it('returns the correct new state when REHYDRATE is dispatched', () => {
    const action = {
      type: REHYDRATE,
      payload: {
        authentication: {
          token: 'this_is_a_rad_token',
        },
      },
    };
    expect(authenticationReducer(blankState, action)).toMatchSnapshot();
  });
});
