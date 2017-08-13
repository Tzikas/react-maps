/* global google */

//import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  checkWinner,
} from './randomMap'

import { increment } from '../../modules/counter'
import { fetchRandomCities } from '../map/reducers'

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
	////console.log(props) 
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
	/*state = {
		center: null,
		name: null
	};*/


	isUnmounted = false;

	componentDidMount() {

		/*	//fetch('/api/randomcity')
		fetch('https://pure-river-42551.herokuapp.com/api/randomcity',{
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		})
		.then((response) => {
			////console.log(response) 
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
			////console.log(err);
		});*/

	}

	componentWillUnmount() {
		this.isUnmounted = true;
	}

	render() {
		return (

				<div>

					<h5 style={{margin:`10px 0 0 0`}} onClick={this.props.increment} > 

						{this.props.count} {this.props.name} {String(this.props.winner)}
					</h5>
					<button onClick={() => { this.props.checkWinner(this.props.winner); this.props.fetchRandomCities(); this.props.increment(); }}>{this.props.name} is the closest?</button>
					
					<RandomCity
						containerElement={
							<div style={containerStyle} />
						}
						mapElement={
							<div style={{ height: `250px`, width: `250px` }} />
						}
						center={this.props.center}
						name={this.props.name}
						onClick={this.props.increment}
						
					/>



				</div>

		       );
	}
}

const mapStateToProps = state => {

	 return({
		  count: state.counter.count,
	   	  theLocation: state.randomMap.theLocation,
		  checkWinner: state.randomMap.winner,
	 	  
	})
}
const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
  checkWinner,
  fetchRandomCities,      
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RandomCityMap)


