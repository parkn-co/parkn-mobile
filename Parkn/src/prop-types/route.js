import {PropTypes} from 'react';

export const routeProps = PropTypes.shape({
  id: PropTypes.string.isRequired,
  component: PropTypes.node.isRequired,
});
