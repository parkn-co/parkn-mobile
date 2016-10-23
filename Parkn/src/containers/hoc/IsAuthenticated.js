import React, {Component} from 'react';
import {isEmpty} from 'lodash/fp';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setIsNavigating, navigateTo} from '../../actions/navigation';
import {fetchUser} from '../../actions/authentication';
import Loading from '../../components/Loading';

export default AuthenticatedHOC = ComposedComponent => {
  class AuthenticatedHOCContainer extends Component {
    constructor(props) {
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

    componentWillReceiveProps({isAuthenticated, isFetching, isRehydrated, fetchUser, hasToken}) {
      this.checkAuthentication({isAuthenticated, isFetching, isRehydrated, fetchUser, hasToken});

      if (!isFetching && this.state.isFetching) {
        this.setState({isFetching});
      }
    }

    checkAuthentication({fetchUser, isAuthenticated, isFetching, isRehydrated, hasToken}) {
      if (!this.state.isFetching && isRehydrated && !this.state.didCheck && hasToken) {
        this.setState({isFetching: true, didCheck: true});

        fetchUser();
      }
    }

    render() {
      if (this.state.isFetching || !this.props.isRehydrated) {
        return <Loading />
      }

      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps({isRehydrated, authentication: {user, token, isFetching}, navigation: {isNavigating}}) {
    return {
      isAuthenticated: Boolean(token) && !isEmpty(user),
      hasToken: Boolean(token),
      isRehydrated,
      user,
      isFetching,
      isNavigating,
    };
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      setIsNavigating,
      navigateTo,
      fetchUser,
    }, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedHOCContainer);
}
