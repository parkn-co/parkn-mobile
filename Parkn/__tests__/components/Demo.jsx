/* eslint-env jest */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Demo from '../../src/components/Demo';

describe('Demo', () => {
  it('renders correctly using snapshots', () => {
    const user = {
      email: 'jared@example.com',
      firstName: 'jared',
      lastName: 'ramirez',
    };
    expect(renderer.create(
      <Demo handleSignOut={jest.fn()} user={user} />
    )).toMatchSnapshot();
  });
});
