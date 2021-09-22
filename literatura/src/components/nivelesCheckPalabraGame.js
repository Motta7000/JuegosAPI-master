import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import HeaderBar from './header'
import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
import axios from 'axios';

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

    const classes = useStyles();
    const history = useHistory();
    let nivelHabilitado = localStorage.getItem('nivelCheckPalabra') != null ? localStorage.getItem('nivelCheckPalabra') : 1;
    let puntajeFinal
    if (nivelHabilitado == 1) {
        puntajeFinal = 0;
        localStorage.setItem('puntajeCPalabra', 0)
    }

    class Pregunta extends React.Component {
       constructor()
       {
           super()
        this.state = {
            show: true,
            respuestas: [10],
            displayed: false,
            displayedError: false,
            palabrasAMostrar:[]
        }
    }
        componentDidMount () 
        {
            axios.get('/api/palabracheckear/list').then(response =>{ 
            let palabrasJSON = response.data;
            let palabrasDisponibles = [];
            let aux = []
        
            for (var i in palabrasJSON)
            if(palabrasJSON[i].difficultad == nivelHabilitado)
                palabrasDisponibles.push(palabrasJSON[i]);
        
            for (let i = 0; i < 10; i++) {
                let numAleatorio = Math.floor(Math.random() * palabrasDisponibles.length);
                aux.push(palabrasDisponibles[numAleatorio]);
                palabrasDisponibles.splice(numAleatorio, 1);
            }
            this.setState({palabrasAMostrar:aux})
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
                    history.push('/listado/checkPalabra/lvl2')
                    break;
                }
                case '2': {
                    history.push('/listado/checkPalabra/lvl3')
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
                    history.push('/listado/checkPalabra/lvl1');
                    break;
                }
                case '2': {
                    history.push('/listado/checkPalabra/lvl2')
                    break;
                }
                case '3': {
                    history.push('/listado/checkPalabra/lvl3')
                    break;
                }
            }
        }

        modificar = (e) => {
            let aux = e.target.name
            let aux2
            if (e.target.value === "true") {
                aux2 = 1
            }
            else {
                aux2 = 0
            }

            parseInt(aux)
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.respuestas[aux] = aux2
            console.log(this.state.respuestas)
            console.log(this.state.palabrasAMostrar)
        }

        enviarRespuesta = () => {
            console.log("pureba")
            let puntaje = 0

            for (let i = 0; i < this.state.respuestas.length; i++) {
                if (this.state.respuestas[i] === this.state.palabrasAMostrar[i].estaBienEscrito) {
                    puntaje++;
                }
            }

            if (puntaje >= 8) {
                puntajeFinal = puntaje * 100
                localStorage.setItem('puntajeCPalabra', puntajeFinal + JSON.parse(localStorage.getItem('puntajeCPalabra')))
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
                    if (nivelHabilitado === '1') {
                        nivelHabilitado++;
                        localStorage.setItem('nivelCheckPalabra', nivelHabilitado)
                    }
                    this.setState({ displayed: true });
                } else if (props.Nivel === '2') {
                    if (nivelHabilitado === '2') {
                        nivelHabilitado++;
                        localStorage.setItem('nivelCheckPalabra', nivelHabilitado)
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

            console.log(puntaje)

        }

        render() {
            if (this.state.show === true,this.state.palabrasAMostrar[0]!=null) {
                return <div>

                    <div className="row">
                        <Chip className={classes.chipSizing} color="primary" label={this.state.palabrasAMostrar[0].palabra} />

                        <RadioGroup aria-label="position" name="position" >
                            <div className="row">
                                <FormControlLabel onChange={this.modificar} name="0" value="true" control={<Radio color="primary" />} label={<span style={{ fontSize: '2rem' }}> Si</span>} />
                                <FormControlLabel onChange={this.modificar} name="0" value="false" control={<Radio color="primary" />} label={<span style={{ fontSize: '2rem' }}> No</span>} />
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="row">

                        <Chip className={classes.chipSizing} color="primary" label={this.state.palabrasAMostrar[1].palabra} />

                        <RadioGroup aria-label="position" name="position" defaultValue="top">
                            <div className="row">
                                <FormControlLabel onChange={this.modificar} name="1" value="true" control={<Radio color="primary" />} label={<span style={{ fontSize: '2rem' }}> Si</span>} />
                                <FormControlLabel onChange={this.modificar} name="1" value="false" control={<Radio color="primary" />} label={<span style={{ fontSize: '2rem' }}> No</span>} />
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="row">
                        <Chip className={classes.chipSizing} color="primary" label={this.state.palabrasAMostrar[2].palabra} />

                        <RadioGroup aria-label="position" name="position" defaultValue="top">
                            <div className="row">
                                <FormControlLabel onChange={this.modificar} name="2" value="true" control={<Radio color="primary" />} label={<span style={{ fontSize: '2rem' }}> Si</span>} />
                                <FormControlLabel onChange={this.modificar} name="2" value="false" control={<Radio color="primary" />} label={<span style={{ fontSize: '2rem' }}> No</span>} />
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="row">
                        <Chip className={classes.chipSizing} color="primary" label={this.state.palabrasAMostrar[3].palabra} />

                        <RadioGroup aria-label="position" name="position" defaultValue="top">
                            <div className="row">
                                <FormControlLabel onChange={this.modificar} name="3" value="true" control={<Radio color="primary" />} label={<span style={{ fontSize: '2rem' }}> Si</span>} />
                                <FormControlLabel onChange={this.modificar} name="3" value="false" control={<Radio color="primary" />} label={<span style={{ fontSize: '2rem' }}> No</span>} />
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="row">
                        <Chip className={classes.chipSizing} color="primary" label={this.state.palabrasAMostrar[4].palabra} />

                        <RadioGroup aria-label="position" name="position" defaultValue="top">
                            <div className="row">
                                <FormControlLabel onChange={this.modificar} name="4" value="true" control={<Radio color="primary" />} label={<span style={{ fontSize: '2rem' }}> Si</span>} />
                                <FormControlLabel onChange={this.modificar} name="4" value="false" control={<Radio color="primary" />} label={<span style={{ fontSize: '2rem' }}> No</span>} />
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="row">
                        <Chip className={classes.chipSizing} color="primary" label={this.state.palabrasAMostrar[5].palabra} />

                        <RadioGroup aria-label="position" name="position" defaultValue="top">
                            <div className="row">
                                <FormControlLabel onChange={this.modificar} name="5" value="true" control={<Radio color="primary" />} label={<span style={{ fontSize: '2rem' }}> Si</span>} />
                                <FormControlLabel onChange={this.modificar} name="5" value="false" control={<Radio color="primary" />} label={<span style={{ fontSize: '2rem' }}> No</span>} />
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="row">
                        <Chip className={classes.chipSizing} color="primary" label={this.state.palabrasAMostrar[6].palabra} />

                        <RadioGroup aria-label="position" name="position" defaultValue="top">
                            <div className="row">
                                <FormControlLabel onChange={this.modificar} name="6" value="true" control={<Radio color="primary" />} label={<span style={{ fontSize: '2rem' }}> Si</span>} />
                                <FormControlLabel onChange={this.modificar} name="6" value="false" control={<Radio color="primary" />} label={<span style={{ fontSize: '2rem' }}> No</span>} />
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="row">
                        <Chip className={classes.chipSizing} color="primary" label={this.state.palabrasAMostrar[7].palabra} />

                        <RadioGroup aria-label="position" name="position" defaultValue="top">
                            <div className="row">
                                <FormControlLabel onChange={this.modificar} name="7" value="true" control={<Radio color="primary" />} label={<span style={{ fontSize: '2rem' }}> Si</span>} />
                                <FormControlLabel onChange={this.modificar} name="7" value="false" control={<Radio color="primary" />} label={<span style={{ fontSize: '2rem' }}> No</span>} />
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="row">
                        <Chip className={classes.chipSizing} color="primary" label={this.state.palabrasAMostrar[8].palabra} />

                        <RadioGroup aria-label="position" name="position" defaultValue="top">
                            <div className="row">
                                <FormControlLabel onChange={this.modificar} name="8" value="true" control={<Radio color="primary" />} label={<span style={{ fontSize: '2rem' }}> Si</span>} />
                                <FormControlLabel onChange={this.modificar} name="8" value="false" control={<Radio color="primary" />} label={<span style={{ fontSize: '2rem' }}> No</span>} />
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="row">
                        <Chip className={classes.chipSizing} color="primary" label={this.state.palabrasAMostrar[9].palabra} />

                        <RadioGroup aria-label="position" name="position" defaultValue="top">
                            <div className="row">
                                <FormControlLabel onChange={this.modificar} name="9" value="true" control={<Radio color="primary" />} label={<span style={{ fontSize: '2rem' }}> Si</span>} />
                                <FormControlLabel onChange={this.modificar} name="9" value="false" control={<Radio color="primary" />} label={<span style={{ fontSize: '2rem' }}> No</span>} />
                            </div>
                        </RadioGroup>
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
                        <DialogTitle id="alert-dialog-slide-title">{"Mas suerte para la proxima!"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Nivel fallado {props.Nivel} 
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
        }
    }

    let titulo = "Palabra bien escrita nivel " + props.Nivel
    return <div>
        <header><HeaderBar Titulo={titulo} Puntos={localStorage.getItem('puntajeCPalabra')} BackTo='/listado/CheckPalabra' /></header>
        <h1>Estan bien escritas estas palabras?</h1>
        <Pregunta></Pregunta>
    </div>
}

export default ImgMediaCard;