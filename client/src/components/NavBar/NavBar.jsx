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
              Welcome
            </NavLink>
            <NavLink to='/home'>Home Pokemon</NavLink>
            <NavLink to='/create'>Create Pokemon</NavLink>
            <NavLink to='/detail'>Detail Pokemon</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
