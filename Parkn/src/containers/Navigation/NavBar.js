import React, {Component} from 'react';
import {
  Navigator,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
} from 'react-native';

function navButtonGenerator(side) {
  return (route, navigator, index, navState) => {
    const navButton = route.nav && route.nav[side] && route.nav[side]();

    if (!navButton) {
      return <View />;
    }

    let text;
    if (navButton.text) {
      text = navButton.text(route, navigator, index, navState);
    }

    let icon;
    if (navButton.icon) {
      icon = navButton.icon(route, navigator, index, navState);
    }

    return (
      <TouchableOpacity
        onPress={navButton.onPress}
        style={[styles.navBarComponent]}
      >
        {icon && (
          <Image
            style={styles.buttonIcon}
            source={Images[icon].source}
            resizeMode="contain"
          />
        )}

        {text && (
          <Text
            style={[styles.navBarText]}>
            {text}
          </Text>
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
    return (
      <Navigator.NavigationBar {...this.props}
        routeMapper={routeMapper}
        style={[styles.container]}
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
  navBarComponent: {

  },
});
