// @flow

import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {bluePalette, grayPalette} from 'styles/colors';
import {fontNames} from 'styles/fonts';

const NoAuthLanding = ({go}: {go: Function}): React.Element<*> => (
  <View style={styles.container}>
    <View style={styles.sectionWrapper}>
      <Text style={styles.logo}>{'Parkn'}</Text>
    </View>
    <View style={styles.sectionWrapper}>
      <TouchableOpacity style={styles.button} onPress={() => go.to({id: 'SignUp'})}>
        <Text style={styles.buttonText}>{'Sign Up'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => go.to({id: 'SignIn'})}>
        <Text style={styles.buttonText}>{'Sign In'}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default NoAuthLanding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bluePalette.medium,
  },
  sectionWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  logo: {
    color: grayPalette.white,
    opacity: 0.75,
    fontFamily: fontNames.moonBold,
    fontSize: 50,
  },
  button: {
    paddingTop: 20,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: grayPalette.white,
    opacity: 0.75,
    fontFamily: fontNames.light,
    fontSize: 20,
  },
});
