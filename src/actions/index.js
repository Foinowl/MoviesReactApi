import * as TYPES from "./types"
import tmdbAPI from "../api/tmdb"


// get the config object from the API
export const getConfig = () => async (dispatch) => {
	const res = await tmdbAPI.get("/configuration")
	console.log(res)
	dispatch({
		type: TYPES.GET_CONFIG,
		payload: res.data,
	})
}


// Get genres from API
export const getGenres = () => async dispatch => {
  const res = await tmdbAPI.get('/genre/movie/list');
  dispatch({
    type: TYPES.GET_GENRES,
    payload: res.data,
  });
};

export const setSelectedMenu = (name) => {
	return {
		type: TYPES.SELECTED_MENU,
		payload: name,
	}
}

export const getMoviesGenre = (name) => async (dispatch, getState) => {
	const genres = getState().geral.genres
	if (!genres) {
		return
	}
	const genreId = genres
		.filter((el) => el.name === name)
		.map((el) => el.id)
		.join("")
	const res = await tmdbAPI.get("/discover/movie", {
		params: {
			with_genres: genreId,
		},
	})
	dispatch({
		type: TYPES.FETCH_MOVIES_GENRE,
		payload: res.data,
	})
}