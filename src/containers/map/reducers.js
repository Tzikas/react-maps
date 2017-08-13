import canUseDOM from "can-use-dom";
import {
	withGoogleMap,
		GoogleMap,
		Marker,
} from "react-google-maps";

import thunk from 'redux-thunk'
import store from '../../store'

export const LOCATION = 'adfdsf/LOCATasdION/usethisforoutsidedispatchcalls' 


const initialState = {
	theLocation: false, 
	maps: [],
	position:{ coords:{ latitude:60, longitude:105} },
	center: { lat:0, lng:0 },
	randomCities: []



}

export default (state = initialState, action) => {

	switch (action.type) {
		case 'SETCENTER':
			return{
				...state,
				center: action.payload
			}
		case 'SET_RANDOM_CITIES':
			return{
				...state,
				randomCities: [action.payload],
				winner: action.winner

			}

		
		default:
			return state
	}
}


export const setLocation = (yo) => {
	return dispatch => {
		dispatch({
			type: LOCATION,
			payload:yo
		})
	}
}



export const setCenter = (position) => {
	let center = {};
	center['lat'] = position.coords.latitude;
	center['lng'] = position.coords.longitude;

	return{
		type:'SETCENTER',
		payload:center	
	}
}



const geolocation = (
		canUseDOM && navigator.geolocation ?
		navigator.geolocation : 
		({
			getCurrentPosition(success, failure) {
				failure("Your browser doesn't support geolocation.");
			},
		})
	);



const calculateWinner = (cities, position) =>{
	//let yourLat = position.coords.latitude;	
	//let yourLng = position.coords.longitude;

	let yourLat = store.getState().yourMap.center.lat;   //probably a better way 
	let yourLng = store.getState().yourMap.center.lng;
	
	let distance = 99999999; 
	let winner = ''; 
	
	cities.forEach( (c) => {
		////console.log(c.city)
		////console.log(getDistanceFromLatLonInKm(yourLat, yourLng, c.lat, c.lon))
		let d = getDistanceFromLatLonInKm(yourLat, yourLng, c.lat, c.lon); 
		c['distance'] = d; 
		if(d < distance){
			distance = d;
		        winner = c.city	
		}
		
	})
	
	//console.log(`winner is ${winner}`)


	return { 
		type: 'SET_RANDOM_CITIES',
		payload: cities,
		winner: winner
	}


}
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}


export const fetchRandomCities = (position) => {
	//console.log(position);
	return dispatch => {
	let cities = [];
		const fetchA = fetch( 'https://pure-river-42551.herokuapp.com/api/randomcity' )	
			.then((response) => {
				//////console.log(response) 
				return response.json()
			})
			.then((city) => {
				////console.log(city)
				cities.push(city)
			});	  

		const fetchB = fetch( 'https://pure-river-42551.herokuapp.com/api/randomcity' )	
			.then((response) => {
				//////console.log(response) 
				return response.json()
			})
			.then((city) => {
				////console.log(city)
				cities.push(city)

			});	
		const fetchC = fetch( 'https://pure-river-42551.herokuapp.com/api/randomcity' )	
			.then((response) => {
				//////console.log(response) 
				return response.json()
			})
			.then((city) => {
				////console.log(city)
				cities.push(city)

			});
		const fetchD = fetch( 'https://pure-river-42551.herokuapp.com/api/randomcity' )	
			.then((response) => {
				//////console.log(response) 
				return response.json()
			})
			.then((city) => {
				////console.log(city)
				cities.push(city)

			});				
		return Promise.all([ fetchA, fetchB, fetchC, fetchD ])
			.then( values => {
				dispatch(calculateWinner(cities, position)) 
				
		})
	}
	//return { type: '', action: ''}
	
}


export const getFirstMap = () => {
	return dispatch => {


		const gMap = geolocation.getCurrentPosition((position) => {
			if (this.isUnmounted) {
				return;
			}
			////console.log(position)
			dispatch(setCenter(position))
			//return cities.push(position)
			dispatch(fetchRandomCities(position))

		})
	
		//.catch( err => throw err );
	}

}

