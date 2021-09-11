import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./Landing.css";

export default function Landing() {
  const { isLoading } = useSelector((state) => ({
    isLoading: state.isLoading,
  }));

  return (
    <div className='landing-background'>
      <div className='container-landing '>
        <div className='landing-title'>
          <h3>Gotta catch 'em all!</h3>
        </div>
        <div className='landing-init'>
          {isLoading ? (
            <>
              <p>Start your adventure...</p>
            </>
          ) : (
            <NavLink exact to='/home'>
              <button className='landing-btn'>WELCOME</button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
