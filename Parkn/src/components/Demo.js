import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

function Demo(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to React Native!
      </Text>
      <Text style={styles.instructions}>
        To get started, edit index.ios.js
      </Text>
      <Text style={styles.instructions}>
        Press Cmd+R to reload,{'\n'}
        Cmd+D or shake for dev menu
      </Text>
    </View>
  );
}

Demo.route = {
  title: 'Hello!',
  nav: {
    left: (route, navigator, index, navState) => ({
      onPress: (route, navigator, index, navState) => {},
      text: (route, navigator, index, navState) => 'Sup',
    }),
    title: (route, navigator, index, navState) => <Text>{'Hello'}</Text>,
    right: (route, navigator, index, navState) => ({
      onPress: (route, navigator, index, navState) => {},
      text: (route, navigator, index, navState) => 'Yo',
    }),
  }
};

export default Demo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
