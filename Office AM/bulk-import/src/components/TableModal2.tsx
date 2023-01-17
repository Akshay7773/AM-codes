import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
function TableModal2({
  showtable2,
  handleCloseTable,
  columns,
  dataCol,
  colMapfromProp,
  data,
  handleRadioChange,
  handleSecondTable,
  isSkippedRows,
  setIsSkippedRows,
  skippedArray,
}: any) {
  return (
    <Modal
      fullscreen
      show={showtable2}
      onHide={handleCloseTable}
      dialogClassName="modal-table"
    >
      {" "}
      <Modal.Header closeButton>
        <Modal.Title>Import CSV</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr className="csvcolumn">
              <th>CSV Column</th>

              {!!dataCol &&
                dataCol.map((h: any, i: number) => <th>{columns[i]}</th>)}
            </tr>
            <tr>
              <th>Dataset Field</th>

              {!!dataCol &&
                dataCol.map((d: string) => (
                  <th>
                    {colMapfromProp &&
                      colMapfromProp.map((c: any) =>
                        c.key === d ? c.label : ""
                      )}
                  </th>
                ))}
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {!!data.length &&
              data.slice(0, 10).map((f: any, i: number) => (
                <tr>
                  <td></td>
                  {dataCol.map((c: any) => (
                    <td>{f[c]}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </Table>
        {isSkippedRows ? (
          <div className="tableFooter">
            <div>Result :</div>
            <div className="rowsResult">
              <p>Successful Rows : {data && data.length}</p>
              <p>Skipped Rows: {skippedArray && skippedArray.length}</p>
            </div>
          </div>
        ) : (
          <div className="tableFooter1">
            <div>In case of errors</div>
            <p className="errors">:</p>

            <div className="tableFooter2">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="skip"
                  control={<Radio />}
                  label="Skip non validated rows"
                  onChange={handleRadioChange}
                />

                <FormControlLabel
                  value="cancel"
                  control={<Radio />}
                  label="Cancel Import"
                  onChange={handleRadioChange}
                />
              </RadioGroup>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="" onClick={handleCloseTable}>
          Cancel
        </Button>
        <Button
          className="nextbtn"
          variant="primary"
          onClick={handleSecondTable}
        >
          Next
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TableModal2;
