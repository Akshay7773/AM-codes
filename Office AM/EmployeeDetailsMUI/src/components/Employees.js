import React, { useState, useEffect } from "react";
import { Avatar, Button } from "@mui/material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Add from "@mui/icons-material/Add";
function createData(avtar, name, email, contact, actions) {
  return { avtar, name, email, contact, actions };
}

function Employees() {
  const navigate = useNavigate();
  const [mylocalArray, setMyLocalArr] = useState(
    JSON.parse(localStorage.getItem("myArr"))
  );
  console.log(mylocalArray);
  const rows = mylocalArray;

  const deleteSingle = (i) => {
    let arr = [];
    for (let j = 0; j < mylocalArray.length; j++) {
      if (j !== i) arr.push(mylocalArray[j]);
    }
    console.log(arr);
    setMyLocalArr(arr);
    localStorage.setItem("myArr", JSON.stringify(arr));
  };

  // const editSingle = (i) => {
  //   navigate(`Employees/Update/${i}`);
  // };
  return (
    <center style={{ height: 400, width: "100%" }}>
      {/* Employees
       */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Avatar </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email&nbsp;</TableCell>
              <TableCell>Contact&nbsp;</TableCell>
              <TableCell>Actions&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Avatar style={{ backgroundColor: "red" }}>
                    {row.name.charAt(0)}
                  </Avatar>
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.contact}</TableCell>

                <TableCell>
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteSingle(i)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      navigate(`/Employees/Update/${i}`, {
                        state: row,
                        id: i,
                      });
                    }}
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={() => navigate("/Employees/Add")}
      >
        Add Employee
      </Button>
    </center>
  );
}

export default Employees;
