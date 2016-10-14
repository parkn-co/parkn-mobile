import React, {Component} from 'react';
import {assign, isEmpty} from 'lodash/fp';
import NamesComponent from './Component';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setNames} from '../../../actions/authentication';

class NamesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: {
        value: props.firstName,
        error: null,
      },
      lastName: {
        value: props.lastName,
        error: null,
      },
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    console.log('submitting');
    const {firstName, lastName} = this.state;
    const errors = {};
    if (firstName.value === '') {
      errors.firstName = 'First Name is required';
    }

    if (lastName.value === '') {
      errors.lastName = 'Last Name is required';
    }

    if (!isEmpty(errors)) {
      return this.setState({
        firstName: {
          ...firstName,
          error: errors.firstName
        },
        lastName: {
          ...lastName,
          error: errors.lastName
        }
      });
    }

    this.props.setNames({
      firstName: firstName.value,
      lastName: lastName.value,
    })
    //this.props.navigateTo({id: 'AuthFormEmail'});
  }

  render() {
    return (
      <NamesComponent
        {...this.state}
        onFirstNameChange={firstName => this.setState({
          firstName: assign(this.state.firstName, {value: firstName})}
        )}
        onLastNameChange={lastName => this.setState({
          lastName: assign(this.state.lastName, {value: lastName})}
        )}
        onSubmit={this.onSubmit}
      />
    );
  }
}

function mapStateToProps({authentication: {firstName, lastName}}) {
  return {firstName, lastName};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setNames,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NamesContainer);
