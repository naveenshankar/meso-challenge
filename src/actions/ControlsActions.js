import { customWait,findServerIndex } from '../utils/GenericUtils';
import {store} from '.././store';

export function addServer() {
    return {
        type: 'ADD_SERVER',
		payload:
		(async () => {
				let currentServers = Object.assign([],store.getState().controls.servers);
				const serverName = 'server_'+ (store.getState().controls.servers.length + 1);
				let serverObj = {};
				serverObj[serverName] = [];
				serverObj['timestamps'] = [];
				currentServers.push(serverObj);
				return {servers:currentServers};
        })()
    };
}

export function destroyServer() {
    return {
        type: 'DESTROY_SERVER',
		payload:
		(async () => {
				let currentServers = Object.assign([],store.getState().controls.servers);
				let apps = Object.assign([],store.getState().controls.apps);
				if(currentServers.length > 0){
					let lastServer = currentServers[currentServers.length-1]['server_'+currentServers.length];
					if(lastServer.length === 0)
						currentServers.pop();
					else {
						currentServers.pop();
						lastServer.forEach(function(val,index){
							const serverIndex = findServerIndex(0,currentServers);
							if(serverIndex !== undefined){
								apps[val]['serversDeployed'].push(serverIndex);
								currentServers[serverIndex]['server_'+(serverIndex+1)].push(val);
								currentServers[serverIndex]['timestamps'].push(new Date().getTime());
							}
						})
					}
				}
				return {servers:currentServers,apps:apps};
        })()
    };
}

export function addApp(appIndex) {
    return {
        type: 'ADD_APP',
		payload:
		(async () => {
				let currentServers = Object.assign([],store.getState().controls.servers);
				let apps = Object.assign([],store.getState().controls.apps);
				const serverIndex = findServerIndex(0,currentServers);
				if(serverIndex !== undefined){
					apps[appIndex]['serversDeployed'].push(serverIndex);
					currentServers[serverIndex]['server_'+(serverIndex+1)].push(appIndex);
					currentServers[serverIndex]['timestamps'].push(new Date().getTime());
				}
				return {servers:currentServers,apps:apps};
        })()
    };
}

export function killApp(appIndex) {
    return {
        type: 'KILL_APP',
		payload:
		(async () => {
				let currentServers = Object.assign([],store.getState().controls.servers);
				let apps = Object.assign([],store.getState().controls.apps);
				const poppedServer = apps[appIndex].serversDeployed.pop();
				if(poppedServer !== undefined){
					const poppedAppPosition = currentServers[poppedServer]['server_'+(poppedServer+1)].indexOf(appIndex);
					currentServers[poppedServer]['server_'+(poppedServer+1)].splice(poppedAppPosition,1);
					currentServers[poppedServer]['timestamps'].splice(poppedAppPosition,1);
				}
				return {servers:currentServers,apps:apps};
        })()
    };
}