/* global google */
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	setLocation,
	getFirstMap,
	fetchRandomCities
} from './reducers'

import RandomCityMap from '../random'
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
		//let winner = Math.floor(Math.random()*4)

	}

	componentWillUnmount() {
		this.isUnmounted = true;
	}
	componentDidUpdate(){

	}

	render() {
		var rands = [];
		var cities = this.props.randomCities[0];
		
		if(cities){ //There's def a better way.  
			let winner = null; 
			cities.forEach((c, i) => { 
				c.city == this.props.winner ? winner = true : winner = false;  
				let center = {'lat':c.lat, 'lng':c.lon} 
				rands.push(<RandomCityMap  key={i} winner={winner} inside={this.inside} center={center} name={c.city} winner={winner}/>);			
			})
		}
		return (

				<div>

				<h2>{this.props.score}</h2>
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
	winner: state.yourMap.winner,

      	position: state.yourMap.position,
        center: state.yourMap.center,
	score: state.randomMap.score

})

const mapDispatchToProps = dispatch => bindActionCreators({
	setLocation,
      	getFirstMap,
        fetchRandomCities,
      	changePage: () => push('/about-us')
}, dispatch)

export default connect(
			mapStateToProps,
			mapDispatchToProps
		)(YourMap)
