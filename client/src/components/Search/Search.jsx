import React from "react";
import "./Search.css";

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
        Search
      </button>
    </form>
  );
}

export default Search;
