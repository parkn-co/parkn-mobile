// @flow
import type {User} from 'flow-declarations/user';

import React, {Component} from 'react';
import {isEmpty, compose} from 'lodash/fp';
import IsAuthenticated from './IsAuthenticated';

type Props = {
  user: User,
};

const RequireAuthenticationHOC = (ComposedComponent: ReactClass<*>) => class RequireAuthenticationHOCContainer extends Component {
  state: {
    isNavigating: boolean,
    isAuthenticated: boolean,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      isNavigating: false,
      isAuthenticated: !isEmpty(this.props.user),
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

export default compose(IsAuthenticated, RequireAuthenticationHOC);
