import React, {Component, PropTypes} from 'react';
import {View, StatusBar, Navigator, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {values} from 'lodash/fp';
import NavBar from './NavBar';
import {didNavigateTo, navigateTo, setIsNavigating} from '../../actions/navigation';

class Navigation extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      initialRoute: values(props.routes).find(route => route.isInitial),
      isNavigating: false,
    };

    this.renderScene = this.renderScene.bind(this);
    this.onWillFocus = this.onWillFocus.bind(this);
  }

  componentWillReceiveProps({navigateToRoute}) {
    if (navigateToRoute && !this.state.isNavigating) {
      this.props.setIsNavigating(true);

      let method = navigateToRoute.method || 'push';

      this.refs.navigator[method](this.routes[navigateToRoute.id]);
    }
  }

  renderScene(route, navigator) {
    const RouteComponent = route.component;

    return (
      <View style={styles.sceneWrapper}>
        <StatusBar barStyle={route.statusBarStyle || "light-content"} />
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

  onWillFocus(route) {
    this.props.didNavigateTo(route);
    this.setState({isNavigating: false});
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        initialRoute={this.state.initialRoute}
        renderScene={this.renderScene}
        onWillFocus={this.onWillFocus}
        navigationBar={<NavBar />}
      />
    );
  }

  get routes() {
    return this.props.routes;
  }
}

function mapStateToProps({navigation, authentication: {token, user}}) {
  return {...navigation, user, token};
}

function mapDispatchToProps(dispatch) {
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
  }
});
