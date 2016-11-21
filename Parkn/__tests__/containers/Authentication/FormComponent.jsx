/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';

import FormComponent from '../../../src/containers/Authentication/FormComponent';

describe('FormComponent', () => {
  it('renders correctly using snapshots', () => {
    const submitButton = {
      text: 'submit',
      icon: 'satellite',
      onPress: jest.fn(),
    };

    const backButton = {
      text: 'back',
      icon: 'satellite',
      onPress: jest.fn(),
    };

    const fields = [
      {
        value: 'firstname',
        onChangeText: jest.fn(),
      },
    ];

    expect(renderer.create(
      <FormComponent
        fields={fields}
        handleBackPress={jest.fn()}
        submitButton={submitButton}
        backButton={backButton} />
    )).toMatchSnapshot();
  });
});
