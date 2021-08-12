import React, { useEffect } from "react"
import { useDispatch} from "react-redux"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import styled from "styled-components"

import { getConfig } from "../actions"

import Sidebar from "../components/sidebar/Sidebar"
import Header from "../components/header/Header"
import MoviesList from "../components/MoviesList/MoviesList"

const MainWrapper = styled.div`
	display: flex;
`

const ContentWrapper = styled.div`
	width: 100%;
	padding: 2rem 4rem;
`

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getConfig())
	}, [])
	return (
		<BrowserRouter>
			<React.Fragment>
				<MainWrapper>
					<Route path="/" component={Sidebar} />
					<ContentWrapper>
						<Route path="/" component={Header} />
						<Switch>
							<Route path="/" exact component={MoviesList} />
							<Route path="/:category" exact component={MoviesList} />
						</Switch>
					</ContentWrapper>
				</MainWrapper>
			</React.Fragment>
		</BrowserRouter>
	)
}

export default App
