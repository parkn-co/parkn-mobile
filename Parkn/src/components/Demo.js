import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

function Demo({user: {email, firstName, lastName}}) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        {`Welcome to Parkn, ${firstName}!`}
      </Text>
      <Text style={styles.instructions}>
        {`Full Name: ${firstName} ${lastName}`}
      </Text>
      <Text style={styles.instructions}>
        {`Email: ${email}`}
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
