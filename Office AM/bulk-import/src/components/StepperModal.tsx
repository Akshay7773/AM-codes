import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FileIcon, defaultStyles } from "react-file-icon";

import {
  Box,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
function StepperModal({
  showStepper,
  handleCloseStepper,
  count,
  setCount,
  filename,
  activeStep,
  setActiveStep,
  handleShowTable,
  handleCancel,
  handleReset,
  file,
}: any) {
  // steps in stepper
  const steps = [
    {
      label: "File Uploaded",
      description: `Filename`,
    },
    {
      label: "File Verified",
      description: "Checking the format of the file.",
    },
    {
      label: "Data Validated",
      description: `Looking for data mismatches and other issue.`,
    },
  ];

  const handleNext = (index: number) => {
    setCount((prev: number) => prev + 1);
    if (index === 1) {
      if (
        filename.type === "application/vnd.ms-excel" ||
        filename.type === "text/csv"
      )
        setActiveStep((prevActiveStep: any) => prevActiveStep + 1);
    } else {
      setActiveStep((prevActiveStep: any) => prevActiveStep + 1);
    }
  };
  return (
    <Modal show={showStepper} onHide={handleCloseStepper}>
      <Modal.Header closeButton>
        <Modal.Title>Import CSV</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Box sx={{ maxWidth: 400 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconProps={{
                    sx: { "&.Mui-completed": { color: "green" } },
                  }}
                  optional={
                    index === 1 ? (
                      <Typography variant="caption">
                        Checking the format of the file.
                      </Typography>
                    ) : index === 2 ? (
                      <Typography variant="caption">
                        Looking for data mismatches and other issue.
                      </Typography>
                    ) : null
                  }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      {index === 0 ? (
                        <div className="stepperCenter">
                          <div className="fileicon">
                            <FileIcon
                              extension={
                                filename && filename.name.split(".")?.slice(-1)
                              }
                              {...(defaultStyles as any)[
                                filename && filename.name.split(".").slice(-1)
                              ]}
                            />
                          </div>
                          <div>
                            <div>{filename?.name}</div>
                            <div>{filename?.size / 1000}KB</div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <Button
                        onClick={() => handleNext(index)}
                        size="sm"
                        disabled={
                          index === 0
                            ? filename === "" || (file && file.length > 150)
                              ? true
                              : false
                            : index === 1
                            ? filename?.type === "application/vnd.ms-excel" ||
                              filename?.type === "text/csv"
                              ? false
                              : true
                            : index === 2
                            ? file?.length
                              ? false
                              : true
                            : false
                        }
                      >
                        {index === steps.length - 1 ? "Finish" : "Continue"}
                      </Button>

                      {index === 0 ? (
                        filename === "" ? (
                          <p className="text-danger">File not exists.</p>
                        ) : file.length > 150 ? (
                          <p className="text-danger">
                            rows in file must be less than 150.
                          </p>
                        ) : (
                          ""
                        )
                      ) : index === 1 ? (
                        filename?.type === "application/vnd.ms-excel" ||
                        filename?.type === "text/csv" ? (
                          ""
                        ) : (
                          <p className="text-danger">Invalid file format</p>
                        )
                      ) : index === 2 ? (
                        file?.length ? (
                          ""
                        ) : (
                          <p className="text-danger">Invalid file format</p>
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset}>Reset</Button>
            </Paper>
          )}
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          className="nextbtn"
          variant="success"
          disabled={count < 3}
          onClick={handleShowTable}
        >
          Next
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StepperModal;
