import React, {Component} from 'react';
import {Animated, Easing} from 'react-native';
import {isEmpty} from 'lodash/fp';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AwaitingAuthenticationComponent from './AwaitingAuthenticationComponent';

class AwaitingAuthenticationContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animatedValue: new Animated.Value(0),
      toValue: 100,
    };

    this.startRotation = this.startRotation.bind(this);
  }

  componentWillReceiveProps({isAuthenticated, authenticationErrors, navigator}) {
    if (isAuthenticated) {
      return navigator.resetTo({id: 'Landing'});
    }

    if (!isEmpty(authenticationErrors)) {
      console.log('Navigate back to form earliest in the stack that has an error');
    }
  }

  componentDidMount() {
    this.startRotation();

    this.interval = setInterval(this.startRotation, 3000);
  }

  componentWillUnmout() {
    clearInterval(this.interval);
  }

  startRotation() {
    Animated.timing(this.state.animatedValue, {
      toValue: this.state.toValue,
      duration: 3000,
      easing: Easing.linear
    }).start();

    this.setState({toValue: this.state.toValue + 100});
  }

  render() {
    return <AwaitingAuthenticationComponent rotate={this.rotateValue} />;
  }

  get rotateValue() {
    return this.state.animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '360deg']
    });
  }
}

function mapStateToProps({authentication: {authenticationErrors, token}}) {
  return {
    authenticationErrors,
    isAuthenticated: Boolean(token),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AwaitingAuthenticationContainer);
