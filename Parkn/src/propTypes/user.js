import {PropTypes} from 'react-native';

const userPropType = PropTypes.shape({
  _id: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
});
