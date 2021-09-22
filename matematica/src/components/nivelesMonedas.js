import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Redirect, Link, withRouter, useHistory } from 'react-router-dom'

import Monedas from '../img/Monedas.jpg'

import HeaderBar from './header'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

function ImgMediaCard(props) {
    const classes = useStyles();
    const history = useHistory();

    let nivelHabilitado = localStorage.getItem('nivelMonedas');

    return (
        <div>
            <header><HeaderBar Titulo={props.Titulo} BackTo='/listado'/></header>
            <div className="row">
                <Card className={classes.root}>
                    <CardActionArea onClick={() => history.push('/listado/Monedas/lvl1')}>
                        <CardMedia
                            component="img"
                            height="max"
                            image={Monedas}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Nivel 1
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            Primer nivel donde la dificultad es baja
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
            <div className={`row${nivelHabilitado >= 2 ? "" : "bloqueado"}`}>
                <Card className={classes.root}>
                    <CardActionArea onClick={ e => {nivelHabilitado >= 2 ? history.push('/listado/Monedas/lvl2') : console.log("Nivel bloqueado")}} >
                        <CardMedia
                            component="img"
                            height="max"
                            image={Monedas}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Nivel 2 {nivelHabilitado >= 2 ? "" : "(BLOQUEADO)"}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            Segundo nivel donde la dificultad es moderada
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
            <div className={`row${nivelHabilitado >= 3 ? "" : "bloqueado"}`}>
                <Card className={classes.root}>
                    <CardActionArea onClick={ e => {nivelHabilitado >= 3 ? history.push('/listado/Monedas/lvl3') : console.log("Nivel bloqueado")}} >
                        <CardMedia
                            component="img"
                            height="max"
                            image={Monedas}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Nivel 3 {nivelHabilitado >= 3 ? "" : "(BLOQUEADO)"}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Tercer nivel donde la dificultad es alta
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </div>
    );
}

export default ImgMediaCard;