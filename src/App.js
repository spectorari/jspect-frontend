import React, { useState, useHistory, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
// import { APIURL } from './config';

//misc. components
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';

//artwork
import ArtworkCategorySub from './components/Artwork/ArtworkCategorySub';
import ArtworkCreate from './components/Artwork/ArtworkCreate';
import ArtworkDetail from './components/Artwork/ArtworkDetail';
import ArtworkUpdate from './components/Artwork/ArtworkUpdate';
import ArtworkAll from './components/Artwork/ArtworkAll';

// user
import SignIn from './components/Password/SignIn';
import SignUp from './components/Password/SignUp';

// /about
import About from './components/About/About';

const App = () => {
	const [error, setError] = useState(false);
	const [token, setToken] = useState('');
	const [artworkAllLength, setArtworkAllLength] = useState();

	// when a user signs out, the state of token and the token in localStorage both need to be cleared on sign out
	async function handleSignOut() {
		setToken(null);
		localStorage.removeItem('token');
	}

	// some components should be rendered with the viewport starting at the top
	function scrollUp() {
		window.scrollTo(0, 0);
	}

	// fetch the artwork for the artwork database length-- this gets passed down to ArtworkDetail for the range of navigation controls
	useEffect(() => {
		fetchMyApi();
		// eslint-disable-next-line
	}, []);
	async function fetchMyApi() {
		await fetch(`/api/work`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setArtworkAllLength(data.length);
			})
			.catch(() => {
				setError(true);
			});
	}

	// converts text from data to Title Case
	function toTitleCase(str) {
		return str
			.replace(/([a-z])([A-Z])/g, function (
				allMatches,
				firstMatch,
				secondMatch
			) {
				return firstMatch + ' ' + secondMatch;
			})
			.toLowerCase()
			.replace(/([ -_]|^)(.)/g, function (allMatches, firstMatch, secondMatch) {
				return (firstMatch ? ' ' : '') + secondMatch.toUpperCase();
			});
	}

	return (
		<>
			<Route
				path='*'
				render={() => {
					return (
						<NavBar
							token={token}
							setToken={setToken}
							handleSignOut={handleSignOut}
						/>
					);
				}}
			/>
			<main>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/about' component={About} />
					<Route
						exact
						path='/artwork-category/:category'
						render={() => {
							return (
								<ArtworkCategorySub
									toTitleCase={toTitleCase}
									scrollUp={scrollUp}
									token={token}
								/>
							);
						}}
					/>
					<Route
						exact
						path='/artwork-create'
						render={() => {
							return <ArtworkCreate toTitleCase={toTitleCase} token={token} />;
						}}
					/>
					<Route
						exact
						path='/artwork/:id'
						render={(routerProps) => {
							return (
								<ArtworkDetail
									{...routerProps}
									scrollUp={scrollUp}
									toTitleCase={toTitleCase}
									token={token}
									artworkAllLength={artworkAllLength}
								/>
							);
						}}
					/>
					<Route
						exact
						path='/artwork/:id/edit'
						render={(routerProps) => {
							return (
								<ArtworkUpdate
									{...routerProps}
									scrollUp={scrollUp}
									toTitleCase={toTitleCase}
									token={token}
								/>
							);
						}}
					/>
					<Route
						exact
						path='/artwork-all'
						render={() => {
							return (
								<ArtworkAll
									toTitleCase={toTitleCase}
									scrollUp={scrollUp}
									token={token}
								/>
							);
						}}
					/>
					<Route exact path='/signup' component={SignUp} />
					<Route
						exact
						path='/signin'
						render={(props) => {
							return <SignIn setToken={setToken} />;
						}}
					/>{' '}
				</Switch>
			</main>
			<footer>
				<Route path='*' component={Footer} />
			</footer>
		</>
	);
};

export default App;
