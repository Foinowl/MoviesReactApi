import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Pagination = ({ movies }) => {
	const { page, total_pages } = movies

	console.log("page", page)
	// On first page, render page 2 button
	if (page < total_pages && page === 1) {
		return (
			<div>
				<Link to={`?page=${page + 1}`}>Page {page + 1}</Link>
			</div>
		)
	}

	// There is a next and a previous page, render accordingly
	else if (page < total_pages) {
		return (
			<div>
				<Link to={`?page=${page - 1}`}>Page {page - 1}</Link>
				<Link to={`?page=${page + 1}`}>Page {page + 1}</Link>
			</div>
		)
	}

	// Otherwise on last page of results
	else {
		return (
			<div>
				<Link to={`?page=${page - 1}`}>Page {page - 1}</Link>
			</div>
		)
	}
}


export default Pagination