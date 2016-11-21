/* eslint-env jest */

import 'react-native';
import React from 'react';
import { REHYDRATE } from 'redux-persist/constants';
import * as authenticationActions from '../../src/actions/authentication';

describe('Navigation actions', () => {
  it('return the correction action when setIsFetching', () => {
    expect(authenticationActions.setIsFetching()).toMatchSnapshot();
  });
  it('return the correction action when setFormValues', () => {
    expect(authenticationActions.setFormValues({ value: 'value' })).toMatchSnapshot();
  });
});
