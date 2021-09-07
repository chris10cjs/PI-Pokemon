import React from "react";
import { NavLink } from "react-router-dom";
import { Card } from "../Card/Card";

export const Cards = ({ isLoading, currentPokemons }) => {
  return (
    <>
      {isLoading ? (
        <div className='cards_container'>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className='cards_container'>
          {currentPokemons?.map((e) => {
            return (
              <NavLink key={e.id} to={`/detail/${e.id}`}>
                <Card
                  name={e.name}
                  image={e.image}
                  id={e.id}
                  types={e.types}
                  key={e.id}
                />
              </NavLink>
            );
          })}
        </div>
      )}
    </>
  );
};
