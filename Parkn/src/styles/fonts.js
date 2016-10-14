import {StyleSheet} from 'react-native';
import {compose, keys} from 'lodash/fp';

export const fontNames = {
  moonLight: 'Moon-Light',
  moonBold: 'Moon-Bold',
  light: 'OpenSans-Light',
  lightItalic: 'OpenSans-LightItalic',
  regular: 'OpenSans-Regular',
  italic: 'OpenSans-Italic',
  bold: 'OpenSans-Bold',
  boldItalic: 'OpenSans-BoldItalic',
  semiBoldItalic: 'OpenSans-SemiBoldItalic',
  semiBoldItalic: 'OpenSans-SemiBoldItalic',
  ExtraItalic: 'OpenSans-ExtraBold',
  extraBoldItalic: 'OpenSans-ExtraBoldItalic',
};

const createFontStyleSheet = compose(fontFamily => {fontFamily}, keys)

const styles = {};
keys(fontNames).forEach(key => styles[key] = {fontFamily: fontNames[key]});

export const fontStyles = StyleSheet.create(styles);
