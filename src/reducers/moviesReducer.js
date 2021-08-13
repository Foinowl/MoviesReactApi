import * as TYPES from "../actions/types"

export default (state = {}, action) => {
	switch (action.type) {
		case TYPES.FETCH_MOVIES_GENRE:
		case TYPES.FETCH_MOVIES_DISCOVER:
		case TYPES.FETCH_MOVIES_SEARCH:
			return action.payload
		case TYPES.FETCH_CAST:
			return { ...state, cast: action.payload }
		case TYPES.CLEAR_PREVIOUS_MOVIE:
			return {}
		default:
			return state
	}
}
