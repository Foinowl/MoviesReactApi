import React, {useEffect} from "react"
import styled from "styled-components"

import Logo from "./Logo"
import Genres from "./Genres"
import MenuItem from "./MenuItem"
import { setSelectedMenu } from "../../actions"
import { useDispatch } from 'react-redux'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	min-height: 100vh;
	width: 28rem;
	color: var(--color-primary-dark);
	margin: 2rem 0;
`

const Heading = styled.h2`
	font-weight: 700;
	font-size: 1.1rem;
	text-transform: uppercase;
	letter-spacing: -0.5px;
	margin: 0 0 1rem 1rem;
	&:not(:first-child) {
		margin-top: 4rem;
	}
`

const MenuWrapper = styled.div`
	width: 100%;
	padding: 2rem 3rem;
	position: relative;
	border-right: 1px solid var(--border-color);
`

const Sidebar = ({ location}) => {
	useSetSelected(location, setSelectedMenu)
	return (
		<Wrapper>
			<Logo />
			<MenuWrapper>
				<Heading>Discover</Heading>
				<MenuItem title={"Popular"} />
				<MenuItem title={"Top Rated"} />
				<MenuItem title={"Upcoming"} />
				<Heading>Genres</Heading>
				<Genres />
			</MenuWrapper>
		</Wrapper>
	)
}

function useSetSelected(location, cb) {
	const dispatch = useDispatch()

	useEffect(() => {
		const trimmedPath = location.pathname.replace(/\//g, "")
		dispatch(cb(trimmedPath))
	}, [location.pathname])
}

export default Sidebar
