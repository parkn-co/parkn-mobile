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

const dimensions = Dimensions.get('window');
const offset = dimensions.height * .9;

type State = {
  pan: Object,
  height: number,
  width: number,
};
type Props = {
  menu: React.Element<*>,
};

class OverlayMenu extends Component {
  state: State;
  props: Props;
  getOverlayStyle: () => Object;
  onLayout: () => void;

  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY({x: 0, y: offset}),
      height: 0,
    };
  }

  componentWillMount() {
    this._animatedValueY = offset;
    this.state.pan.y.addListener((value) => this._animatedValueY = value.value);

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        const {_animatedValueY, state: {pan}} = this;
        pan.setOffset({x: 0, y: _animatedValueY});
        pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([
        null, {dy: this.state.pan.y}
      ]),
      onPanResponderRelease: (e, {vx, vy}) => {
        let {pan, pan: {y: {_value}}, height} = this.state,
          position = offset;

        pan.flattenOffset();

        // to deterime where view should spring too
        // if menu is pulled above it's current position, it's negative and visa versa
        if(_value < 0)
          position = dimensions.height - height;

        Animated.spring(pan, {
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
            <View style={styles.menu} onLayout={this.onLayout}>
              {this.props.menu}
            </View>
          </Animated.View>
        </View>
      );
  }

  componentWillUnmount() {
    this.state.pan.y.removeAllListeners();
  }

  getOverlayStyle = () => {
    let {height} = this.state;
    return [
      {
        height,
        transform: this.state.pan.getTranslateTransform(),
      },
    ];
  }

  onLayout = ({nativeEvent: {layout: {height}}}) => {
    this.setState({ height});
  }
}

export default OverlayMenu;

const styles = {
  container: {
    flex: 1,
  },
  dimensions: {
    height: dimensions.height,
    width: dimensions.width,
  },
  view: {
    position: 'absolute',
  },
  menu: {
    maxHeight: dimensions.height,
  },
};

