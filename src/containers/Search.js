import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import queryString from "query-string"
import Header from "../components/Header"
import NotFound from "../components/NotFound"

import { getMoviesSearch, clearMovies } from "../actions"
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
	}, [query])
	useFetchMoviesSearch(query, getMoviesSearch, params, clearMovies)

	if (movies.loading) {
		return <Loader />
	} else if (movies.total_results === 0) {
		return (
				<NotFound
					title="Sorry!"
					subtitle={`There were no results for ${query}...`}
				/>
			)
	} else {
		return (
				<React.Fragment>
					<Header title={query} subtitle="search results" />
					<MoviesList movies={movies} baseUrl={base_url} />;
				</React.Fragment>
			)
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