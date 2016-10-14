import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {bluePalette, grayPalette} from '../../styles/colors';
import {fontNames} from '../../styles/fonts';

export default AwaitingAuthenticationComponent = ({rotate}) => (
  <View style={styles.container}>
    <Animated.View
      style={{transform: [{rotate}]}}
    >
      <Icon name="cached" size={50} color={'rgba(255,255,255,0.75)'} />
    </Animated.View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: bluePalette.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
