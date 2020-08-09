import React, { useState, useEffect } from 'react';
// import { APIURL } from '../../config';
import { Link, Route, Redirect } from 'react-router-dom';
import { createHashHistory } from 'history';
import ArtworkCategoryNav from './ArtworkCategoryNav';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ArtworkDetail = (props) => {
	// used for goBack()
	const history = createHashHistory();

	//set artwork by ID
	const [artwork, setArtwork] = useState({});

	const [deleted, setDeleted] = useState(false);
	const [error, setError] = useState(false);

	// for displaying the both artwork.artworkCategory and artwork.artworkSubcategory in the same line
	const [fullCategory, setFullCategory] = useState('');

	// set artwork Ids because to handle routing between non-consecutive IDs
	const [artworkIds, setArtworkIds] = useState([]);

	// routerProps from react-router-dom
	const artworkId = props.match.params.id;

	// save this artwork id to state on each fetch to api/work/id
	const [thisArtworkId, setThisArtworkId] = useState(null);

	useEffect(() => {
		props.scrollUp();
		getThisArtwork();
		getArtworkIds();
		// eslint-disable-next-line
	}, []);

	// make a fetch to get by ID
	async function getThisArtwork() {
		const url = `/api/work/${artworkId}`;
		await fetch(url, {
			method: 'GET',
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setArtwork(data);
				setFullCategory(
					data.artworkSubcategory === '' || data.artworkSubcategory === null
						? props.toTitleCase(data.artworkCategory)
						: `${props.toTitleCase(data.artworkCategory)}: ${props.toTitleCase(
								data.artworkSubcategory
						)}`
				);
				setThisArtworkId(data.id);
			})
			.catch(() => {
				setError(true);
			});
	}

	async function getArtworkIds() {
		await fetch(`/api/work`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setArtworkIds(
					data.map((item) => {
						return item.id;
					})
				);
			})
			.catch(() => {
				setError(true);
			});
	}

	// make a fetch to delete by ID
	const onDeleteArtwork = (event) => {
		let confirm = prompt(
			"This action will delete the current work. Please type 'confirm' to delete",
			''
		);
		// make user have to confirm before deleting
		if (confirm === 'confirm') {
			const url = `/api/work/${artworkId}`;
			fetch(url, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
					Accept: 'application/json',
				},
			})
				.then(() => {
					setDeleted(true);
				})
				.catch(console.error);
		}
	};

	// redirect to artwork-all after deleting
	if (deleted) {
		return <Redirect to={`/artwork-all`} />;
	}

	// refresh the page to render the new artwork on artwork-back and artwork-forward buttons
	const artworkRefresh = () => {
		getArtworkIds()
			.then(() => {
				getThisArtwork();
			})
			.then(() => {
				window.location.reload();
			})
			.then(() => {
				props.scrollUp();
			});
	};

	// go back button
	const goBack = () => {
		history.goBack();
		artworkRefresh();
	};

	console.log(
		// get the id of the current work
		thisArtworkId,

		// get the array of all artwork Ids
		artworkIds,

		// get the index of this artwork in the array of all artworks
		artworkIds.indexOf(thisArtworkId),

		// get the id of the current work from the array of artworkIds
		//artworkIds at the index of the index of artworkIds at which the value is the current Id. the value at this index should be the same as thisArtworkId
		artworkIds[artworkIds.indexOf(thisArtworkId)],

		// the length of artworkIds will be compared with the index of the current artwork to determine if there should be a back/forward button (i.e. first item does not get a previous button; last item does not get a next button)
		artworkIds.length
	);

	return (
		<div className='artwork-detail-container-container'>
			<Route
				path='*'
				render={() => {
					return <ArtworkCategoryNav />;
				}}
			/>

			{!artwork ? (
				<div className='loading'>Loading...</div>
			) : (
				<div className='artwork-detail-container'>
					<img alt={artwork.title} src={artwork.imgUrlHi} />
					<div className='artwork-detail-headings-container'>
						<h1 className='artwork-detail-title'>{artwork.title}</h1>
						<h2 className='artwork-detail-fullCategory'>{`\u00b7${fullCategory}\u00b7`}</h2>
						<h3 className='artwork-detail-size'>{`${artwork.sizeWidth}"w x ${artwork.sizeHeight}"h`}</h3>
						<h4 className='artwork-detail-description'>
							{artwork.description}
						</h4>
						{artworkIds.indexOf(thisArtworkId) > 0 ? (
							<Link
								to={`/artwork/${
									artworkIds[artworkIds.indexOf(thisArtworkId) - 1]
								}`}
								onClick={artworkRefresh}>
								<FaArrowLeft className='detail-pointer-arrow' />
							</Link>
						) : null}{' '}
						{artworkIds.indexOf(thisArtworkId) + 1 < artworkIds.length ? (
							<Link
								to={`/artwork/${
									artworkIds[artworkIds.indexOf(thisArtworkId) + 1]
								}`}
								onClick={artworkRefresh}>
								<FaArrowRight className='detail-pointer-arrow' />
							</Link>
						) : null}{' '}
					</div>

					<div className='artwork-detail-buttons-container'>
						<button
							className='btn btn-dark'
							id='cancel-button'
							onClick={goBack}>
							Go Back
						</button>
						{props.token || localStorage.getItem('token') ? (
							<Link
								className='btn btn-info item'
								to={`/artwork/${artworkId}/edit`}
								onClick={props.scrollUp}>
								Update Artwork Information
							</Link>
						) : null}{' '}
						{props.token || localStorage.getItem('token') ? (
							<button onClick={onDeleteArtwork} className='btn btn-danger item'>
								Delete This Work
							</button>
						) : null}
					</div>
				</div>
			)}
		</div>
	);
};

export default ArtworkDetail;
