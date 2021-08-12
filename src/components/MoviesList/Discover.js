import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import styled from "styled-components"
import queryString from "query-string"

import { setSelectedMenu, getMoviesDiscover, setHeader } from "../../actions"
import NotFound from "../NotFound"
import Pagination from "../Pagination"

const MovieWrapper = styled.div`
	padding: 2rem;
`

const MovieImg = styled.img`
	width: 200px;
	height: auto;
`

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
