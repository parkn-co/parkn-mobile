/* eslint-env jest */

import 'react-native';
import React from 'react';
import { REHYDRATE } from 'redux-persist/constants';
import * as navigationActions from '../../src/actions/navigation';

describe('Navigation actions', () => {
  const route = {
    id: 'SampleRoute',
    component: jest.fn(),
  };
  it('return the correction action when navigateTo', () => {
    expect(navigationActions.navigateTo(route)).toMatchSnapshot();
  });
  it('return the correction action when didNavigateTo', () => {
    expect(navigationActions.didNavigateTo(route)).toMatchSnapshot();
  });
  it('return the correction action when setIsNavigating', () => {
    expect(navigationActions.setIsNavigating(route)).toMatchSnapshot();
  });
});
