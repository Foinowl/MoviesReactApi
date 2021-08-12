import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
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
		<Link to={`/movie/${movie.id}`} key={movie.id}>
			<MovieWrapper>
				{movie.original_title}
				<MovieImg src={`${baseUrl}w780${movie.poster_path}`} />
			</MovieWrapper>
		</Link>
	))
}


export default MoviesList
