/* eslint-env jest */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import UnderlinedInput from '../../src/components/UnderlinedInput';

describe('UnderlinedInput', () => {
  it('renders correctly', () => {
    expect(renderer.create(
      <UnderlinedInput onChangeText={() => null} value="mock value" />
    )).toMatchSnapshot();
  });
});
