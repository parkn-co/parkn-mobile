// @flow
import type {User} from 'flow-declarations/user';

import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
} from 'react-native';
import Dimensions from 'Dimensions';
import Bar from 'components/Bar';
import Box from 'components/Box';

const {height, width} = Dimensions.get('window');

type ControlHeaderProps = {
  user: User,
};

const ControlHeaderContainer = ({user}: ControlHeaderProps): React.Element<*> =>
  <Bar label={user.firstName} marginHorizontal />;

type ControlPanelProps = {
  user: User,
};

const ControlPanelContainer = ({user}: ControlPanelProps): React.Element<*> => (
  <ScrollView
    style={styles.container}
    contentContainerStyle={styles.content}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
  >
    <View style={styles.node}>
      <Box style={{backgroundColor: 'red'}} marginHorizontal marginVertical >
        <View style={{height: 550}} />
      </Box>
    </View>
    <View style={styles.node}>
      <Box style={{backgroundColor: 'blue'}} marginHorizontal marginVertical >
        <View style={{height: 550}} />
      </Box>
    </View>
  </ScrollView>
);

// Maybe shouldn't be containers because both just recieve props, and don't talk to store?
export {ControlPanelContainer, ControlHeaderContainer};

const styles = {
  container: {
    backgroundColor: 'transparent',
    height: height * 0.88,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    width: (width * 2),
  },
  node: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',

    width,
  },
};
