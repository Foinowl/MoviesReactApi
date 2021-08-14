import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Router, Switch, Route, Redirect } from "react-router-dom"
import { init } from "../actions"

import history from "../history"
import styled from "styled-components"

import Sidebar from "./Sidebar"
import Discover from "./Discover"
import Genre from "./Genre"
import Search from "./Search"
import Movie from "./Movie"
import Person from "./Person"

import NotFound from "../components/NotFound"
import Home from "../components/Home"
import Header from "../components/Header"
import Loader from "../components/Loader"
import SearchBar from "../components/SearchBar"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import {
	faArrowLeft,
	faArrowRight,
	faHome,
	faCalendar,
	faPoll,
	faHeart,
	faDotCircle,
	faStar as fasFaStar,
	faSearch,
	faChevronRight,
	faChevronLeft,
	faLink,
	faPlay,
} from "@fortawesome/free-solid-svg-icons"
import { faStar as farFaStar } from "@fortawesome/free-regular-svg-icons"

library.add(
	fab,
	faArrowLeft,
	faArrowRight,
	faHome,
	faCalendar,
	faPoll,
	faHeart,
	faDotCircle,
	faDotCircle,
	fasFaStar,
	farFaStar,
	faSearch,
	faSearch,
	faChevronRight,
	faChevronLeft,
	faLink,
	faPlay
)

const MainWrapper = styled.div`
	display: flex;
	user-select: none;
`

const ContentWrapper = styled.div`
	width: 100%;
	min-height: 100vh;
	padding: 2rem 4rem;
	margin-top: 2rem;
	position: relative;
`

const App = () => {
	const dispatch = useDispatch()
	const base = useSelector((store) => store.geral.base)
	const genres = useSelector((store) => store.geral.genres)
	const isLoading = useSelector((store) => store.geral.loading)

	useEffect(() => {
		dispatch(init())
	}, [])

	return isLoading ? (
		<ContentWrapper>
			<Loader />
		</ContentWrapper>
	) : (
		<Router history={history}>
			<React.Fragment>
				<MainWrapper>
					<Sidebar />
					<ContentWrapper>
						<SearchBar />
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
							<Route path="/person/:id" exact component={Person} />
							<Route
								path="/404"
								component={() => (
									<NotFound title="Upps!" subtitle={`This doesn't exist...`} />
								)}
							/>
							<Route
								component={() => (
									<NotFound title="Upps!" subtitle={`This doesn't exist...`} />
								)}
							/>
						</Switch>
					</ContentWrapper>
				</MainWrapper>
			</React.Fragment>
		</Router>
	) 
}

export default App
