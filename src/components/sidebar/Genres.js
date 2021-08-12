import React, { useEffect } from "react"
import styled from "styled-components"

import { useDispatch, useSelector } from "react-redux"
import { getGenres } from "../../actions"

import MenuItem from "./MenuItem"


const Genres = () => {
	const genres = useSelector((store) => store.geral.genres)

	useFetchGenres(getGenres)

	if (!genres) {
		return "Loading"
	}

	return <>{renderList(genres)}</>
}

// Custom Hook to Fecth Genres
function useFetchGenres(cb) {
	const dispath = useDispatch()

	useEffect(() => {
		dispath(cb())
	}, [])
}

function renderList(genres) {
	return genres.map((genre) => (
		<MenuItem key={genre.id} title={genre.name} genres />
	))
}

export default Genres
