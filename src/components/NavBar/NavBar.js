import React, { useState, useEffect } from 'react';
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
								<MDBDropdownItem href='/artwork-category/portraits'>
									Portraits
								</MDBDropdownItem>

								<MDBDropdownItem href='/artwork-category/paintings'>
									Paintings
								</MDBDropdownItem>

								<MDBDropdownItem href='/artwork-category/silverpoint'>
									Silverpoint
								</MDBDropdownItem>

								<MDBDropdownItem href='/artwork-category/works_on_paper'>
									Works on Paper
								</MDBDropdownItem>

								<div className='nav-second-category'>
									<MDBDropdownItem href='/artwork-all'>
										All Works
									</MDBDropdownItem>
									{props.token || localStorage.getItem('token') ? (
										<MDBDropdownItem href='/artwork-create'>
											Add (+)
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
