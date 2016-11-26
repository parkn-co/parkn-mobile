// @flow
import type {User} from 'flow-declarations/user';

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

type Props = {
  handleSignOut: () => void,
  user: User
};

const Demo = ({
  handleSignOut,
  user: {email, firstName, lastName}
}: Props): React.Element<*> => {
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
      <TouchableOpacity style={styles.signOut} onPress={handleSignOut}>
        <Text>{'Sign Out'}</Text>
      </TouchableOpacity>
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
  signOut: {
    margin: 20,
    padding: 10,
    borderColor: '#333',
    borderWidth: 1,
  },
});
