import React from "react";
import "./Card.css";

export const Card = ({ name, image, types }) => {
  return (
    <div className='card_container'>
      <p>{types}</p>
      <h3 className='card-title'>{name.toUpperCase()}</h3>
      <img className='card-img' src={image} alt={name} />
      {types.map((type, index) => {
        return <div key={index}>{type}</div>;
      })}
    </div>
  );
};

/*

FORM

chequed -> para limpiarlo: state local con boolean

res POST -> 



*/
