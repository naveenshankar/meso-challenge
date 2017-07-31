import React from 'react';
import renderDOM from 'react-dom';
import logger from 'redux-logger';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';

import Controls from '../src/components/Controls';
import Containers from '../src/components/Containers';
import controlsReducer from './reducers/ControlsReducer';
import { saveState, loadState,deleteState } from './utils/GenericUtils';
import bstyle from 'bootstrap/less/bootstrap.less';
import styles from '../src/styles/main.scss';

const app = document.getElementById('app');
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

//SUBSCRIBING TO CHANGES IN REDUX STORE
store.subscribe(() => {
  	if (!store.getState().controls.deleteCache)
    	saveState(store.getState());
  	else 
    	deleteState(store.getState());
});

export default class Root extends React.Component {
	render() {
			return (
				<div className="meso_mainContainer">
					<Controls/>
					<Containers/>
				</div>
			);
	}
}

renderDOM.render(<Provider store={store}><Root/></Provider>, app);
export {store};