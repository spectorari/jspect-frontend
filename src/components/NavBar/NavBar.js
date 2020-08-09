import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarNav,
	MDBNavItem,
	MDBNavLink,
	MDBNavbarToggler,
	MDBCollapse,
	MDBDropdown,
	MDBDropdownToggle,
	MDBDropdownMenu,
	MDBDropdownItem,
} from 'mdbreact';

const Navbar = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleCollapse = () => {
		if (isOpen === false) {
			setIsOpen(true);
		} else {
			setIsOpen(false);
		}
	};

	// /artwork-create link is only accessible to token holders
	return (
		<MDBNavbar color='light-blue' dark expand='md' id='navbar'>
			<MDBNavbarBrand>
				<div className='nav-caption-container'>
					<strong className='nav-caption'>Joel Spector</strong>
				</div>
			</MDBNavbarBrand>
			<MDBNavbarToggler onClick={toggleCollapse} />
			<MDBCollapse id='navbarCollapse3' isOpen={isOpen} navbar>
				<MDBNavbarNav right>
					<MDBNavItem>
						<MDBNavLink to='/' onClick={toggleCollapse}>
							Home
						</MDBNavLink>
					</MDBNavItem>
					<MDBNavItem>
						<MDBDropdown>
							<MDBDropdownToggle nav caret>
								<span className='mr-2'>Artwork</span>
							</MDBDropdownToggle>
							<MDBDropdownMenu>
								<MDBDropdownItem>
									<Link id='dropdown-links' to='/artwork-category/portraits'>
										Portraits
									</Link>
								</MDBDropdownItem>{' '}
								<MDBDropdownItem>
									<Link id='dropdown-links' to='/artwork-category/paintings'>
										Paintings
									</Link>
								</MDBDropdownItem>{' '}
								<MDBDropdownItem>
									<Link id='dropdown-links' to='/artwork-category/silverpoint'>
										Silverpoint
									</Link>
								</MDBDropdownItem>{' '}
								<MDBDropdownItem>
									<Link
										id='dropdown-links'
										to='/artwork-category/works_on_paper'>
										Works on Paper
									</Link>
								</MDBDropdownItem>{' '}
								<div className='nav-second-category'>
									<MDBDropdownItem>
										<Link id='dropdown-links' to='/artwork-all'>
											All Works
										</Link>
									</MDBDropdownItem>{' '}
									{props.token || localStorage.getItem('token') ? (
										<MDBDropdownItem>
											<Link id='dropdown-links' to='/artwork-create'>
												Add (+)
											</Link>
										</MDBDropdownItem>
									) : null}{' '}
								</div>
							</MDBDropdownMenu>
						</MDBDropdown>
					</MDBNavItem>
					<MDBNavItem onClick={toggleCollapse}>
						<MDBNavLink to='/about'>About the Artist</MDBNavLink>
					</MDBNavItem>
					<MDBNavItem onClick={toggleCollapse}>
						{props.token || localStorage.getItem('token') ? (
							<MDBNavLink to='/' onClick={props.handleSignOut}>
								Sign Out
							</MDBNavLink>
						) : (
							<MDBNavLink to='/signin'>Sign In</MDBNavLink>
						)}{' '}
					</MDBNavItem>
				</MDBNavbarNav>
				<MDBNavbarNav right>
					<MDBNavItem>
						{props.token || localStorage.getItem('token') ? (
							<h3 className='logged-in'>Logged in as Admin</h3>
						) : null}
					</MDBNavItem>
				</MDBNavbarNav>
			</MDBCollapse>
		</MDBNavbar>
	);
};

export default Navbar;
