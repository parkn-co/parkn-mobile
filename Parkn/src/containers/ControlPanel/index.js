// @flow
import type {User} from 'flow-declarations/user';

import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
} from 'react-native';
import {signOut} from 'actions/authentication';
import Bar from 'components/Bar';
import Box from 'components/Box';

type Props = {
  user: User,
};

const ControlPanelContainer = ({user}: Props): React.Element<*> => (
  <View style={styles.container}>
    <Bar label={user.firstName} marginHorizontal/>
    <Box style={{backgroundColor: 'red', margin: 15}}>
      <View style={{height: 300}} />
    </Box>
  </View>
);

// <View style={{height: 575}} />

export default ControlPanelContainer;

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',

    backgroundColor: 'transparent',
  }
}
