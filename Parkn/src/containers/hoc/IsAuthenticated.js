// @flow
import React, {Component} from 'react';
import {isEmpty} from 'lodash/fp';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setIsNavigating, navigateTo} from 'actions/navigation';
import {fetchUser} from 'actions/authentication';
import Loading from 'components/Loading';

type Props = {
  isNavigating: boolean,
  isAuthenticated?: boolean,
  isFetching?: boolean,
  isRehydrated?: boolean,
  fetchUser?: () => void,
  hasToken?: boolean,
};

const AuthenticatedHOC = (ComposedComponent: ReactClass<*>) => {
  class AuthenticatedHOCContainer extends Component {
    state: {
      isAuthenticated: boolean,
      isFetching: boolean,
      isNavigating: boolean,
      didCheck: boolean,
    };
    props: Props

    constructor(props: Props) {
      super(props);

      this.state = {
        isAuthenticated: false,
        isFetching: false,
        isNavigating: props.isNavigating,
        didCheck: false,
      };
    }

    componentWillMount() {
      if (this.props.isAuthenticated) {
        this.setState({didCheck: true, isFetching: true});
      }

      this.checkAuthentication(this.props);
    }

    componentWillReceiveProps({isAuthenticated, isFetching, isRehydrated, fetchUser, hasToken, isNavigating}: Props) {
      this.checkAuthentication({isAuthenticated, isFetching, isRehydrated, fetchUser, hasToken, isNavigating});

      if (!isFetching && this.state.isFetching) {
        this.setState({isFetching});
      }
    }

    checkAuthentication({fetchUser, isAuthenticated, isFetching, isRehydrated, hasToken, isNavigating}: Props) {
      if (!this.state.isFetching && isRehydrated && !this.state.didCheck && hasToken) {
        this.setState({isFetching: true, didCheck: true});

        if (fetchUser) {
          fetchUser();
        }
      }
    }

    render() {
      if (this.state.isFetching || !this.props.isRehydrated) {
        return <Loading />
      }

      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps({
    isRehydrated,
    authentication: {user, token, isFetching},
    navigation: {isNavigating}
  }) {
    return {
      isAuthenticated: Boolean(token) && !isEmpty(user),
      hasToken: Boolean(token),
      isRehydrated,
      user,
      isFetching,
      isNavigating,
    };
  }

  function mapDispatchToProps(dispatch: Function): any {
    return bindActionCreators({
      setIsNavigating,
      navigateTo,
      fetchUser,
    }, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedHOCContainer);
}

export default AuthenticatedHOC;
