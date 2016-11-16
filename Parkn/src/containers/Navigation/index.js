// @flow
import type {User} from 'flow-declarations/user';

import React, {Component, PropTypes} from 'react';
import {View, StatusBar, Navigator, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {values} from 'lodash/fp';
import {didNavigateTo, navigateTo, setIsNavigating} from '../../actions/navigation';

class Navigation extends Component {
  state: {
    initialRoute: Object,
    isNavigating: boolean,
  };
  renderScene: () => React.Element<*>;
  onWillFocus: () => void;
  navigator: Object;

  static propTypes = {
    routes: PropTypes.shape({}),
    navigateTo: PropTypes.func.isRequired,
    setIsNavigating: PropTypes.func.isRequired,
    didNavigateTo: PropTypes.func.isRequired,
  }

  constructor(props: Object) {
    super(props);

    this.state = {
      initialRoute: values(props.routes).find(route => route.isInitial),
      isNavigating: false,
    };

    this.renderScene = this.renderScene.bind(this);
    this.onWillFocus = this.onWillFocus.bind(this);
  }

  componentWillReceiveProps({navigateToRoute}: {navigateToRoute: {id: string}}) {
    if (navigateToRoute && !this.state.isNavigating) {
      this.props.setIsNavigating(true);

      const method = navigateToRoute.method || 'push';

      this.navigator[method](this.routes[navigateToRoute.id]);
    }
  }

  renderScene(route: Object, navigator: any): React.Element<*> {
    const RouteComponent = route.component;

    return (
      <View style={styles.sceneWrapper}>
        <StatusBar barStyle={route.statusBarStyle || 'light-content'} />
        <RouteComponent
          go={{
            to: this.props.navigateTo,
            back: navigator.pop,
          }}
          navigator={navigator}
          route={{...route, ...this.routes[route.id]}}
          name={route.id}
        />
      </View>
    );
  }

  onWillFocus(route: Object) {
    this.props.didNavigateTo(route);
    this.setState({isNavigating: false});
  }

  get routes(): Object {
    return this.props.routes;
  }

  render(): React.Element<*> {
    return (
      <Navigator
        ref={r => this.navigator = r}
        initialRoute={this.state.initialRoute}
        renderScene={this.renderScene}
        onWillFocus={this.onWillFocus}
      />
    );
  }
}

function mapStateToProps({navigation, authentication: {token, user}}: {
  navigation: any,
  authentication: {token: string, user: User}
}): Object {
  return {...navigation, user, token};
}

function mapDispatchToProps(dispatch: Function): any {
  return bindActionCreators({
    didNavigateTo,
    navigateTo,
    setIsNavigating,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

const styles = StyleSheet.create({
  sceneWrapper: {
    flex: 1,
  },
});
