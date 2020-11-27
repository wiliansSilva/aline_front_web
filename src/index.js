import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import login from "./components/Login"
import esqueceu from "./components/Esqueceu"
import usuarios from "./components/Usuarios"
import exercicios from "./components/Exercicios"
import esqueceu2 from "./components/Esqueceu2"

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={login}/>
      <Route  path="/esqueceu-senha" component={esqueceu}/>
      <Route  path="/painel-usuarios" component={usuarios}/>
      <Route  path="/painel-exercicios" component={exercicios}/>
      <Route  path="/esqueceu-senha2" component ={esqueceu2}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
