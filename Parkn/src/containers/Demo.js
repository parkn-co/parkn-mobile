// @flow
import type {User} from 'flow-declarations/user';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {signOut} from 'actions/authentication';
import Demo from 'components/Demo';

const DemoContainer = ({signOut, user}: {signOut: () => void, user: User}): React.Element<*> => (
  <Demo handleSignOut={signOut} user={user} />
);

function mapDispatchToProps(dispatch: Function): any {
  return bindActionCreators({
    signOut,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(DemoContainer);
