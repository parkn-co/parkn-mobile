// @flow

import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {bluePalette, grayPalette} from 'styles/colors';
import {fontNames} from 'styles/fonts';

type Props = any;

export default () => (
  <View style={styles.container}>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 20,
    marginHorizontal: 15,
    backgroundColor: bluePalette.light,
  },
});
