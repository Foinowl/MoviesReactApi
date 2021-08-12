import React, { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import styled from "styled-components"

import { getConfig, getGenres } from "../actions"

import Sidebar from "../components/sidebar/Sidebar"
import Header from "../components/header/Header"
import Discover from "../components/MoviesList/Discover"
import Genre from "../components/MoviesList/Genre"
import Home from "../components/Home"
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
	const base = useSelector((store) => store.geral.base)
	const genres = useSelector((store) => store.geral.genres)

	useEffect(() => {
		dispatch(getConfig())
		dispatch(getGenres())
	}, [])


	  return base && genres ? (
			<BrowserRouter>
				<React.Fragment>
					<MainWrapper>
						<Sidebar />
						<ContentWrapper>
							<Header />
							<Switch>
								<Route path="/" exact component={Home} />
								<Route path="/genres/:name" exact component={Genre} />
								<Route path="/discover/:name" exact component={Discover} />
								<Route component={NotFound} />
							</Switch>
						</ContentWrapper>
					</MainWrapper>
				</React.Fragment>
			</BrowserRouter>
		) : (
			<div>Laoding</div>
		)
}

export default App
