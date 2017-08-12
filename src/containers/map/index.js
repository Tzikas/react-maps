/* global google */
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	setLocation,
	addMap,
	getFirstMap
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
			<GoogleMap defaultZoom={12} center={props.center} >
				<Marker position={props.center} title='You are (near) here.' />
			</GoogleMap>
			));


const RandomCity = withGoogleMap(props => {
	//console.log(props) 
	return (
	<div>
		<i>{props.name}</i>		
		
		<GoogleMap defaultZoom={12} center={props.center}>
			<Marker position={props.center} title={props.name} />
		</GoogleMap>
	</div>
	)
});




/*
 * https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */


class YourMap extends Component {
	constructor(props){
		super(props);
		let state = {
			center: null,
		};
		this.state = state;
	}

	isUnmounted = false;
	componentWillReceiveProps(){
	}
	componentDidMount() {

		this.props.getFirstMap();
		let winner = Math.floor(Math.random()*4)

	}

	componentWillUnmount() {
		this.isUnmounted = true;
	}
	componentDidUpdate(){

	}

	render() {
		var rands = [];
		for (var i=0; i < 4; i++) {
			if(this.state.winner === i){
				var winner = true;
			}else{
				var winner = false; 
			}
			//rands.push(<RandomCityMap key={i} winner={winner} inside={this.inside}/>);
		}
		return (

				<div>
				<button onClick={this.props.addMap}>Push</button>
				<GeolocationExampleGoogleMap
					key={'frenchtoast'}
					containerElement={
						<div style={{ height: `200px` }} />
					}
					mapElement={
						<div style={{ height: `200px` }} />
					}
					center={this.props.center}
				/>


				{rands}		

				</div>
		       );
	}
}

const mapStateToProps = state => ({
	count: state.counter.count,
      	//randomLocations:state.randomMap.randomLocations,
	randomCities: state.yourMap.randomCities,
      	position: state.yourMap.position,
        center: state.yourMap.center
})

const mapDispatchToProps = dispatch => bindActionCreators({
	setLocation,
      	addMap, 
      	getFirstMap,
      	changePage: () => push('/about-us')
}, dispatch)

export default connect(
			mapStateToProps,
			mapDispatchToProps
		)(YourMap)
