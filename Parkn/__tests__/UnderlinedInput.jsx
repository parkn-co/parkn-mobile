/* eslint-env jasmine */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import UnderlinedInput from '../src/components/UnderlinedInput';

it('renders UnderlinedInput component correctly', () => {
  expect(renderer.create(
    <UnderlinedInput onChangeText={() => null} value="mock value" />
  )).toMatchSnapshot();
});
