import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import history from "../history"

import { getPerson } from "../actions"

const ImgWrapper = styled.img`
	width: 200px;
	height: auto;
`

const Cast = ({ match }) => {
	const geral = useSelector(state => state.geral)
	const person = useSelector((state) => state.person)
	const dispatch = useDispatch()
	const { base_url } = geral.base.images

	useEffect(() => {
		dispatch(getPerson(match.params.id))
	}, [match.params.id])

	if (Object.entries(person).length === 0) {
		return <div> Loading...</div>
	}

	function renderBack() {
		if (history.action === "PUSH") {
			return <button onClick={history.goBack}>Back</button>
		}
	}

	return (
		<div>
			<h3>{person.name}</h3>
			<p>Biography: {person.biography}</p>
			<ImgWrapper src={`${base_url}/w780/${person.profile_path}`} />
			{renderBack()}
		</div>
	)
}


export default Cast
