import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Redirect, Link, withRouter, useHistory } from 'react-router-dom'
import HeaderBar from './header'
import React from 'react';
import { render } from '@testing-library/react';

import FormControl from '@material-ui/core/FormControl';
import Cuenta from './cuenta';
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
    const classes = useStyles();
    const history = useHistory();
    // en {props.Nivel} queda el nivel donde se hizo click
    const nivelA = props.Nivel;
    console.log(nivelA)

    let nivelHabilitado = localStorage.getItem('nivelCheckCuentas') != null ? parseInt(localStorage.getItem('nivelCheckCuentas')) : 1;
 
    let puntajeFinal
    if (nivelHabilitado == 1) {
        puntajeFinal = 0;
        localStorage.setItem('puntajeCheckPalabra', 0)
    }


    let listadoCuentas = [];
/*
    switch (props.Nivel){
        case '1':{
            listadoCuentas = cuentas;
            break;}
        case '2':{
            listadoCuentas = cuentasn2;
            break;}
        case '3':{
            listadoCuentas = cuentasn3;
            break;}
    }
*/
   /* let numAleatorio = Math.floor(Math.random() * listadoCuentas.length)
    let cuentasAMostrar = [listadoCuentas[numAleatorio]]
    for(let i=0; i<9; i++){
        numAleatorio = Math.floor(Math.random() * listadoCuentas.length)
        cuentasAMostrar.push(listadoCuentas[numAleatorio])
    }*/

    class Pregunta extends React.Component {
     
        constructor(){
            super();
            this.state= {
                levelComplete: false,
                displayed: false,
                displayedError: false,
                cuentasAMostrar:[],
                respuestas: [0,0,0,0,0,0,0,0,0,0]
            }
        }
        componentDidMount ()
        {
            axios.get("/api/cuenta/list").then(response=>{
                let cuentas = response.data
                console.log(response.data)
                let cuentasDisponibles = []
                let aux = []
                for (var i in cuentas)
                {
                    if (cuentas[i].difficultad == nivelHabilitado)
                    cuentasDisponibles.push(cuentas[i])
                }
                for (let i = 0;i < 10;i++)
                {
                    let numAleatorio = Math.floor(Math.random() * cuentasDisponibles.length);
                    aux.push(cuentasDisponibles[numAleatorio]);
                   cuentasDisponibles.splice(numAleatorio, 1);
                }
                this.setState({cuentasAMostrar:aux})
                console.log(aux)
                console.log(this.state.cuentasAMostrar)
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


            console.log(nivelA)
            switch (nivelA){
                case '1':{
                    localStorage.setItem('nivelCheckCuentas',2);
                    history.push('/listado/CheckCuentas/lvl2');
                    break;}
                case '2':{
                    localStorage.setItem('nivelCheckCuentas',3);
                    history.push('/listado/CheckCuentas/lvl3');
                    break;}
                case '3':{
                    localStorage.setItem('nivelCheckCuentas',3);
                    history.push('/listado');
                    break;}
            }
            
        }

        handleTryAgain = () =>{
            switch (nivelA){
                case '1':{
                    history.push('/listado/CheckCuentas/lvl1');
                    break;}
                case '2':{
                    history.push('/listado/CheckCuentas/lvl2');
                    break;}
                case '3':{
                    history.push('/listado/CheckCuentas/lvl2');
                    break;}
            }
        }

        handleValue(result,index){
            console.log(result)
            if (result == 'true')
            {
                this.state.respuestas[index] = 1;
            }
            else
            {
                this.state.respuestas[index]=2;
            }
            console.log(this.state.respuestas);
        }


        enviarRespuesta = () => {
            let puntaje = 0
          
            for (let i=0;i<10;i++)
            {
                if (this.state.respuestas[i] == this.state.cuentasAMostrar[i].resp_correcta)
                {
                    puntaje++;
                }
            }



            console.log(puntaje)
            if(puntaje >= 8)
            {
                console.log("ganaste")
                            
            puntajeFinal = puntaje * 100
            localStorage.setItem('puntajeCheckPalabra', puntajeFinal + JSON.parse(localStorage.getItem('puntajeCheckPalabra')))
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
   
   
   
   
                this.setState({displayed:true});
            }else{
                this.setState({displayedError:true});
            }
            
        };
        

        render() {
            if (this.state.show == true,this.state.cuentasAMostrar[0]!=null) {
                console.log(this.state.cuentasAMostrar[0])
                return <div className="bg_cuentasNivel">
                    <h1 style={{ color: "white" }}>A RESOLVER LAS CUENTAS...</h1>
                    <FormControl component="fieldset" onSubmit={this.enviarRespuesta}>
                        <div className="row">
                            <Cuenta cuenta={this.state.cuentasAMostrar[0].cuenta} rta1 ={this.state.cuentasAMostrar[0].resp1} rta2={this.state.cuentasAMostrar[0].resp2} index={0} callback={this.handleValue.bind(this)}/>
                            <Cuenta cuenta={this.state.cuentasAMostrar[1].cuenta} rta1 ={this.state.cuentasAMostrar[1].resp1} rta2={this.state.cuentasAMostrar[1].resp2} index={1} callback={this.handleValue.bind(this)}/>
                             <Cuenta cuenta={this.state.cuentasAMostrar[2].cuenta} rta1 ={this.state.cuentasAMostrar[2].resp1} rta2={this.state.cuentasAMostrar[2].resp2} index={2} callback={this.handleValue.bind(this)}/>
                          <Cuenta cuenta={this.state.cuentasAMostrar[3].cuenta} rta1 ={this.state.cuentasAMostrar[3].resp1} rta2={this.state.cuentasAMostrar[3].resp2} index={3} callback={this.handleValue.bind(this)}/>
                          <Cuenta cuenta={this.state.cuentasAMostrar[4].cuenta} rta1 ={this.state.cuentasAMostrar[4].resp1} rta2={this.state.cuentasAMostrar[4].resp2} index={4} callback={this.handleValue.bind(this)}/>
                          <Cuenta cuenta={this.state.cuentasAMostrar[5].cuenta} rta1 ={this.state.cuentasAMostrar[5].resp1} rta2={this.state.cuentasAMostrar[5].resp2} index={5} callback={this.handleValue.bind(this)}/>
                          <Cuenta cuenta={this.state.cuentasAMostrar[6].cuenta} rta1 ={this.state.cuentasAMostrar[6].resp1} rta2={this.state.cuentasAMostrar[6].resp2} index={6} callback={this.handleValue.bind(this)}/>
                          <Cuenta cuenta={this.state.cuentasAMostrar[7].cuenta} rta1 ={this.state.cuentasAMostrar[7].resp1} rta2={this.state.cuentasAMostrar[7].resp2} index={7} callback={this.handleValue.bind(this)}/>
                          <Cuenta cuenta={this.state.cuentasAMostrar[8].cuenta} rta1 ={this.state.cuentasAMostrar[8].resp1} rta2={this.state.cuentasAMostrar[8].resp2} index={8} callback={this.handleValue.bind(this)}/>
                          <Cuenta cuenta={this.state.cuentasAMostrar[9].cuenta} rta1 ={this.state.cuentasAMostrar[9].resp1} rta2={this.state.cuentasAMostrar[9].resp2} index={9} callback={this.handleValue.bind(this)}/>
            
                        </div>
                        <div className="cuenta">
                        <Button className={classes.bColor} onClick={this.enviarRespuesta}> TERMINE </Button>
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
                        <DialogTitle id="alert-dialog-slide-title">{"La proxima vas a tener mas suerte!"}</DialogTitle>
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
                </div>
            }
            else {
                return <div></div>
            }

        };

    }

    return <div>
        <header><HeaderBar Titulo={props.Titulo} Puntos={localStorage.getItem('puntajeCheckPalabra')} BackTo='/listado/CheckCuentas' /></header>
        
        <Pregunta></Pregunta>
    </div>

}

export default ImgMediaCard;