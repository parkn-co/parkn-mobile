// @flow
// once pull up menu is working, look at react-native-swiper for side swping menus
// https://medium.com/the-react-native-log/implement-snapchat-like-swipe-navigation-declaratively-in-react-native-309e71229c89#.mjq30663m

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';
import Dimensions from 'Dimensions';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

class Panel extends Component {
  render() {
    return (
			<View style={styles.container}>
				<View style={styles.staticContainer}>
					{this.props.children}
				</View>
				<ScrollView showsVerticalScrollIndicator={false} >
					<View style={{height}} />
					<View style={styles.overlay} />
				</ScrollView>
      </View>
    );
  }
}

/*
Sideways swiper

<Swiper
  loop={false}
 	showsPagination
	index={1}
	>
		<View style={styles.view}>
			<Text>Left</Text>
 		</View>
 		<View style={styles.view}>
			<Text>Bottom</Text>
 		</View>
 	  <View style={styles.view}>
			<Text>Right</Text>
 		</View>
</Swiper>
*/

export default Panel;

const styles = {
	container: {
		flex: 1,
	},
  //view: {
    //flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
	//},
	overlay: {
		flex: 1,
    height,
    width,
		opacity: 0.8,
		backgroundColor: 'black',
	},
  staticContainer: {
    flex: 1,
		position: 'absolute',
		left: 0,
		top: 0,
    height,
    width,
  },
  overlayText: {
    color: 'white',
  },
};
