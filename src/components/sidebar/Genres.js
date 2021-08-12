import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGenres } from "../../actions"

const Genres = () => {
	const dispath = useDispatch()
	const genres = useSelector((store) => store.geral.genres)

	useEffect(() => {
		dispath(getGenres())
	}, [])
	

	if (!genres) {
		return "Loading"
	}

	return <div>{renderList(genres)}</div>
}

function renderList(genres) {
	return genres.map((genre) => <li key={genre.id}>{genre.name}</li>)
}


export default Genres