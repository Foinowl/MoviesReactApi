import React, { useEffect } from "react"
import { Helmet } from "react-helmet"
import { useDispatch, useSelector } from "react-redux"
import queryString from "query-string"
import Header from "../components/Header"
import styled from "styled-components"
import { animateScroll as scroll } from "react-scroll"

import { setSelectedMenu, getMoviesDiscover, clearMovies } from "../actions"
import MoviesList from "../components/MoviesList"
import Loader from "../components/Loader"

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
	const { secure_base_url } = geral.base.images

	// Send url to setSelected Action Creator, it will check if is valid
	useEffect(() => {
		dispatch(setSelectedMenu(match.params.name))
		// Clean up to remove selected menu from state
		return () => dispatch(setSelectedMenu())
	}, [match.params.name])

	// Call hook to fetch movies discover, pass in the url query
	useFetchMoviesDiscover(
		match.params.name,
		getMoviesDiscover,
		params,
		clearMovies
	)

	// If loading
	if (movies.loading) {
		return <Loader />
	}

	// Else return movies list
	return (
		<Wrapper>
			<Helmet>
				<meta charSet="utf-8" />
				<title>{`${geral.selected} Movies`}</title>
			</Helmet>
			<Header title={geral.selected} subtitle="movies" />
			<MoviesList movies={movies} baseUrl={secure_base_url} />
		</Wrapper>
	)
}

function useFetchMoviesDiscover(name, getMoviesDiscover, params, clearMovies) {
	const dispatch = useDispatch()
	const query = name.replace(/\s+/g, "_").toLowerCase()
	useEffect(() => {
    	scroll.scrollToTop({
			smooth: true,
		})
		dispatch(getMoviesDiscover(query, params.page))
		return () => dispatch(clearMovies())
	}, [query, params.page])
}

export default Discover
