import {combineReducers} from 'redux';
import navigation from './navigation';
import authentication from './authentication';
import persist from './persist';

const rootReducer = combineReducers({
  isRehydrated: persist,
  navigation,
  authentication,
});

export default rootReducer;
