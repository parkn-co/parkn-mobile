// @flow
import type {User} from 'flow-declarations/user';

import React, {Component} from 'react';
import {View} from 'react-native';

import OverlayMenu from 'components/OverlayMenu';
import ControlPanel from 'containers/ControlPanel';
import Demo from 'containers/Demo';

type Props = {
  user: User,
}

const LandingContainer = (props: Props): React.Element<*> => (
  <OverlayMenu menu={<ControlPanel {...props} />}>
    <Demo {...props} />
  </OverlayMenu>
);

export default LandingContainer;