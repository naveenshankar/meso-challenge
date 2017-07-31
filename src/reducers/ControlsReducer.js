const serverReducer = (state = {
    apps: [
            {name:'Hadoop', color:'E506BF',serversDeployed:[],abbr:'Hd'},
            {name:'Rails', color:'3C2DEE',serversDeployed:[],abbr:'Ra'},
            {name:'Chronos', color:'01AAFD',serversDeployed:[],abbr:'Ch'},
            {name:'Storm', color:'2CE19C',serversDeployed:[],abbr:'St'},
            {name:'Spark', color:'69FA1A',serversDeployed:[],abbr:'Sp'}
        ],
    servers:[{'server_1':[],timestamps:[]},
            {'server_2':[],timestamps:[]},
            {'server_3':[],timestamps:[]},
            {'server_4':[],timestamps:[]}
            ],
    deleteCache:false,
    newCallStatus: 'INIT'
}, action) => {
    switch (action.type) {
        case 'ADD_SERVER_FULFILLED':
            state = {
                ...state, // SPREAD operator from stage-2-preset
                servers: action.payload.servers
            };
            break;
        case 'DESTROY_SERVER_FULFILLED':
            state = {
                ...state, // SPREAD operator from stage-2-preset
                servers: action.payload.servers,
                apps: action.payload.apps
            };
            break;
        case 'ADD_APP_FULFILLED':
            state = {
                ...state, // SPREAD operator from stage-2-preset
                servers: action.payload.servers,
                apps: action.payload.apps
            };
            break;
        case 'KILL_APP_FULFILLED':
            state = {
                ...state, // SPREAD operator from stage-2-preset
                servers: action.payload.servers,
                apps: action.payload.apps
            };
            break;
    }
    return state;
};

export default serverReducer;