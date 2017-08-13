
const initialState = {
	count: 0,
	randomLocations: [],
	winner: false,
	score: 0 
}

export default (state = initialState, action) => {
	switch (action.type) {

		case 'SCORE':
			return {
				...state,
 	  		 	score: state.score + action.payload,					
			}

		default:
			return state
	}
}


export const checkWinner = (winner) => {
	let s; 
	winner ? s=100 : s=-25;	
	return dispatch => {
		dispatch({
			type: 'SCORE',
			payload:s
		})
	}
}


