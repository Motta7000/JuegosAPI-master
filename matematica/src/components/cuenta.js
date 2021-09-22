import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Redirect, Link, withRouter, useHistory } from 'react-router-dom'
import React from 'react';
import { render } from '@testing-library/react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    chipSizing: {
        width: 300,
        height: 70,
        fontSize: theme.typography.pxToRem(65),
    },
}));

function Cuenta(props) {
   const classes = useStyles();
   const [value, setValue] = React.useState();
   const index = props.index;
   const handleChange = (event) => {
    setValue(event.target.value);
    props.callback(event.target.value,index);
  };
    return(
    <div className="row">
        <Chip className={classes.chipSizing} color="primary" label={props.cuenta} />
            <div className="cuenta" color='white'>
                <RadioGroup className ="cuenta" aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <FormControlLabel  name="0" value="true" control={<Radio style={{ color: "white" }} />} label={<span style={{fontSize:'2rem', color:'white'}}> {props.rta1}</span>}  />
                    <FormControlLabel  name="0" value="false" control={<Radio style={{ color: "white" }} />} label={<span style={{fontSize:'2rem',color:'white'}}> {props.rta2}</span>} />
                </RadioGroup>
            </div>
    </div>
    );
}

export default Cuenta;