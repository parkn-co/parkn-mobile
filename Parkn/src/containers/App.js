import React, {Component} from 'react';
import {connect} from 'react-redux';
import Navigator from './Navigation';
import IsAuthenticated from './hoc/IsAuthenticated';
import getRoutes from '../routes';

const Parkn = ({isLoggedIn}) => <Navigator routes={getRoutes(isLoggedIn)} />;

function mapStateToProps({authentication: {token}}) {
  return {
    isLoggedIn: Boolean(token),
  };
}

export default connect(mapStateToProps, null)(IsAuthenticated(Parkn));
