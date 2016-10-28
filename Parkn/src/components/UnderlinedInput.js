// @flow
import React, {Component, PropTypes} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {bluePalette, grayPalette} from 'styles/colors';
import {fontNames} from 'styles/fonts';

export default class UnderlinedTextInput extends Component {
  state: {isActive: boolean};
  toggleActive: () => void;

  static propTypes = {
    label: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
  };

  constructor(props: Object) {
    super(props);

    this.state = {isActive: false};

    this.toggleActive = this.toggleActive.bind(this);
  }

  toggleActive() {
    this.setState({isActive: !this.state.isActive});
  }

  render(): React.Element<*> {
    const {label, error} = this.props;

    return (
      <View>
        <View style={[
          styles.container,
          this.state.isActive ? styles.active : {},
          this.props.error ? styles.withError : {},
        ]}>
          <Text style={styles.label}>{label}</Text>

          <TextInput
            style={styles.input}
            blurOnSubmit={true}
            onFocus={this.toggleActive}
            onBlur={this.toggleActive}
            selectionColor={grayPalette.white}
            {...this.props}
          />
        </View>
        {error && (
          <Text style={styles.error}>{error}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 95,
    marginBottom: 38,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.5)',
  },
  withError: {
    marginBottom: 5,
  },
  label: {
    color: grayPalette.white,
    opacity: 0.75,
    fontFamily: fontNames.light,
    fontSize: 20,
  },
  input: {
    flex: 1,
    fontFamily: fontNames.light,
    color: grayPalette.white,
    fontSize: 25,
    alignItems: 'flex-end',
    paddingBottom: 0,
  },
  error: {
    color: grayPalette.black,
    opacity: 0.75,
    fontFamily: fontNames.light,
    fontSize: 17,
    marginBottom: 10,
  },
  active: {
    borderBottomColor: grayPalette.white,
  }
});
