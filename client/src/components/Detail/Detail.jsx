import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonDetail } from "../../actions";
import NavBar from "../NavBar/NavBar";

import "./Detail.css";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { pokemonDetail } = useSelector((state) => ({
    pokemonDetail: state.pokemonDetail,
  }));
  const { name, image, hp, attack, defense, speed, height, weight } =
    pokemonDetail;

  useEffect(() => {
    dispatch(getPokemonDetail(id));
  }, [dispatch, id]);

  return (
    <>
      <NavBar />
      <div className='detail_container'>
        <div className='title_cnt'>
          <p className='title_name'>{name?.toUpperCase()} </p>
        </div>
        <div className='items_container'>
          <img src={image} alt={name} />
          <div className='detail-card'>
            <h3>Name: {name}</h3>
            <p>HP: {hp}</p>
            <p>Attack: {attack}</p>
            <p>Defense: {defense}</p>
            <p>Speed: {speed}</p>
            <p>Height: {height}</p>
            <p>Weight: {weight}</p>
          </div>
        </div>
        <button className='back'>GO BACK</button>
      </div>
    </>
  );
}

/*
  hp(pin):78
  attack(pin):84
  defense(pin):78
  speed(pin):100
  height(pin):17
  weight(pin):905

*/
