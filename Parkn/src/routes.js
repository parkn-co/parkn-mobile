import Demo from './components/Demo';
import NoAuthLanding from './components/NoAuthLanding';
import {NamesForm, EmailForm, PasswordForm} from './containers/Authentication/Forms';
import AwaitingAuthentication from './containers/Authentication/AwaitingAuthentication';
import RequireAuthenticationHOC from './containers/hoc/RequireAuthentication';
import {assign} from 'lodash/fp';

export default function getRoutes(isLoggedIn) {
  return {
    NoAuthLanding: {
      id: 'NoAuthLanding',
      component: NoAuthLanding,
      isInitial: !isLoggedIn,
    },
    Landing: {
      id: 'Landing',
      component: RequireAuthenticationHOC(Demo),
      isInitial: isLoggedIn,
    },
    SignUp: {
      id: 'SignUp',
      component: NamesForm,
      isSignUp: true,
      keys: ['firstName', 'lastName'],
    },
    SignUpEmail: {
      id: 'SignUpEmail',
      component: EmailForm,
      isSignUp: true,
      keys: ['email'],
    },
    SignIn: {
      id: 'SignIn',
      component: EmailForm,
      keys: ['email'],
    },
    SignUpPassword: {
      id: 'SignUpPassword',
      component: PasswordForm,
      isSignUp: true,
      keys: ['password'],
    },
    SignInPassword: {
      id: 'SignInPassword',
      component: PasswordForm,
      keys: ['password'],
    },
    AwaitingAuthentication: {
      id: 'AwaitingAuthentication',
      component: AwaitingAuthentication,
    },
  };
}
