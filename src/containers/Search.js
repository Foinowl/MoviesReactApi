import React, { useEffect } from "react"
import { Helmet } from "react-helmet"
import { useDispatch, useSelector } from "react-redux"
import queryString from "query-string"
import Header from "../components/Header"
import NotFound from "../components/NotFound"
import styled from "styled-components"
import { animateScroll as scroll } from "react-scroll"

import { getMoviesSearch, clearMovies } from "../actions"
import MoviesList from "../components/MoviesList"
import Loader from "../components/Loader"

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
`

const Search = ({ match, location }) => {
	const geral = useSelector((store) => store.geral)
	const movies = useSelector((store) => store.movies)
	const { query } = match.params
	const params = queryString.parse(location.search)
	const { secure_base_url } = geral.base.images

	// Fetch movies hook
	useFetchMoviesSearch(query, getMoviesSearch, params, clearMovies)

	// If loading
	if (movies.loading) {
		return <Loader />
	}

	//If there are no results
	else if (movies.total_results === 0) {
		return (
			<NotFound
				title="Sorry!"
				subtitle={`There were no results for ${query}...`}
			/>
		)
	}

	// Else show the results
	else {
		return (
			<Wrapper>
				<Helmet>
					<title>{`${query} - search results`}</title>
				</Helmet>
				<Header title={query} subtitle="search results" />
				<MoviesList movies={movies} baseUrl={secure_base_url} />;
			</Wrapper>
		)
	}
}

function useFetchMoviesSearch(query, getMoviesSearch, params, clearMovies) {
	const dispatch = useDispatch()
	useEffect(() => {
    	scroll.scrollToTop({
			smooth: true,
		})
		dispatch(getMoviesSearch(query, params.page))
		return () => dispatch(clearMovies())
	}, [query, params.page])
}

export default Search
