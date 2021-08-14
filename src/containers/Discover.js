import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import queryString from "query-string"
import Header from "../components/Header"

import { setSelectedMenu, getMoviesDiscover, clearMovies } from "../actions"
import MoviesList from "../components/MoviesList"
import Loader from "../components/Loader"

import styled from "styled-components"

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
`

const Discover = ({ match, location }) => {
	const dispatch = useDispatch()

	const geral = useSelector((store) => store.geral)
	const movies = useSelector((store) => store.movies)

	const params = queryString.parse(location.search)
	const { base_url } = geral.base.images

	// When mounts go up
	useEffect(() => {
		window.scrollTo({
			top: (0, 0),
			behavior: "smooth",
		})
	}, [])

	useEffect(() => {
		window.scrollTo({
			top: (0, 0),
			behavior: "smooth",
		})
		dispatch(setSelectedMenu(match.params.name))
		return () => {
			dispatch(setSelectedMenu())
		}
	}, [match.params.name])

	useFetchMoviesDiscover(
		match.params.name,
		getMoviesDiscover,
		params,
		clearMovies
	)

	if (movies.loading) {
		return <Loader />
	}

	return (
		<Wrapper>
			<Header title={geral.selected} subtitle="movies" />
			<MoviesList movies={movies} baseUrl={base_url} />
		</Wrapper>
	)
}

function useFetchMoviesDiscover(name, getMoviesDiscover, params, clearMovies) {
	const dispatch = useDispatch()
	const query = name.replace(/\s+/g, "_").toLowerCase()
	useEffect(() => {
		window.scrollTo({
			top: (0, 0),
			behavior: "smooth",
		})
		dispatch(getMoviesDiscover(query, params.page))
		return () => dispatch(clearMovies())
	}, [query, params.page])
}

export default Discover
