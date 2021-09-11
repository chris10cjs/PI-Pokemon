import "./styles/App.css";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Create from "./components/Create/Create";
import { getPokemons, getTypes } from "./actions";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div>
      <Route exact path='/' component={Landing} />
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route path='/create' component={Create} />
        <Route path='/detail/:id' component={Detail} />
      </Switch>
    </div>
  );
}

export default App;
