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
import ortografia from '../img/Conego.png'
import completarPalabra from '../img/Casa.png'
import comprensionLectora from '../img/Libro.png'
import HeaderBar from './header'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

function ImgMediaCard(props) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div>
            <header><HeaderBar Titulo={props.Titulo} BackTo='/' /></header>
            <div className="row">
                <Card className={classes.root}>
                    <CardActionArea onClick={() => history.push('/listado/checkPalabra')}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={ortografia}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                ¿Está bien escrito?
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Selecciona si la palabra esta bien o mal escrita
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>

            <div className="row">
                <Card className={classes.root}>
                    <CardActionArea onClick={() => history.push('/listado/completarPalabra')}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={completarPalabra}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Completar la palabra
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Escribí la letra que falta
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>

            <div className="row">
                <Card className={classes.root}>
                    <CardActionArea onClick={() => history.push('/listado/comprensionLectora')}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={comprensionLectora}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Comprensión lectora
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Contestá las preguntas de los cuentos
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </div>
    );
}

export default ImgMediaCard;