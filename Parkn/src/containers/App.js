import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Navigator from './Navigation';
import isAuthenticated from './hoc/isAuthenticated';
import getRoutes from '../routes';

const Parkn = ({isLoggedIn}) => <Navigator routes={getRoutes(isLoggedIn)} />;

Parkn.propTypes = {
  isLoggedIn: PropTypes.bool,
};

function mapStateToProps({authentication: {token}}) {
  return {
    isLoggedIn: Boolean(token),
  };
}

export default connect(mapStateToProps, null)(isAuthenticated(Parkn));
