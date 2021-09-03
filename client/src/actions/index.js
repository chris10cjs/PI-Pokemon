import axios from "axios";
import {
  GET_POKEMONS,
  GET_POKEMON_DETAIL,
  ADD_POKEMON,
  INCREMENT,
  DECREMENT,
  SET_LOADING,
} from "./types";

const SERVER_API = "http://localhost:3001/pokemons";
const LIMIT = 10;

export function getPokemonDetail(idPokemon) {
  return async (dispatch) =>
    await axios
      .get(`${SERVER_API}/${idPokemon}`)
      .then((res) => res.data)
      .then((pokemon) => {
        dispatch({ type: GET_POKEMON_DETAIL, payload: pokemon });
      });
}

export function getPokemons() {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    await axios
      .get(`${SERVER_API}?limit=${LIMIT}`)
      .then((res) => res.data)
      .then((pokemons) => {
        dispatch({ type: GET_POKEMONS, payload: pokemons });
        dispatch({ type: SET_LOADING, payload: false });
      });
  };
}

export function addPokemon(payload) {
  return { type: ADD_POKEMON, payload };
}

export function increment(payload) {
  return { type: INCREMENT, payload };
}

export function decrement(payload) {
  return { type: DECREMENT, payload };
}

/*
thunk es un middlewere que se mete en el medio y prgunta:
  es un objeto: no hago nada.
  es una función: llama pasandole el dispatch

*/
