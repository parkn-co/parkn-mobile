import NoAuthLanding from './components/NoAuthLanding';
import SignUpNames from './containers/Authentication/Names/Container';
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
      component: SignUpNames,
      ...SignUpNames.route,
    }
  };
}
