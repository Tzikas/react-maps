/* global google */
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  setLocation,
  addMap
} from './reducers'

import RandomCityMap from '../random-cities'
import canUseDOM from "can-use-dom";

import raf from "raf";

import {
	default as React,
	Component,
} from "react";

import {
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";

const geolocation = (
	canUseDOM && navigator.geolocation ?
	navigator.geolocation : 
	({
		getCurrentPosition(success, failure) {
			failure(`Your browser doesn't support geolocation.`);
		},
	})
);

const GeolocationExampleGoogleMap = withGoogleMap(props => (
	<GoogleMap
		defaultZoom={12}
		center={props.center}
	>

		<Marker
			position={props.center}
			title='You are (near) here.'
		/>



	</GoogleMap>
));

/*
 * https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
class YourMap extends Component {
	state = {
		center: null,
	};

	isUnmounted = false;

	componentDidMount() {

		geolocation.getCurrentPosition((position) => {
			if (this.isUnmounted) {
				return;
			}
			this.setState({
				center: {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				}
			});
			console.log(this)
			let winner = Math.floor(Math.random()*4)
			this.setState({winner:winner})
			console.log(this)


		}, (reason) => {
			if (this.isUnmounted) {
				return;
			}
			this.setState({
				center: {
					lat: 60,
					lng: 105,
				}
			});
		});

		
	}

	componentWillUnmount() {
		this.isUnmounted = true;
	}

	render() {
		var rands = [];
		for (var i=0; i < 4; i++) {
			if(this.state.winner === i){
				var winner = true;
			}else{
				var winner = false; 
			}
    			rands.push(<RandomCityMap key={i} winner={winner}/>);
		}
		return (

			<div>
			<button onClick={this.props.addMap}>Push</button>
			<GeolocationExampleGoogleMap
				containerElement={
					<div style={{ height: `200px` }} />
				}
				mapElement={
					<div style={{ height: `200px` }} />
				}
				center={this.state.center}
			/>
			{rands}		
				
			</div>
		);
	}
}

const mapStateToProps = state => ({
  count: state.counter.count,
  randomLocations:state.randomMap.randomLocations
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setLocation,
  addMap,
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YourMap)
