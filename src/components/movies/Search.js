import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import queryString from "query-string"

import { setHeader, setSelectedMenu, getMoviesSearch } from "../../actions"

import MoviesList from "./MoviesList"


const Search = ({
	match,
	location,
}) => {
	const { query } = match.params
	const params = queryString.parse(location.search)
	const base = useSelector(store => store.geral.base)

	const movies = useSelector(store => store.movies)

	useRemoveSelected(setSelectedMenu)
	useSetHeader(query, setHeader)
	useFetchMoviesSearch(query, getMoviesSearch, params)

	if (!movies.results) {
		return <div>Loading</div>
	}

	return (
		<div>
			<MoviesList base={base} movies={movies} />
		</div>
	)
}


function useSetHeader(query, cb) {
	const dispatch = useDispatch()
	useEffect(() => {
		const title = `Search results for: ${query}`
		dispatch(cb(title))
	}, [query])
}

function useFetchMoviesSearch(query, cb, params) {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(cb(query, params.page))
	}, [query, params.page])
}

function useRemoveSelected(cb) {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(cb())
	}, [])
}


export default Search