import {combineReducers} from 'redux';
import navigation from './navigation';
import authentication from './authentication';

const rootReducer = combineReducers({
  navigation,
  authentication,
});

export default rootReducer;
