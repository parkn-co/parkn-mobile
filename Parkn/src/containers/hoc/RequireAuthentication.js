import React, {Component} from 'react';
import {isEmpty, compose} from 'lodash/fp';
import IsAuthenticated from './IsAuthenticated';

const RequireAuthenticationHOC = ComposedComponent => class RequireAuthenticationHOCContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavigating: false,
    };
  }

  componentWillMount() {
    if (isEmpty(this.props.user) && !this.state.isNavigating) {
      this.props.go.to({id: 'NoAuthLanding', method: 'resetTo'});

      this.setState({isNavigating: true});
    }
  }

  render() {
    return (
      <ComposedComponent {...this.props} />
    );
  }
}

export default compose(IsAuthenticated, RequireAuthenticationHOC);
