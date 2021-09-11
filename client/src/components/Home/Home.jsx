import "./Home.css";
import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import Pagination from "../Pagination/Pagination";
import Buttons from "../Buttons/Buttons";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPokemon,
  filterByCreator,
  filterByType,
  getPokemonByName,
  sortByAttack,
  sortByName,
} from "../../actions";
import { Cards } from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";

export default function Home() {
  //--- STATES ---
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [cardPerPage] = useState(12);
  const { pokemons, isLoading } = useSelector((state) => ({
    pokemons: state.pokemons,
    isLoading: state.isLoading,
  }));

  useEffect(() => {
    setPage(1);
    dispatch(clearPokemon());
  }, [pokemons, dispatch]);

  //--- PAGINATION ---
  const indexLast = page * cardPerPage; // pag1=9, pag2-pagN=12
  const indexFirst = indexLast - cardPerPage; //
  const currentPokemons = pokemons.slice(indexFirst, indexLast);

  const pagination = (pageNumber) => {
    setPage(pageNumber);
  };

  //--- SORTS ---
  function handleOnSortByName(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
  }

  function handleOnSortByAttack(e) {
    e.preventDefault();
    dispatch(sortByAttack(e.target.value));
  }

  //--- FILTERS ---
  function handleOnFilterByType(e) {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
  }

  function handleOnFilterByCreator(e) {
    e.preventDefault();
    dispatch(filterByCreator(e.target.value));
  }

  //--- SEARCH ---
  function handleOnChange(e) {
    console.log("estoy buscando:    ", search);
    e.preventDefault();
    setSearch(e.target.value);
  }

  function handleOnClickSearch(e) {
    e.preventDefault();
    console.log("el boton funciona y agarró el valor: ", search);
    //condicional para vacio, envio alert
    dispatch(getPokemonByName(search));
    setSearch("");
  }

  //--- RENDER ---
  return (
    <>
      <NavBar />
      <div className='home_container'>
        <div className='searchButtons_container'>
          <Search
            search={search}
            handleOnChange={handleOnChange}
            handleOnClick={handleOnClickSearch}
          />
          <Buttons
            handleOnSortByName={handleOnSortByName}
            handleOnSortByAttack={handleOnSortByAttack}
            handleOnFilterByType={handleOnFilterByType}
            handleOnFilterByCreator={handleOnFilterByCreator}
          />
        </div>

        <Cards isLoading={isLoading} currentPokemons={currentPokemons} />

        <div className='searchButtons_container'>
          <Pagination
            page={page}
            cardPerPage={cardPerPage}
            pokemons={pokemons.length}
            pagination={pagination}
          ></Pagination>
        </div>
      </div>
    </>
  );
}
