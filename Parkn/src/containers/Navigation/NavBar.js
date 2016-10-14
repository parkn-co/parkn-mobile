import React, {Component} from 'react';
import {
  Navigator,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
} from 'react-native';
import {last} from 'lodash/fp';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {grayPalette} from '../../styles/colors';
import {fontNames} from '../../styles/fonts';

function navButtonGenerator(side) {
  return (route, navigator, index, navState) => {
    const navButton = route.nav && route.nav[side] && route.nav[side]();

    if (!navButton) {
      return <View />;
    }

    const text = navButton.text;
    const icon = navButton.icon;

    return (
      <TouchableOpacity
        onPress={navButton.onPress}
        style={[styles.navBarComponent]}
      >
        {icon && !navButton.isIconOnRight && (
          <Icon name={icon} size={30} color="rgba(255,255,255,0.75)" />
        )}

        {text && (
          <Text
            style={[styles.navBarText]}>
            {text}
          </Text>
        )}

        {icon && navButton.isIconOnRight && (
          <Icon name={icon} size={30} color="rgba(255,255,255,0.75)" />
        )}
      </TouchableOpacity>
    );
  }
}

const routeMapper = {
  LeftButton: navButtonGenerator('left'),
  RightButton: navButtonGenerator('right'),
  Title: (route, navigator, index, navState) => {
    if (!route.title) {
      return <View />;
    }

    return (
      <View style={styles.navBarComponent}>
        {
          route.titleIcon && (
            <Image
              style={styles.titleIcon}
              source={Images[route.titleIcon].source}
              resizeMode="contain"
            />
          )
        }
        <Text>
          {route.title}
        </Text>
      </View>
    );
  },
};

export default class NavBar extends Component {
  render() {
    const route = last(this.props.navState);

    return (
      <Navigator.NavigationBar {...this.props}
        routeMapper={routeMapper}
        style={[styles.container, (route && route.nav) ? {} : styles.noNav]}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  buttonIcon: {

  },
  titleIcon: {

  },
  noNav: {
    height: 0,
  },
  navBarComponent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navBarText: {
    color: grayPalette.white,
    opacity: 0.75,
    fontFamily: fontNames.light,
    fontSize: 20,
  },
});
