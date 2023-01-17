import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Autocomplete, TextField } from "@mui/material";
import { Snackbar, Stack } from "@mui/material";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
var stringSimilarity = require("string-similarity");

function TableModal1({
  showtable,
  handleCloseTable,
  columns,
  colMapfromProp,
  setObject,
  file,
  instructions,
  error,
  handleTableNext,
  datasetColumns,
  openError,
  setOpenError,
  setColMapfromProp,
}: any) {
  useEffect(() => {
    if (columns.length && colMapfromProp.length) {
      let cols = columns;
      setColMapfromProp(
        colMapfromProp.map((c: any) => {
          let result = stringSimilarity.findBestMatch(c.label, cols);
          if (result.bestMatch.rating >= 0.5) {
            cols = cols.filter(
              (col: string) => col !== result.bestMatch.target
            );
            return { ...c, fileCol: result.bestMatch.target };
          } else return c;
        })
      );
    }
  }, [columns]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };
  return (
    <Modal
      fullscreen
      show={showtable}
      onHide={handleCloseTable}
      dialogClassName="modal-table"
    >
      {" "}
      <Modal.Header closeButton>
        <Modal.Title>Import CSV</Modal.Title>
      </Modal.Header>
      <h4>Map columns</h4>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr className="csvcolumn">
              <th>CSV Column</th>

              {!!columns.length && columns?.map((h: any) => <th>{h}</th>)}
            </tr>
            <tr>
              <th>Dataset Field</th>

              {!!columns.length &&
                columns?.map((h: any, index: number) => (
                  <th>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={colMapfromProp}
                      sx={{ width: 300 }}
                      onChange={(e) => setObject(e, index)}
                      value={
                        colMapfromProp.filter((c: any) => c.fileCol === h)
                          .length
                          ? colMapfromProp.filter(
                              (c: any) => c.fileCol === h
                            )[0].label
                          : ""
                      }
                      inputValue={
                        colMapfromProp.filter((c: any) => c.fileCol === h)
                          ?.label
                      }
                      getOptionDisabled={(option: any) => !!option.fileCol}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Unmapped"
                          sx={{
                            "& legend": { display: "none" },
                            "& fieldset": { top: 0 },
                          }}
                        />
                      )}
                      size="small"
                    />
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {!!file.length &&
              file.slice(0, 10).map((f: any, i: number) => (
                <tr>
                  <td></td>
                  {columns.map((c: any) => (
                    <td>{f[c]}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </Table>
        <p className="totalRows">Total Number of rows: {file && file.length}</p>

        <ul>
          {instructions?.length &&
            instructions.map((i: number) => <li>{i}</li>)}
        </ul>

        <Stack spacing={10} sx={{ width: "100%" }}>
          <Snackbar
            open={openError}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error.map((e: any, i: number) => (
                <span>{(i == 0 ? "" : ", ") + e + " "}</span>
              ))}{" "}
              required
            </Alert>
          </Snackbar>
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="" onClick={handleCloseTable}>
          Cancel
        </Button>
        <Button className="nextbtn" variant="primary" onClick={handleTableNext}>
          Next
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TableModal1;
