import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useDispatch, useSelector } from "react-redux"
import queryString from "query-string"
import Header from "../components/Header"
import styled from "styled-components"
import { animateScroll as scroll } from "react-scroll"

import { setSelectedMenu, getMoviesGenre, clearMovies } from "../actions"
import MoviesList from "../components/MoviesList"
import SortBy from "../components/ShortBy"
import Loader from "../components/Loader"

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
`

const Genre = ({ match, location }) => {
	const dispatch = useDispatch()

	const geral = useSelector((state) => state.geral)
	const movies = useSelector((state) => state.movies)
	const [option, setOption] = useState({
		value: "popularity.desc",
		label: "Popularity",
	})
	const params = queryString.parse(location.search)
	const { secure_base_url } = geral.base.images

	// Send url to setSelected Action Creator, it will check if is valid, and set the header accordingly
	useEffect(() => {
		dispatch(setSelectedMenu(match.params.name))
		// Clean up to remove selected menu from state
		return () => dispatch(setSelectedMenu())
	}, [match.params.name])

	// Call hook to fetch movies of the genre
	useFetchMoviesGenre(
		match.params.name,
		getMoviesGenre,
		params,
		option,
		clearMovies
	)

	// If loading
	if (movies.loading) {
		return <Loader />
	}

	return (
		<Wrapper>
			<Helmet>
				<title>{`${geral.selected} Movies`}</title>
			</Helmet>
			<Header title={geral.selected} subtitle="movies" />
			<SortBy option={option} setOption={setOption} />
			<MoviesList movies={movies} baseUrl={secure_base_url} />
		</Wrapper>
	)
}

function useFetchMoviesGenre(
	genre,
	getMoviesGenre,
	params,
	option,
	clearMovies
) {
	const dispatch = useDispatch()
	// When mounts go up
	useEffect(() => {
		scroll.scrollToTop({
			smooth: true,
		})
		dispatch(getMoviesGenre(genre, params.page, option.value))
		return () => dispatch(clearMovies())
	}, [genre, params.page, option])
}

export default Genre
