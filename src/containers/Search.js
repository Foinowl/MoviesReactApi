import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import queryString from "query-string"

import { setHeader, getMoviesSearch } from "../actions"
import MoviesList from "../components/MoviesList"

const Search = ({ match, location}) => {
	const dispatch = useDispatch()
	const { query } = match.params
	const params = queryString.parse(location.search)
	const base = useSelector((store) => store.geral.base)

	const movies = useSelector((store) => store.movies)

	useEffect(() => {
		const title = `Search results for: ${query}`
		dispatch(setHeader(title))
		return () => {
			dispatch(setHeader())
		}
	}, [query])
	useFetchMoviesSearch(query, getMoviesSearch, params)

	if (Object.entries(movies).length === 0) {
		return <div>Loading</div>
	} else if (movies.total_results === 0) {
		return <div>No results</div>
	}   else {
    return (
      <div>
        <MoviesList />
      </div>
    );
  }
}

function useFetchMoviesSearch(query, cb, params) {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(cb(query, params.page))
	}, [query, params.page])
}


export default Search