import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import queryString from "query-string"

import { setSelectedMenu, getMoviesDiscover } from "../actions"
import MoviesList from "../components/MoviesList"


const Discover = ({ match, location }) => {
	const dispatch = useDispatch()

	const params = queryString.parse(location.search)

	const base = useSelector((store) => store.geral.base)
	const movies = useSelector((store) => store.movies)

	useEffect(() => {
		dispatch(setSelectedMenu(match.params.name))
		return () => {
			dispatch(setSelectedMenu())
				}
	}, [match.params.name])

	useFetchMoviesDiscover(match.params.name, getMoviesDiscover, params)


	if (Object.entries(movies).length === 0) {
		return <div>Loading</div>
	}


	return (
		<div>
			<MoviesList base={base} movies={movies} />
		</div>
	)
}


function useFetchMoviesDiscover(name, cb, params) {
	const dispatch = useDispatch()
	const query = name.replace(/\s+/g, "_").toLowerCase()
	useEffect(() => {		
		dispatch(cb(query, params.page))
	}, [query, params.page])
}

export default Discover


