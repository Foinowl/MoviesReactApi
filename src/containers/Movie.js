import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import {
	getMovie,
	getRecommendations,
	clearRecommendations,
	clearMovie,
} from "../actions"

import history from "../history"
import queryString from "query-string"

import { Link } from "react-router-dom"

import Stars from "react-rating"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faStar as starSolid,
	faDotCircle,
} from "@fortawesome/free-solid-svg-icons"

import Credits from "../components/Credits"
import Loader from "../components/Loader"
import MoviesList from "../components/MoviesList"

const StyledLink = styled(Link)`
	text-decoration: none;
	display: block;
	display: flex;
	align-items: center;
	font-size: 1rem;
	font-weight: 700;
	line-height: 1;
	color: var(--color-primary-light);
	text-transform: uppercase;
	padding: 0.5rem 0rem;
	transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
	&:not(:last-child) {
		margin-right: 3rem;
	}
	&:hover {
		transform: translateY(-3px);
	}
	&:active {
		transform: translateY(2px);
	}
`

const LinksWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 3rem;
`

const MovieWrapper = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: center;
	width: 100%;
	max-width: 120rem;
	margin: 0 auto;
	margin-top: 2rem;
`

const MovieDetails = styled.div`
	width: 60%;
	padding: 5rem;
	flex: 1 1 60%;
`

const ImageWrapper = styled.div`
	width: 40%;
	flex: 1 1 40%;
	padding: 5rem;
`

const MovieImg = styled.img`
	max-height: 100%;
	height: auto;
	max-width: 100%;
	border-radius: 0.8rem;
	object-fit: cover;
	box-shadow: 0rem 2rem 5rem var(--shadow-color-dark);
`

const HeaderWrapper = styled.div`
	margin: 2rem 0rem;
`

const Title = styled.h1`
	text-transform: uppercase;
	font-weight: 300;
	font-size: 3rem;
	line-height: 1;
	color: var(--color-primary);
`

const SubTitle = styled.h2`
	text-transform: uppercase;
	font-weight: 700;
	font-size: 1.2rem;
	color: var(--color-primary);
`


const Heading = styled.h3`
	color: var(--color-primary-dark);
	font-weight: 700;
	text-transform: uppercase;
	margin-bottom: 1rem;
`

const DetailsWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 3rem;
`

const RatingsWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-right: auto;
`

const Rating = styled(Stars)`
	line-height: 1;
`

const RatingNumber = styled.p`
	font-size: 1.3rem;
	line-height: 1;
	font-weight: 700;
	color: var(--color-primary);
`

const FontAwesome = styled(FontAwesomeIcon)`
	color: var(--color-primary);
`

const Info = styled.div`
	font-weight: 700;
	line-height: 1;
	color: var(--color-primary-lighter);
	font-size: 1.2rem;
`

const Text = styled.p`
	font-size: 1.3rem;
	line-height: 1.6;
	color: var(--link-color);
	font-weight: 500;
	margin-bottom: 3rem;
`

const Movie = ({ match, location }) => {
	const dispatch = useDispatch()
	const geral = useSelector((store) => store.geral)
	const movie = useSelector((store) => store.movie)
	const recommended = useSelector((store) => store.recommended)
	const { base_url } = geral.base.images
	const params = queryString.parse(location.search)
	useEffect(() => {
		dispatch(getMovie(match.params.id))
		return () => dispatch(clearMovie())
	}, [match.params.id])

	// Fetch recommended movies everytime recommendations page change
	useEffect(() => {
		dispatch(getRecommendations(match.params.id, params.page))
		return () => dispatch(clearRecommendations())
	}, [params.page])

	if (movie.loading) {
		return <Loader />
	}

	function renderBack() {
		if (history.action === "PUSH") {
			return <button onClick={history.goBack}>Back</button>
		}
	}

	return (
		<React.Fragment>
			<MovieWrapper>
				<ImageWrapper>
					<MovieImg src={`${base_url}original${movie.poster_path}`} />
				</ImageWrapper>
				<MovieDetails>
					<HeaderWrapper>
						<Title>{movie.title}</Title>
						<SubTitle>{movie.tagline}</SubTitle>
					</HeaderWrapper>
					<DetailsWrapper>
						<RatingsWrapper>
							<Rating
								emptySymbol={
									<FontAwesome
										icon={faDotCircle}
										size="lg"
										style={{ marginRight: "10px" }}
									/>
								}
								fullSymbol={
									<FontAwesome
										icon={starSolid}
										size="lg"
										style={{ marginRight: "10px" }}
									/>
								}
								initialRating={movie.vote_average / 2}
								readonly
							/>
							<RatingNumber>{movie.vote_average} </RatingNumber>
						</RatingsWrapper>
						<Info>
							{`${movie.spoken_languages[0].name} / ${
								movie.runtime
							} min / ${splitYear(movie.release_date)}`}
						</Info>
					</DetailsWrapper>
					<Heading>The Genres</Heading>
					<LinksWrapper>{renderGenres(movie.genres)}</LinksWrapper>
					<Heading>The Synopsis</Heading>
					<Text>{movie.overview}</Text>
					<Heading>The Cast</Heading>
					<Credits cast={movie.cast} baseUrl={base_url} />
					{renderBack()}
				</MovieDetails>
			</MovieWrapper>
			<h1> Recommended movies based on this:</h1>
			{recommended.loading ? (
				<Loader />
			) : (
				<MoviesList movies={recommended} baseUrl={base_url} />
			)}
		</React.Fragment>
	)
}


// Function to get the year only from the date
function splitYear(date) {
  const [year] = date.split('-');
  return year;
}

function renderGenres(genres) {
  return genres.map((genre) => (
		<StyledLink to={`/genres/${genre.name}`} key={genre.id}>
			<FontAwesomeIcon
				icon={faDotCircle}
				size="1x"
				style={{ marginRight: "5px" }}
			/>
			{genre.name}
		</StyledLink>
	))
}

export default Movie
