import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../actions";
import "./Buttons.css";

function Buttons({
  handleOnFilterByType,
  handleOnFilterByCreator,
  handleOnSortByName,
  handleOnSortByAttack,
}) {
  //--- STATES ---
  const dispatch = useDispatch();
  const { types } = useSelector((state) => ({
    types: state.types,
  }));

  //--- RESET ALL ---
  const [selected, setSelected] = useState();

  const handleOnClickAll = (e) => {
    e.preventDefault();
    setSelected(true);
    dispatch(getPokemons());
  };

  //Nueva función que setee allPokes y se lo pase a onClick

  return (
    <div className='buttons_container'>
      <div className='btns sort'>
        <select
          className='select-btns'
          onChange={handleOnSortByName}
          name='orderName'
        >
          <option selected={selected} value='order'>
            ORDER BY NAME
          </option>
          <option value='asc'>A-Z</option>
          <option value='desc'>Z-A</option>
        </select>
        <select
          className='select-btns'
          onChange={handleOnSortByAttack}
          name='orderAttack'
        >
          <option selected={selected} value='order'>
            ORDER BY ATTACK
          </option>
          <option value='asc'>LOW-HIGH</option>
          <option value='desc'>HIGH-LOW</option>
        </select>
      </div>
      <div>
        <button className='btn-all' onClick={handleOnClickAll}>
          ALL POKEMONS
        </button>
      </div>
      <div className='btns filter'>
        <select
          className='select-btns'
          onChange={handleOnFilterByType}
          name='filterType'
        >
          <option value='filter'>FILTER BY TYPE</option>
          {types?.map((e) => {
            return (
              <option key={e.id} value={e.name}>
                {e.name.toUpperCase()}
              </option>
            );
          })}
        </select>
        <select
          className='select-btns'
          onChange={handleOnFilterByCreator}
          name='filterCreator'
        >
          <option value='filter'>FILTER BY CREATOR</option>
          <option value='originals'>ORIGINAL POKEMONS</option>
          <option value='created'>MY POKEMONS</option>
        </select>
      </div>
    </div>
  );
}

export default Buttons;
