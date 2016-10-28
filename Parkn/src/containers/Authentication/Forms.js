// @flow
import type {Props, Field} from 'flow-declarations/forms';

import React from 'react';
import FormContainer from './FormContainer';
import regex from '../../utilities/regex';

export const NamesForm = (props: Object): React.Element<*> => (
  <FormContainer
    {...props}
    fields={['firstName', 'lastName']}
    backButton={true}
    nextForm={'SignUpEmail'}
  />
);

function validateEmail({email}: {email: Field}) {
  const errors = {};

  if (!regex.email.test(email.value)) {
    errors.email = 'Enter a valid email address';
  }

  return errors;
}

export const EmailForm = (props: Object) => (
  <FormContainer
    {...props}
    fields={['email']}
    fieldProps={{
      email: {autoCapitalize: 'none'},
    }}
    validate={validateEmail}
    backButton={true}
    nextForm={props.route.isSignUp ? 'SignUpPassword' : 'SignInPassword'}
  />
);

function validatePasswords({password, confirmPassword}: {password: Field, confirmPassword: Field}) {
  const errors = {};

  if (password.value !== confirmPassword.value) {
    errors.confirmPassword = 'Passwords must match';
  }

  return errors;
}

export const PasswordForm = (props: Object) => (
  <FormContainer
    {...props}
    fields={['password'].concat(props.route.isSignUp ? 'confirmPassword' : [])}
    fieldProps={{
      password: {secureTextEntry: true},
      confirmPassword: {secureTextEntry: true},
    }}
    validate={props.route.isSignUp ? validatePasswords : null}
    backButton={true}
    isFinalForm={true}
  />
);
