import React, {Component} from 'react';
import {Redirect,Link,withRouter,useHistory} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import Typography from '@material-ui/core/Typography';
import back from '../img/numeros1.jpg'    
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      width: '100%',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
    
function setNivelesHabilitados(){
        localStorage.setItem('nivelMayorMenor', 1);
        localStorage.setItem('nivelCheckCuentas', 1);
        localStorage.setItem('nivelCompletarPalabra', 1);
        localStorage.setItem('nivelMonedas', 1);
}

export default function HomeBody(props) {
    const classes = useStyles();
    const history = useHistory();
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} >
            <img src={back} alt="imagen" />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <VideogameAssetIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
             <span>{props.Titulo}</span>
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="nombre"
                label="Cual es tu nombre?"
                name="nombre"
                autoComplete="nombre"
                autoFocus
              />

                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick ={() => { history.push('/listado'); localStorage.setItem('nombreJugador', document.querySelector("#nombre").value); setNivelesHabilitados(); } }>
                Jugar
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick ={() => { history.push('/puntaje'); } }>
                Puntaje
              </Button>
                            
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }