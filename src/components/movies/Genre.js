import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import queryString from "query-string"
import { setSelectedMenu, getMoviesGenre, setHeader } from "../../actions"
import NotFound from "../NotFound"
import SortBy from "../SortBy"
import MoviesList from "./MoviesList"


const Genre = ({ match, location }) => {
	const genres = useSelector((state) => state.geral.genres)
	const base = useSelector((state) => state.geral.base)
	const selected = useSelector((state) => state.geral.selected)
	const movies = useSelector((state) => state.movies)

	const params = queryString.parse(location.search)

	const [sort, setsort] = useState("popularity.desc")

	useSetSelected(match.params.name, setSelectedMenu, genres, setHeader)
	useFetchMoviesGenre(match.params.name, getMoviesGenre, params, sort)

	if (!selected) {
		return <NotFound />
	}

	if (!movies.results) {
		return <div>Loading</div>
	}
	return (
		<div>
			<SortBy changeSort={setsort} />
			<MoviesList base={base} movies={movies}/>
		</div>
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
	}, [name])
}

export default Genre
