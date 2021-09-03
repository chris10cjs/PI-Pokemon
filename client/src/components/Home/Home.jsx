import React from "react";
import { useSelector } from "react-redux";
//import { NavLink } from "react-router-dom";
import Buttons from "./Buttons";
import "./Home.css";

function Home() {
  const { count, pokemons, isLoading } = useSelector((state) => ({
    count: state.count,
    pokemons: state.pokemons,
    isLoading: state.isLoading,
  }));
  return (
    <div className='container'>
      <h1>Contador Pokemon: {count}</h1>
      <Buttons />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {pokemons?.map((e) => {
            return (
              <div key={e.id}>
                <img src={e.image} alt={e.name} />
                <h3>{e.id}</h3>
                <h3>{e.name}</h3>
                <p>{e.type?.map((e) => e.name)}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Home;

/*











  <Link to={"/details/" + e.id}>
    <Card
      name={e.name}
      types={e.types.map((el) => el.name + " ")}
      image={e.image}
      key={e.id}
    ></Card>
  </Link>
 










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
