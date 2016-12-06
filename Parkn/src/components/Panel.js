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
import Bar from './Bar';

const { width, height } = Dimensions.get('window');

// used for animation
// basis for overlay positioning
const percentOf = (total: number, percentage: number) => {
	return (percentage < 0) ? 0 : total * (percentage / 100);
}

class Panel extends Component {
	state:  {
		pan: Object
	};

	constructor(props) {
		super(props);
		this.state = {
			pan: new Animated.ValueXY(),
		};
	}

	componentWillMount() {
		this._animatedValueY = 0;

		this.state.pan.y.addListener((value) => this._animatedValueY = value.value);

		this._panResponder = PanResponder.create({
			onMoveShouldSetResponderCapture: () => true, // allow movement
			onMoveShouldSetPanResponderCapture: () => true, // allow dragging
			onPanResponderGrant: (e, gestureState) => {
				this.state.pan.setOffset({x: 0, y: this._animatedValueY});
				this.state.pan.setValue({x: 0, y: 0}); // set inital
			},
			onPanResponderMove: Animated.event([
				null, {dy: this.state.pan.y}
			]), // handle movement and offset, possible to have a `dx` as well to allow for horizontal movment
			//TODO: create system to bounce back if pull to offscreen areas
			onPanResponderRelease: (e, {vx, vy}) => {
				this.state.pan.flattenOffset(); // ?? Flatten the offset so it resets the default positioning

				Animated.decay(this.state.pan, {
					velocity: {x: vx, y: vy},
					deceleration: 0.98 
				}).start();

				let y = this.state.pan.y._value,
					position = 0;

				if(y < -percentOf(height, 60))
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
							<Bar />
						</View>
					</Animated.View>
				</View>
			);
	}

	componentWillUnmount() {
		this.state.pan.y.removeAllListeners();
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

export default Panel;

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

