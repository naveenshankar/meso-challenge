import React from 'react';
import renderDOM from 'react-dom';
import { Provider } from 'react-redux';

import Controls from '../src/components/Controls';
import Containers from '../src/components/Containers';
import { saveState, loadState,deleteState } from './utils/GenericUtils';
import bstyle from 'bootstrap/less/bootstrap.less';
import styles from '../src/styles/main.scss';
import {store} from './store';

const app = document.getElementById('app');

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