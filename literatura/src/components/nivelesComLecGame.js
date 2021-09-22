import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Button from '@material-ui/core/Button';
import HeaderBar from './header';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Chip from '@material-ui/core/Chip';

import { Redirect, Link, withRouter, useHistory } from 'react-router-dom'
//import AdaptiveImage from 'react-adaptive-image';
import FittedImage from 'react-fitted-image';
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
        height: 70,
        fontSize: theme.typography.pxToRem(40),
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


function ImgMediaCard(props) {



    let img = new Image();
    //img.src = 'https://image.prntscr.com/image/C1piQ6tARvCVezPtkyo01g.png';
    console.log('imgsrc:' + img.src)
    console.log(img.width)
    console.log(img.height)



    //width = 1080
    //height = 422


    const classes = useStyles();
    const history = useHistory();
    let nivelHabilitado = localStorage.getItem('nivelComLec') != null ? parseInt(localStorage.getItem('nivelComLec')) : 1;
 
    let puntajeFinal
    if (nivelHabilitado == 1) {
        puntajeFinal = 0;
        localStorage.setItem('puntajeCLectura', 0)
    }
  /*  switch (nivelHabilitado) {
        case 1:
            textosJSON = textoslv1;
            break;
        case 2:
            textosJSON = textoslv2;
            break;
        case 3:
            textosJSON = textoslv3;
            break;
        default:
            textosJSON = textoslv3;
            break;
    }
*/

    //img.src = textosAMostrar[1];
    let width = img.width
    let height = img.height

    function ResponsiveImage({ src, width, height }) {
        return (
            <div
                style={{
                    width,
                }}
                className="responsive-image">
                <div style={{
                    paddingBottom: (height / width * 100) + '%'
                }} />
                <img
                    src={src}
                    className="responsive-image__image" />
            </div>
        );
    }

    class JuegoComLectura extends React.Component {
    constructor()
    {
        super()
        this.state = {
            show: true,
            respuestas: [10],
            displayed: false,
            displayedError: false,
            textosAMostrar:[],
            preguntasAMostrar:[]
        }
    }

    componentDidMount ()
    {
        
        axios.get("/api/cuento/list/cuento").then(response=>{
        let listadoTextos = [];
        let textosJSON = response.data
        console.log(response.data)
        for (var i in textosJSON) {
            if (textosJSON[i].difficultad == nivelHabilitado)
            listadoTextos.push(textosJSON[i]);
        }
        let aux = [];
        for (let i = 0; i < 1; i++) {
            let numAleatorio = Math.floor(Math.random() * listadoTextos.length);
            aux.push(listadoTextos[numAleatorio]);
            listadoTextos.splice(numAleatorio, 1);
        }
        this.setState({textosAMostrar:aux})
        console.log("textosAMostrar")
        console.log(aux)
        let dir = "/api/cuentoPregunta/find/idc/"
        let idc = aux[0].id
        let aux2 = dir.concat(idc)
        axios.get(aux2).then(response2=>{
            let listadoPreguntas = []
            let preguntaJSON = response2.data
            for (var i in preguntaJSON) {
                listadoPreguntas.push(preguntaJSON[i]);
            }
            let aux3 = [];
            for (let i = 0; i < 5; i++) {
                let numAleatorio = Math.floor(Math.random() * listadoPreguntas.length);
                aux3.push(listadoPreguntas[numAleatorio]);
                listadoPreguntas.splice(numAleatorio, 1);
            }


            this.setState({preguntasAMostrar:aux3})
            console.log('preguntasAMostrar:')
            console.log(aux3)
            this.render()
        })
      
       
        })
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



        handleNextLevel = () => {
            console.log(props.Nivel)
            switch (props.Nivel) {
                case '1': {
                    history.push('/listado/comprensionLectora/lvl2')
                    break;
                }
                case '2': {
                    history.push('/listado/comprensionLectora/lvl3')
                    break;
                }
                case '3': {
                    history.push('/listado');
                    break;
                }
            }

        }

        handleTryAgain = () => {
            switch (props.Nivel) {
                case '1': {
                    history.push('/listado/comprensionLectora/lvl1');
                    break;
                }
                case '2': {
                    history.push('/listado/comprensionLectora/lvl2')
                    break;
                }
                case '3': {
                    history.push('/listado/comprensionLectora/lvl3')
                    break;
                }
            }
        }


        modificar = (e) => {
            let aux = e.target.name
            parseInt(aux)
            this.state.respuestas[aux] = e.target.value
            console.log(this.state.respuestas)
        }

        enviarRespuesta = (e) => {
            console.log("pureba")
            let puntaje = 0

            for (let i = 0; i < this.state.respuestas.length; i++) {
                console.log(this.state.respuestas[i])
                console.log(this.state.preguntasAMostrar[i].preguntum.respuesta_correcta)
                if (this.state.respuestas[i] == this.state.preguntasAMostrar[i].preguntum.respuesta_correcta) {
                    puntaje++;
                }
            }
            console.log(puntaje)
            if (puntaje >= 1) {
                e.show = false
                puntajeFinal = puntaje * 100
                localStorage.setItem('puntajeCLectura', puntajeFinal + JSON.parse(localStorage.getItem('puntajeCLectura')))
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
                    .catch((error)=>
                    {
                        console.log(error)
                    })


                
                if (props.Nivel === '1') {
                    if (nivelHabilitado === 1) {
                        nivelHabilitado = nivelHabilitado + 1;
                        localStorage.setItem('nivelComLec', nivelHabilitado)
                    }
                    this.setState({ displayed: true });
                } else if (props.Nivel === '2') {
                    if (nivelHabilitado === 2) {
                        nivelHabilitado = nivelHabilitado + 1;
                        localStorage.setItem('nivelComLec', nivelHabilitado)
                    }
                    this.setState({ displayed: true });
                } else {
                    this.setState({ displayed: true });
                }
            } else {
                if (props.Nivel === '1') {
                    this.setState({ displayedError: true });
                } else if (props.Nivel === '2') {
                    this.setState({ displayedError: true });
                } else {
                    this.setState({ displayedError: true });
                }
            }

            console.log(puntaje);

        }


     
        render() {
            
            if (this.state.show === true,this.state.textosAMostrar[0] != null,this.state.preguntasAMostrar[0]!=null) {
                console.log(this.state.preguntasAMostrar)
                return (<div>


                    <div className="wrapper">
                    
                        <FittedImage
                            fit="contain"
                            loader={<div>Loading</div>}
                            onLoad={(...args) => console.log(...args)}
                            onError={(...args) => console.log(...args)}
                            src={this.state.textosAMostrar[0].cuento}
                        />
                    </div>

                    <FormControl component="fieldset" >

                        <RadioGroup row aria-label="position" name="position" defaultValue="top">
                            <Chip className={classes.chipSizing} label={this.state.preguntasAMostrar[0].preguntum.pregunta}></Chip>

                            <FormControlLabel onChange={this.modificar} name="0" value="1" control={<Radio color="primary" />} label={this.state.preguntasAMostrar[0].preguntum.respuesta1} />
                            <FormControlLabel onChange={this.modificar} name="0" value="2" control={<Radio color="primary" />} label={this.state.preguntasAMostrar[0].preguntum.respuesta2} />
                            <FormControlLabel onChange={this.modificar} name="0" value="3" control={<Radio color="primary" />} label={this.state.preguntasAMostrar[0].preguntum.respuesta3} />
                            
                        </RadioGroup>
                        <RadioGroup row aria-label="position" name="position" defaultValue="top">
                            <Chip className={classes.chipSizing} label={this.state.preguntasAMostrar[1].preguntum.pregunta}></Chip>

                            <FormControlLabel onChange={this.modificar} name="1" value="1" control={<Radio color="primary" />} label={this.state.preguntasAMostrar[1].preguntum.respuesta1} />
                            <FormControlLabel onChange={this.modificar} name="1" value="2" control={<Radio color="primary" />} label={this.state.preguntasAMostrar[1].preguntum.respuesta2} />
                            <FormControlLabel onChange={this.modificar} name="1" value="3" control={<Radio color="primary" />} label={this.state.preguntasAMostrar[1].preguntum.respuesta3} />
                  
                        </RadioGroup>
                        <div>
                        <Button className={classes.bColor} variant="contained" color="primary" onClick={this.enviarRespuesta}> Comprobar </Button>
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

    let titulo = "Comprension Lectora Nivel: " + props.Nivel
    return <div>
        <header><HeaderBar Titulo={titulo} Puntos={localStorage.getItem('puntajeCLectura')} BackTo='/listado/comprensionLectora' /></header>
        <h1> </h1>
        <JuegoComLectura></JuegoComLectura>
    </div>
}
export default ImgMediaCard;