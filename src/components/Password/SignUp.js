import React, { useState, setState } from 'react';
// import { APIURL } from '../../config';
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
		if (validPasswordCheck) {
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
		}
	};

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		fetch(`/api/user/register`, {
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

	function isValidSpecialChars(str) {
		return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g.test(str);
	}
	function isValidUppercase(str) {
		return /[A-Z]/g.test(str);
	}
	function isValidLowercase(str) {
		return /[a-z]/g.test(str);
	}
	function isValidNumbers(str) {
		return /[0-9]/g.test(str);
	}
	function isValidLength(str) {
		return str.length > 7;
	}
	function isValidNoSpaces(str) {
		return /[ ]/g.test(str);
	}

	let validPasswordCheck =
		isValidSpecialChars(user.password) &&
		!isValidNoSpaces(user.password) &&
		isValidUppercase(user.password) &&
		isValidLowercase(user.password) &&
		isValidLength(user.password) &&
		isValidNumbers(user.password)
			? true
			: false;

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
				<p className='password-must-contain'>Password must:</p>
				<li
					id={
						isValidSpecialChars(user.password) ? 'valid-password' : 'invalid'
					}>
					contain a special character.
					<span
						id={
							isValidSpecialChars(user.password) ? 'valid-password' : 'valid'
						}>
						{' '}
						✓
					</span>
				</li>
				<li id={isValidUppercase(user.password) ? 'valid-password' : 'invalid'}>
					contain an uppercase letter.
					<span
						id={isValidUppercase(user.password) ? 'valid-password' : 'valid'}>
						{' '}
						✓
					</span>
				</li>
				<li id={isValidLowercase(user.password) ? 'valid-password' : 'invalid'}>
					contain a lowercase letter.
					<span
						id={isValidLowercase(user.password) ? 'valid-password' : 'valid'}>
						{' '}
						✓
					</span>
				</li>
				<li id={isValidNumbers(user.password) ? 'valid-password' : 'invalid'}>
					contain a number.
					<span id={isValidNumbers(user.password) ? 'valid-password' : 'valid'}>
						{' '}
						✓
					</span>
				</li>

				<li id={isValidLength(user.password) ? 'valid-password' : 'invalid'}>
					be at least 8 characters long.
					<span id={isValidLength(user.password) ? 'valid-password' : 'valid'}>
						{' '}
						✓
					</span>
				</li>
				<li id={isValidNoSpaces(user.password) ? 'invalid' : 'valid-password'}>
					not contain spaces.
					<span
						id={isValidNoSpaces(user.password) ? 'valid' : 'valid-password'}>
						{' '}
						✓
					</span>
				</li>

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
						Sorry, there was a problem. Please try again or choose a different
						username.
					</p>
				)}
				{!validPasswordCheck && submit && (
					<p style={{ textAlign: 'center' }} id='invalid'>
						Please edit your password to meet the requirements.
					</p>
				)}
			</form>
		</div>
	);
};

export default SignUp;
