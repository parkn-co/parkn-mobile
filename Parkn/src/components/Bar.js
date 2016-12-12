// @flow

import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {bluePalette, grayPalette, whiteOptacityPalette} from 'styles/colors';
import {fontNames} from 'styles/fonts';

type Props = {
  label: string,
  height: number,
  icon: string,
  marginHorizontal: boolean | number,
  marginVertical: boolean | number,

  style: Object,
};

const Bar = ({label, height, icon, marginHorizontal, marginVertical, style}) => {
  let propStyles = {
    height: Boolean(height) ? height : 56,
    marginHorizontal:
      Boolean(marginHorizontal) ? (typeof marginHorizontal === 'boolean' ? 15 : marginHorizontal) : null,
    marginVertical:
      Boolean(marginVertical) ? (typeof marginVertical === 'boolean' ? 15 : marginVertical) : null
  };

  return (
    <View style={[styles.container, propStyles, style]}>
      <View style={styles.body}>
        <View style={styles.icon}>
          <Icon name={Boolean(icon) ? icon : 'details'} size={30} color={whiteOptacityPalette.seventy} />
        </View>
        <Text style={styles.label}> {Boolean(label) ? label : 'Parkn'} </Text>
      </View>
      <View style={styles.footer} />
    </View>
  );
};

export default Bar;

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',

    backgroundColor: bluePalette.light,
    opacity: 0.8,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    marginHorizontal: 15,
    marginBottom: 6,
    backgroundColor: whiteOptacityPalette.fifty,
    height: 1,
  },
  icon: {
    marginLeft: 20,
    opacity: 0.8,
  },
  label: {
    marginRight: 20,
    color: whiteOptacityPalette.seventy,
    fontFamily: 'OpenSans-Light',
    textAlign: 'center',
    fontSize: 22,
  },
});
