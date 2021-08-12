import React from "react"
import styled from "styled-components"

import Pagination from "../Pagination"

const MovieWrapper = styled.div`
	padding: 2rem;
`

const MovieImg = styled.img`
	width: 200px;
	height: auto;
`

const MoviesList = ({movies, base}) => {
	const baseUrl = base.images.base_url
	return (
		<div>
			{renderMovies(movies.results, baseUrl)}
			<Pagination />
		</div>
	)
}

function renderMovies(movies, baseUrl) {
	console.log(movies);
	return movies.map((movie) => (
		<MovieWrapper key={movie.id}>
			{movie.original_title}
			<MovieImg src={`${baseUrl}w780${movie.poster_path}`} />
		</MovieWrapper>
	))
}


export default MoviesList
