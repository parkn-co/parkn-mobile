/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';

import Loading from '../../src/components/Loading';

describe('Loading', () => {
  it('renders correctly using snapshots', () => {
    expect(renderer.create(
      <Loading />
    )).toMatchSnapshot();
  });
});
