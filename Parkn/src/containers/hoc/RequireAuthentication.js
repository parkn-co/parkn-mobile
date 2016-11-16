// @flow
import React, {Component, PropTypes} from 'react';
import {isEmpty, compose} from 'lodash/fp';
import type {User} from 'flow-declarations/user';
import {defaultUser} from 'prop-types/user';
import isAuthenticated from './isAuthenticated';

type Props = {
  user: User,
};

const requireAuthenticationHOC = (ComposedComponent: ReactClass<*>) => {
  class RequireAuthenticationHOCContainer extends Component {
    state: {
      isNavigating: boolean,
      isAuthenticated: boolean,
    };

    static propTypes = {
      user: defaultUser,
      go: PropTypes.shape({
        to: PropTypes.func,
        back: PropTypes.func,
      }),
    }

    constructor(props: Props) {
      super(props);

      this.state = {
        isNavigating: false,
        isAuthenticated: !isEmpty(props.user),
      };
    }

    componentWillMount(): void {
      if (!this.state.isAuthenticated && !this.state.isNavigating) {
        this.redirect();
      }
    }

    componentWillReceiveProps({user}: Props): void {
      if (isEmpty(user) && this.state.isAuthenticated) {
        this.redirect();
      }
    }

    redirect(): void {
      this.props.go.to({id: 'NoAuthLanding', method: 'resetTo'});
      this.setState({isNavigating: true, isAuthenticated: false});
    }

    render(): React.Element<*> {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  return RequireAuthenticationHOCContainer;
};

export default compose(isAuthenticated, requireAuthenticationHOC);
