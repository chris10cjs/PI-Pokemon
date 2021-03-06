import './NavBar.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
const LOGO =
  'https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg';

export default function NavBar() {
  return (
    <header>
      <nav className='navbar_container'>
        <NavLink className='navbar_logo' exact to='/'>
          <img src={LOGO} alt='logo' />
        </NavLink>

        <div className='list'>
          <NavLink to='/home'>HOME</NavLink>
          <NavLink to='/create'>CREATE</NavLink>
        </div>
      </nav>
    </header>
  );
}
