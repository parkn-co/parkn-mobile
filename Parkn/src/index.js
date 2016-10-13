import React, {Component} from 'react';
import {Provider} from 'react-redux';
import createStore from './createStore';
import Navigator from './containers/Navigation';
import getRoutes from './routes';

export default class Parkn extends Component {
  render() {
    return (
      <Provider store={createStore()}>
        <Navigator routes={getRoutes()} />
      </Provider>
    );
  }
}
