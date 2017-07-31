// PERSISTING REDUX STATES WITH LOCAL STORAGE
export const loadState = () => {
	try{
		const serializedState = localStorage.getItem('state');
		if (serializedState === null){
			return undefined;
		}
		return JSON.parse(serializedState);
	}
	catch(err){
		return undefined;
	}
};

export const saveState = (state) => {
	try{
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	}
	catch(err){
		// ignore
	}
};

export const deleteState = (state) => {
	try{
		localStorage.removeItem('state');
	}
	catch(err){
		// ignore
	}
};

export const findServerIndex = (limitVal,servers) => {
	let index = 0;let finalIndex;
	while(index < servers.length && finalIndex === undefined ){
		let val = servers[index];
		if(val['server_'+(index+1)].length === limitVal && limitVal < 2)
			finalIndex = index;
		index++;
	};

	if(finalIndex === undefined && limitVal < 2)
		return findServerIndex(limitVal+1,servers)
	else
		return finalIndex;
}

//	SETTING UP A TIMEOUT WITH A CUSTOM INTERVAL
export const customWait = ms => new Promise(r => setTimeout(r, ms));