import React from 'react';
import Gallery from 'react-grid-gallery';

const About = () => {
	const bioSection1 = `Joel Spector was born in Havana, Cuba on January 10, 1949. His mother and father, Issac and Matilde Spector, owned a successful shoe factory in the city. When Fidel Castro took power in Cuba, Joel and his sister, Dorana, left for the United States and lived for a brief time with family in Florida.`;
	const bioSection2 = `His mother came to the United States, and soon after, she took her children with her to start a new life in Queens, NY. It would be a long time before her husband would rejoin the family. Matilde devoted herself to work, trying to give her children a good life. Almost as quickly as she found employment in the fashion industry, Matilde learned the intricacies of her job, and began what would become a very successful career. Times were tough, yet she was a cunning woman, and always able to find a way to stretch a dollar. When Isaac came to the United States without a penny in his pocket and the family was reunited, Joel’s parents worked to create a business of their own.`;
	const bioSection3 = `Joel graduated from the Fashion Institute of Technology and attended the Art Students League. He started his career by doing fashion illustrations and advertisements, later on his work would appear in children’s books, magazines, and newspapers. In 1990, Joel Spector moved to New Milford, Connecticut with his wife, Rowena, where they would raise their four children. He received his MFA at Western Connecticut State University in 2005.`;
	const bioSection4 = `As his artistic ability grew, he focused his career in portraiture and oil painting, and taught his craft at the Art League of Long Island and the Pastel Society of America. He was a member of the Painting Group of Manhattan, studied under Aaron Shikler and David Levine. Joel died on October 13, 2016. His art was a constant search for love, humanity, and compassion.`;

	// the following bioSectionNPhotos arrays are divided by which thumbnail-carousel component it will be included in
	const bioSection1Photos = [
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-young-gun.JPG',
			thumbnail:
				'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-young-gun.JPG',
			alt: 'Joel with gun',
			caption: 'Joel with gun',
		},
		// {
		// 	src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-dorana.JPG',
		// 	thumbnail:
		// 		'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-dorana.JPG',

		// 	alt: 'Joel with Sister',
		// },
	];

	const bioSection2Photos = [
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-dorana.JPG',
			thumbnail:
				'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-dorana.JPG',
			alt: 'Joel with Sister',
		},
	];

	const bioSection3_1Photos = [
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-father.JPG',
			thumbnail:
				'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-father.JPG',
			alt: 'Joel with baby',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-profile.JPG',
			// thumbnail:
			// 	'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-profile.JPG',
			// alt: 'Joel Older Profile View',
		},
	];

	const bioSection3_2Photos = [
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-profile.JPG',
			thumbnail:
				'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-profile.JPG',
			alt: 'Joel Older Profile View',
		},
	];

	const bioSection3_3Photos = [
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/Cover5.png',
			thumbnail: 'https://jspect.s3.amazonaws.com/artwork-hi-res/Cover5.png',
			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/CaptainMorgan.jpg',
			// thumbnail:
			// 	'https://jspect.s3.amazonaws.com/artwork-hi-res/CaptainMorgan.jpg',
			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/Cover1.png',
			// thumbnail: 'https://jspect.s3.amazonaws.com/artwork-hi-res/Cover1.png',
			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/Cover3.png',
			// thumbnail: 'https://jspect.s3.amazonaws.com/artwork-hi-res/Cover3.png',
			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/Cover4.png',
			// thumbnail: 'https://jspect.s3.amazonaws.com/artwork-hi-res/Cover4.png',
			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/Cover6.png',
			// thumbnail: 'https://jspect.s3.amazonaws.com/artwork-hi-res/Cover6.png',
			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/Cover7.png',
			// thumbnail: 'https://jspect.s3.amazonaws.com/artwork-hi-res/Cover7.png',
			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/Cover8.jpg',
			// thumbnail: 'https://jspect.s3.amazonaws.com/artwork-hi-res/Cover9.jpg',
			alt: '',
		},
	];

	const bioSection4Photos = [
		{
			src:
				'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-OperaNews.jpg',
			thumbnail:
				'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-OperaNews.jpg',
			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-7.jpg',
			// thumbnail:
			// 	'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-7.jpg',
			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-5.jpg',
			// thumbnail:
			// 	'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-5.jpg',
			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-1.jpg',
			// thumbnail:
			// 	'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-1.jpg',

			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-3.jpg',
			// thumbnail:
			// 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-3.jpg',

			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel%2Bwallach.jpg',
			// thumbnail:
			// 	'https://jspect.s3.amazonaws.com/artwork-hi-res/joel%2Bwallach.jpg',

			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-4.jpg',
			// thumbnail:
			// 	'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-4.jpg',

			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-2.jpg',
			// thumbnail:
			// 	'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-2.jpg',

			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-6.jpg',
			// thumbnail:
			// 	'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-6.jpg',

			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/oaj-at-nac.jpg',
			// thumbnail:
			// 	'https://jspect.s3.amazonaws.com/artwork-hi-res/oaj-at-nac.jpg',

			alt: '',
		},
	];

	return (
		<div className='about-wrapper'>
			<div className='about-title'>About the Artist</div>
			<section className='about-bio-section'>
				<p className='about-bio-section-text'>{bioSection1}</p>
				<Gallery images={bioSection1Photos} enableImageSelection={false} />{' '}
			</section>
			<section className='about-bio-section'>
				<p className='about-bio-section-text'>{bioSection2}</p>{' '}
				<Gallery images={bioSection2Photos} enableImageSelection={false} />{' '}
			</section>
			<section className='about-bio-section'>
				<p className='about-bio-section-text'>{bioSection3}</p>
				<Gallery
					images={bioSection3_3Photos}
					enableImageSelection={false}
				/>{' '}
				<Gallery images={bioSection3_1Photos} enableImageSelection={false} />{' '}
			</section>
			<section className='about-bio-section'>
				<p className='about-bio-section-text'>{bioSection4}</p>{' '}
				<Gallery images={bioSection4Photos} enableImageSelection={false} />{' '}
			</section>
		</div>
	);
};
export default About;
