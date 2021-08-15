import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import StickyBox from "react-sticky-box"
import { slide as Menu } from "react-burger-menu"
import { device } from "../utils/_devices"

import Logo from "../components/Logo"
import MenuItem from "../components/MenuItem"

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 25rem;
	padding: 2rem;
	margin-top: 4rem;
	color: var(--color-primary-dark);
	border-right: 1px solid var(--border-color);
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

const LinkWrap = styled(Link)`
	text-decoration: none;
	display: block;
	outline: none;
	margin-bottom: 0.5rem;
`


var styles = {
	bmBurgerButton: {
		position: "absolute",
		width: "30px",
		height: "25px",
		left: "20px",
		top: "20px",
	},
	bmBurgerBars: {
		background: "#263238",
	},
	bmCrossButton: {
		height: "24px",
		width: "24px",
	},
	bmCross: {
		background: "#fafafa",
	},
	bmMenuWrap: {
		position: "fixed",
		height: "100%",
	},
	bmMenu: {
		background: "#161706",
		padding: "2.5em 1.5em",
	},
	bmItemList: {
		color: "#fafafa",
		padding: "0.8rem",
	},
	bmItem: {
		outline: "none",
	},
	bmOverlay: {
		background: "rgba(0, 0, 0, 0.3)",
	},
}
const Sidebar = () => {
	const genres = useSelector((state) => state.geral.genres)
	const staticCategories = useSelector((state) => state.geral.staticCategories)
	const selected = useSelector((state) => state.geral.selected)

	return  (
		<StickyBox>
			<Wrapper>
				<Logo />
				<Heading>Discover</Heading>
				{renderStatic(staticCategories, selected)}
				<Heading>Genres</Heading>
				{renderGenres(genres, selected)}
			</Wrapper>
		</StickyBox>
	)
}


function renderStatic(categories, selected, setisOpened) {
	return categories.map((category, i) => (
		<LinkWrap
			to={`${process.env.PUBLIC_URL}/discover/${category}`}
			key={i}
			onClick={setisOpened ? () => setisOpened(false) : null}
		>
			<MenuItem
				mobile={setisOpened ? 1 : 0}
				title={category}
				selected={category === selected ? true : false}
			/>
		</LinkWrap>
	))
}


function renderGenres(genres, selected, setisOpened) {
	return genres.map((genre) => (
		<LinkWrap
			to={`${process.env.PUBLIC_URL}/genres/${genre.name}`}
			key={genre.id}
			onClick={setisOpened ? () => setisOpened(false) : null}
		>
			<MenuItem
				mobile={setisOpened ? 1 : 0}
				title={genre.name}
				selected={genre.name === selected ? true : false}
			/>
		</LinkWrap>
	))
}

export default Sidebar
