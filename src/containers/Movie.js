import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import { getMovie, setHeader } from "../actions"

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

		async function fetchData() {
			const movie = await dispatch(getMovie(match.params.id))
			dispatch(setHeader(movie.original_title))
		}
  		fetchData();
		return () => {
			dispatch(setHeader(""))
		}
	}, [match.params.id])
	if (Object.entries(movie).length === 0) {
		return <div> Loading...</div>
	}
	return (
		<div>
			<MovieWrapper>
				<h1>{movie.original_title}</h1>
				<MovieImg src={`${base_url}w780${movie.poster_path}`} />
				<p>{movie.overview}</p>
			</MovieWrapper>
		</div>
	)
}



export default Movie
