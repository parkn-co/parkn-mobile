// @flow
import type {User} from 'flow-declarations/user';

import React, {Component} from 'react';
import Bar from 'components/Bar';

type ControlHeaderProps = {
  user: User,
};

const ControlHeaderContainer = ({user}: ControlHeaderProps): React.Element<*> =>
  <Bar label={user.firstName} marginHorizontal />;

export default ControlHeaderContainer;
