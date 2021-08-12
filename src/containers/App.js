import React, { useEffect } from "react"
import { useDispatch} from "react-redux"
import { BrowserRouter } from "react-router-dom"

import styled from "styled-components"

import { getConfig } from "../actions"

import Sidebar from "../components/sidebar/Sidebar"
import Header from "../components/header/Header"


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
					</ContentWrapper>
				</MainWrapper>
			</React.Fragment>
		</BrowserRouter>
	)
}

export default App
