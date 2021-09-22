import * as React from 'react'
import HomeBody from './components/homeBody.js';
import TablaPuntajes from './components/tabla.js';
import Game from './components/game.js';
import Listado from './components/listado'
import MayorMenor from './components/nivelesMayorMenor.js'
import CheckCuentas from './components/nivelesCheckCuentas.js'
import Monedas from './components/nivelesMonedas.js'
import MonedasGame from './components/nivelesMonedasGame.js'
import CheckCuentasGame from './components/nivelesCheckCuentasGame.js'
import MayorMenorGame from './components/nivelesMayorMenorGame.js'


import './App.css';
import { BrowserRouter as Router, Route, Link, render } from 'react-router-dom'

class App extends React.Component {
  render() {
    return <div className="App">
      <Router>
        <Route exact path="/" render={() => { return <div><HomeBody Titulo='Juegos de Matematica'></HomeBody></div> }} ></Route>
        <Route exact path="/juego" render={() => { return <div><Game Titulo='Game'></Game></div> }} ></Route>
        <Route exact path='/puntaje' render={() => { return <div><TablaPuntajes Titulo='Puntajes'></TablaPuntajes></div> }} ></Route>
        <Route exact path='/listado' render={() => { return <div><Listado Titulo='Juegos de Matematica'></Listado></div> }} ></Route>
        <Route exact path='/listado/MayorMenor' render={() => { return <div><MayorMenor Titulo='¿Mayor o Menor?'></MayorMenor></div> }} ></Route>
        <Route exact path='/listado/MayorMenor/lvl1' render={() => { return <div><MayorMenorGame Titulo='¿Mayor o Menor? Nivel 1' level={1}></MayorMenorGame></div> }} ></Route>
        <Route exact path='/listado/MayorMenor/lvl2' render={() => { return <div><MayorMenorGame Titulo='¿Mayor o Menor? Nivel 2' level={2}></MayorMenorGame></div> }} ></Route>
        <Route exact path='/listado/MayorMenor/lvl3' render={() => { return <div><MayorMenorGame Titulo='¿Mayor o Menor? Nivel 3' level={3}></MayorMenorGame></div> }} ></Route>
        <Route exact path='/listado/CheckCuentas' render={() => { return <div><CheckCuentas Titulo='Haciendo Cuentas'></CheckCuentas></div> }} ></Route>
        <Route exact path='/listado/CheckCuentas/lvl1' render={() => { return <div><CheckCuentasGame Titulo='Haciendo Cuentas Nivel 1' Nivel='1'></CheckCuentasGame></div> }} ></Route>
        <Route exact path='/listado/CheckCuentas/lvl2' render={() => { return <div><CheckCuentasGame Titulo='Haciendo Cuentas Nivel 2' Nivel='2'></CheckCuentasGame></div> }} ></Route>
        <Route exact path='/listado/CheckCuentas/lvl3' render={() => { return <div><CheckCuentasGame Titulo='Haciendo Cuentas Nivel 3' Nivel='3'></CheckCuentasGame></div> }} ></Route>
        <Route exact path='/listado/Monedas' render={() => { return <div><Monedas Titulo='¿Qué monedas necesito?'></Monedas></div> }} ></Route>
        <Route exact path='/listado/Monedas/lvl1' render={() => { return <div><MonedasGame Titulo='¿Qué monedas necesito? Nivel 1' level={1}></MonedasGame></div> }} ></Route>
        <Route exact path='/listado/Monedas/lvl2' render={() => { return <div><MonedasGame Titulo='¿Qué monedas necesito? Nivel 2' level={2}></MonedasGame></div> }} ></Route>
        <Route exact path='/listado/Monedas/lvl3' render={() => { return <div><MonedasGame Titulo='¿Qué monedas necesito? Nivel 3' level={3}></MonedasGame></div> }} ></Route>

      </Router>
    </div>
  }
}

export default App;