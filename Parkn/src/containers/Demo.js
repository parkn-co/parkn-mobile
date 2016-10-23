import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {signOut} from '../actions/authentication';
import Demo from '../components/Demo';

const DemoContainer = props => <Demo handleSignOut={props.signOut} user={props.user} />;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signOut,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(DemoContainer);
