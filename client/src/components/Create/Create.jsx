import './Create.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postPokemon } from '../../redux/actions/index';
import NavBar from '../NavBar/NavBar';
import validate from './validate';
import { useHistory } from 'react-router';

export default function Create() {
  //---HOOKS---
  const dispatch = useDispatch();
  const { push } = useHistory();

  const { types } = useSelector((state) => ({
    types: state.types,
  }));
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: '',
    image: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: [],
  });

  //
  const DISABLEDSUBMIT =
    input.name === '' ||
    input.image === '' ||
    input.hp === '' ||
    input.attack === '' ||
    input.defense === '' ||
    input.speed === '' ||
    input.height === '' ||
    input.weight === '' ||
    errors.hasOwnProperty('name') ||
    errors.hasOwnProperty('image') ||
    errors.hasOwnProperty('hp') ||
    errors.hasOwnProperty('attack') ||
    errors.hasOwnProperty('defense') ||
    errors.hasOwnProperty('height') ||
    errors.hasOwnProperty('weight') ||
    errors.hasOwnProperty('types');

  const DISABLEDINPUT = input.types.length > 1 ? true : false;

  //---DELETE INPUTs---
  const handleDelete = (typeIn) => {
    setInput({
      ...input,
      types: input.types.filter((type) => type !== typeIn),
    });
  };

  //---FORM INPUTs---
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate(
        {
          ...input,
          [e.target.name]: e.target.value,
        },
        e.target.name,
      ),
    );
  };

  //---FORM SELECT---
  const handleSelect = (e) => {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
  };

  //
  const handleOnClick = (e) => {
    setInput({
      name: '',
      image: '',
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
      types: [],
    });
  };

  //---FORM SUBMIT---
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("el boton funciona y agarró el valor: ", input);
    dispatch(postPokemon(input));
    alert('Pokemon ready! 🎉');
    push('/home');
    setInput({
      name: '',
      image: '',
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
      types: [],
    });
  };

  return (
    <>
      <NavBar />
      <div className='create_container'>
        <h3 className='create-title'>Create Pokemon</h3>
        <div className='position'>
          <form className='form_container' onSubmit={handleSubmit}>
            <div className='labelInput_cnt'>
              <label>NAME</label>
              <input
                onChange={handleChange}
                type='text'
                value={input.name.toLowerCase()}
                name='name'
              />
              {errors.name && <p className='input-errors'>{errors.name}</p>}
            </div>
            <div className='labelInput_cnt'>
              <label>IMAGE</label>
              <input onChange={handleChange} type='text' value={input.image} name='image' />
              {errors.image && <p className='input-errors'>{errors.image}</p>}
            </div>
            <div className='labelInput_cnt'>
              <label>HP</label>
              <input onChange={handleChange} type='number' value={input.hp} name='hp' />
              {errors.hp && <p className='input-errors'>{errors.hp}</p>}
              <label>SPEED</label>
              <input onChange={handleChange} type='number' value={input.speed} name='speed' />
              {errors.speed && <p className='input-errors'>{errors.speed}</p>}
            </div>
            <div className='labelInput_cnt'>
              <label>ATTACK</label>
              <input onChange={handleChange} type='number' value={input.attack} name='attack' />
              {errors.attack && <p className='input-errors'>{errors.attack}</p>}
              <label>DEFENSE</label>
              <input onChange={handleChange} type='number' value={input.defense} name='defense' />
              {errors.defense && <p className='input-errors'>{errors.defense}</p>}
            </div>
            <div className='labelInput_cnt'>
              <label>HEIGHT</label>
              <input onChange={handleChange} type='number' value={input.height} name='height' />
              {errors.height && <p className='input-errors'>{errors.height}</p>}
              <label>WEIGHT</label>
              <input onChange={handleChange} type='number' value={input.weight} name='weight' />
              {errors.weight && <p className='input-errors'>{errors.weight}</p>}
            </div>
            <div className='create-cnt_btns'>
              <select disabled={DISABLEDINPUT} className='types-select' onChange={handleSelect}>
                <option value='none' disabled hidden>
                  TYPES
                </option>
                {types?.map((e, i) => {
                  return (
                    <option key={i} value={e.name}>
                      {e.name.toUpperCase()}
                    </option>
                  );
                })}
              </select>
              <button className={DISABLEDSUBMIT ? 'display-none' : 'btn-create'} type='submit'>
                Create Now!
              </button>
            </div>
          </form>
          <div className='position-btn'>
            {input.types?.map((typeIn, i) => (
              <div key={i}>
                <p style={{ display: 'inline-block' }}>{typeIn.toUpperCase()}</p>
                <button style={{ color: 'red' }} onClick={() => handleDelete(typeIn)}>
                  clear
                </button>
              </div>
            ))}
          </div>
          <button className='create-clear' onClick={handleOnClick}>
            CLEAR ALL
          </button>
        </div>
      </div>
    </>
  );
}
