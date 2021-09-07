import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../actions";
import "./Buttons.css";

function Buttons({
  handleOnFilterByType,
  handleOnFilterByCreator,
  handleOnSortByName,
  handleOnSortByAttack,
}) {
  const dispatch = useDispatch();

  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(getPokemons());
  };

  const { types } = useSelector((state) => ({
    types: state.types,
  }));

  return (
    <div className='buttons_container'>
      <div>
        <button onClick={handleOnClick}>ALL POKEMONS</button>
      </div>
      <div>
        <select onChange={handleOnSortByName} name='orderName'>
          <option value='order'>ORDER BY NAME</option>
          <option value='asc'>A-Z</option>
          <option value='desc'>Z-A</option>
        </select>
      </div>
      <div>
        <select onChange={handleOnSortByAttack} name='orderAttack'>
          <option value='order'>ORDER BY ATTACK</option>
          <option value='asc'>LOW-HIGH</option>
          <option value='desc'>HIGH-LOW</option>
        </select>
      </div>
      <div>
        <select onChange={handleOnFilterByType} name='filterType'>
          <option value='filter'>FILTER BY TYPE</option>
          {types?.map((e) => {
            return (
              <option key={e.id} value={e.name}>
                {e.name.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <select onChange={handleOnFilterByCreator} name='filterCreator'>
          <option value='filter'>FILTER BY CREATOR</option>
          <option value='originals'>ORIGINAL POKEMONS</option>
          <option value='created'>MY POKEMONS</option>
        </select>
      </div>
    </div>
  );
}

export default Buttons;
