/* eslint-env jest */

import 'react-native';
import React from 'react';
import { REHYDRATE } from 'redux-persist/constants';
import * as navigationActions from '../../src/actions/navigation';
import navigationReducer from '../../src/reducers/navigation';

describe('Navigation reducer', () => {
  const blankState = {
    navigateToRoute: null,
    route: null,
    isNavigating: false,
  };
  const route = {
    id: 'Landing',
    component: jest.fn(),
  };

  it('returns the correct new state when NAV_NAVIGATE_TO is dispatched', () => {
    const state = {
      ...blankState,
      navigateToRoute: route,
    };
    const action = {
      type: navigationActions.NAV_NAVIGATE_TO,
      payload: route,
    };
    expect(navigationReducer(blankState, action)).toEqual(state);
  });

  it('returns the correct new state when NAV_DID_NAVIGATE_TO is dispatched', () => {
    const state = {
      ...blankState,
      route,
    };
    const action = {
      type: navigationActions.NAV_DID_NAVIGATE_TO,
      payload: route,
    };
    expect(navigationReducer(blankState, action)).toEqual(state);
  });

  it('returns the correct new state when NAV_SET_IS_NAVIGATING is dispatched', () => {
    const state = {
      ...blankState,
      isNavigating: true,
    };
    const action = {
      type: navigationActions.NAV_SET_IS_NAVIGATING,
      payload: true,
    };
    expect(navigationReducer(blankState, action)).toEqual(state);
  });
});