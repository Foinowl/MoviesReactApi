import React, { useEffect, useState } from "react"
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
import ShowError from "./ShowError"
import MenuMobile from "./MenuMobile"


import NotFound from "../components/NotFound"
import Header from "../components/Header"
import Loader from "../components/Loader"
import SearchBar from "../components/SearchBar"

import { device } from "../utils/_devices"

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
  flex-direction: ${props => (props.isMobile ? 'column' : 'row')};
  position: relative;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  user-select: none;
`;

const ContentWrapper = styled.div`
	width: 100%;
	height: 100%;
	min-height: 100vh;
	display: flex;
	fex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 6rem 4rem;

	@media only screen and ${device.large} {
		padding: 4rem 2rem;
	}
	@media only screen and ${device.large3} {
		padding: 6rem 2rem;
	}
`

const SearhBarWrapper = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	padding: 2rem;
`


const App = () => {
	const dispatch = useDispatch()
	const isLoading = useSelector((store) => store.geral.loading)

	useEffect(() => {
		dispatch(init())
	}, [])

	  const [isMobile, setisMobile] = useState(null)

	// Set amount of items to show on slider based on the width of the element
	const changeMobile = () => {
		window.matchMedia("(max-width: 80em)").matches
			? setisMobile(true)
			: setisMobile(false)
	}

	useEffect(() => {
		changeMobile()
		window.addEventListener("resize", changeMobile)
		return () => window.removeEventListener("resize", changeMobile)
	}, [])

	return isLoading ? (
		<ContentWrapper>
			<Loader />
		</ContentWrapper>
	) : (
		<Router history={history}>
			<React.Fragment>
				<MainWrapper isMobile={isMobile}>
					{isMobile ? (
						<MenuMobile />
					) : (
						<>
							<Sidebar />
							<SearhBarWrapper>
								<SearchBar />
							</SearhBarWrapper>
						</>
					)}
					<ContentWrapper>
						<Header />
						<Switch>
							<Route
								path="/"
								exact
								render={() => (
									<Redirect
										from={process.env.PUBLIC_URL + "/"}
										to={process.env.PUBLIC_URL + "/discover/Popular"}
									/>
								)}
							/>
							<Route
								path={process.env.PUBLIC_URL + "/genres/:name"}
								exact
								component={Genre}
							/>
							<Route
								path={process.env.PUBLIC_URL + "/discover/:name"}
								exact
								component={Discover}
							/>
							<Route
								path={process.env.PUBLIC_URL + "/search/:query"}
								exact
								component={Search}
							/>
							<Route
								path={process.env.PUBLIC_URL + "/movie/:id"}
								exact
								component={Movie}
							/>
							<Route
								path={process.env.PUBLIC_URL + "/person/:id"}
								exact
								component={Person}
							/>
							<Route
								path="/404"
								component={() => (
									<NotFound title="Upps!" subtitle={`This doesn't exist...`} />
								)}
							/>
							<Route
								path={process.env.PUBLIC_URL + "/error"}
								component={ShowError}
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
