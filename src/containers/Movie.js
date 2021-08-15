import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
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

import NothingSvg from "../svg/nothing.svg"
import Header from "../components/Header"
import Rating from "../components/Rating"
import NotFound from "../components/NotFound"
import Button from "../components/Button"
import Cast from "../components/Cast"
import Loader from "../components/Loader"
import MoviesList from "../components/MoviesList"
import Loading from "../components/Loading"

import LazyLoad from "react-lazyload"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import ModalVideo from "react-modal-video"

import { device } from "../utils/_devices"

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
`

const MovieWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	max-width: 120rem;
	margin: 0 auto;
	margin-bottom: 7rem;
	opacity: ${(props) => (props.loaded ? "1" : "0")};
	visibility: ${(props) => (props.loaded ? "visible" : "hidden")};
	transition: all 600ms cubic-bezier(0.215, 0.61, 0.355, 1);

	@media only screen and ${device.largest} {
		max-width: 105rem;
	}
	@media only screen and ${device.larger} {
		max-width: 110rem;
		margin-bottom: 6rem;
	}
	@media only screen and ${device.large} {
		max-width: 110rem;
		margin-bottom: 5rem;
	}
	@media only screen and ${device.medium} {
		flex-direction: column;
		margin-bottom: 5rem;
	}
`

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
	flex-wrap: wrap;
`

const MovieDetails = styled.div`
	width: 60%;
	padding: 4rem;
	flex: 1 1 60%;

	@media only screen and ${device.largest} {
		padding: 3rem;
	}
	@media only screen and ${device.large} {
		padding: 2rem;
	}
	@media only screen and ${device.smaller} {
		padding: 1rem;
	}
	@media only screen and ${device.smallest} {
		padding: 0rem;
	}
	@media only screen and ${device.medium} {
		width: 100%;
		flex: 1 1 100%;
	}
`

const ImageWrapper = styled.div`
	width: 100%;
	max-width: 40%;
	flex: 1 1 40%;
	align-items: center;
	justify-content: center;
	display: flex;
	padding: 4rem;

	@media only screen and ${device.largest} {
		padding: 3rem;
	}
	@media only screen and ${device.large} {
		padding: 2rem;
	}
	@media only screen and ${device.smaller} {
		margin-bottom: 2rem;
	}
	@media only screen and ${device.medium} {
		width: 60%;
		flex: 1 1 60%;
	}
`

const MovieImg = styled.img`
	max-height: 100%;
	height: ${(props) => (props.error ? "25rem" : "auto")};
	object-fit: ${(props) => (props.error ? "contain" : "cover")};
	padding: ${(props) => (props.error ? "2rem" : "")};
	max-width: 100%;
	border-radius: 0.8rem;
	box-shadow: ${(props) =>
		props.error ? "none" : "0rem 2rem 5rem var(--shadow-color-dark)"};
`

const HeaderWrapper = styled.div`
	margin-bottom: 2rem;
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
	font-size: 1rem;
`

const Text = styled.p`
	font-size: 1.4rem;
	line-height: 1.8;
	color: var(--link-color);
	font-weight: 500;
	margin-bottom: 3rem;
`

const ButtonsWrapper = styled.div`
	display: flex;
	align-items: center;

	@media only screen and ${device.small} {
		flex-direction: column;
		align-items: flex-start;
	}
`

const LeftButtons = styled.div`
	margin-right: auto;
	display: flex;
	@media only screen and ${device.small} {
		margin-bottom: 2rem;
	}

	& > *:not(:last-child) {
		margin-right: 2rem;

		@media only screen and ${device.large} {
			margin-right: 1rem;
		}
	}
`

const ImgLoading = styled.div`
	width: 100%;
	max-width: 40%;
	flex: 1 1 40%;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);
	@media ${(props) => props.theme.mediaQueries.smaller} {
		height: 28rem;
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
	const [modalOpened, setmodalOpened] = useState(false)

	const params = queryString.parse(location.search)

	// When mounts go up
	useEffect(() => {
		window.scrollTo({
			top: (0, 0),
			behavior: "smooth",
		})
	}, [])

	// Fetch movie id when id on the url changes
	useEffect(() => {
		scroll.scrollToTop({
			smooth: true,
			delay: 500,
		})

		dispatch(getMovie(match.params.id))
		dispatch(getRecommendations(match.params.id, params.page))

		return () => {
			dispatch(clearMovie())
			dispatch(clearRecommendations())
			setLoaded(false)
		}
	}, [match.params.id])

	if (movie.loading) {
		return <Loader />
	}

	return (
		<Wrapper>
			<LazyLoad height={500}>
				<MovieWrapper>
					{!loaded ? (
						<ImgLoading>
							<Loading />
						</ImgLoading>
					) : null}
					<ImageWrapper style={!loaded ? { display: "none" } : {}}>
						<MovieImg
							error={error ? 1 : 0}
							src={`${secure_base_url}w780${movie.poster_path}`}
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
								<RatingNumber>{movie.vote_average}</RatingNumber>
							</RatingsWrapper>
							<Info>
								{renderInfo(
									movie.spoken_languages,
									movie.runtime,
									splitYear(movie.release_date)
								)}
							</Info>
						</DetailsWrapper>
						<Heading>The Genres</Heading>
						<LinksWrapper>{renderGenres(movie.genres)}</LinksWrapper>
						<Heading>The Synopsis</Heading>
						<Text>
							{movie.overview
								? movie.overview
								: "There is no synopsis available..."}
						</Text>
						<Heading>The Cast</Heading>
						<Cast cast={movie.cast} baseUrl={secure_base_url} />
						<ButtonsWrapper>
							<LeftButtons>
								{renderWebsite(movie.homepage)}
								{renderImdb(movie.imdb_id)}
								{renderTrailer(
									movie.videos.results,
									modalOpened,
									setmodalOpened
								)}
							</LeftButtons>
							{renderBack()}
						</ButtonsWrapper>
					</MovieDetails>
				</MovieWrapper>
			</LazyLoad>
			<Header title="Recommended" subtitle="movies" />
			{renderRecommended(recommended, base_url)}
		</Wrapper>
	)
}

//Render the back button if user was pushed into page
function renderBack() {
	if (history.action === "PUSH") {
		return (
			<div onClick={history.goBack}>
				<Button title="Go back" solid left icon="arrow-left" />
			</div>
		)
	}
}

// Render Personal Website button
function renderWebsite(link) {
	if (!link) {
		return null
	}
	return (
		<AWrapper target="_blank" href={link}>
			<Button title="Website" icon="link" />
		</AWrapper>
	)
}

// Render IMDB button
function renderImdb(id) {
	if (!id) {
		return null
	}
	return (
		<AWrapper target="_blank" href={`https://www.imdb.com/title/${id}`}>
			<Button title="IMDB" icon={["fab", "imdb"]} />
		</AWrapper>
	)
}

// Render Trailer button. On click triggers state to open modal of trailer
function renderTrailer(videos, modalOpened, setmodalOpened) {
	if (videos.length === 0) {
		return
	}
	const { key } = videos.find(
		(video) => video.type === "Trailer" && video.site === "YouTube"
	)
	return (
		<React.Fragment>
			<div onClick={() => setmodalOpened(true)}>
				<Button title="Trailer" icon="play" />
			</div>
			<ModalVideo
				channel="youtube"
				isOpen={modalOpened}
				videoId={key}
				onClose={() => setmodalOpened(false)}
			/>
		</React.Fragment>
	)
}

// Function to get the year only from the date
function splitYear(date) {
	if (!date) {
		return
	}
	const [year] = date.split("-")
	return year
}
function renderInfo(languages, time, data) {
	const info = []
	if (languages.length !== 0) {
		info.push(languages[0].name)
	}
	info.push(time, data)
	return info
		.filter((el) => el !== null)
		.map((el) => (typeof el === "number" ? `${el} min.` : el))
		.map((el, i, array) => (i !== array.length - 1 ? `${el} / ` : el))
}

function renderGenres(genres) {
	return genres.map((genre) => (
		<StyledLink
			to={`${process.env.PUBLIC_URL}/genres/${genre.name}`}
			key={genre.id}
		>
			<FontAwesomeIcon
				icon="dot-circle"
				size="1x"
				style={{ marginRight: "5px" }}
			/>
			{genre.name}
		</StyledLink>
	))
}

function renderRecommended(recommended, base_url) {
	if (recommended.loading) {
		return <Loader />
	} else if (recommended.total_results === 0) {
		return (
			<NotFound
				title="Sorry!"
				subtitle={`There are no recommended movies...`}
			/>
		)
	} else {
		return <MoviesList movies={recommended} baseUrl={base_url} />
	}
}

export default Movie
