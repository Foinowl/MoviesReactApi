import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setSelectedMenu, setHeader } from "../actions"

const Home = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setSelectedMenu(""))
		setHeader("")
	}, [])

	return <div> Home</div>
}

export default Home
