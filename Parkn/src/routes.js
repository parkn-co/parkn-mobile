import Demo from './components/Demo';
import {assign} from 'lodash/fp';

export default function getRoutes(user) {
  const isLoggedIn = Boolean(user);

  return {
    demo: assign({
      id: 'demo',
      component: Demo,
      isInitial: !isLoggedIn,
    }, Demo.route),
  };
}
