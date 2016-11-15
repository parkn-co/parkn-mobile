import React, {Component, PropTypes} from 'react';
import {isEmpty, compose} from 'lodash/fp';
import isAuthenticated from './isAuthenticated';

const requireAuthenticationHOC = ComposedComponent => class
  RequireAuthenticationHOCContainer extends Component {
    static propTypes = {
      user: PropTypes.object,
      go: PropTypes.shape({
        to: PropTypes.func,
        back: PropTypes.func,
      }),
    }

    constructor(props) {
      super(props);

      this.state = {
        isNavigating: false,
        isAuthenticated: !isEmpty(this.props.user),
      };
    }

    componentWillMount() {
      if (!this.state.isAuthenticated && !this.state.isNavigating) {
        this.redirect();
      }
    }

    componentWillReceiveProps({user}) {
      if (isEmpty(user) && this.state.isAuthenticated) {
        this.redirect();
      }
    }

    redirect() {
      this.props.go.to({id: 'NoAuthLanding', method: 'resetTo'});
      this.setState({isNavigating: true, isAuthenticated: false});
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
};

export default compose(isAuthenticated, requireAuthenticationHOC);
