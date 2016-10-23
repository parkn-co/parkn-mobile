import Api from './base';

export function signIn({email, password}) {
  return Api.post('auth/signin', {email, password})
    .then(res => res);
}

export function signUp({email, firstName, lastName, password}) {
  return Api.post('auth/signup', {email, firstName, lastName, password})
    .then(res => res);
}

export function signOut(getState) {
  return Api.authPost(getState, 'auth/signout');
}

export function fetchUser(getState) {
  return Api.authGet(getState, 'users')
    .then(res => res);
}

export function storeToken(token) {
  Api.storage.set('token', token);
}

export function fetchToken() {
  return Api.storage.get('token');
}
