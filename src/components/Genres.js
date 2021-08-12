import React, { useEffect } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getGenres } from "../actions"

import MenuItem from "./MenuItem"

const LinkWrap = styled(Link)`
	text-decoration: none;
`

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
		<LinkWrap to={`/genres/${genre.name}`} key={genre.id}>
			<MenuItem title={genre.name} genres />
		</LinkWrap>
	))
}

export default Genres
