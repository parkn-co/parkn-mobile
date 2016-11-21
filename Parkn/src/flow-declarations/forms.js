// @flow
import type {Route} from './navigation';

export type UserForm = {
  email?: string,
  firstName?: string,
  lastName?: string,
  password?: string,
  confirmPassword?: string,
};

export type Field = {
  value: string,
  error: string,
};

export type Props = {
  isFinalForm?: boolean,
  isRequired?: boolean,
  nextForm?: string,
  route: Route,
  fields: Array<string>,
  errors: Object,
  fieldProps: Object,
  validate: () => Object,
  authenticateWithValues: (isSignUp: boolean, values: UserForm) => void,
  setFormValues: () => void,
  go: {to: Function, back: Function},
  backButton: boolean,
  submitButton: boolean,
};
