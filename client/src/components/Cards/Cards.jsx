import "./Cards.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { Card } from "../Card/Card";

const IMG_DEFAULT =
  "https://i.pinimg.com/originals/df/ba/1d/dfba1d3d9d826279418a16dd56935713.png";

export const Cards = ({ isLoading, currentPokemons }) => {
  return (
    <div className='cards_main'>
      {isLoading ? (
        <div className='loader_container'>
          <div className='wrapper'>
            <div className='pokeball'></div>
          </div>
        </div>
      ) : (
        <div className='cards_container'>
          {currentPokemons?.map((e) => {
            return (
              <NavLink key={e.id} to={`/detail/${e.id}`}>
                <Card
                  id={e.id}
                  key={e.id}
                  name={e.name}
                  number={e.id}
                  image={e.image ? e.image : IMG_DEFAULT}
                  types={e.types}
                />
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
};
