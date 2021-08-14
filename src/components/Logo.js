import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import LogoSvg from "../svg/logo.svg"

const LogoWrapper = styled.img`
	max-width: 100%;
`

const LinkWrapper = styled(Link)`
	width: 100%;
	height: 18rem;
	display: flex;
	text-decoration: none;
	margin-bottom: 2rem;
	padding: 2rem 3rem;
`
const Logo = () => {
	return (
		<LinkWrapper to="/">
			<LogoWrapper src={LogoSvg} />
		</LinkWrapper>
	)
}

export default Logo
