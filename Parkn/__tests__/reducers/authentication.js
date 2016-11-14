/* eslint-env jest */

import 'react-native';
import React from 'react';

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

  it('action AUTH_SET_FORM_VALUES return the correct new state', () => {
    const state = {
      form: {
        firstName: 'jared',
        lastName: 'ramirez',
        email: 'jared@example.com',
        password: 'foo',
        confirmPassword: 'foo',
      },
      errors: {},
      token: null,
      user: {},
      isFetching: false,
    };
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

    expect(authenticationReducer(blankState, action)).toEqual(state);
  });
});
