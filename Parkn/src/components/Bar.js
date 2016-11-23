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
  height: number;
};

const Bar = ({label, height, icon}) => {
  let propStyles = {
    height: Boolean(height) ? height : 56,
  };

  return (
    <View style={[styles.container, propStyles]}>
      <View style={styles.body}>
        <View style={styles.icon}>
          <Icon name={Boolean(icon) ? icon : 'details'} size={30} color={whiteOptacityPalette.seventy} />
        </View>
        <Text style={styles.label}> {Boolean(label) ? label : 'Panel'} </Text>
      </View>
      <View style={styles.footer} />
    </View>
  )
};

Bar.propTypes = {
  label: PropTypes.string,
  height: PropTypes.number,
  icon: PropTypes.string,
};

export default Bar;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    height: 50,
    marginHorizontal: 15,
    backgroundColor: bluePalette.light,
    opacity: 0.8,
  },
  body: {
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    marginBottom: 6,
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: whiteOptacityPalette.fifty,
    marginHorizontal: 15,
  },
  icon: {
    marginLeft: 20,
    opacity: 0.8,
  },
  label: {
    fontFamily: 'OpenSans-Light',
    textAlign: 'center',
    fontSize: 22,
    marginRight: 20,
    color: whiteOptacityPalette.seventy
  },
});
