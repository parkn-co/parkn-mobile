// @flow
import type {User} from 'flow-declarations/user';

import React, {Component} from 'react';
import {signOut} from 'actions/authentication';
import Bar from 'components/Bar';

type Props = {};

const ControlPanelContainer = (): React.Element<*> => (
  <Bar />
);

export default ControlPanelContainer;
