import "./Pagination.css";

import React from "react";

export default function Paginado({ page, cardPerPage, pokemons, pagination }) {
  const pageNumbers = [];

  //problema en Math ceil en el paginado
  for (let i = 1; i <= Math.ceil(pokemons / cardPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pagination_container'>
      <p>Page number {page}</p>
      {pageNumbers.map((number) => (
        <button
          className='pagination-btn'
          key={number}
          onClick={() => pagination(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
}
