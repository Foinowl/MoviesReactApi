import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedMenu, getMoviesGenre } from "../../actions"
import NotFound from "../NotFound"
import styled from "styled-components"

const MovieWrapper = styled.div`
	padding: 2rem;
`

const MovieImg = styled.img`
	width: 200px;
	height: auto;
`

const Genre = ({ match }) => {
	const genres = useSelector((state) => state.geral.genres)
	const base = useSelector((state) => state.geral.base)
	const selected = useSelector((state) => state.geral.selected)
	const movies = useSelector((state) => state.movies)

	const pa = useSelector((state) => state)
	console.log("pa", pa);

	if (!genres) {
		return <div>Loading Initial info</div>
	}

	
	useSetSelected(match.params.name, setSelectedMenu, genres)
	useFetchMoviesGenre(match.params.name, getMoviesGenre, genres)


  	if (!selected) {
		return <NotFound />
	}

	if (!movies.results) {
		return <div>Loading</div>
	}
	  const baseUrl = base.images.base_url
		return (
			<div>
				Genres Container
				{renderMovies(movies.results, baseUrl)}
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

function useFetchMoviesGenre(name, cb, genres) {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(cb(name))
	}, [genres, name])
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
