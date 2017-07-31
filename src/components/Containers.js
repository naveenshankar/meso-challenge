import React from 'react';
import {connect} from 'react-redux';

export class Containers extends React.Component {
	renderContainers(containerProperty,containerIndex) {
		return <div key={'server_'+containerIndex} className="server_row">
					{containerProperty['server_'+(containerIndex+1)].map(
						function(property,index,array) {
							let btclass = 'app_col col-xs-'+Math.ceil(12 / array.length)+' col-lg-'+Math.ceil(12 / array.length);
							let timeElapsed = Math.ceil((new Date().getTime() - containerProperty.timestamps[index])/1000)+ ' secs ago';

							return <div style={{backgroundColor:'#'+this.props.controls.apps[property].color}} className={btclass} key={'app_'+index} >
										<h3>{this.props.controls.apps[property].abbr}</h3>
										{this.props.controls.apps[property].name}
										<div>{timeElapsed}</div>
									</div>;
						},this
					)}
				</div>
	};

	render() {
				return (
				<div className="servers col-lg-9">
					<h3 className="server_heading">Server Canvas</h3>
					<div className="servers_container col-lg-12">
						{this.props.controls.servers.map(this.renderContainers,this)}
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

    };
};

Containers.propTypes = {
	controls: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Containers);