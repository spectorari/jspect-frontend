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

	// routerProps from react-router-dom
	const artworkId = props.match.params.id;

	useEffect(() => {
		props.scrollUp();
		fetchMyApi();
		// eslint-disable-next-line
	}, []);

	// make a fetch to get by ID
	async function fetchMyApi() {
		const url = `/api/work/${artworkId}`;
		await fetch(url, {
			method: 'GET',
		})
			.then((response) => response.json())
			.then((data) => {
				setArtwork(data);
				setFullCategory(
					data.artworkSubcategory === '' || data.artworkSubcategory === null
						? props.toTitleCase(data.artworkCategory)
						: `${props.toTitleCase(data.artworkCategory)}: ${props.toTitleCase(
								data.artworkSubcategory
						  )}`
				);
			})
			.catch(() => {
				setError(true);
			});
	}
	console.log('Current Work: ', artwork);

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
				.then((res) => {
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
		fetchMyApi()
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
						{artworkId > 1 ? (
							<Link
								to={`/artwork/${parseInt(artworkId) - 1}`}
								onClick={artworkRefresh}>
								<FaArrowLeft className='detail-pointer-arrow' />
							</Link>
						) : null}{' '}
						{artworkId < props.artworkAllLength ? (
							<Link
								to={`/artwork/${parseInt(artworkId) + 1}`}
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
