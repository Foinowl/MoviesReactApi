import React from "react"
import styled from "styled-components"

import Sidebar from "../components/sidebar/Sidebar"
import Header from "../components/header/Header"


const MainWrapper = styled.div`
	display: flex;
`

const ContentWrapper = styled.div`
	width: 100%;
`

const App = () => {
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
