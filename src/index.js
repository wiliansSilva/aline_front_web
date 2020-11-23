import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import login from "./components/Login"
import esqueceu from "./components/Esqueceu"
import usuarios from "./components/Usuarios"

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={login}/>
      <Route  path="/esqueceu-senha" component={esqueceu}/>
      <Route  path="/painel-usuarios" component={usuarios}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
