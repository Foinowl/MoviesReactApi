import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import {
	getMovie,
	getRecommendations,
	clearRecommendations,
	clearMovie,
} from "../actions"

import history from "../history"
import queryString from "query-string"

import Credits from "../components/Credits"
import Loader from "../components/Loader"
import MoviesList from "../components/MoviesList"

const MovieWrapper = styled.div`
	padding: 2rem;
`

const MovieImg = styled.img`
	width: 200px;
	height: auto;
`

const Movie = ({ match, location }) => {
	const dispatch = useDispatch()
	const geral = useSelector((store) => store.geral)
	const movie = useSelector((store) => store.movie)
	const recommended = useSelector((store) => store.recommended)
	const { base_url } = geral.base.images
	const params = queryString.parse(location.search)
	useEffect(() => {
		dispatch(getMovie(match.params.id))
		return () => dispatch(clearMovie())
	}, [match.params.id])

	// Fetch recommended movies everytime recommendations page change
	useEffect(() => {
		dispatch(getRecommendations(match.params.id, params.page))
		return () => dispatch(clearRecommendations())
	}, [params.page])

	if (movie.loading) {
		return <Loader />
	}

	function renderBack() {
		if (history.action === "PUSH") {
			return <button onClick={history.goBack}>Back</button>
		}
	}

	return (
		<MovieWrapper>
			<h1>{movie.original_title}</h1>
			<MovieImg src={`${base_url}w780${movie.poster_path}`} />
			<p>{movie.overview}</p>
			<Credits cast={movie.cast} baseUrl={base_url} />
			{renderBack()}
			<h1> Recommended movies based on this:</h1>
			{recommended.loading ? (
				<Loader />
			) : (
				<MoviesList movies={recommended} baseUrl={base_url} />
			)}
		</MovieWrapper>
	)
}

export default Movie
