/* global google */

//import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  setLocation
} from './randomMap'


/***/
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

import 'whatwg-fetch';

const containerStyle = {
	display: 'block', 
	height: '250px',
	width: '250px',
	padding: '10px 0'
}

const geolocation = (
		canUseDOM && navigator.geolocation ?
		navigator.geolocation : 
		({
			getCurrentPosition(success, failure) {
				failure(`Your browser doesn't support geolocation.`);
			},
		})
		);

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





class RandomCityMap extends Component {
	state = {
		center: null,
		name: null
	};


	isUnmounted = false;

	componentDidMount() {

			//fetch('/api/randomcity')
		fetch('https://pure-river-42551.herokuapp.com/api/randomcity',{
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		})
		.then((response) => {
			//console.log(response) 
			return response.json()
		})
		.then((city) => {

			var c = {
					center: {
						lat: city.lat,
						lng: city.lon,
					},
					name: city.city,
				}
			this.setState(c)
			this.props.setLocation(c)
		})
		.catch((err) => {
			//console.log(err);
		});

	}

	componentWillUnmount() {
		this.isUnmounted = true;
	}

	render() {
		return (

				<div>

					<h5 style={{margin:`10px 0 0 0`}} onClick={this.props.increment} > 

						{this.props.count} {this.state.name}
					</h5>
					<button>{this.state.name} is the closest</button>
					
					<RandomCity
						containerElement={
							<div style={containerStyle} />
						}
						mapElement={
							<div style={{ height: `250px`, width: `250px` }} />
						}
						center={this.state.center}
						name={this.state.name}
						onClick={this.props.increment}
						
					/>



				</div>

		       );
	}
}

const mapStateToProps = state => {

	 return({
		  count: state.counter.count,
		  isIncrementing: state.counter.isIncrementing,
		  isDecrementing: state.counter.isDecrementing,
	   	  theLocation: state.randomMap.theLocation	 
	})
}
const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  setLocation,      
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RandomCityMap)


