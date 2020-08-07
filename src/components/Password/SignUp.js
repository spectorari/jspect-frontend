import React, { useState, setState } from 'react';
import { APIURL } from '../../config';
import { Redirect, Link } from 'react-router-dom';
import { MDBBtn, MDBInput } from 'mdbreact';

const SignUp = (props) => {
	const initialUserState = {
		username: '',
		password: '',
		passwordConfirm: '',
		adminPassword: '',
	};
	const [user, setUser] = useState(initialUserState);
	const [adminValid, setAdminValid] = useState(true);
	const [valid, setValid] = useState(true);
	const [submit, setSubmit] = useState(false);
	const [error, setError] = useState(false);
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);
	const [dropdownResult, setDropdownResult] = useState(null);

	// if signing up as an admin, prompt the user for an admin password; if attempting to sign is without selecting 'yes', user is told only admins can sign up
	const handleDropdownSelect = (e) => {
		setDropdownResult(
			e.target.value === 'Yes' ? (
				<MDBInput
					required
					name='adminPassword'
					label='Administrator Password'
					icon='exclamation-triangle'
					type='password'
					onChange={handleChange}
				/>
			) : (
				<p className='sign-in-text' id='admins-only-message'>
					We're sorry. Currently you must be an Administrator to hold an
					account.
				</p>
			)
		);
	};

	// check to see if passwords match and that the admin password is correct, then call handleSubmit()
	const checkPassword = (e) => {
		e.preventDefault();
		setSubmit(true);
		user.password === user.passwordConfirm ? setValid(true) : setValid(false);
		user.adminPassword === process.env.REACT_APP_ADMIN_KEY
			? setAdminValid(true)
			: setAdminValid(false);
		if (
			user.adminPassword === process.env.REACT_APP_ADMIN_KEY &&
			user.password === user.passwordConfirm
		) {
			setAdminValid(true);
			setValid(true);
			handleSubmit();
		}
	};

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		fetch(`${APIURL}/api/user/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: user.username,
				password: user.password,
			}),
		})
			// .then((res) => res.json()) //only if there is json in res body
			.then((res) => {
				if (res.status === 200) {
					setRedirectToReferrer(true);
				} else {
					setError(true);
				}
			})
			.catch(console.error);
	};

	// redirect user to SignIn form if register is successful
	if (redirectToReferrer) {
		return <Redirect to='/signin' />;
	}

	return (
		<div className='loggin-container'>
			<form onSubmit={checkPassword} className='sign-in-form'>
				<p className='loggin-form-title'>Sign up</p>
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
					label='Password'
					icon='lock'
					type='password'
					onChange={handleChange}
				/>
				<MDBInput
					required
					name='passwordConfirm'
					label='Confirm Password'
					icon='question'
					type='password'
					onChange={handleChange}
				/>
				<p className='sign-in-text' id='admin-container-label'>
					Are you Signing up as an Administrator?
				</p>

				<select
					required
					className='form-input'
					onChange={(e) => {
						handleDropdownSelect(e);
					}}>
					<option defaultValue hidden>
						Select One
					</option>
					<option>Yes</option>
					<option>No</option>
				</select>

				{dropdownResult}
				<br />
				<div className='sign-in-submit-button-container'>
					<MDBBtn type='submit' color='indigo'>
						Sign Up
					</MDBBtn>
				</div>

				<Link to='/signin'>
					<p className='sign-in-text' id='sign-in-toggle'>
						Already have an account? Click here to sign in.
					</p>
				</Link>

				{submit && (
					<p className='sign-in-text' id={valid ? 'valid' : 'invalid'}>
						{valid ? null : 'Passwords Must Match'}
					</p>
				)}
				{submit && (
					<p className='sign-in-text' id={adminValid ? 'valid' : 'invalid'}>
						{' '}
						{adminValid ? null : 'Administrator Password is Incorrect or Null'}
					</p>
				)}
				{error && (
					<p className='sign-up-error'>
						That username has been taken already. Please choose a different one.
					</p>
				)}
			</form>
		</div>
	);
};

export default SignUp;
