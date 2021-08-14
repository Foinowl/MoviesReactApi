import React from "react"
import styled from "styled-components"
import Button from "./Button"
import { Link } from "react-router-dom"

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	text-decoration: none;
	justify-content: ${(props) => {
		if (props.type === "one") {
			return "flex-start"
		} else if (props.type === "both") {
			return "space-between"
		} else {
			return "flex-end"
		}
	}};
	margin-bottom: 2rem;
`

const WrapperLink = styled(Link)`
	text-decoration: none;
	margin-bottom: 2rem;
`

const Pagination = ({ movies, scrollToMyRef }) => {
	const { page, total_pages } = movies

	if (total_pages === 1) {
		return null
	}

	// On first page, render page 2 button
	if (page < total_pages && page === 1) {
		return (
			<Wrapper>
				<WrapperLink to={`?page=${page + 1}`} onClick={() => scrollToMyRef()}>
					<Button solid title={`Page ${page + 1}`} icon="arrow-right" />
				</WrapperLink>
			</Wrapper>
		)
	}

	// There is a next and a previous page, render accordingly
	else if (page < total_pages) {
		return (
			<Wrapper type="both">
				<WrapperLink to={`?page=${page - 1}`} onClick={() => scrollToMyRef()}>
					<Button solid left title={`Page ${page - 1}`} icon="arrow-left" />
				</WrapperLink>
				<WrapperLink to={`?page=${page + 1}`} onClick={() => scrollToMyRef()}>
					<Button solid title={`Page ${page + 1}`} icon="arrow-right" />
				</WrapperLink>
			</Wrapper>
		)
	}

	// Otherwise on last page of results
	else {
		return (
			<Wrapper type="one">
				<WrapperLink to={`?page=${page - 1}`} onClick={() => scrollToMyRef()}>
					<Button solid left title={`Page ${page - 1}`} icon="arrow-left" />
				</WrapperLink>
			</Wrapper>
		)
	}
}


export default Pagination