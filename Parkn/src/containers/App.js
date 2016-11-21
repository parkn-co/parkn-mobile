
// @flow
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Navigator from './Navigation';
import isAuthenticated from './hoc/IsAuthenticated';
import getRoutes from '../routes';

type ReduxState = {
  isLoggedIn: boolean,
};

const Parkn = ({isLoggedIn}: ReduxState): React.Element<*> => (
  <Navigator routes={getRoutes(isLoggedIn)} />
);

Parkn.propTypes = {
  isLoggedIn: PropTypes.bool,
};

function mapStateToProps({authentication: {token}}: {authentication: {token: string}}): ReduxState {
  return {
    isLoggedIn: Boolean(token),
  };
}

export default connect(mapStateToProps, null)(isAuthenticated(Parkn));
