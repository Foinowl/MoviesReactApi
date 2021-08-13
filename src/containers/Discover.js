import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import queryString from "query-string"

import { setSelectedMenu, getMoviesDiscover } from "../actions"
import MoviesList from "../components/MoviesList"
import Loader from "../components/Loader"

const Discover = ({ match, location }) => {
	const dispatch = useDispatch()
	
	const geral = useSelector((store) => store.geral)
	const movies = useSelector((store) => store.movies)

	const params = queryString.parse(location.search)
	const { base_url } = geral.base.images


	useEffect(() => {
		dispatch(setSelectedMenu(match.params.name))
		return () => {
			dispatch(setSelectedMenu())
				}
	}, [match.params.name])

	useFetchMoviesDiscover(match.params.name, getMoviesDiscover, params)


	if (movies.loading) {
		return <Loader />
	}

	return <MoviesList movies={movies} baseUrl={base_url} />
}


function useFetchMoviesDiscover(name, getMoviesDiscover, params) {
	const dispatch = useDispatch()
	const query = name.replace(/\s+/g, "_").toLowerCase()
	useEffect(() => {
		dispatch(getMoviesDiscover(query, params.page))
	}, [query, params.page])
}


export default Discover


