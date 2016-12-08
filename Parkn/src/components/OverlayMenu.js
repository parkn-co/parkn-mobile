// @flow
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
} from 'react-native';
import Dimensions from 'Dimensions';

const { width, height } = Dimensions.get('window');

// used for animation
// basis for overlay positioning
const percentOf = (total: number, percentage: number) => {
  return (percentage < 0) ? 0 : total * (percentage / 100);
}

type State = {
  pan: Object,
  isInDefault: boolean,
};
type Props = {
  menu: React.Element<*>,
};

class OverlayMenu extends Component {
  state: State;
  props: Props;
  toggleMenu: () => void;
  getOverlayStyle: () => Object;

  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      isInDefault: true,
    };
  }

  componentWillMount() {
    // Note on animation values:
    // negative `y` moves view above starting position
    // positive `y` moves animated view below starting position
    this._animatedValueY = 0;

    this.state.pan.y.addListener((value) => this._animatedValueY = value.value);

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: 0, y: this._animatedValueY});
        this.state.pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([
        null, {dy: this.state.pan.y}
      ]),
      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset(); // ?? Flatten the offset so it resets the default positioning


        let {isInDefault, pan: {y: {_value}}} = this.state,
          position = 0;

        // to deterime where view should spring too
        if(_value < -percentOf(height, 10) && _value > -percentOf(height, 85)) {
          if(isInDefault)
            position = -percentOf(height, 85);
          else
            position = 0;
          this.toggleMenu();
          } else if(_value < -percentOf(height, 85))
            position = -percentOf(height, 85);

        Animated.spring(this.state.pan, {
          toValue: {x: 0, y: position},
        }).start();
      }
    });
  }

    render() {
      return (
        <View style={styles.container}>
          <View style={[styles.view, styles.dimensions]}>
            {this.props.children}
          </View>
          <Animated.View
            style={this.getOverlayStyle()}
            {...this._panResponder.panHandlers}
          >
            <View>
              {this.props.menu}
            </View>
          </Animated.View>
        </View>
      );
  }

  componentWillUnmount() {
    this.state.pan.y.removeAllListeners();
  }

  toggleMenu = () => {
    this.setState({
      isInDefault: !this.state.isInDefault,
    });
  }

  getOverlayStyle = () => {
    return [
      styles.overlay,
      styles.dimensions,
      {
        transform: this.state.pan.getTranslateTransform()
      },
    ];
  }
}

export default OverlayMenu;

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dimensions: {
    height,
    width,
  },
  view: {
    position: 'absolute',
  },
  overlay: {
    top: percentOf(height, 90),
  },
};

