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


function useFetchMoviesGenre(name, cb, params, sort) {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(cb(name, params.page, sort))
	}, [name, params.page, sort])
}

function useSetSelected(name, cb, genres, setHeader) {
	const dispatch = useDispatch()
	useEffect(() => {
		if (genres.find((el) => el.name === name)) {
			dispatch(cb(name))
			dispatch(setHeader(name))
		}
		return () => {
			dispatch(cb(""))
			dispatch(setHeader(""))
		}
	}, [name])
}

export default Genre
