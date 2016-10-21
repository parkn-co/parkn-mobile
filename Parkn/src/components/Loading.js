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
import {bluePalette, grayPalette} from '../styles/colors';
import {fontNames} from '../styles/fonts';

const iconColorsByType = {
  default: 'rgba(255,255,255,0.75)',
  light: bluePalette.medium,
}

export default class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animatedValue: new Animated.Value(0),
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
    Animated.timing(this.state.animatedValue, {
      toValue: this.state.toValue,
      duration: 3000,
      easing: Easing.linear
    }).start();

    this.setState({toValue: this.state.toValue + 100});
  }

  render() {
    const rotate = this.rotateValue;
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

  get rotateValue() {
    return this.state.animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '360deg']
    });
  }
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
  }
});
