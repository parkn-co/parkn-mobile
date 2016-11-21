/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';

import UnderlinedInput from '../../src/components/UnderlinedInput';

describe('UnderlinedInput using snapshots', () => {
  it('renders correctly', () => {
    expect(renderer.create(
      <UnderlinedInput onChangeText={() => null} value="mock value" />
    )).toMatchSnapshot();
  });
});
