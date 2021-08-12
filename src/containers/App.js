import React, { useEffect } from "react"
import { useDispatch} from "react-redux"
import styled from "styled-components"

import { getConf } from "../actions"

import Sidebar from "../components/sidebar/Sidebar"
import Header from "../components/header/Header"


const MainWrapper = styled.div`
	display: flex;
`

const ContentWrapper = styled.div`
	width: 100%;
`

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getConf())
	}, [])
	return (
		<React.Fragment>
			<MainWrapper>
				<Sidebar />
				<ContentWrapper>
					<Header />
				</ContentWrapper>
			</MainWrapper>
		</React.Fragment>
	)
}

export default App
