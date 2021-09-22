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
import sumayresta from '../img/sumayresta.jpg'
import Monedas from '../img/Monedas.jpg'
import MayorMenor from '../img/MayorMenor.jpg'
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
            <header><HeaderBar Titulo={props.Titulo} BackTo='/'/></header>
            <div className="row">
                <Card className={classes.root}>
                    <CardActionArea onClick={() => history.push('/listado/checkCuentas')}>
                        <CardMedia
                            component="img"
                            height="max"
                            width="max"
                            image={sumayresta}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Realizar cuentas
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                En este juego probarás tus habilidades algebraicas
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>

            <div className="row">
                <Card className={classes.root}>
                    <CardActionArea onClick={() => history.push('/listado/Monedas')}>
                        <CardMedia
                            component="img"
                            height="max"
                            width="max"
                            image={Monedas}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Combinación de Monedas
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                ¿Cuál es la combinación de monedas correcta para comprar el producto?         
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>

            <div className="row">
                <Card className={classes.root}>
                    <CardActionArea onClick={() => history.push('/listado/MayorMenor')}>
                        <CardMedia
                            component="img"
                            height="max"
                            width="max"
                            image={MayorMenor}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                ¿Mayor o menor?
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Divertite descubriendo que número es mayor o menor
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </div>
    );
}

export default ImgMediaCard;