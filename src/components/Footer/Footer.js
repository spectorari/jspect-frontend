import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';

const FooterPage = () => {
	return (
		<MDBFooter color='blue' className='font-small pt-4 mt-4'>
			<MDBContainer fluid className='text-center text-md-left'>
				<MDBRow>
					<MDBCol md='6'>
						<h4
							className='title'
							style={{ textAlign: 'center', fontFamily: 'ubuntu' }}>
							Joel Spector
						</h4>
						<h6 className='title' style={{ textAlign: 'center' }}>
							1949 - 2016
						</h6>
					</MDBCol>
					<MDBCol md='6'>
						<img
							src='https://jspect.s3.amazonaws.com/artwork-hi-res/signature.jpg'
							alt='signature'
							style={{
								width: '200px',
								borderRadius: '25px',
								marginBottom: '1rem',
								textAlign: 'center',
							}}
						/>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
			<div className='footer-copyright text-center py-3'>
				<MDBContainer fluid>
					&copy; {new Date().getFullYear()} Copyright:{' '}
					<a
						href='https://www.linkedin.com/in/ari-spector/'
						target='_blank'
						rel='noopener noreferrer'>
						{' '}
						Ari Spector{' '}
					</a>
				</MDBContainer>
			</div>
		</MDBFooter>
	);
};

export default FooterPage;
