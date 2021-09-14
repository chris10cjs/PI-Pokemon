import "./Search.css";
import React from "react";

import { BiSearchAlt } from "react-icons/bi";

function Search({ search, handleOnChange, handleOnClick }) {
  return (
    <form className='search_container'>
      <input
        className='search-input'
        type='text'
        placeholder='type the pokemon...'
        onChange={handleOnChange}
        name='search'
        value={search}
      ></input>

      <button className='search-btn' type='submit' onClick={handleOnClick}>
        <span>
          <BiSearchAlt />
        </span>
      </button>
    </form>
  );
}

export default Search;
