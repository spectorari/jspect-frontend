import React from 'react';
import {
	MDBCarousel,
	MDBCarouselCaption,
	MDBCarouselInner,
	MDBCarouselItem,
	MDBView,
	MDBMask,
	MDBContainer,
} from 'mdbreact';

// use local images so you can manually resize them uniformly
import Garden from '../../component-images/in-the-garden.jpg';
import Beach from '../../component-images/on-the-beach.jpg';
import Reading2 from '../../component-images/rowena-reading-2.jpg';

const CarouselPage = () => {
	return (
		<MDBContainer>
			<MDBCarousel
				activeItem={1}
				length={3}
				showControls={true}
				showIndicators={false}
				className='z-depth-1'>
				<MDBCarouselInner>
					<MDBCarouselItem itemId='1'>
						<MDBView>
							<img className='d-block w-100' src={Garden} alt='First slide' />
							<MDBMask overlay='black-slight' />
						</MDBView>
						<MDBCarouselCaption>
							<h1 className='home-carousel-heading'>Joel Spector</h1>
						</MDBCarouselCaption>
					</MDBCarouselItem>
					<MDBCarouselItem itemId='2'>
						<MDBView>
							<img className='d-block w-100' src={Beach} alt='Second slide' />
							<MDBMask overlay='black-light' />
						</MDBView>
						<MDBCarouselCaption>
							<h1 className='home-carousel-heading'>Joel Spector</h1>
						</MDBCarouselCaption>
					</MDBCarouselItem>
					<MDBCarouselItem itemId='3'>
						<MDBView>
							<img className='d-block w-100' src={Reading2} alt='Third slide' />
							<MDBMask overlay='black-slight' />
						</MDBView>
						<MDBCarouselCaption>
							<h1 className='home-carousel-heading'>Joel Spector</h1>
						</MDBCarouselCaption>
					</MDBCarouselItem>
				</MDBCarouselInner>
			</MDBCarousel>
		</MDBContainer>
	);
};

export default CarouselPage;
