import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import queryString from "query-string"
import { setSelectedMenu, getMoviesGenre, clearMovies } from "../actions"
import SortBy from "../components/SortBy"
import MoviesList from "../components/MoviesList"
import Loader from "../components/Loader"
import Header from "../components/Header"

const Genre = ({ match, location }) => {
	const dispatch = useDispatch()

	const geral = useSelector((state) => state.geral)
	const movies = useSelector((state) => state.movies)
	const { base_url } = geral.base.images

	const params = queryString.parse(location.search)

	const [sort, setsort] = useState("popularity.desc")

	useEffect(() => {
		dispatch(setSelectedMenu(match.params.name))
		return () => dispatch(setSelectedMenu())
	}, [match.params.name])
	  useFetchMoviesGenre(
			match.params.name,
			getMoviesGenre,
			params,
			sort,
			clearMovies
		)



	if (movies.loading) {
		return <Loader />
	}
  return (
		<React.Fragment>
			<Header title={geral.selected} subtitle="movies" />
			<SortBy changeSort={setsort} />
			<MoviesList movies={movies} baseUrl={base_url} />
		</React.Fragment>
	)
}


function useFetchMoviesGenre(name, getMoviesGenre, params, sort, clearMovies) {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getMoviesGenre(name, params.page, sort))
		window.scrollTo({
				top: (0, 0),
				behavior: "smooth",
			})
		return () => dispatch(clearMovies())
	}, [name, params.page, sort])
}


export default Genre
