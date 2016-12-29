import {createStore, applyMiddleware, combineReducers} from 'redux';
import {compose} from 'lodash/fp';
import {AsyncStorage} from 'react-native';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {persistStore, autoRehydrate} from 'redux-persist';
import rootReducer from './reducers';

// Uncomment to clear the AsyncStorage store of the redux store
// AsyncStorage.clear();

const middleware = applyMiddleware(
  thunk,
  createLogger(),
);

export function getStore(data = {}) {
  const store = createStore(rootReducer, data, compose(middleware, autoRehydrate()));
  persistStore(store, {storage: AsyncStorage});

  return store;
}
