import React, { useState, useEffect } from 'react';
// import { APIURL } from '../../config';
import { Redirect, Link } from 'react-router-dom';

import { MDBBtn, MDBInput } from 'mdbreact';

const SignIn = (props) => {
	const initialUserState = {
		username: '',
		password: '',
	};
	const [user, setUser] = useState(initialUserState);
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);
	const [signInError, setSignInError] = useState(false);
	const [submit, setSubmit] = useState(false);

	useEffect(() => {
		props.scrollUp();
		// eslint-disable-next-line
	}, []);

	const handleChange = (e) => {
		e.persist();
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	// POST request to /login to request a user token; save the token for user privileges in other components
	const signIn = (e) => {
		e.preventDefault();
		setSubmit(true);
		fetch(`/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.headers.get('authorization'))
			.then((token) => {
				if (token) {
					props.setToken(token);
					sessionStorage.setItem('token', token);
					setRedirectToReferrer(true);
				} else {
					setSignInError(true);
				}
			})
			.catch(console.error);
	};

	if (redirectToReferrer) {
		// redirect to user if there is user detail page
		// return <Redirect to='/user' />;
		return <Redirect to='/' />;
	}

	return (
		<div className='loggin-container'>
			<form onSubmit={signIn} className='sign-in-form'>
				<p className='loggin-form-title'>Sign in</p>
				<MDBInput
					required
					name='username'
					label='Username'
					icon='user'
					onChange={handleChange}
				/>
				<MDBInput
					required
					name='password'
					type='password'
					label='Password'
					icon='lock'
					onChange={handleChange}
				/>
				<div className='sign-in-submit-button-container'>
					<MDBBtn type='submit' color='indigo'>
						Login
					</MDBBtn>
				</div>
				<Link to='/signup'>
					<p className='sign-in-text' id='sign-in-toggle'>
						Don't have an account? Click here to sign up.
					</p>
				</Link>
				{signInError && submit ? (
					<p className='sign-in-error'>
						User information not found. Please try again.
					</p>
				) : null}
			</form>
		</div>
	);
};

export default SignIn;
