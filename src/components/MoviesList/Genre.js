import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import queryString from "query-string"
import styled from "styled-components"
import { setSelectedMenu, getMoviesGenre } from "../../actions"
import NotFound from "../NotFound"
import Pagination from "../Pagination"
import SortBy from "../SortBy"

const MovieWrapper = styled.div`
	padding: 2rem;
`

const MovieImg = styled.img`
	width: 200px;
	height: auto;
`

const Genre = ({ match, location }) => {
	const genres = useSelector((state) => state.geral.genres)
	const base = useSelector((state) => state.geral.base)
	const selected = useSelector((state) => state.geral.selected)
	const movies = useSelector((state) => state.movies)

	const params = queryString.parse(location.search)

	const [sort, setsort] = useState("popularity.desc")

	useSetSelected(match.params.name, setSelectedMenu, genres)
	useFetchMoviesGenre(match.params.name, getMoviesGenre, params, sort)

	if (!selected) {
		return <NotFound />
	}

	if (!movies.results) {
		return <div>Loading</div>
	}
	const baseUrl = base.images.base_url
	return (
		<div>
			<SortBy changeSort={setsort} />
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

function useFetchMoviesGenre(name, cb, params, sort) {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(cb(name, params.page, sort))
	}, [name, params.page, sort])
}

function useSetSelected(name, cb, genres) {
	const dispatch = useDispatch()
	useEffect(() => {
		if (genres.find((el) => el.name === name)) {
			dispatch(cb(name))
		}
	}, [name])
}

export default Genre
