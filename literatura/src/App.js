
import * as React from 'react'
import HomeBody from './components/homeBody.js';
import TablaPuntajes from './components/tabla.js';
import Game from './components/game.js';
import Listado from './components/listado'
import ComprensionLectora from './components/nivelesComLec.js'
import ComprensionLectoraGame from './components/nivelesComLecGame.js'
import CheckPalabra from './components/nivelesCheckPalabra.js'
import CheckPalabraGame from './components/nivelesCheckPalabraGame.js'
import CompletarPalabra from './components/nivelesCompletarPalabra.js'
import CompletarPalabraGame from './components/nivelesCompletarPalabraGame.js'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
  render() {
    return <div className="App">
      <Router>
        <Route exact path="/" render={() => { return <div><HomeBody Titulo='Juegos de Literatura'></HomeBody></div> }} ></Route>
        <Route exact path="/juego" render={() => { return <div><Game Titulo='Game'></Game></div> }} ></Route>
        <Route exact path='/puntaje' render={() => { return <div><TablaPuntajes Titulo='Puntajes'></TablaPuntajes></div> }} ></Route>
        <Route exact path='/listado' render={() => { return <div><Listado Titulo='Juegos de Literatura'></Listado></div> }} ></Route>
        <Route exact path='/listado/comprensionLectora' render={() => { return <div><ComprensionLectora Titulo='Comprensión Lectora'></ComprensionLectora></div> }} ></Route>
        <Route exact path='/listado/comprensionLectora/lvl1' render={() => { return <div><ComprensionLectoraGame Titulo='Comprensión Lectora Nivel 1' Nivel='1'></ComprensionLectoraGame></div> }} ></Route>
        <Route exact path='/listado/comprensionLectora/lvl2' render={() => { return <div><ComprensionLectoraGame Titulo='Comprensión Lectora Nivel 2' Nivel='2'></ComprensionLectoraGame></div> }} ></Route>
        <Route exact path='/listado/comprensionLectora/lvl3' render={() => { return <div><ComprensionLectoraGame Titulo='Comprensión Lectora Nivel 3' Nivel='3'></ComprensionLectoraGame></div> }} ></Route>
        <Route exact path='/listado/checkPalabra' render={() => { return <div><CheckPalabra Titulo='Palabra Bien Escrita'></CheckPalabra></div> }} ></Route>
        <Route exact path='/listado/checkPalabra/lvl1' render={() => { return <div><CheckPalabraGame Titulo='Palabra Bien Escrita Nivel 1' Nivel='1'></CheckPalabraGame></div> }} ></Route>
        <Route exact path='/listado/checkPalabra/lvl2' render={() => { return <div><CheckPalabraGame Titulo='Palabra Bien Escrita Nivel 2' Nivel='2'></CheckPalabraGame></div> }} ></Route>
        <Route exact path='/listado/checkPalabra/lvl3' render={() => { return <div><CheckPalabraGame Titulo='Palabra Bien Escrita Nivel 3' Nivel='3'></CheckPalabraGame></div> }} ></Route>
        <Route exact path='/listado/completarPalabra' render={() => { return <div><CompletarPalabra Titulo='Completar Palabra'></CompletarPalabra></div> }} ></Route>
        <Route exact path='/listado/completarPalabra/lvl1' render={() => { return <div><CompletarPalabraGame Titulo='Completar Palabra Nivel 1' Nivel='1'></CompletarPalabraGame></div> }} ></Route>
        <Route exact path='/listado/completarPalabra/lvl2' render={() => { return <div><CompletarPalabraGame Titulo='Completar Palabra Nivel 2' Nivel='2'></CompletarPalabraGame></div> }} ></Route>
        <Route exact path='/listado/completarPalabra/lvl3' render={() => { return <div><CompletarPalabraGame Titulo='Completar Palabra Nivel 3' Nivel='3'></CompletarPalabraGame></div> }} ></Route>
      </Router>
    </div>
  }
}

export default App;