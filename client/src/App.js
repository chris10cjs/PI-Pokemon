import React from "react";
import "./styles/App.css";

import { Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import NavBar from "./components/NavBar/NavBar";
import Create from "./components/Create/Create";

function App() {
  return (
    <div className='App'>
      <NavBar className='App-header' />
      <Route exact path='/' component={Landing} />
      <Route path='/home' component={Home} />
      <Route path='/detail' component={Detail} />
      <Route path='/create' component={Create} />
    </div>
  );
}

export default App;
