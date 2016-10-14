import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {bluePalette, grayPalette} from '../../../styles/colors';
import {fontNames} from '../../../styles/fonts';
import UnderlinedTextInput from '../../../components/UnderlinedInput';

export default SignUpNamesComponent = ({
  navigator,
  firstName,
  onFirstNameChange,
  lastName,
  onLastNameChange,
  onSubmit
}) => (
  <View style={styles.container}>
    <View style={styles.buttonWrapper}>
      <TouchableOpacity
        onPress={onSubmit}
        style={styles.navButton}
      >
        <Text
          style={styles.navText}>
          {'Next'}
        </Text>
        <Icon name={'arrow-forward'} size={30} color="rgba(255,255,255,0.75)" />
      </TouchableOpacity>
    </View>
    <View style={styles.inputs}>
      <UnderlinedTextInput
        label="First Name"
        {...firstName}
        onChangeText={onFirstNameChange}
        autoCorrect={false}
      />
      <UnderlinedTextInput
        label="Last Name"
        {...lastName}
        onChangeText={onLastNameChange}
        autoCorrect={false}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: bluePalette.medium,
    justifyContent: 'center',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navText: {
    color: grayPalette.white,
    opacity: 0.75,
    fontFamily: fontNames.light,
    fontSize: 20,
  },
  inputs: {
    justifyContent: 'center',
  },
  buttonWrapper: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})
