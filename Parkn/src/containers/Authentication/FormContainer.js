// @flow
import type {UserForm, Props} from 'flow-declarations/forms';
import type {Route} from 'flow-declarations/navigation';

import React, {Component, PropTypes} from 'react';
import {startCase, assign, keys, isEmpty} from 'lodash/fp';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  setFormValues,
  authenticateWithValues,
} from 'actions/authentication';
import {routeProps} from 'prop-types/route';
import FormComponent from './FormComponent';

type State = {
  isSignUp: boolean,
};

class FormContainer extends Component {
  props: Props;
  state: State;
  handleSubmit: () => void;
  getFields: () => Array<Object>;

  static propTypes = routeProps;

  constructor(props: Props) {
    super(props);

    this.state = {
      isSignUp: Boolean(props.route.isSignUp),
    };

    props.fields.forEach((field) => {
      this.state[field] = {
        value: props[field],
        error: null,
      };
    });

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(): void {
    const errors = this.props.validate ? this.props.validate(this.state) : {};

    this.props.fields.forEach((field) => {
      if (this.state[field].value === '') {
        errors[field] = `${startCase(field)} is required`;
      }
    });

    if (!isEmpty(errors)) {
      const newState = {};

      keys(errors).forEach((key) => {
        newState[key] = {
          ...this.state[key],
          error: errors[key],
        };
      });

      this.setState(newState);

      return;
    }

    const formValues = {};

    this.props.fields.forEach((field) => {
      formValues[field] = this.state[field].value;
    });

    if (this.props.isFinalForm) {
      this.props.authenticateWithValues(this.state.isSignUp, formValues);
      this.props.go.to({id: 'AwaitingAuthentication'});
    } else {
      this.props.setFormValues(formValues);
      this.props.go.to({id: this.props.nextForm});
    }
  }

  hanldeInputChange(field) {
    return text => this.setState({
      [field]: {value: text, error: null},
    });
  }

  getFields() {
    const fieldProps: Object = this.props.fieldProps || {};

    return this.props.fields.map((field) => {
      const {value, error} = this.state[field];
      const resultError = this.props.errors[field];

      return {
        value,
        error: error || resultError,
        label: startCase(field),
        onChangeText: this.hanldeInputChange(field),
        autoCorrect: false,
        ...(fieldProps[field] || {}),
      };
    });
  }

  render() {
    const {isFinalForm, go} = this.props;

    return (
      <FormComponent
        handleSubmit={this.handleSubmit}
        fields={this.getFields()}
        submitButton={{
          icon: isFinalForm ? 'thumb-up' : 'arrow-forward',
          text: isFinalForm ? '' : 'Next',
          onPress: this.handleSubmit,
        }}
        backButton={this.props.backButton && {
          icon: 'arrow-back',
          text: 'Back',
        }}
        handleBackPress={go.back}
      />
    );
  }
}

function mapStateToProps({authentication: {form, errors}}) {
  return {...form, errors};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setFormValues,
    authenticateWithValues,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
