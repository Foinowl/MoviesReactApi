import React, { useEffect } from "react"
import { useDispatch} from "react-redux"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import styled from "styled-components"

import { getConfig } from "../actions"

import Sidebar from "../components/sidebar/Sidebar"
import Header from "../components/header/Header"
// import MoviesList from "../components/MoviesList/MoviesList"
import Home from "../components/Home"
import Genre from "../components/MoviesList/Genre"
import NotFound from "../components/NotFound"


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
					<Sidebar />
					<ContentWrapper>
						<Header />
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/genres/:name" exact component={Genre} />
							<Route component={NotFound} />
						</Switch>
					</ContentWrapper>
				</MainWrapper>
			</React.Fragment>
		</BrowserRouter>
	)
}

export default App
