import logger from 'redux-logger';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import controlsReducer from './reducers/ControlsReducer';
import { saveState, loadState,deleteState } from './utils/GenericUtils';

let currentState = loadState();

const store = createStore(
	combineReducers({
		controls:controlsReducer
	}),
	currentState,
	applyMiddleware(logger(), promiseMiddleware()) 
);

if(currentState === undefined)
	saveState(store.getState());

export {store};