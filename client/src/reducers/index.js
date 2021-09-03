import {
  GET_POKEMONS,
  // GET_POKEMON_DETAIL,
  // ADD_POKEMON,
  INCREMENT,
  DECREMENT,
  SET_LOADING,
} from "../actions/types";

const initialState = {
  pokemons: [],
  count: 0,
  isLoading: false,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: payload,
      };
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: payload,
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
