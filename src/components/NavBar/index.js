import './index.css';
import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Collapse,
} from 'reactstrap';

//svg
import Logo from '../../svg/Logo.svg';

//icons
import { Person, CaretDown, Chat } from '../../icons';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar light expand='md' className='nav-con'>
        <NavbarBrand href='/' className='brand-name'>
          <img src={Logo} alt='SameDay Custom' />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto dl-font-weight-500 dl-text-semi-small w-100' navbar>
            <NavItem className='menu-item dl-text-gray-700'>
              <NavLink href='#' className='active-menu'>Design Lab</NavLink>
            </NavItem>
            <NavItem className='menu-item dl-text-gray-700'>
              <NavLink href='/investments'>Products</NavLink>
            </NavItem>
            <NavItem className='menu-item dl-text-gray-700' >
              <NavLink href='#'>How it works</NavLink>
            </NavItem>
            <NavItem className='menu-item dl-text-gray-700 me-auto'>
              <NavLink href='#'>Bulk pricing</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#' className='get-help-btn nav-btn'>
                <Chat className='me-2' />Get help<CaretDown className='ms-2' />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#' className='your-acct-btn nav-btn'>
                <Person className='me-2' /> Your Account <CaretDown className='ms-2' />
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;