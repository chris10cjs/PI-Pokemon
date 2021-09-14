import "./Buttons.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions/index";

function Buttons({
  handleOnFilterByType,
  handleOnFilterByCreator,
  handleOnSortByName,
  handleOnSortByAttack,
  setSelected,
  selected,
}) {
  //--- STATES ---
  const dispatch = useDispatch();
  const { types } = useSelector((state) => ({
    types: state.types,
  }));

  const handleOnClickAll = (e) => {
    e.preventDefault();
    setSelected(true);
    dispatch(getPokemons());
  };

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
          <option selected={selected} value='filter'>
            FILTER BY TYPE
          </option>
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
          <option selected={selected} value='filter'>
            FILTER BY CREATOR
          </option>
          <option value='originals'>ORIGINAL POKEMONS</option>
          <option value='created'>MY POKEMONS</option>
        </select>
      </div>
    </div>
  );
}

export default Buttons;
