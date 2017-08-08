export const LOCATION = 'adfdsf/LOCATasdION/usethisforoutsidedispatchcalls' 
export const ADDMAP = ''; 


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



