import './Detail.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getPokemonDetail } from '../../redux/actions/index';
import NavBar from '../NavBar/NavBar';
import Pokebola from '../Card/Pokebola';

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { pokemonDetail } = useSelector((state) => ({
    pokemonDetail: state.pokemonDetail,
  }));
  const { name, image, hp, attack, defense, speed, height, weight, types } = pokemonDetail;

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
          {!image ? (
            <div className='img-detail'>
              <Pokebola />
            </div>
          ) : (
            <img className='img-detail' src={image} alt={name} />
          )}

          <div className='detail-card'>
            <span className='detail-card_number'>{id.includes('-') ? 'created' : `#${id}`}</span>
            {''}
            <h3>Name: {name}</h3>
            <p>HP: {hp}</p>
            <div className='detail-spec_cnt'>
              <p>Attack: {attack}</p>
              <p>Defense: {defense}</p>
            </div>
            <div className='detail-spec_cnt'>
              <p>Height: {height}</p>
              <p>Weight: {weight}</p>
            </div>
            <p>Speed: {speed}</p>
            <div className='types'>
              {types?.map((type, index) => {
                return (
                  <div className='detail-types' key={index}>
                    <span>{type}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <NavLink to='/home'>
          <button className='back'>GO BACK</button>
        </NavLink>
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
