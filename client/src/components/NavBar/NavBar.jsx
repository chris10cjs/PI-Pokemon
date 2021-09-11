import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <header>
      <nav className='navbar_container'>
        <div className='list'>
          <NavLink exact to='/'>
            landing
          </NavLink>
        </div>
        <div className='list'>
          <NavLink to='/home'>HOME</NavLink>
          <NavLink to='/create'>CREATE</NavLink>
        </div>
        <div className='list'>
          <NavLink to='/about'>about me</NavLink>
        </div>
      </nav>
    </header>
  );
}
