import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Papa from "papaparse";
import { FileUploader } from "react-drag-drop-files";
import { Snackbar, Stack } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function InputfileModal({
  show,
  handleClose1,
  filename,
  handleShowStepper,
  setFilename,
  setFile,
}: any) {
  // converts csv or excel file into json and set it in file
  const parseData = (file: any) => {
    setFilename(file);
    setOpen(true);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results: any) {
        setFile(results.data);
      },
    });
  };
  const fileTypes = [
    "xlsx",
    "xlsm",
    "xlsb",
    "xls",
    "xltx",
    "xltm",
    "xlt",
    "xml",
    "xlam",
    "xla",
    "xlw",
    "xlr",
    "csv",
  ];
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    // it shows first modal i.e. input file modal
    <Modal
      show={show}
      onHide={handleClose1}
      dialogClassName="modal-inputfile"
      fullscreen
    >
      <Modal.Header closeButton>
        <Modal.Title>Import CSV</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="center">
          {filename === "" ? (
            <img className="image" src="imageupload1.jpg" />
          ) : (
            <img className="image" src="imageupload.jpg" />
          )}
          <div>
            <div className="fileUploader">
              <FileUploader
                type="file"
                className="custom-file-input"
                types={fileTypes}
                handleChange={parseData}
              />
            </div>
          </div>
          <div className="downloadExcelDiv">
            <a href="https://go.microsoft.com/fwlink/?LinkID=521962">
              download sample excel file
            </a>
            <p className="text-danger">Select CSV or Excel files only.</p>
          </div>

          <Stack spacing={10} sx={{ width: "100%" }}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                File uploaded successfully
              </Alert>
            </Snackbar>
          </Stack>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="" onClick={handleClose1}>
          Cancel
        </Button>
        <Button
          variant="success"
          className="nextbtn"
          onClick={handleShowStepper}
        >
          Next
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InputfileModal;
