// @flow
import React, {Component} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Bar from './Bar';

const dimensions = Dimensions.get('window');
const offset = dimensions.height * 0.9;

type State = {
  pan: Object,
  height: number,
  isOpen: boolean,
};
type Props = {
  children: Array<React.Element<*>>,
  header: React.Element<*>,
  menu: React.Element<*>,
};

class OverlayMenu extends Component {
  state: State;
  props: Props;
  panResponder: Object;
  getOverlayStyle: () => Object;
  onLayout: () => void;

  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY({x: 0, y: offset}),
      height: 0,
      isOpen: false,
    };
  }

  componentWillMount() {
    this.animatedValueY = offset;
    this.state.pan.y.addListener((value) => { this.animatedValueY = value.value; });

    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        const {animatedValueY, state: {pan}} = this;
        pan.setOffset({x: 0, y: animatedValueY});
        pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([
        null, {dy: this.state.pan.y},
      ]),
      onPanResponderRelease: (e, {vx, vy}) => {
        const {pan, pan: {y: {_value}}, height} = this.state;
        let position = offset;

        pan.flattenOffset();

        if (_value < 0) {
          position = dimensions.height - height;
        }

        Animated.spring(pan, {
          toValue: {x: 0, y: position},
        }).start();
      },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.view, styles.dimensions]}>
          {this.props.children}
        </View>
        <Animated.View style={this.getOverlayStyle()}>
          <View style={styles.menu} onLayout={this.onLayout}>
            <Animated.View {...this.panResponder.panHandlers} >
              {this.props.header}
            </Animated.View>
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
    const {height} = this.state;
    return [
      {
        height,
        maxHeight: dimensions.height,
        transform: this.state.pan.getTranslateTransform(),
      },
    ];
  }

  onLayout = ({nativeEvent: {layout: {height}}}) => {
    this.setState({height});
  }
}

export default OverlayMenu;

const styles = StyleSheet.create({
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
});

