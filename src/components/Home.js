import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setSelectedMenu } from "../actions"

const Home = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setSelectedMenu(""))
	}, [])

	return <div> Home</div>
}

export default Home
