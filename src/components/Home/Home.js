import React from 'react';
import HomeCarousel from './HomeCarousel';

const Home = () => {
	const artistStatementHome = `The new trend in illustration is to be there as a design but not to speak too loudly. I don't believe in that. I think back to the great illustrators of the past as N.C. Wyeth, Maxfield Parrish, Norman Rockwell... Their people were people of the flesh and blood, character and great story telling. Not cold, impersonal figures that act as a piece of cold design or to be a clever visual pun and do not breath life. I love the sense of elegance and style. Sense of time and place. I want my work to have a sense of humanity.`;

	return (
		<div className='home-wrapper'>
			<div className='home-title'>
				<HomeCarousel />
			</div>
			<div className='home-artist-statement-container'>
				<h2 className='home-artist-statement-caption'>Artist Statement</h2>
				<p className='home-artist-statement'>
					{artistStatementHome}{' '}
					<p className='home-statement-signature'>Joel Spector</p>
				</p>
			</div>
		</div>
	);
};
export default Home;
