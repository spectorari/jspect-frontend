import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { APIURL } from '../../config';

import ArtworkCategoryNav from './ArtworkCategoryNav';
import ArtworkForm from './ArtworkForm';

const ArtworkUpdate = (props) => {
	// initialize current artwork as an empty object
	const [artwork, setArtwork] = useState({});

	// set createdID after PUT request to be used for Redirect to detail
	const [createdId, setCreatedId] = useState(null);
	const [error, setError] = useState(false);

	// take the current artworkId from routerProps.match
	const artworkId = props.match.params.id;

	// set the fullCategory of this work; the properties of artworkCategory and artworkSubcategory in existing works can not be changed by the user with this form
	const [fullCategory, setFullCategory] = useState('');

	useEffect(() => {
		props.scrollUp();
		fetchMyApi();
		// eslint-disable-next-line
	}, []);

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

	// instead of a dropdown menu to select category, the fullCategory will exist as text
	let formSelectTag = (
		<h3 className='artwork-update-fullCategory'>{fullCategory}</h3>
	);

	const handleChange = (e) => {
		e.persist();
		setArtwork({
			...artwork,
			artworkCategory: artwork.artworkCategory,
			artworkSubcategory: artwork.artworkSubcategory,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const url = `/api/work/${artworkId}`;

		fetch(url, {
            method: 'PUT',
			headers: {
                'Content-type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
			},
			body: JSON.stringify(artwork),
		})
			.then((res) => res.json())
			.then((data) => {
				setCreatedId(data.id);
			})
			.catch(() => {
				setError(true);
			});
	};

	if (createdId) {
		return <Redirect to={`/artwork/${createdId}`} />;
	}

	return (
		<div className='artwork-subcat-container'>
			<Route
				path='*'
				render={() => {
					return <ArtworkCategoryNav />;
				}}
			/>
			{props.token || sessionStorage.getItem('token') ? (
				<main className='artwork-form-container'>
					<h1 id='artwork-form-heading-text'>
						Update Artwork id: {artwork.id}
					</h1>
					<p className='artwork-form-subheading'>
						Please fill out the form below to update information on this piece.
					</p>
					{error && <p>Something went wrong... Please try again!</p>}
					<form className='artwork-form-form' onSubmit={handleSubmit}>
						<ArtworkForm
							artwork={artwork}
							handleChange={handleChange}
							handleSubmit={handleSubmit}
							toTitleCase={props.toTitleCase}
							formSelectTag={formSelectTag}
						/>
					</form>
				</main>
			) : (
				<p className='not-logged-in-message'>
					Sorry, you must be logged in to view this page.
				</p>
			)}
		</div>
	);
};

export default ArtworkUpdate;
