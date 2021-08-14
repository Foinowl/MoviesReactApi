import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import queryString from "query-string"
import { setSelectedMenu, getMoviesGenre, clearMovies } from "../actions"
import SortBy from "../components/SortBy"
import MoviesList from "../components/MoviesList"
import Loader from "../components/Loader"
import Header from "../components/Header"
import styled from "styled-components"


const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Genre = ({ match, location }) => {
	const dispatch = useDispatch()

	const geral = useSelector((state) => state.geral)
	const movies = useSelector((state) => state.movies)
	const { base_url } = geral.base.images

	const params = queryString.parse(location.search)

	  const [option, setOption] = useState({
			value: "popularity.desc",
			label: "Popularity",
		})

	useEffect(() => {
		dispatch(setSelectedMenu(match.params.name))
		return () => dispatch(setSelectedMenu())
	}, [match.params.name])
	  useFetchMoviesGenre(
			match.params.name,
			getMoviesGenre,
			params,
			option,
			clearMovies
		)


	if (movies.loading) {
		return <Loader />
	}
  return (
		<Wrapper>
			<Header title={geral.selected} subtitle="movies" />
			<SortBy option={option} setOption={setOption} />
			<MoviesList movies={movies} baseUrl={base_url} />
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
	useEffect(() => {
		dispatch(getMoviesGenre(genre, params.page, option.value))
		window.scrollTo({
			top: (0, 0),
			behavior: "smooth",
		})
		return () => dispatch(clearMovies())
	}, [genre, params.page, option])
}


export default Genre
