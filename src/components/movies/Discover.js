import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import queryString from "query-string"

import { setSelectedMenu, getMoviesDiscover, setHeader } from "../../actions"
import NotFound from "../NotFound"
import MoviesList from "./MoviesList"


const Discover = ({ match, location }) => {
	const params = queryString.parse(location.search)

	const selected = useSelector((store) => store.geral.selected)
	const base = useSelector((store) => store.geral.base)
	const staticCategories = useSelector((store) => store.geral.staticCategories)

	const movies = useSelector((store) => store.movies)
	useSetSelected(
		match.params.name,
		setSelectedMenu,
		staticCategories,
		setHeader
	)

	useFetchMoviesDiscover(match.params.name, getMoviesDiscover, params)

	if (!selected) {
		return <NotFound />
	}

	if (!movies.results) {
		return <div>Loading</div>
	}


	return (
		<div>
			<MoviesList base={base} movies={movies} />
		</div>
	)
}

function useSetSelected(name, cb, staticCategories, setHeader) {
	const dispatch = useDispatch()

	useEffect(() => {
		if (staticCategories.find((el) => el === name)) {
			dispatch(cb(name))
			dispatch(setHeader(name))
		}
	}, [name])
}


function useFetchMoviesDiscover(name, cb, params) {
	const dispatch = useDispatch()
	const query = name.replace(/\s+/g, "_").toLowerCase()
	useEffect(() => {		
		dispatch(cb(query, params.page))
	}, [query, params.page])
}

export default Discover
