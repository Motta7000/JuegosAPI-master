import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Redirect, Link, withRouter, useHistory } from "react-router-dom";

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

function createData(name, puntaje) {
  return { name, puntaje };
}

var rows = [
  createData("NickName1", 159),
  createData("NickName2", 237),
  createData("NickName4", 305),
  createData("NickName3", 262),
  createData("NickName5", 356),
];

function ordenar(rows) {
  for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < rows.length - i - 1; j++) {
      if (rows[j].puntaje > rows[j + 1].puntaje) {
        var aux = rows[j];
        rows[j] = rows[j + 1];
        rows[j + 1] = aux;
      }
    }
  }
}

ordenar(rows);

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

function CustomizedTables(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Posicion</StyledTableCell>
              <StyledTableCell align="center">Usuario</StyledTableCell>
              <StyledTableCell align="center">Puntaje</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="center">{1}</StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.puntaje}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button className="acceptButon" onClick={() => history.push("/")}>
        {" "}
        Volver{" "}
      </button>
    </div>
  );
}

export default CustomizedTables;
