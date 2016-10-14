import React, {Component} from 'react';
import {startCase, assign, keys, isEmpty} from 'lodash/fp';
import FormComponent from './FormComponent';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setFormValues, authenticateWithValues} from '../../actions/authentication';

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    props.fields.forEach(field => {
      this.state[field] = {
        value: props[field],
        error: null,
      };
    });

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    let errors = {};

    if (this.props.validate) {
      errors = this.props.validate(this.state);
    }

    this.props.fields.forEach(field => {
      if (this.state[field].value === '') {
        errors[field] = `${startCase(field)} is required`;
      }
    });

    if (!isEmpty(errors)) {
      const newState = {};

      keys(errors).forEach(key => {
        newState[key] = {
          ...this.state[key],
          error: errors[key],
        };
      });

      return this.setState(newState);
    }

    const formValues = {};

    this.props.fields.forEach(field => {
      formValues[field] = this.state[field].value;
    });

    if (this.props.isFinalForm) {
      this.props.authenticateWithValues(formValues);
      this.props.go.to({id: 'AwaitingAuthentication'});
    } else {
      this.props.setFormValues(formValues);
      this.props.go.to({id: this.props.nextForm});
    }
  }

  hanldeInputChange(field) {
    return text => this.setState({
      [field]: {value: text, error: null}
    });
  }

  getFields() {
    const fieldProps = this.props.fieldProps || {};

    return this.props.fields.map(field => ({
      ...this.state[field],
      label: startCase(field),
      onChangeText: this.hanldeInputChange(field),
      autoCorrect: false,
      ...(fieldProps[field] || {})
    }));
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
          onPress: this.onSubmit
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

function mapStateToProps({authentication: {form}}) {
  return {...form};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setFormValues,
    authenticateWithValues,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
