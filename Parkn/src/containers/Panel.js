// @flow
import type {User} from 'flow-declarations/user';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {signOut} from 'actions/authentication';
import Demo from 'components/Demo';
import Panel from 'components/Panel';

type Props = {
  handleSignOut: () => void,
  user: User,
};

const PanelContainer = ({handleSignOut, user}: Props): React.Element<*> => (
  <Panel>
		<Demo handleSignOut={handleSignOut} user={user} />
  </Panel>
);

const mapDispatchToProps = (dispatch: Function): any => {
  return bindActionCreators({
    handleSignOut: signOut,
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(PanelContainer);
