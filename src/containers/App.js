import React, { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import { Router, Switch, Route } from "react-router-dom"
import history from "../history"
import styled from "styled-components"

import { getConfig, getGenres } from "../actions"

import Sidebar from "../components/sidebar/Sidebar"
import Header from "../components/header/Header"
import Discover from "../components/movies/Discover"
import Search from "../components/movies/Search"
import Genre from "../components/movies/Genre"
import Movie from "../components/singleMovie/Movie"
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
			<Router history={history}>
				<React.Fragment>
					<MainWrapper>
						<Sidebar />
						<ContentWrapper>
							<Header />
							<Switch>
								<Route path="/" exact component={Home} />
								<Route path="/genres/:name" exact component={Genre} />
								<Route path="/discover/:name" exact component={Discover} />
								<Route path="/search/:query" exact component={Search} />
								<Route path="/movie/:id" exact component={Movie} />
								<Route component={NotFound} />
							</Switch>
						</ContentWrapper>
					</MainWrapper>
				</React.Fragment>
			</Router>
		) : (
			<div>Laoding</div>
		)
}

export default App
