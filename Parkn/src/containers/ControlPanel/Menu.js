// @flow
import type {User} from 'flow-declarations/user';

import React, {Component} from 'react';
import {
  Dimensions,
  ScrollView,
  View,
} from 'react-native';
import Box from 'components/Box';

const {height, width} = Dimensions.get('window');

type ControlMenuProps = {
  user: User,
};

const ControlMenuContainer = ({user}: ControlMenuProps): React.Element<*> => (
  <ScrollView
    style={styles.container}
    contentContainerStyle={styles.content}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    // look into other options, only works for ios according to docs
    contentOffset={{x: width, y: 0}}
  >
    <View style={styles.node}>
      <Box style={{backgroundColor: 'green'}} marginHorizontal marginVertical >
        <View style={{height: 550}} />
      </Box>
    </View>
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

export default ControlMenuContainer;

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

    // i don't like this, maybe make ControlPanelContainer
    // stateful and use onLayout to get the width?
    width: (width * 3),
  },
  node: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',

    width,
  },
};
