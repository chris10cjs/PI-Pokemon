import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { postPokemon } from "../../actions";
import NavBar from "../NavBar/NavBar";
import "./Create.css";

//---VALIDATE---
const validate = (input) => {
  let errors = {};
  if (!input.name.trim()) {
    errors.name = "Name is required";
  }
  return errors;
};

export default function Create() {
  //---HOOKS---
  const dispatch = useDispatch();
  const history = useHistory();
  const { types } = useSelector((state) => ({
    types: state.types,
  }));
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    image: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
  });

  //---DELETE INPUTs---
  const handleDelete = (typeIn) => {
    setInput({
      ...input,
      types: input.types.filter((type) => type !== typeIn),
    });
  };

  //---FORM INPUTs---
  const handleChange = (e) => {
    console.log(`${e.target.name}:${e.target.value}`);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  //---FORM CHECK---
  // const handleCheck = (e) => {
  //   if (e.target.checked) {
  //     console.log(`types:${e.target.value}`);
  //     setInput({
  //       ...input,
  //       types: e.target.value,
  //     });
  //   }
  // };

  //---FORM SELECT---
  const handleSelect = (e) => {
    console.log(`types:${e.target.value}`);
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
  };

  //
  const handleOnClick = (e) => {
    setInput({
      name: "",
      image: "",
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
    console.log("el boton funciona y agarró el valor: ", input);
    dispatch(postPokemon(input));
    alert("Pokemon ready! 🎉");
    setInput({
      name: "",
      image: "",
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
      types: [],
    });
    history.push("/home");
  };

  return (
    <>
      <NavBar />
      <div className='create_container'>
        <h3 className='create-title'>Create Pokemon</h3>
        <form className='form_container' onSubmit={handleSubmit}>
          <div className='labelInput_cnt'>
            <label>NAME</label>
            <input
              onChange={handleChange}
              type='text'
              value={input.name}
              name='name'
            />
            {errors.name && (
              <p style={{ color: "red", display: "inline-block" }}>
                {errors.name}
              </p>
            )}
          </div>
          <div className='labelInput_cnt'>
            <label>IMAGE</label>
            <input
              onChange={handleChange}
              type='text'
              value={input.image}
              name='image'
            />
          </div>
          <div className='labelInput_cnt'>
            <label>HP</label>
            <input
              onChange={handleChange}
              type='number'
              value={input.hp}
              name='hp'
            />
          </div>
          <div className='labelInput_cnt'>
            <label>ATTACK</label>
            <input
              onChange={handleChange}
              type='number'
              value={input.attack}
              name='attack'
            />
            <label>DEFENSE</label>
            <input
              onChange={handleChange}
              type='number'
              value={input.defense}
              name='defense'
            />
          </div>
          <div className='labelInput_cnt'>
            <label>HEIGHT</label>
            <input
              onChange={handleChange}
              type='number'
              value={input.height}
              name='height'
            />
            <label>WEIGHT</label>
            <input
              onChange={handleChange}
              type='number'
              value={input.weight}
              name='weight'
            />
          </div>
          {/* <div className='form-check'>
          <label>Types: </label>
          <div className='check_container'>
            {types?.map((e) => {
              return (
                <label key={e.id} className='check_options'>
                  <input
                    onChange={handleCheck}
                    type='checkbox'
                    name={e.name}
                    value={e.name}
                  />
                  {e.name}
                </label>
              );
            })}
          </div>
        </div> */}
          <select onChange={handleSelect}>
            <option size='5' value='filter'>
              TYPES
            </option>
            {types?.map((e) => {
              return (
                <option key={e.id} value={e.name}>
                  {e.name.toUpperCase()}
                </option>
              );
            })}
          </select>
          <button type='submit'>Create Now!</button>
        </form>

        {input.types?.map((typeIn) => (
          <div>
            <p style={{ display: "inline-block" }}>{typeIn.toUpperCase()}</p>
            <button
              style={{ color: "red" }}
              onClick={() => handleDelete(typeIn)}
            >
              clear
            </button>
          </div>
        ))}

        <button className='create-clear' onClick={handleOnClick}>
          CLEAR ALL
        </button>
      </div>
    </>
  );
}
