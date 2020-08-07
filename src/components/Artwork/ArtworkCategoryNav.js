import React from 'react';
import { Link } from 'react-router-dom';

// for easier navigation, render a nav bar for the items just in the artwork main Nav's artwork dropdown

// toggle active to highlight the current selection 
	// ('active' was taken by bootstrap so used 'active1' instead)

const ArtworkCategoryNav = (props) => (
	<nav className='subnav-container'>
		<div className='subnav-left'>
			<Link
				to='/artwork-category/portraits'
				className={
					window.location.href.indexOf('portraits') > -1
						? 'active1'
						: 'not-active'
				}>
				Portraits
			</Link>
			<Link
				to='/artwork-category/paintings'
				className={
					window.location.href.indexOf('paintings') > -1
						? 'active1'
						: 'not-active'
				}>
				Paintings
			</Link>
			<Link
				to='/artwork-category/silverpoint'
				className={
					window.location.href.indexOf('silverpoint') > -1
						? 'active1'
						: 'not-active'
				}>
				Silverpoint
			</Link>
			<Link
				to='/artwork-category/works_on_paper'
				className={
					window.location.href.indexOf('works_on_paper') > -1
						? 'active1'
						: 'not-active'
				}>
				Works on Paper
			</Link>
		</div>
		<div className='subnav-right'>
			<Link
				to='/artwork-all'
				className={
					window.location.href.indexOf('artwork-all') > -1
						? 'active1'
						: 'not-active'
				}>
				All Works
			</Link>
			{props.token || localStorage.getItem('token') ? (
				<Link
					to='/artwork-create'
					className={
						window.location.href.indexOf('artwork-create') > -1
							? 'active1'
							: 'not-active'
					}>
					Add to the Collection (+){' '}
				</Link>
			) : null}{' '}
		</div>
	</nav>
);

export default ArtworkCategoryNav;
