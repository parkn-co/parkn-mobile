// @flow

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';

type Props = {
  component: any
};

// once pull up menu is working, look at react-native-swiper for side swping menus

const Panel = (component): Props => (
  <View style={styles.container}>
    <ScrollView>
      <Text> Hello {'\n'} Hello {'\n'} Hello {'\n'} Hello {'\n'} </Text>
      <Text> Hello {'\n'} Hello {'\n'} Hello {'\n'} Hello {'\n'} </Text>
      <Text> Hello {'\n'} Hello {'\n'} Hello {'\n'} Hello {'\n'} </Text>
      <Text> Hello {'\n'} Hello {'\n'} Hello {'\n'} Hello {'\n'} </Text>
      <Text> Hello {'\n'} Hello {'\n'} Hello {'\n'} Hello {'\n'} </Text>
      <Text> Hello {'\n'} Hello {'\n'} Hello {'\n'} Hello {'\n'} </Text>
      <Text> Hello {'\n'} Hello {'\n'} Hello {'\n'} Hello {'\n'} </Text>
      <Text> Hello {'\n'} Hello {'\n'} Hello {'\n'} Hello {'\n'} </Text>
      <Text> Hello {'\n'} Hello {'\n'} Hello {'\n'} Hello {'\n'} </Text>
    </ScrollView>
  </View>
);

export default Panel;

const styles = {
  container: {
    flex: 1,
  },
};
