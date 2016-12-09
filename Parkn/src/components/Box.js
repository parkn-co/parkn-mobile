import React from 'react';
import {View} from 'react-native';

type Props = {
  marginHorizontal: boolean | number,
  style: Object,

  children: Array<React.Element<*>>,
}

const Box = ({marginHorizontal, style, children}: Props): React.Element<*> => {
  let propStyles = {
    marginHorizontal:
      Boolean(marginHorizontal) ? (typeof marginHorizontal === 'boolean' ? 15 : marginHorizontal) : null,
  };

  return (
    <View style={[styles.container, propStyles, style]}>
      {children}
    </View>
  );
};

export default Box;

const styles = {
  container: {
    backgroundColor: 'white',
    opacity: 0.8,
  }
};
