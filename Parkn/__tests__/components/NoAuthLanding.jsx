/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';

import NoAuthLanding from '../../src/components/NoAuthLanding';

describe('NoAuthLanding', () => {
  it('renders correctly using snapshots', () => {
    expect(renderer.create(
      <NoAuthLanding go={jest.fn()} />
    )).toMatchSnapshot();
  });
});
