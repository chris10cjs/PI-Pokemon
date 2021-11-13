import './Search.css';
import React from 'react';

import { BiSearchAlt } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { getPokemons } from '../../redux/actions';

function Search({ search, handleOnChange, handleOnClick, setSelected }) {
  const dispatch = useDispatch();

  const handleOnClickAll = (e) => {
    e.preventDefault();
    setSelected(true);
    dispatch(getPokemons());
  };

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
      <div>
        <button className='btn-all' onClick={handleOnClickAll}>
          RESET
        </button>
      </div>
    </form>
  );
}

export default Search;
