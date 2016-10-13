import React, {Component, PropTypes} from 'react';
import {Navigator} from 'react-native';
import {values} from 'lodash/fp';
import NavBar from './NavBar';

class Navigation extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      initialRoute: values(props.routes).find(route => route.isInitial),
    };

    this.renderScene = this.renderScene.bind(this);
  }

  renderScene(route, navigator) {
    const RouteComponent = this.props.routes[route.id].component;

    return (
      <RouteComponent
        name={route.id}
      />
    );
  }

  render() {
    return (
      <Navigator
        initialRoute={this.state.initialRoute}
        renderScene={this.renderScene}
        navigationBar={<NavBar />}
      />
    );
  }
}

export default Navigation;
