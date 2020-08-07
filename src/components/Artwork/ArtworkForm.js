import React, { useEffect } from 'react';
import { createHashHistory } from 'history';
import Dropzone from '../Dropzone/Dropzone';

const ArtworkForm = (props) => {
	const history = createHashHistory();

	useEffect(() => {
		// initialize the absence of the second dropdown menu for the ampty form
		if (props.setSecondDropdown) {
			props.setSecondDropdown(false);
		} // eslint-disable-next-line
	}, []);

	return (
		<>
			<label className='form-label'>Artwork Category</label>
			{props.formSelectTag}
			{props.secondDropdown === true && props.targetValue.length > 1 ? (
				<>
					<label className='form-label'>Artwork Subcategory</label>
					<select
						required
						name='artworkSubcategory'
						className='form-input'
						id='artworkSubcategoryInput'
						onChange={(event) => {
							props.handleChange(event);
						}}>
						{' '}
						<option selected disabled hidden>
							Select Subcategory
						</option>
						{props.secondFormSelectTagOptions}
					</select>
				</>
			) : null}
			<label>Title</label>
			<input
				value={props.artwork.title}
				required
				onChange={props.handleChange}
				name='title'></input>
			<label>Image</label>
			{props.artwork.id ? (
				<img
					src={props.artwork.imgUrlHi}
					alt={props.artwork.title}
					className='form-img'
				/>
			) : null}
			<Dropzone setImgUrl={props.setImgUrl}/>
			<label>Date</label>
			<input
				value={props.artwork.date}
				required
				onChange={props.handleChange}
				type='date'
				name='date'></input>
			<label>Dimensions: Height (inches)</label>
			<div className='size-inputs'>
				<div className='size-inputs-labels'>
					<label>Height:</label>
					<label>Length:</label>
				</div>
				<div className='size-inputs-inputs'>
					<input
						value={props.artwork.sizeHeight}
						onChange={props.handleChange}
						type='number'
						min='0'
						name='sizeHeight'></input>{' '}
					<input
						value={props.artwork.sizeWidth}
						onChange={props.handleChange}
						type='number'
						min='0'
						name='sizeWidth'></input>
				</div>
			</div>
			<label>Description (optional)</label>
			<input
				value={props.artwork.description}
				onChange={props.handleChange}
				name='description'></input>
			<button className='btn btn-blue' type='submit'>
				Submit
			</button>
			<button
				className='btn btn-dark'
				id='cancel-button'
				onClick={history.goBack}>
				Cancel and Go Back
			</button>
		</>
	);
};

export default ArtworkForm;
