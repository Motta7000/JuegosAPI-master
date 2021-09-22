import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom'
import nivel1 from '../img/CasaLvl1.png'
import nivel2 from '../img/CasaLvl2.png'
import nivel3 from '../img/CasaLvl3.png'
import HeaderBar from './header'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

function ImgMediaCard(props) {
    const classes = useStyles();
    const history = useHistory();
    let nivelHabilitado = localStorage.getItem('nivelCompletarPalabra');

    return (
        <div>
            <header><HeaderBar Titulo={props.Titulo} BackTo='/listado' Puntos={localStorage.getItem('puntajeCompPal')}/></header>
            <div className="row">
                <Card className={classes.root}>
                    <CardActionArea onClick={() => history.push('/listado/completarPalabra/lvl1')}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={nivel1}
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
                    <CardActionArea onClick={e => { nivelHabilitado >= 2 ? history.push('/listado/completarPalabra/lvl2') : console.log("Nivel bloqueado") }} >
                        <CardMedia
                            component="img"
                            height="140"
                            image={nivel2}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Nivel 2
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
                    <CardActionArea onClick={e => { nivelHabilitado >= 3 ? history.push('/listado/completarPalabra/lvl3') : console.log("Nivel bloqueado") }} >
                        <CardMedia
                            component="img"
                            height="140"
                            image={nivel3}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Nivel 3
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