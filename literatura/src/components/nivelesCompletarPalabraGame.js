import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Button from '@material-ui/core/Button';
import HeaderBar from './header'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Chip from '@material-ui/core/Chip';

import { Redirect, Link, withRouter, useHistory } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import axios from 'axios'

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

let puntajeFinal
function ImgMediaCard(props) {
    const classes = useStyles();
    const history = useHistory();
   
    let nivelHabilitado = localStorage.getItem('nivelCompletarPalabra') != null ? localStorage.getItem('nivelCompletarPalabra') : 1;
    console.log(nivelHabilitado)
    if (nivelHabilitado === 1) {
        puntajeFinal = 0
        localStorage.setItem('puntajeCompPal', 0)
    }
   /* switch (nivelHabilitado) {
        case 1:
            palabrasJSON = palabras;

            break;
        case 2:
            palabrasJSON = palabraslvl2;
            break;
        case 3:
            palabrasJSON = palabraslvl3;
            break;
        default:
            palabrasJSON = palabraslvl3;
            break;
    }*/



    class JuegoCompletar extends React.Component {
        constructor()
        {
            super()
        this.state = {
            show: true,
            displayed: false,
            displayedError: false,
            respuestas: [10],
            palabrasAMostrar:[],
            palabrasDisponibles:[]

        }
    }

    componentDidMount ()
    {
        let aux = []
       /* for (var i in palabrasJSON){
            this.state.palabrasDisponibles.push(palabrasJSON[i]);
        }
        for (let i = 0; i < 10; i++) {
            let numAleatorio = Math.floor(Math.random() * this.state.palabrasDisponibles.length);
            this.state.palabrasAMostrar.push(this.state.palabrasDisponibles[numAleatorio]);
            this.state.palabrasDisponibles.splice(numAleatorio, 1);
        }*/
        axios.get("/api/palabracompletar/list").then(response=>{
            let palabrasJSON
            palabrasJSON = response.data;
            console.log(palabrasJSON)
            
            for (var i in palabrasJSON){
                if(palabrasJSON[i].difficultad == nivelHabilitado)
                this.state.palabrasDisponibles.push(palabrasJSON[i]);
            }
          
            for (let i = 0; i < 10; i++) {
                let numAleatorio = Math.floor(Math.random() * this.state.palabrasDisponibles.length);
                 aux.push(this.state.palabrasDisponibles[numAleatorio]);
                this.state.palabrasDisponibles.splice(numAleatorio, 1);
            }
        this.setState({palabrasAMostrar:aux})
        console.log(this.state.palabrasAMostrar)
           this.render()
        })
        
    }


        handleClickOpen = () => {
            this.setState({displayed:true});
          };
        
        handleClose = () => {
            this.setState({displayed:false});
          };
        
        handleMenu = () => {
            history.push('/listado');
          };

          handleNextLevel = () =>{
            console.log(props.Nivel)
            switch (props.Nivel){
                case '1':{
                    history.push('/listado/completarPalabra/lvl2')
                    break;}
                case '2':{
                    history.push('/listado/completarPalabra/lvl3')
                    break;}
                case '3':{
                    history.push('/listado');
                    break;}
            }
            
        }

        handleTryAgain = () =>{
            switch (props.Nivel){
                case '1':{
                    history.push('/listado/completarPalabra/lvl1');
                    break;}
                case '2':{
                    history.push('/listado/completarPalabra/lvl2')
                    break;}
                case '3':{
                    history.push('/listado/completarPalabra/lvl3')
                    break;}
            }
        }

        modificar = (e) => {
            let aux = e.target.name
            parseInt(aux)
            this.state.respuestas[aux] = e.target.value
            console.log(this.state.respuestas)
        }

        enviarRespuesta = (e) => {

            let puntaje = 0

            for (let i = 0; i < this.state.respuestas.length; i++) {
                if (this.state.respuestas[i] === this.state.palabrasAMostrar[i].letraFaltante) {
                    puntaje++;
                }
            }

            if (puntaje >= 8) {
                e.show = false
                puntajeFinal = puntaje * 100
                localStorage.setItem('puntajeCompPal', puntajeFinal + JSON.parse(localStorage.getItem('puntajeCompPal')))

              
                
             let aux= "/api/jugadorlit/ceate/nombre/"
                 aux = aux.concat( localStorage.getItem('nombreJugador'))
                aux = aux.concat("/puntaje/")
                 let username = localStorage.getItem('nombreJugador')

                axios.get("/api/jugadorlit/list").then(response =>
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
                if (props.Nivel === '1') {
                    if (nivelHabilitado === '1') {
                        nivelHabilitado++;
                        localStorage.setItem('nivelCompletarPalabra', nivelHabilitado)
                    }
                    this.setState({displayed:true});
                } else if (props.Nivel === '2') {
                    if (nivelHabilitado === '2') {
                        nivelHabilitado++;
                        localStorage.setItem('nivelCompletarPalabra', nivelHabilitado)
                    }
                    this.setState({displayed:true});
                } else {
                    this.setState({displayed:true});
                }
            } else {
                if (props.Nivel === '1') {
                    this.setState({displayedError:true});
                } else if (props.Nivel === '2') {
                    this.setState({displayedError:true});
                } else {
                    this.setState({displayedError:true});
                }
            }
            console.log(puntaje)


        }

        render() {
            if (this.state.show === true,this.state.palabrasAMostrar[0]!=null) {
                return (<div>


                    <div className="row">
                        <Chip className={classes.chipSizing} color="primary" label={this.state.palabrasAMostrar[0].palabra} />

                        <div>
                            <textarea onChange={this.modificar} name="0" control={<Radio color="primary" />} label="Si" />
                        </div>
                    </div>
                    <div className="row">
                        <Chip className={classes.chipSizing} color="primary" label={this.state.palabrasAMostrar[1].palabra} />

                        <div>
                            <textarea onChange={this.modificar} name="1" control={<Radio color="primary" />} label="Si" />
                        </div>
                    </div>
                    <div className="row">

                        <Chip className={classes.chipSizing} color="primary" label={this.state.palabrasAMostrar[2].palabra} />

                        <div>
                            <textarea onChange={this.modificar} name="2" control={<Radio color="primary" />} label="Si" />
                        </div>
                    </div>
                    <div className="row">

                        <Chip className={classes.chipSizing} color="primary" label={this.state.palabrasAMostrar[3].palabra} />

                        <div>
                            <textarea onChange={this.modificar} name="3" control={<Radio color="primary" />} label="Si" />
                        </div>
                    </div>
                    <div className="row">
                        <Chip className={classes.chipSizing} color="primary" label={this.state.palabrasAMostrar[4].palabra} />

                        <div>
                            <textarea onChange={this.modificar} name="4" control={<Radio color="primary" />} label="Si" />
                        </div>
                    </div>
                    <div className="row">
                        <Chip className={classes.chipSizing} color="primary" label={this.state.palabrasAMostrar[5].palabra} />

                        <div>
                            <textarea onChange={this.modificar} name="5" control={<Radio color="primary" />} label="Si" />
                        </div>
                    </div>
                    <div className="row">
                        <Chip className={classes.chipSizing} color="primary" label={this.state.palabrasAMostrar[6].palabra} />

                        <div>
                            <textarea onChange={this.modificar} name="6" control={<Radio color="primary" />} label="Si" />
                        </div>
                    </div>
                    <div className="row">
                        <Chip className={classes.chipSizing} color="primary" label={this.state.palabrasAMostrar[7].palabra} />

                        <div>
                            <textarea onChange={this.modificar} name="7" control={<Radio color="primary" />} label="Si" />
                        </div>
                    </div>
                    <div className="row">
                        <Chip className={classes.chipSizing} color="primary" label={this.state.palabrasAMostrar[8].palabra} />

                        <div>
                            <textarea onChange={this.modificar} name="8" control={<Radio color="primary" />} label="Si" />
                        </div>
                    </div>
                    <div className="row">
                        <Chip className={classes.chipSizing} color="primary" label={this.state.palabrasAMostrar[9].palabra} />

                        <div>
                            <textarea onChange={this.modificar} name="9" control={<Radio color="primary" />} label="Si" />
                        </div>
                    </div>
                    <div>
                        <Button className={classes.bColor} variant="contained" color="primary" onClick={this.enviarRespuesta}> Comprobar </Button>
                    </div>

                    <Dialog
                        open={this.state.displayed}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">{"Felicidades!"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                           Pasaste el nivel {props.Nivel} 
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
                        <DialogTitle id="alert-dialog-slide-title">{"LA PROXIMA VAS A TENER MAS SUERTE!!!!!!!!!"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                           Fallaste el nivel {props.Nivel} 
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


                </div>)
            }
            else {
                return <div></div>
            }

        }

    }


    let titulo = "Completar Palabra nivel: " + props.Nivel

    return <div>
        <header><HeaderBar Titulo={titulo} Puntos={localStorage.getItem('puntajeCompPal')} BackTo='/listado/completarPalabra' /></header>
        <h1>Completa con la letra faltante</h1>
        <JuegoCompletar></JuegoCompletar>


    </div>

}
export default ImgMediaCard;