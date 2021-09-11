import React from "react";
import "./Card.css";

export const Card = ({ name, number, image, types }) => {
  return (
    <div className='card_container'>
      <div className='card-img_cnt'>
        <img className='card-img' src={image} alt={name} />
      </div>
      <div className='card-detail'>
        <div className='card-title'>
          {name.toUpperCase()}
          <p>{}</p>
          <span>{typeof number === "number" ? `#${number}` : "created"}</span>
          {""}
        </div>
        <div>
          {types?.map((type, index) => {
            return (
              <div className='card-type' key={index}>
                <span>{type}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/*

FORM

chequed -> para limpiarlo: state local con boolean

res POST -> 



*/
