
import React from "react";
import { Redirect, Link, withRouter, useHistory } from 'react-router-dom'
import HeaderBar from "./header";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'


const lastLevel = 3;
const difficultyMapping = {
  1: {
    min: 1,
    max: 80,
    cantidad: 3,
    sweetImage: "golosina1.png",
  },
  2: {
    min: 50,
    max: 300,
    cantidad: 5,
    sweetImage: "golosina2.png",
  },
  3: {
    min: 500,
    max: 1000,
    cantidad: 7,
    sweetImage: "golosina3.png",
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  chipSizing: {
    width: 300,
    height: 70,
    fontSize: theme.typography.pxToRem(65),
  },
  bColor: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    fontSize: 50,
    border: 0,
    color: 'white',
    height: '5rem',
    width: '80%',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  bModal: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    fontSize: '1rem',
    border: 0,
    color: 'white',
    height: '2rem',
    width: '40%',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function Game(props) {
  const classes = useStyles();
  const history = useHistory();
  const nivelHabilitado = parseInt(localStorage.getItem("nivelMonedas"));
  const level = parseInt(props.level);
  const { min, max, cantidad, sweetImage } = difficultyMapping[level];
  if (level > nivelHabilitado) window.location.href = "/listado/Monedas";
  let puntajeFinal
  if (nivelHabilitado == 1) {
    puntajeFinal = 0;
    localStorage.setItem('puntajeMoneda', 0)
  }


  class GameComponent extends React.Component {
    state = {
      Monedas: [],
      finished: false,
      text: "test",
      montoTotal: (Math.floor(Math.random() * (max - min + 1)) + min) / 100,
      montoActual: 0,
      displayed: false,
      displayedError: false,
      style: {},
      beforeStyle: {
        bar: {
          position: "absolute",
          transform: "translate(-50%)",
          left: "50%",
          borderBottomLeftRadius: "18px",
          borderBottomRightRadius: "18px",
          backgroundColor: "rgba(240, 240, 240, 0.2)",
          width: "fit-content",
          align: "center",
          padding: "10px",
        },
        container: {
          position: "absolute",
          width: "80%",
          borderTopLeftRadius: "18px",
          borderTopRightRadius: "18px",
          height: "calc(100% - 150px)",
          transform: "translate(-50%)",
          backgroundColor: "rgba(240, 240, 240, 0.4)",
          left: "50%",
          top: "200px",
        },
        image: {
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          cursor: "pointer",
          marginRight: "5px",
        },
        title: {
          fontSize: "27px",
        },
        text: {
          fontSize: "40px",
          color: "#d32626",
        },
        price: {
          position: "absolute",
          fontSize: "40px",
          transform: "translate(-50%)",
          left: "50%",
          top: "215px",
          zIndex: "1",
          color: "#79d70f",
        },
        sweet: {
          position: "absolute",
          transform: "translate(-50%)",
          left: "50%",
          top: "80px",
          width: "150px",
          height: "150px",
        },
        msgNotOk: {
          position: "absolute",
          transition: "0.8s",
          display: "none",
          left: "0",
          top: "0",
        },
        msgOk: {
          position: "absolute",
          transition: "0.8s",
          display: "none",
          left: "0",
          top: "0",
        },
        button: {
          position: "absolute",
          transform: "translate(-50%, -100%)",
          left: "50%",
          top: "100%",
          textAlign: "center",
          borderRadius: "10px",
          width: "40%",
          height: "25px",
          backgroundColor: "#22F",
          fontSize: "11px",
          cursor: "pointer",
        },
      },
      afterStyle: {
        msgNotOk: {
          position: "absolute",
          transition: "0.8s",
          backgroundColor: "rgba(255, 50, 50, 0.7)",
          transform: "translate(-50%, -100%)",
          left: "50%",
          top: "calc(100% - 80px)",
          borderRadius: "15px",
          color: "#FFF",
          textShadow: "0 0 5px",
          boxShadow: "5px 5px 10px rgba(255, 50, 50, 0.7)",
          width: "300px",
          height: "55px",
        },
        msgOk: {
          position: "absolute",
          transition: "0.8s",
          backgroundColor: "rgba(50, 255, 50, 0.2)",
          transform: "translate(-50%, -100%)",
          left: "50%",
          top: "calc(100% - 80px)",
          borderRadius: "15px",
          color: "#FFF",
          textShadow: "0 0 5px",
          boxShadow: "5px 5px 10px rgba(50, 255, 50, 0.2)",
          width: "300px",
          height: "55px",
        },
      },
    };
    constructor(props) {
      super(props);
      this.state.style = this.state.beforeStyle;
    }

    componentDidMount() {
      axios.get("/api/moneda/list").then(response => {
        console.log(response.data)
        this.setState({ Monedas: response.data })
      })
    }

    sumarMonto(monto) {
      if (this.state.finished) return;
      const nuevowMonto = parseFloat(
        (this.state.montoActual + monto).toFixed(2)
      );
      if (nuevowMonto > this.state.montoTotal) {
        this.state.finished = true;
        this.mostrarMensaje(false);

      } else if (nuevowMonto === this.state.montoTotal) {



        console.log("ganaste")

        let puntajeFinal = 1000
        localStorage.setItem('puntajeMoneda', puntajeFinal + JSON.parse(localStorage.getItem('puntajeMoneda')))
        /* let  aux = puntajeFinal + JSON.parse(localStorage.getItem('puntajeCLectura'))
           aux = JSON.stringify(aux)
          // let aux2= "/api/jugadorlit/ceate/nombre/:nombre/puntaje/"
           let aux2="/api/jugadorlit/ceate/nombre/"
          aux2 = aux2.concat(localStorage.getItem('nombreJugador'))
          aux2= aux2.concat('/puntaje/')
           aux2=aux2.concat(aux)
           console.log(aux2)
    
         /* axios.post(aux2).then(res=>{
               console.log(res)
           })*/



        let aux = "/api/jugadormate/create/nombre/"
        aux = aux.concat(localStorage.getItem('nombreJugador'))
        aux = aux.concat("/puntaje/")


        let username = localStorage.getItem('nombreJugador')
        axios.get("/api/jugadormate/list").then(response => {
          console.log(response.data)

          /* for (var i = 0;i < response.data.lenght;i++)
           {
              for (var j = 0;i <response.data.lenght;j++)
              {
                  if (response.data[i].puntaje < response.data[i+1].puntaje)
                  {
                      var aux2 = response.data[i]
                      response.data[i]=response.data[i+1]
                      response.data[i+1]=aux2
                  }
              }
          }*/
          console.log(response.data)

          let existe = false
          let i = response.data.length - 1
          while (i >= 0) {
            if (response.data[i].nombre == username) {
              existe = true
              break;
            }
            i--
          }
          if (existe == true) {
            aux = aux.concat(puntajeFinal + response.data[i].puntaje)
            console.log(aux)
            axios.post(aux).then(response => {

              console.log(response.data)
            })
          }
          else {
            aux = aux.concat(puntajeFinal)
            console.log(aux)
            axios.post(aux).then(response => {

              console.log(response.data)
            })
          }


        })
          .catch((error) => {
            console.log(error)
          })

        this.state.finished = true;
        const nextLevel = level + 1;
        localStorage.setItem(
          "nivelMonedas",
          Math.max(nextLevel, nivelHabilitado)
        );
        this.mostrarMensaje(true);
      }
      this.setState({ montoActual: nuevowMonto });
    }
    mostrarMensaje(ok) {
      if (ok) {
        this.setState({ displayed: true });
      } else {
        this.setState({ displayedError: true });
      }
    }
    siguienteNivel() {
      const nextLevel = level + 1;
      if (nextLevel > 3) {
        window.location.href = "/listado/Monedas";
      } else {
        window.location.href = `./lvl${nextLevel}`;
      }
    }

    handleClickOpen = () => {
      this.setState({ displayed: true });
    };

    handleClose = () => {
      this.setState({ displayed: false });
    };

    handleMenu = () => {
      history.push('/listado');
    };

    handleTryAgain = () => {
      setTimeout(() => {
        window.location.href = window.location.href;
      }, 3000);

    }
    render() {
      if (this.state.Monedas[0] != null) {
        return (
          <div>
            <div style={this.state.style.bar}>
              {this.state.Monedas.map((moneda, i) =>
                i < cantidad ? (
                  <img
                    key={i}
                    src={require(`../img/${moneda.src}`)}
                    style={this.state.style.image}
                    onClick={() => this.sumarMonto(moneda.monto)}
                  ></img>
                ) : (
                    ""
                  )
              )}
            </div>
            <div style={this.state.style.container}>
              <div style={this.state.style.title}>
                Cuáles monedas necesitas para comprar la golosina?
            </div>
              <div style={this.state.style.text}>{this.state.montoActual}</div>
              <div
                style={this.state.style.price}
              >{`$${this.state.montoTotal}`}</div>
              <img
                style={this.state.style.sweet}
                src={require(`../img/${sweetImage}`)}
              ></img>
            </div>
            <div style={this.state.style.msgNotOk}>
              Te pasaste del precio de la golosina! Volvé a intentarlo
          </div>
            <div style={this.state.style.msgOk}>
              {level === lastLevel ? (
                "Felicitaciones... Pasaste todos los niveles!!"
              ) : (
                  <div>
                    Nivel Superado!!
                    <div
                      style={this.state.style.button}
                      onClick={this.siguienteNivel}
                    >
                      Siguiente nivel
                </div>
                  </div>
                )}
            </div>
            <Dialog
              open={this.state.displayed}
              TransitionComponent={Transition}
              keepMounted
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">{"Felicidades"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Pasaste el nivel {level}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button className={classes.bModal} onClick={this.siguienteNivel} color="primary">
                  NEXT
                        </Button>
                <Button className={classes.bModal} onClick={this.handleMenu} color="primary">
                  MENU
                        </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={this.state.displayedError}
              TransitionComponent={Transition}
              keepMounted
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">{"La proxima vas a tener mas suerte"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Fallaste el nivel {level}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button className={classes.bModal} onClick={this.handleTryAgain} color="primary">
                  REINTENTAR
                        </Button>
                <Button className={classes.bModal} onClick={this.handleMenu} color="primary">
                  MENU
                        </Button>
              </DialogActions>
            </Dialog>
          </div>

        );
      }
      else {
        return <div></div>
      }

    }
  }
  return (
    <div>
      <header>
        <HeaderBar Titulo={props.Titulo} Puntos={localStorage.getItem('puntajeMoneda')} BackTo="/listado/Monedas" />
      </header>
      <GameComponent></GameComponent>

    </div>
  );
}

export default Game;
