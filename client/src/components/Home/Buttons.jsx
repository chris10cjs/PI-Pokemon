import React from "react";
import { useDispatch } from "react-redux";
import { decrement, increment, getPokemons } from "../../actions";

function Buttons() {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          dispatch(increment()); //despacho la action
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          dispatch(getPokemons()); //despacho la action
        }}
      >
        Pokemons
      </button>
    </div>
  );
}

export default Buttons;
//import { connect } from "react-redux";
//function Buttons(props){}
// export default connect(null, { increment, decrement })(Buttons);
