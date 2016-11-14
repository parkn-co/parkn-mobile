/* eslint-env jest */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Loading from '../../src/components/Loading';

describe('Loading', () => {
  it('renders correctly', () => {
    expect(renderer.create(
      <Loading />
    )).toMatchSnapshot();
  });
});
