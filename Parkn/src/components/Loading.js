// @flow

import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {bluePalette, grayPalette} from 'styles/colors';
import {fontNames} from 'styles/fonts';

const iconColorsByType = {
  default: 'rgba(255,255,255,0.75)',
  light: bluePalette.medium,
};

type Props = any;
type State = {
  toValue: number,
};

export default class Loading extends Component {
  state: State;
  startRotation: () => void;
  interval: number;

  static animatedValue = new Animated.Value(0);
  static toValue = 100;

  constructor(props: Props) {
    super(props);

    this.state = {
      toValue: 100,
    };

    this.startRotation = this.startRotation.bind(this);
  }

  componentDidMount() {
    this.startRotation();

    this.interval = setInterval(this.startRotation, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startRotation() {
    Animated.timing(Loading.animatedValue, {
      toValue: Loading.toValue,
      duration: 3000,
      easing: Easing.linear,
    }).start();

    this.setState({toValue: Loading.toValue + 100});
  }

  render(): React.Element<*> {
    const rotate = getRotateValue();
    const type = this.props.type || 'default';

    return (
      <View style={[styles.container, styles[type]]}>
        <Animated.View
          style={{transform: [{rotate}]}}
        >
          <Icon name="cached" size={50} color={iconColorsByType[type]} />
        </Animated.View>
      </View>
    );
  }
}

function getRotateValue(): any {
  return Loading.animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '360deg'],
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  default: {
    backgroundColor: bluePalette.medium,
  },
  light: {
    backgroundColor: '#F5FCFF',
  },
});
