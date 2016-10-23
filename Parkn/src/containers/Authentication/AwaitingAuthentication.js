import React, {Component} from 'react';
import {Animated, Easing} from 'react-native';
import {isEmpty, keys, omit} from 'lodash/fp';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setIsNavigating, navigateTo} from '../../actions/navigation';
import Loading from '../../components/Loading';

const omitErrorKeys = omit(['error', 'status']);

class AwaitingAuthenticationContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animatedValue: new Animated.Value(0),
      toValue: 100,
      isMounted: false,
      isNavigating: props.isNavigating,
    };
  }

  componentWillReceiveProps({isAuthenticated, errors, navigator, isNavigating}) {
    if (!this.state.isMounted) {
      return;
    }

    if (isAuthenticated && !this.state.isNavigating) {
      this.props.setIsNavigating(true);
      this.setState({isNavigating: true});

      return this.props.navigateTo({id: 'Landing', method: 'resetTo'});
    }

    if (!isEmpty(errors) && !this.state.isNavigating && !isNavigating) {
      const routeStack = navigator.getCurrentRoutes();
      const route = routeStack
        .find(r => r.keys && r.keys.includes(...keys(omitErrorKeys(errors))));


      if (route) {
        this.props.setIsNavigating(true);

        this.setState({isNavigating: true});

        navigator.popToRoute(route);
      } else {
        console.log('Weird error', route, isAuthenticated, errors);
      }
    }
  }

  componentDidMount() {
    this.setState({isMounted: true});
  }

  render() {
    return <Loading />;
  }
}

function mapStateToProps({authentication: {errors, token}, navigation: {isNavigating}}) {
  return {
    errors,
    isAuthenticated: Boolean(token),
    isNavigating,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setIsNavigating,
    navigateTo,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AwaitingAuthenticationContainer);
