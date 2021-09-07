import "./Home.css";
import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import Buttons from "../Search/Buttons";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByCreator,
  filterByType,
  getPokemonByName,
  sortByAttack,
  sortByName,
} from "../../actions";
import { Cards } from "../Cards/Cards";

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
  }, [pokemons]);

  //--- PAGINATION ---
  const indexLast = page * cardPerPage; // pag1=9, pag2-pagN=12
  const indexFirst = indexLast - cardPerPage; //
  const currentPokemons = pokemons.slice(indexFirst, indexLast);

  const pagination = (pageNumber) => {
    setPage(pageNumber);
  };

  //--- FILTERS ---
  function handleOnFilterByType(e) {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
  }

  function handleOnFilterByCreator(e) {
    e.preventDefault();
    dispatch(filterByCreator(e.target.value));
  }

  //--- SORTS ---
  function handleOnSortByName(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
  }

  function handleOnSortByAttack(e) {
    e.preventDefault();
    dispatch(sortByAttack(e.target.value));
  }

  //--- SEARCH ---
  function handleOnChange(e) {
    console.log("estoy buscando:    ", search);
    e.preventDefault();
    setSearch(e.target.value);
  }

  function handleOnClick(e) {
    e.preventDefault();
    console.log("el boton funciona y agarró el valor: ", search);
    dispatch(getPokemonByName(search));
    setSearch("");
  }

  //--- RENDER ---
  return (
    <div className='home_container'>
      <div className='searchButtons_container'>
        <Search
          search={search}
          handleOnChange={handleOnChange}
          handleOnClick={handleOnClick}
        />
        <Buttons
          handleOnFilterByType={handleOnFilterByType}
          handleOnFilterByCreator={handleOnFilterByCreator}
          handleOnSortByName={handleOnSortByName}
          handleOnSortByAttack={handleOnSortByAttack}
        />

        <Pagination
          page={page}
          cardPerPage={cardPerPage}
          pokemons={pokemons.length}
          pagination={pagination}
        ></Pagination>
      </div>

      <Cards isLoading={isLoading} currentPokemons={currentPokemons} />

      <div className='searchButtons_container'>
        <Pagination
          cardPerPage={cardPerPage}
          pokemons={pokemons.length}
          pagination={pagination}
        ></Pagination>
      </div>
    </div>
  );
}

/*











*/
//conecta al componente y me inyecta en las props el dispatch

//import { connect } from "react-redux";
//function Home(props) {}
// function mapStateToProps(state) {
//   return {
//     count: state.count,
//   };
// }
// export default connect(mapStateToProps, { increment, decrement })(Home);
