import {REHYDRATE} from 'redux-persist/constants';

// Action Handlers
const REDUCER_ACTION_HANDLERS = {
   [REHYDRATE]: () => { console.log('persisting'); return true},
};

const initialState = false;

// Reducer
export default function persistReducer(state = initialState, action) {
  const handler = REDUCER_ACTION_HANDLERS[action.type];
  
  return handler ? handler(state, action) : state
}
