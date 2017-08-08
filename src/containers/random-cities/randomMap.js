export const INCREMENT_REQUESTED = 'counter/INCREMENT_REQUESTED'
export const INCREMENT = 'counter/INCREMENT'

export const LOCATION = 'counter/LOCATION' 
export const CHECKWINNER = 'counter/CHECKWINNER' 

const initialState = {
  count: 0,
  isIncrementing: false,
  randomLocations: [],
  winner: false 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      }

    case LOCATION: 
      return {
      	...state,
	randomLocations: [...state.randomLocations, action.payload]

      }

    case CHECKWINNER:
	console.log(state,action)
      return {
      	...state
      }

    default:
      return state
  }
}

export const increment = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    dispatch({
      type: INCREMENT
    })
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

export const checkWinner = (yo) => {
  return dispatch => {
    dispatch({
      type: CHECKWINNER,
      payload:yo
    })
  }
}


