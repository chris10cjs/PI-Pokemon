import axios from "axios";
import {
  SET_LOADING,
  GET_POKEMONS,
  GET_POKEMON_DETAIL,
  GET_POKEMON_NAME,
  GET_TYPES,
  FILTER_BY_TYPE,
  FILTER_BY_CREATOR,
  SORT_BY_NAME,
  SORT_BY_ATTACK,
  CLEAR_POKEMON,
} from "../actions/types";

import { POKEMONS_URL, TYPES_URL } from "../../config/constants";

export function getPokemonDetail(idPokemon) {
  return (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    axios
      .get(`${POKEMONS_URL}/${idPokemon}`)
      .then((res) => res.data)
      .then((pokemon) => {
        dispatch({ type: GET_POKEMON_DETAIL, payload: pokemon });
        dispatch({ type: SET_LOADING, payload: false });
      })
      .catch((error) => console.log(error));
  };
}

export function getPokemonByName(name) {
  return (dispatch) =>
    axios
      .get(`${POKEMONS_URL}/?name=${name}`)
      .then((res) => res.data)
      .then((pokemon) => {
        dispatch({ type: GET_POKEMON_NAME, payload: pokemon });
      })
      .catch((error) => {
        alert(`
      😢  POKEMON ${name} NOT FOUNT.
      ⚠️  Please, type the name exactly.`);
        return console.log(error);
      });
}

export function getPokemons() {
  return (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    axios
      .get(`${POKEMONS_URL}`)
      .then((res) => res.data)
      .then((pokemons) => {
        dispatch({ type: GET_POKEMONS, payload: pokemons });
        dispatch({ type: SET_LOADING, payload: false });
      })
      .catch((error) => console.log(error));
  };
}

export function getTypes() {
  return (dispatch) => {
    axios
      .get(TYPES_URL)
      .then((res) => res.data)
      .then((pokemons) => {
        dispatch({ type: GET_TYPES, payload: pokemons });
      })
      .catch((error) => console.log(error));
  };
}

export function postPokemon(payload) {
  return () => {
    axios
      .post(`${POKEMONS_URL}`, payload)
      .then((res) => res.data)
      .then((pokemon) => {
        return pokemon;
      })
      .catch((error) => console.log(error));
  };
}

export function filterByType(payload) {
  return { type: FILTER_BY_TYPE, payload };
}

export function filterByCreator(payload) {
  return { type: FILTER_BY_CREATOR, payload };
}

export function sortByName(payload) {
  return { type: SORT_BY_NAME, payload };
}

export function sortByAttack(payload) {
  return { type: SORT_BY_ATTACK, payload };
}

export function clearPokemon() {
  return { type: CLEAR_POKEMON };
}

/*
  thunk es un middlewere que se mete en el medio y pregunta:
    es un objeto: no hago nada.
    es una función: llama pasandole el dispatch
*/
