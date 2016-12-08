
// @flow
import type {User} from 'flow-declarations/user';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {signOut} from 'actions/authentication';
import Demo from 'components/Demo';

type Props = {
  handleSignOut: () => void,
  user: User,
};

const DemoContainer = ({handleSignOut, user}: Props): React.Element<*> => (
  <Demo handleSignOut={handleSignOut} user={user} />
);

const mapDispatchToProps = (dispatch: Function): any => {
  return bindActionCreators({
    handleSignOut: signOut,
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(DemoContainer);

