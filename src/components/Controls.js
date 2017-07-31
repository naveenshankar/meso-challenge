import React from 'react';
import {connect} from 'react-redux';
import {addServer,destroyServer,addApp,killApp} from '../actions/ControlsActions';

export class Controls extends React.Component {
	renderApps(property,index) {
		return <div key={'app_'+index} className="app_row">
					<div style={{backgroundColor :'#'+property.color}} className="app_color">
					</div>
					<div className="app_text">
						{property.name}
					</div>
					<div className="app_operation">
						<div onClick={() => this.props.killApp(index)} className="app_operation_minus col-xs-6">
							<div className="glyphicon glyphicon-minus-sign" aria-hidden="true"></div>
						</div>
						<div onClick={() => this.props.addApp(index)} className="app_operation_plus col-xs-6">
							<div style={{color :'#'+property.color}} className="glyphicon glyphicon-plus-sign" aria-hidden="true"></div>
						</div>
					</div>
				</div>;
	};

	render() {
		return (
			<div className="controls col-lg-3">
				<div className="server_controls col-lg-12">
						<div onClick={() => this.props.addServer()} className="add_server">
							<div className="glyphicon glyphicon-plus-sign" aria-hidden="true"></div>
							<div >Add Server</div>
						</div>
						<div onClick={() => this.props.destroyServer()} className="destroy_server">
							<div className="glyphicon glyphicon-minus-sign" aria-hidden="true"></div>
							<div >Destroy Server</div>
						</div>
				</div>
				<div className="app_controls">
					<div className="app_heading">Available Apps</div>
					{this.props.controls.apps.map(this.renderApps,this)}
				</div>
			</div>
		);
	}
};

//Factory Functions
const mapStateToProps = (state) => {
    return {
        controls: state.controls
    };
};

//Factory Functions
const mapDispatchToProps = (dispatch) => {
    return {
        addServer: () => {
            dispatch(addServer());
        },
        destroyServer: () => {
            dispatch(destroyServer());
        },
        addApp: (index) => {
            dispatch(addApp(index));
        },
        killApp: (index) => {
            dispatch(killApp(index));
        }
    };
};

Controls.propTypes = {
	controls: React.PropTypes.object.isRequired,
	addServer: React.PropTypes.func.isRequired,
	destroyServer: React.PropTypes.func.isRequired,
	addApp: React.PropTypes.func.isRequired,
	killApp: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);

