// @flow

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {bluePalette, grayPalette} from '../../styles/colors';
import {fontNames} from '../../styles/fonts';
import UnderlinedTextInput from '../../components/UnderlinedInput';

type Props = {
  fields: Array<Object>,
  handleSubmit: Function,
  handleBackPress: Function,
  backButton: any,
  submitButton: any,
};

const FormComponent = ({
  fields,
  handleSubmit,
  handleBackPress,
  backButton,
  submitButton,
}: Props): React.Element<*> => (
  <View style={styles.container}>
    <View style={styles.buttonWrapper}>
      {backButton ? (
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.navButton}
        >
          <Icon name={backButton.icon} size={30} color="rgba(255,255,255,0.75)" />
          <Text
            style={styles.navText}>
            {backButton.text}
          </Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}

      <TouchableOpacity
        onPress={handleSubmit}
        style={styles.navButton}
      >
        <Text
          style={styles.navText}>
          {submitButton.text}
        </Text>
        <Icon name={submitButton.icon} size={30} color="rgba(255,255,255,0.75)" />
      </TouchableOpacity>
    </View>
    <View style={styles.inputs}>
      {fields.map((field, i) => <UnderlinedTextInput {...field} key={i} />)}
    </View>
  </View>
);

export default FormComponent;

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
    marginRight: 5,
    marginLeft: 5,
  },
  inputs: {
    justifyContent: 'center',
  },
  buttonWrapper: {
    position: 'absolute',
    top: 30,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
