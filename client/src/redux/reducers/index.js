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
  ADD_POKEMON,
  CLEAR_POKEMON,
} from "../actions/types";

const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  pokemonDetail: {},
  isLoading: false,
};

export default function reducer(state = initialState, { type, payload }) {
  const allPokemons = state.allPokemons;

  switch (type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: payload,
        allPokemons: payload,
      };
    case GET_POKEMON_DETAIL:
      return {
        ...state,
        pokemonDetail: payload,
      };
    case GET_POKEMON_NAME:
      return {
        ...state,
        pokemons: [payload],
      };
    case GET_TYPES:
      return {
        ...state,
        types: payload,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case CLEAR_POKEMON:
      return {
        ...state,
        pokemonDetail: {},
      };
    case FILTER_BY_TYPE:
      const typesFiltered =
        payload === "filter"
          ? allPokemons
          : allPokemons.filter((e) => e.types.includes(payload));
      return {
        ...state,
        pokemons: typesFiltered,
      };
    case FILTER_BY_CREATOR:
      const creatorFiltered =
        payload === "created"
          ? allPokemons.filter((e) => e.created)
          : allPokemons.filter((e) => !e.created);

      return {
        ...state,
        pokemons: payload === "filter" ? allPokemons : creatorFiltered,
      };
    case SORT_BY_NAME:
      const sortedName =
        payload === "asc"
          ? state.pokemons.sort(function (a, b) {
              // charmander pikachu
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.name < b.name) return 1;
              if (a.name > b.name) return -1;
              return 0;
            });

      return {
        ...state,
        pokemons: sortedName,
      };
    case SORT_BY_ATTACK:
      const sortedAttack =
        payload === "asc"
          ? state.pokemons.sort(function (a, b) {
              return a.attack - b.attack;
            })
          : state.pokemons.sort(function (a, b) {
              return b.attack - a.attack;
            });
      return {
        ...state,
        pokemons: sortedAttack,
      };

    case ADD_POKEMON:
      return {
        ...state,
      };

    default:
      return state;
  }
}

/*
Redux: conjunto de Patrones para manejar el estado de mi App
  Reducer: toma una entrada y lo transforma a otra cosa
            (state, action) => { devuelve algo }
  Action: evento ocurrido para modificar el estado
            action = { type, payload }
  Store: objeto que reune las actions y los reducers. Almacen de estados

  Enviar al store las actions:
    store.dispatch({type})

*/
