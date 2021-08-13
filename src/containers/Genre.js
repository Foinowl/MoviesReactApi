import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import queryString from "query-string"
import { setSelectedMenu, getMoviesGenre, setHeader } from "../actions"
import SortBy from "../components/SortBy"
import MoviesList from "../components/MoviesList"
import Loader from "../components/Loader"

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
	useFetchMoviesGenre(match.params.name, getMoviesGenre, params, sort)



	if (Object.entries(movies).length === 0) {
		return <Loader />
	}
  return (
		<React.Fragment>
			<SortBy changeSort={setsort} />
			<MoviesList movies={movies} baseUrl={base_url} />
		</React.Fragment>
	)
}


function useFetchMoviesGenre(name, getMoviesGenre, params, sort) {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getMoviesGenre(name, params.page, sort))
	}, [name, params.page, sort])
}


export default Genre
