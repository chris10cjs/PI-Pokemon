import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonDetail } from "../../actions";

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
    <div className='detail_container'>
      <h1>Detail Pokemon</h1>
      <div className='detail-card'>
        <h3>{name}</h3>
        <img src={image} alt={name} />
        <p>{hp}</p>
        <p>{attack}</p>
        <p>{defense}</p>
        <p>{speed}</p>
        <p>{height}</p>
        <p>{weight}</p>
      </div>
    </div>
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
