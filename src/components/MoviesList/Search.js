import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import queryString from "query-string"
import styled from "styled-components"

import { setHeader, setSelectedMenu, getMoviesSearch } from "../../actions"
import NotFound from "../NotFound"
import Pagination from "../Pagination"

const MovieWrapper = styled.div`
	padding: 2rem;
`

const MovieImg = styled.img`
	width: 200px;
	height: auto;
`

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

	const baseUrl = base.images.base_url
	return (
		<div>
			{renderMovies(movies.results, baseUrl)}
			<Pagination />
		</div>
	)
}

function renderMovies(movies, baseUrl) {
	return movies.map((movie) => (
		<MovieWrapper key={movie.id}>
			{movie.original_title}
			<MovieImg src={`${baseUrl}w780${movie.poster_path}`} />
		</MovieWrapper>
	))
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