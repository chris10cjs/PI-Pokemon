import React, { useEffect } from "react";
import "./styles/App.css";

import { Route, Switch } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import NavBar from "./components/NavBar/NavBar";
import Create from "./components/Create/Create";
import { getPokemons, getTypes } from "./actions";
import { useDispatch } from "react-redux";
import { CardSearch } from "./components/CardSearch/CardSearch";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div>
      <Route exact path='/' component={Landing} />
      <NavBar />
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/search/:name' component={CardSearch} />
        <Route path='/create' component={Create} />
        <Route path='/detail/:id' component={Detail} />
      </Switch>
    </div>
  );
}

export default App;
