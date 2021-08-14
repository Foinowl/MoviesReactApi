import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import queryString from "query-string"
import Header from "../components/Header"
import NotFound from "../components/NotFound"

import { getMoviesSearch, clearMovies } from "../actions"
import MoviesList from "../components/MoviesList"
import Loader from "../components/Loader"

import styled from "styled-components"


const Wrapper = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
`


const Search = ({ match, location}) => {
	const dispatch = useDispatch()
	const { query } = match.params
	const params = queryString.parse(location.search)
	const geral = useSelector((store) => store.geral)
	const { base_url } = geral.base.images

	const movies = useSelector((store) => store.movies)

	useFetchMoviesSearch(query, getMoviesSearch, params, clearMovies)

	useEffect(() => {
		window.scrollTo({
			top: (0, 0),
			behavior: "smooth",
		})
	}, [])

	if (movies.loading) {
		return <Loader />
	} else if (movies.total_results === 0) {
		return (
				<NotFound
					title="Sorry!"
					subtitle={`There were no results for ${query}...`}
				/>
			)
	} else {
		return (
				<Wrapper>
					<Header title={query} subtitle="search results" />
					<MoviesList movies={movies} baseUrl={base_url} />;
				</Wrapper>
			)
	}
}

function useFetchMoviesSearch(query, getMoviesSearch, params, clearMovies) {
	const dispatch = useDispatch()
	useEffect(() => {
		window.scrollTo({
			top: (0, 0),
			behavior: "smooth",
		})
		dispatch(getMoviesSearch(query, params.page))
		return () => dispatch(clearMovies())
	}, [query, params.page])
}


export default Search