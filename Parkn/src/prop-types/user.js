import {PropTypes} from 'react';

export const defaultUser = PropTypes.shape({
  _id: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
});
