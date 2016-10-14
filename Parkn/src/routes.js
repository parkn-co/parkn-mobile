import NoAuthLanding from './components/NoAuthLanding';
import {NamesForm, EmailForm, PasswordForm} from './containers/Authentication/Forms';
import AwaitingAuthenticationContainer from './containers/Authentication/AwaitingAuthenticationContainer';
import {assign} from 'lodash/fp';

export default function getRoutes(user) {
  const isLoggedIn = Boolean(user);

  return {
    NoAuthLanding: {
      id: 'NoAuthLanding',
      component: NoAuthLanding,
      isInitial: !isLoggedIn,
    },
    SignUp: {
      id: 'SignUp',
      component: NamesForm,
    },
    SignUpEmail: {
      id: 'SignUpEmail',
      component: EmailForm,
      isSignUp: true,
    },
    SignIn: {
      id: 'SignIn',
      component: EmailForm,
    },
    SignUpPassword: {
      id: 'SignUpPassword',
      component: PasswordForm,
      isSignUp: true,
    },
    SignInPassword: {
      id: 'SignInPassword',
      component: PasswordForm,
    },
    AwaitingAuthentication: {
      id: 'AwaitingAuthentication',
      component: AwaitingAuthenticationContainer,
    },
  };
}
