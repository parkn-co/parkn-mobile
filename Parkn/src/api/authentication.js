// @flow
import type {UserForm} from 'flow-declarations/forms';
import Api from './base';

export function signIn({email, password}: UserForm): Promise<any> {
  return Api.post('auth/signin', {email, password});
}

export function signUp({email, firstName, lastName, password}: UserForm) {
  return Api.post('auth/signup', {email, firstName, lastName, password});
}

export function signOut(getState: Function): Promise<any> {
  return Api.authPost(getState, 'auth/signout');
}

export function fetchUser(getState: Function): Promise<any> {
  return Api.authGet(getState, 'users');
}
