import React, { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import { Router, Switch, Route, Redirect } from "react-router-dom"
import history from "../history"
import styled from "styled-components"

import { getConfig, getGenres } from "../actions"

import Sidebar from "./Sidebar"
import Discover from "./Discover"
import Genre from "./Genre"
import Search from "./Search"
import Movie from "./Movie"
import Cast from "./Cast"

import NotFound from "../components/NotFound"
import Home from "../components/Home"
import Header from "../components/Header"

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
								<Route
									path="/"
									exact
									render={() => <Redirect from="/" to="/discover/Popular" />}
								/>
								<Route path="/" exact component={Home} />
								<Route path="/genres/:name" exact component={Genre} />
								<Route path="/discover/:name" exact component={Discover} />
								<Route path="/search/:query" exact component={Search} />
								<Route path="/movie/:id" exact component={Movie} />
								<Route path="/cast/:id" exact component={Cast} />
								<Route path="/404" component={NotFound} />
								<Route component={NotFound} />
							</Switch>
						</ContentWrapper>
					</MainWrapper>
				</React.Fragment>
			</Router>
		) : (
			<div>Loding</div>
		)
}

export default App
