import React from "react";

function Search({ search, handleOnChange, handleOnClick }) {
  return (
    <div className='search_container'>
      <input
        type='text'
        placeholder='search...'
        onChange={handleOnChange}
        name='search'
        value={search}
      ></input>

      <button type='submit' onClick={handleOnClick}>
        Search
      </button>
    </div>
  );
}

export default Search;
