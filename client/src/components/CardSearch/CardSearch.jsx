import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPokemonByName } from "../../actions";
import { Card } from "../Card/Card";

export const CardSearch = () => {
  const { pokemon } = useSelector((state) => ({
    pokemon: state.pokemon,
  }));

  const { name } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonByName(name));
  }, [dispatch, name]);

  return (
    <div>
      <Card
        name={pokemon.name}
        image={pokemon.image}
        id={pokemon.id}
        type={pokemon.type}
      />
    </div>
  );
};
