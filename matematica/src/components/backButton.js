import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Redirect,Link,withRouter,useHistory} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';

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

function BackButton(props) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div onClick={() => { history.push(props.BackTo)}}>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"><ArrowBack/><span>Atrás</span></IconButton>
    </div>
  );
}

export default BackButton;