import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {getStore} from './store';
import App from './containers/App';

export default class Parkn extends Component {
  render() {
    return (
      <Provider store={getStore()}>
        <App />
      </Provider>
    );
  }
}
