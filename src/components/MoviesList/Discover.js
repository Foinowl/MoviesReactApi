import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedMenu, getMoviesDiscover } from "../../actions"
import NotFound from "../NotFound"
import styled from "styled-components"

const MovieWrapper = styled.div`
	padding: 2rem;
`

const MovieImg = styled.img`
	width: 200px;
	height: auto;
`

const Discover = ({
	match
}) => {
	const selected = useSelector(store => store.geral.selected)
	const base = useSelector((store) => store.geral.base)
	const staticCategories = useSelector((store) => store.geral.staticCategories)

	const movies = useSelector((store) => store.movies)
	useSetSelected(match.params.name, setSelectedMenu, staticCategories)

	useFetchMoviesDiscover(match.params.name, getMoviesDiscover)

	if (!selected) {
		return <NotFound />
	}

	if (!movies.results) {
		return <div>Loading</div>
	}

	const baseUrl = base.images.base_url

	return <div>{renderMovies(movies.results, baseUrl)}</div>
}

function renderMovies(movies, baseUrl) {
	return movies.map((movie) => (
		<MovieWrapper key={movie.id}>
			{movie.original_title}
			<MovieImg src={`${baseUrl}w780${movie.poster_path}`} />
		</MovieWrapper>
	))
}

function useSetSelected(name, cb, staticCategories) {
	const dispatch = useDispatch()

	useEffect(() => {
		if (staticCategories.find((el) => el === name)) {
			dispatch(cb(name))
		}
	}, [name])
}

function useFetchMoviesDiscover(name, cb) {
	const dispatch = useDispatch()
	const query = name.replace(/\s+/g, "_").toLowerCase()
	useEffect(() => {
		dispatch(cb(query))
	}, [query])
}


export default Discover