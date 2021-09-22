import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import HeaderBar from "./header";
import React from "react";
import { Redirect, Link, withRouter, useHistory } from 'react-router-dom'
import desigualdades from "./desigualdades";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    display: "inline-block",
  },
  chipSizing: {
    width: 300,
    height: 70,
    fontSize: theme.typography.pxToRem(50),
  },
  radSizing: {
    width: 180,
    height: 70,
    fontSize: theme.typography.pxToRem(10),
    color: "white",
  },
  bColor: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    fontSize:50,
    border: 0,
    color: 'white',
    height: '5rem',
    width: '80%',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  bModal: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    fontSize:'1rem',
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

function ImgMediaCard(props) {
  const nivelHabilitado = localStorage.getItem("nivelMayorMenor");
  if (props.level > nivelHabilitado)
    window.location.href = "/listado/MayorMenor";
  const classes = useStyles();
  const history = useHistory();
  const porcentaje = 0.7;
  const difficultyMapping = {
    1: {
      min: 1,
      max: 10,
      cantidad: 9,
    },
    2: {
      min: 10,
      max: 100,
      cantidad: 9,
    },
    3: {
      min: 50,
      max: 150,
      cantidad: 9,
    },
  };
  const { min, max, cantidad } = difficultyMapping[props.level];

  // en {props.Nivel} queda el nivel donde se hizo click
 // let desigualdadesAMostrar = desigualdades.random(cantidad, min, max);



 
 let puntajeFinal
 if (nivelHabilitado == 1) {
     puntajeFinal = 0;
     localStorage.setItem('puntajeCheckDesigualdad', 0)
 }


  class Pregunta extends React.Component {
    constructor()
   {
    super()
    this.state = {
      desigualdadesAMostrar: [],
      show: true,
      displayed: false,
      displayedError: false,
      respuestas: ".,"
        .repeat(10)
        .split(",")
        .slice(0, 10),
       // respuestas : [1,1,1,1,1,1,1,1,1,1]
    };
  }

    componentDidMount ()
    {
      axios.get("/api/desigualdad/list").then(response =>{
        let desigualdades = response.data
        console.log(response.data)
      //  let cuentas = response.data
        console.log(response.data)
        let desigualdadesDisponibles = []
        let aux = []
        for (var i in desigualdades)
        {
            if (desigualdades[i].difficultad == nivelHabilitado)
            desigualdadesDisponibles.push(desigualdades[i])
        }
        for (let i = 0;i < 10;i++)
        {
            let numAleatorio = Math.floor(Math.random() * desigualdadesDisponibles.length);
            aux.push(desigualdadesDisponibles[numAleatorio]);
            desigualdadesDisponibles.splice(numAleatorio, 1);
        }
        this.setState({desigualdadesAMostrar:aux})
        console.log(aux)
     
        this.render()
      })
    }

    // eslint-disable-next-line react/no-direct-mutation-state
    modificar = (e) => (this.state.respuestas[e.target.name] = e.target.value);

    enviarRespuesta = () => {
      console.log(this.state.respuestas)
 
      let aux = []
      for (let i = 0; i<10;i++)
      {

        if (this.state.respuestas[i] == "true")
        {
          
          aux [i] = 1
        }
        else if (this.state.respuestas[i] == "false")
        {
          aux[i] = 0
        }
        
      }
      console.log(aux)
      let puntaje = 0;
      for (let i = 0; i < aux.length; i++) {
        const correcto =
          aux[i] === this.state.desigualdadesAMostrar[i].verdad;
        puntaje += correcto;
      }
      console.log(puntaje);
      const minimas = Math.ceil(porcentaje * aux.length);

      if (puntaje  >= 5) {
        const siguienteNivel = props.level + 1;

        
        console.log(puntaje)
   
            console.log("ganaste")
                        
        let puntajeFinal = puntaje * 100
        localStorage.setItem('puntajeCheckDesigualdad', puntajeFinal + JSON.parse(localStorage.getItem('puntajeCheckDesigualdad')))
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

          
           
        let aux= "/api/jugadormate/create/nombre/"
            aux = aux.concat( localStorage.getItem('nombreJugador'))
           aux = aux.concat("/puntaje/")

           
           let username = localStorage.getItem('nombreJugador')
           axios.get("/api/jugadormate/list").then(response =>
               {
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
                    let i = response.data.length -1
                   while (i >= 0 )
                   {
                       if (response.data[i].nombre == username)
                       {
                           existe = true
                           break;
                       }
                       i--
                   }
                   if (existe == true)
                   {
                       aux = aux.concat(puntajeFinal + response.data[i].puntaje)
                       console.log(aux)
                       axios.post(aux).then(response =>{
       
                           console.log(response.data)
                       })
                   }
                   else
                   {
                       aux = aux.concat(puntajeFinal)
                       console.log(aux)
                       axios.post(aux).then(response =>{
       
                           console.log(response.data)
                       })
                   }


               })
               .catch((error)=>
               {
                   console.log(error)
               })





        localStorage.setItem(
          "nivelMayorMenor",
          Math.max(siguienteNivel, nivelHabilitado)
        );
        if (!difficultyMapping[siguienteNivel]) this.setState({displayed:true})
        else {
          this.setState({displayed:true});
        }
      } else
      this.setState({displayedError:true});
    };

    handleClickOpen = () => {
      this.setState({displayed:true});
    };
  
  handleClose = () => {
      this.setState({displayed:false});
      this.setState({displayedError:false});
    };
  
  handleMenu = () => {
      history.push('/listado');
    };

  handleNextLevel = () =>{
    if (props.level < 3){
    const siguienteNivel = props.level + 1;
        window.location.href = `./lvl${siguienteNivel}`;
    }
    else{
      history.push('/listado');
    }
      }
      

  handleTryAgain = () =>{
    window.location.href = `./lvl${props.level}`;
  }

    render() {
      if (this.state.show == true,this.state.desigualdadesAMostrar[0]!=null) {
        console.log(this.state.desigualdadesAMostrar)
        /*console.log(
          "this.state.respuestas.length",
          this.state.respuestas.length
        );*/
        console.log("json", JSON.stringify(this.state.respuestas, null, 2));
        return (
          <div className="bg_cuentasNivel">
          <h1 style={{ color: "#FFF" }}>A resolver las desigualdades...</h1>
            {/*<h3>{Palabra.palabra}</h3>
                    <Button variant="contained" color="primary" onClick={() => this.enviarRespuesta(Palabra.estaBienEscrito, "true")}> Si </Button>
                    <Button variant="contained" color="primary" onClick={() => this.enviarRespuesta(Palabra.estaBienEscrito, "false")}> No </Button>
                    */}

            <FormControl component="fieldset" onSubmit={this.enviarRespuesta}>
              <div className="row">
                {this.state.respuestas.map((respuesta, i) => (
                  <Card
                    key={i}
                    className={classes.root}
                    style={{ backgroundColor: "rgba(255,255,255,0)" }}
                  >
                    <CardContent>
                      <Chip
                        className={classes.chipSizing}
                        color="primary"
                        label={this.state.desigualdadesAMostrar[i].desigualdad}
                      />
                      <FormLabel component="legend"></FormLabel>
                      <RadioGroup
                        aria-label="position"
                        name="position"
                        defaultValue="top"
                        style={{ color: "white", textShadow: "0 0 10px" }}
                      >
                        <FormControlLabel
                          onChange={this.modificar}
                          name={`${i}`}
                          value="true"
                          control={
                            <Radio color="primary" style={{ color: "white" }} />
                          }
                          label="Verdadero"
                        />
                        <FormControlLabel
                          onChange={this.modificar}
                          name={`${i}`}
                          value="false"
                          control={
                            <Radio color="primary" style={{ color: "white" }} />
                          }
                          label="Falso"
                        />
                      </RadioGroup>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="cuenta">
                <Button
                  className={classes.bColor}
                  onClick={this.enviarRespuesta}
                >
                  {" "}
                  TERMINE{" "}
                </Button>
              </div>
            </FormControl>
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
                            Pasaste el nivel {props.level} 
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button className={classes.bModal} onClick={this.handleNextLevel} color="primary">
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
                        <DialogTitle id="alert-dialog-slide-title">{"La proxima vas a tener mas suerte!"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Fallaste el nivel {props.level}
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button className={classes.bModal} onClick={this.handleTryAgain} color="primary">
                            REINTENTE EL NIVEL
                        </Button>
                        <Button className={classes.bModal} onClick={this.handleMenu} color="primary">
                            MENU
                        </Button>
                        </DialogActions>
                    </Dialog>
          </div>
        );
      } else {
        return <div></div>;
      }
    }
  }

  return (
    <div>
      <header>
        <HeaderBar Titulo={props.Titulo} Puntos={localStorage.getItem('puntajeCheckDesigualdad')} BackTo="/listado/MayorMenor" />
      </header>
      
      <Pregunta></Pregunta>
    </div>
  );
}

export default ImgMediaCard;
