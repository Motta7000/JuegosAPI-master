import React from 'react'
import axios from 'axios'

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Redirect, Link, withRouter, useHistory } from "react-router-dom";




export default class Tabla2 extends React.Component{
constructor()
{
    super()
    this.state={
        jugadores:[],
        history:2
    }
}

    componentDidMount(){
        
        axios.get('/api/jugadormate/list').then(res=>
            {
                console.log(res.data)
                for (var i = 0; i < res.data.length; i++) {
                    for (var j = 0; j < res.data.length - i - 1; j++) {
                      if (res.data[j].puntaje < res.data[j + 1].puntaje) {
                        var aux = res.data[j];
                        res.data[j] = res.data[j + 1];
                        res.data[j + 1] = aux;
                      }
                    }
                  }
                this.setState({jugadores:res.data})
            })
    }

    render()
    {
        const StyledTableCell = withStyles((theme) => ({
            head: {
              backgroundColor: theme.palette.common.black,
              color: theme.palette.common.white,
            },
            body: {
              fontSize: 14,
            },
          }))(TableCell);
          const StyledTableRow = withStyles((theme) => ({
            root: {
              "&:nth-of-type(odd)": {
                backgroundColor: theme.palette.background.default,
              },
            },
          }))(TableRow);
        const useStyles = makeStyles({
            table: {
              minWidth: 400,
            },
          });
       // const classes = useStyles();
      
       /* return (
            <ol>
                {this.state.jugadores.map(jugador=> <li>{jugador.nombre}</li>)}
            </ol>
        )*/

      return  <div>
      <TableContainer component={Paper}>
        <Table  aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Posicion</StyledTableCell>
              <StyledTableCell align="center">Usuario</StyledTableCell>
              <StyledTableCell align="center">Puntaje</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.jugadores.map((row,i) => (
              <StyledTableRow key={row.nombre}>
                <StyledTableCell align="center">{i+1}</StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.nombre}
                </StyledTableCell>
                <StyledTableCell align="center">{row.puntaje}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
   
    </div>
    }

}