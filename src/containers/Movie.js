import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import { getMovie} from "../actions"

import history from "../history"

import Credits from "../components/Credits"
import Loader from "../components/Loader"

const MovieWrapper = styled.div`
	padding: 2rem;
`

const MovieImg = styled.img`
	width: 200px;
	height: auto;
`

const Movie = ({ match }) => {
	const dispatch = useDispatch()
	const geral = useSelector(store => store.geral)
	const movie = useSelector((store) => store.movie)
	const { base_url } = geral.base.images
	useEffect(() => {

		dispatch(getMovie(match.params.id))
	}, [match.params.id])

	if (movie.loading) {
		return <Loader />
	}

	function renderBack() {
		if (history.action === "PUSH") {
			return <button onClick={history.goBack}>Back</button>
		}
	}

	return (
		<div>
			<MovieWrapper>
				<h1>{movie.original_title}</h1>
				<MovieImg src={`${base_url}w780${movie.poster_path}`} />
				<p>{movie.overview}</p>
				<Credits cast={movie.cast} baseUrl={base_url} />
				{renderBack()}
			</MovieWrapper>
		</div>
	)
}



export default Movie
