import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import queryString from "query-string"

import { setHeader, getMoviesSearch, clearMovies } from "../actions"
import MoviesList from "../components/MoviesList"
import Loader from "../components/Loader"

const Search = ({ match, location}) => {
	const dispatch = useDispatch()
	const { query } = match.params
	const params = queryString.parse(location.search)
	const geral = useSelector((store) => store.geral)
	const { base_url } = geral.base.images

	const movies = useSelector((store) => store.movies)

	useEffect(() => {
		const title = `Search results for: ${query}`
		dispatch(setHeader(title))
		return () => {
			dispatch(setHeader())
		}
	}, [query])
	useFetchMoviesSearch(query, getMoviesSearch, params, clearMovies)

	if (movies.loading) {
		return <Loader />
	} else if (movies.total_results === 0) {
		return <div>No results</div>
	} else {
		return <MoviesList movies={movies} baseUrl={base_url} />
	}
}

function useFetchMoviesSearch(query, getMoviesSearch, params, clearMovies) {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getMoviesSearch(query, params.page))
		return () => dispatch(clearMovies())
	}, [query, params.page])
}


export default Search