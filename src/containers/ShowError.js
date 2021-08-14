import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { Link } from "react-router-dom"
import history from "../history"

import { clearError } from "../actions"
import ErrorSvg from "../svg/error.svg"
import Button from "../components/Button"

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
`

const TitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 6rem;
`

const Title = styled.h1`
	color: var(--color-primary);
	font-weight: 300;
	font-size: 3.5rem;
`

const SubTitle = styled.h2`
	color: var(--color-primary);
	font-weight: 700;
	font-size: 1.8rem;
`

const LinkWrapper = styled(Link)`
	text-decoration: none;
`

const Svg = styled.img`
	max-width: 100%;
	height: 35vh;
	margin-bottom: 6rem;
`

const ShowError = () => {
	const dispatch = useDispatch()
	const errors = useSelector(state => state.errors)
	useEffect(() => {
		return () => dispatch(clearError())
	}, [])

	if (errors.length === 0) {
		history.push("/")
		return null
	}
	return (
		<Wrapper>
			<TitleWrapper>
				<Title>Something went wrong!</Title>
				<SubTitle>{errors.data.status_message}</SubTitle>
			</TitleWrapper>
			<Svg src={`${ErrorSvg}`} alt="Not found" />
			<LinkWrapper to="/">
				<Button title="Home" solid icon="home" left />
			</LinkWrapper>
		</Wrapper>
	)
}

export default ShowError
