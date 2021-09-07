import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <header className='navbar'>
      <nav>
        <ul className='list'>
          <li className='list-item'>
            <NavLink exact to='/'>
              LOGOAPP
            </NavLink>
            <NavLink to='/home'>Home Pokemon</NavLink>
            <NavLink to='/create'>Create Pokemon</NavLink>
            <NavLink to='/about'>About me</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
