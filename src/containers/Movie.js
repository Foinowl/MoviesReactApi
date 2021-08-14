import React, { useState, useEffect } from "react"
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
import NothingSvg from "../svg/nothing.svg"
import Header from "../components/Header"
import Rating from "../components/Rating"

import Button from "../components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


import Credits from "../components/Credits"
import Loader from "../components/Loader"
import MoviesList from "../components/MoviesList"

const StyledLink = styled(Link)`
	text-decoration: none;
	display: block;
	display: flex;
	align-items: center;
	font-size: 1.1rem;
	font-weight: 700;
	line-height: 1;
	color: var(--color-primary-light);
	text-transform: uppercase;
	padding: 0.5rem 0rem;
	transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
	&:not(:last-child) {
		margin-right: 2rem;
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
	font-weight: 700;
	text-transform: uppercase;
	margin-bottom: 1rem;
	font-size: 1.4rem;
`

const MovieWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	max-width: 120rem;
	margin: 2rem auto;
	opacity: ${(props) => (props.loaded ? "1" : "0")};
	visibility: ${(props) => (props.loaded ? "visible" : "hidden")};
	transition: all 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
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
	height: ${(props) => (props.error ? "58rem" : "auto")};
	object-fit: ${(props) => (props.error ? "contain" : "cover")};
	padding: ${(props) => (props.error ? "4rem" : "")};
	max-width: 100%;
	border-radius: 0.8rem;
	box-shadow: 0rem 2rem 5rem var(--shadow-color-dark);
`

const HeaderWrapper = styled.div`
	margin: 2rem 0rem;
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
	margin-bottom: 5rem;
`

const RatingsWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-right: auto;
`

const RatingNumber = styled.p`
	font-size: 1.3rem;
	line-height: 1;
	font-weight: 700;
	color: var(--color-primary);
`

const Info = styled.div`
	font-weight: 700;
	line-height: 1;
	text-transform: uppercase;
	color: var(--color-primary-lighter);
	font-size: 1.3rem;
`

const Text = styled.p`
	font-size: 1.3rem;
	line-height: 1.6;
	color: var(--link-color);
	font-weight: 500;
	margin-bottom: 3rem;
`

const ButtonsWrapper = styled.div`
	display: flex;
	align-items: center;
`

const LeftButtons = styled.div`
	margin-right: auto;
	display: flex;
	& > *:not(:last-child) {
		margin-right: 2rem;
	}
`

const AWrapper = styled.a`
	text-decoration: none;
`

const Movie = ({ match, location }) => {
	const dispatch = useDispatch()
	const geral = useSelector((store) => store.geral)
	const movie = useSelector((store) => store.movie)
	const recommended = useSelector((store) => store.recommended)
	const { base_url } = geral.base.images

	const [loaded, setLoaded] = useState(false)
	const [error, setError] = useState(false)

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
      return (
				<div onClick={history.goBack}>
					<Button title="Go back" solid left icon="arrow-left" />
				</div>
			)
	}


	const renderWebsite = (link) => {
		if (!link) {
			return null
		}
		return (
			<AWrapper target="_blank" href={link}>
				<Button title="Website" icon="link" />
			</AWrapper>
		)
	}

	const renderImdb = (id) => {
		if (!id) {
			return null
		}
		return (
			<AWrapper target="_blank" href={`https://www.imdb.com/title/${id}`}>
				<Button title="IMDB" icon={["fab", "imdb"]} />
			</AWrapper>
		)
	}

	return (
		<React.Fragment>
			<MovieWrapper loaded={loaded ? 1 : 0}>
				<ImageWrapper>
					<MovieImg
						error={error ? 1 : 0}
						src={`${base_url}original${movie.poster_path}`}
						onLoad={() => setLoaded(true)}
						// If no image, error will occurr, we set error to true
						// And only change the src to the nothing svg if it isn't already, to avoid infinite callback
						onError={(e) => {
							setError(true)
							if (e.target.src !== `${NothingSvg}`) {
								e.target.src = `${NothingSvg}`
							}
						}}
					/>
				</ImageWrapper>
				<MovieDetails>
					<HeaderWrapper>
						<Header size="2" title={movie.title} subtitle={movie.tagline} />
					</HeaderWrapper>
					<DetailsWrapper>
						<RatingsWrapper>
							<Rating number={movie.vote_average / 2} />
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
					<ButtonsWrapper>
						<LeftButtons>
							{renderWebsite(movie.homepage)}
							{renderImdb(movie.imdb_id)}
						</LeftButtons>
						{renderBack()}
					</ButtonsWrapper>
				</MovieDetails>
			</MovieWrapper>
			<Header title="Recommended" subtitle="movies" />
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
				icon="dot-circle"
				size="1x"
				style={{ marginRight: "5px" }}
			/>
			{genre.name}
		</StyledLink>
	))
}

export default Movie
