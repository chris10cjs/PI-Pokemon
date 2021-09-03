import React from "react";
import { NavLink } from "react-router-dom";

import "./Landing.css";

export default function Landing() {
  return (
    <div className='container'>
      <h1>Landing Pokemon</h1>
      <NavLink exact to='/home'>
        <h3> Inicia tu aventura</h3>
      </NavLink>
    </div>
  );
}
