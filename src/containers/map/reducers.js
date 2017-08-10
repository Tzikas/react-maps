import canUseDOM from "can-use-dom";
import {
	withGoogleMap,
		GoogleMap,
		Marker,
} from "react-google-maps";



export const LOCATION = 'adfdsf/LOCATasdION/usethisforoutsidedispatchcalls' 
export const ADDMAP = ''; 
export const SETFIRSTMAP = ''; 


const initialState = {
	theLocation: false, 
	maps: [] 	
}

export default (state = initialState, action) => {
	switch (action.type) {
		case LOCATION: 
			state.theLocation = action.payload
			return {
				...state,
				theLocation: state.theLocation

			}
		case ADDMAP: 
			return {
				...state,
				maps: [...state.maps, action.payload]
			}
		case SETFIRSTMAP:
			let r = Math.random(); 
			console.log(action)
			return {
				...state,
				r: r				
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


export const addMap = (yo) => {
	return dispatch => {
		dispatch({
			type: ADDMAP,
		payload:yo
		})
	}
}


export const setFirstMap = (position) => {
	console.log(position)
		return{
			type:"SETFIRSTMAP",
			payload:position	
		}
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

export const getFirstMap = () => {
	console.log('wtf')
		return dispatch =>{


			geolocation.getCurrentPosition((position) => {
				if (this.isUnmounted) {
					return;
				}
				console.log(position)
				/*	this.setState({
					center: {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
					}
					});*/

				//
				dispatch(setFirstMap(position))

				//CALL ANOTHER AJAX FETCH HERE
				//DISPATCH THAT RETURNING DATA INTO CONST SETSECOND MAP





				//console.log(this)
				//let winner = Math.floor(Math.random()*4)
				//this.setState({winner:winner})



				//Calculate teh distance here... 
				//
				//

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
}	



