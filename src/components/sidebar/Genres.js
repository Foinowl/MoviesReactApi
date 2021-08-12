import React, { useEffect } from "react"
import styled from "styled-components"

import { useDispatch, useSelector } from "react-redux"
import { getGenres } from "../../actions"

import MenuItem from "./MenuItem"

const Heading = styled.h2`
	font-weight: 700;
	font-size: 1.1rem;
	text-transform: uppercase;
	letter-spacing: -0.5px;
	margin-bottom: 1rem;
	&:not(:first-child) {
		margin-top: 4rem;
	}
`

const Genres = () => {
	const genres = useSelector((store) => store.geral.genres)

	useFetchGenres(getGenres)

	if (!genres) {
		return "Loading"
	}

	return (
		<>
			<Heading>Genres</Heading>
			{renderList(genres)}
		</>
	)
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
