import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

import universal from '../reducers/universalReducer';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

export default createStore(
  combineReducers({
    universal,
  }),
  preloadedState,
  compose(
    applyMiddleware(createLogger(), thunk),
    offline(offlineConfig)
  )
);
