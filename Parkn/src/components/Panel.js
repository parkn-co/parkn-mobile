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
      <Swiper
        horizontal={false}
        loop={false}
        showsPagination={false}
				index={0}
			>
          <View style={styles.container}>
	    			{this.props.children}
          </View>
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
      </Swiper>
    );
  }
}

export default Panel;

const styles = {
	container: {
		flex: 1,
	},
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    width: width,
  },
  overlayText: {
    color: 'white',
  },
};
