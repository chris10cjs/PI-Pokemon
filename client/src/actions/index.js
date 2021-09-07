import axios from "axios";
import {
  SET_LOADING,
  GET_POKEMONS,
  GET_POKEMON_DETAIL,
  GET_POKEMON_NAME,
  GET_TYPES,
  ADD_POKEMON,
  FILTER_BY_TYPE,
  FILTER_BY_CREATOR,
  SORT_BY_NAME,
  SORT_BY_ATTACK,
} from "./types";

import { POKEMONS_URL, TYPES_URL } from "../config/constants";

export function getPokemonDetail(idPokemon) {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    await axios
      .get(`${POKEMONS_URL}/${idPokemon}`)
      .then((res) => res.data)
      .then((pokemon) => {
        dispatch({ type: GET_POKEMON_DETAIL, payload: pokemon });
        dispatch({ type: SET_LOADING, payload: false });
      });
  };
}

export function getPokemonByName(name) {
  return async (dispatch) =>
    await axios
      .get(`${POKEMONS_URL}/?name=${name}`)
      .then((res) => res.data)
      .then((pokemon) => {
        dispatch({ type: GET_POKEMON_NAME, payload: pokemon });
      });
}

export function getPokemons() {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    await axios
      .get(`${POKEMONS_URL}`)
      .then((res) => res.data)
      .then((pokemons) => {
        dispatch({ type: GET_POKEMONS, payload: pokemons });
        dispatch({ type: SET_LOADING, payload: false });
      });
  };
}

export function getTypes() {
  return async (dispatch) => {
    // dispatch({ type: SET_LOADING, payload: true });
    await axios
      .get(TYPES_URL)
      .then((res) => res.data)
      .then((pokemons) => {
        dispatch({ type: GET_TYPES, payload: pokemons });
        // dispatch({ type: SET_LOADING, payload: false });
      });
  };
}

export function addPokemon(payload) {
  return { type: ADD_POKEMON, payload };
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

/*
thunk es un middlewere que se mete en el medio y pregunta:
  es un objeto: no hago nada.
  es una función: llama pasandole el dispatch
*/
