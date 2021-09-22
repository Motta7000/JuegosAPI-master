import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BackButton from './backButton.js';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ButtonAppBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
          <Toolbar>
            <BackButton edge="start" color="inherit" aria-label="menu" BackTo={props.BackTo}/>
            <Typography variant="h6" className={classes.title}>{props.Titulo}</Typography>
            <Button color="inherit" id='name'>{localStorage.getItem('nombreJugador')}  PUNTOS:{props.Puntos}</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ButtonAppBar;