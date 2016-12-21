// @flow
import type {User} from 'flow-declarations/user';

import React, {Component} from 'react';
import {View} from 'react-native';

import OverlayMenu from 'components/OverlayMenu';
import ControlHeaderContainer from 'containers/ControlPanel/Header';
import ControlMenuContainer from 'containers/ControlPanel/Menu';
import Demo from 'containers/Demo';

type Props = {
  user: User,
}

const LandingContainer = (props: Props): React.Element<*> => (
  <OverlayMenu
    header={<ControlHeaderContainer {...props} />}
    menu={<ControlMenuContainer {...props} />}
  >
    <Demo {...props} />
  </OverlayMenu>
);

export default LandingContainer;
