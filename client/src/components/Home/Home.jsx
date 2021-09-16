import "./Home.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../Search/Search";
import Pagination from "../Pagination/Pagination";
import Buttons from "../Buttons/Buttons";
import { Cards } from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import {
  clearPokemon,
  filterByCreator,
  filterByType,
  getPokemonByName,
  sortByAttack,
  sortByName,
} from "../../redux/actions/index";

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

  //--- RESET ---
  const [selected, setSelected] = useState();

  useEffect(() => {
    setPage(1);
    dispatch(clearPokemon());
  }, [pokemons, dispatch]);

  //--- PAGINATION ---
  const indexLast = page * cardPerPage; //
  const indexFirst = indexLast - cardPerPage; //
  const currentPokemons = pokemons.slice(indexFirst, indexLast);

  const pagination = (pageNumber) => {
    setPage(pageNumber);
  };

  //--- SORTS ---
  function handleOnSortByName(e) {
    e.preventDefault();
    setSelected(false);
    dispatch(sortByName(e.target.value));
  }

  function handleOnSortByAttack(e) {
    e.preventDefault();
    setSelected(false);
    dispatch(sortByAttack(e.target.value));
  }

  //--- FILTERS ---
  function handleOnFilterByType(e) {
    e.preventDefault();
    setSelected(false);
    dispatch(filterByType(e.target.value));
  }

  function handleOnFilterByCreator(e) {
    e.preventDefault();
    setSelected(false);
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
            setSelected={setSelected}
            selected={selected}
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
