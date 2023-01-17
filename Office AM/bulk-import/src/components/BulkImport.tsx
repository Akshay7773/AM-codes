// import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./BulkImport.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import InputfileModal from "./InputfileModal";
import StepperModal from "./StepperModal";
import TableModal1 from "./TableModal1";
import TableModal2 from "./TableModal2";

export type BulkImportTypes = {
  show: boolean;
  handleClose: any;
  datasetColumns: any;
  setShow: any;
  onSubmit: any;
  instructions: any;
  size: string;
  header: string;
};

export function BulkImport(props: BulkImportTypes) {
  const {
    show,
    handleClose,
    datasetColumns,
    setShow,
    onSubmit,
    instructions,
    size,
    header,
  } = props;
  const [showtable, setShowtable] = useState<boolean>(false);
  const [showtable2, setShowtable2] = useState<boolean>(false);
  // data after mapped columns
  const [data, setData] = useState<any>([]);
  // columns in data after mapped columns
  const [dataCol, setDataCol] = useState<any>([]);
  const [showStepper, setshowStepper] = useState(false);
  const [filename, setFilename] = useState<any>("");

  // const [activeStep, setActiveStep] = React.useState(0);
  const [count, setCount] = useState<number>(0);
  const [activeStep, setActiveStep] = React.useState(0);

  const [error, setError] = useState<string[]>([]);
  const [file, setFile] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [colMapfromProp, setColMapfromProp] = useState<any[]>(datasetColumns);

  // boolean value for display skipped
  const [isSkippedRows, setIsSkippedRows] = useState<boolean>(false);

  // to store skipped array i.e. non validated array
  const [skippedArray, setSkippedArray] = useState<any>([]);
  // opening error message in table1 model
  const [openError, setOpenError] = useState<boolean>(false);

  // for closing table that shows extracted data from csv of excel file
  const handleCloseTable = () => {
    setColMapfromProp(datasetColumns);
    setShowtable2(false);
    setShowtable(false);
    handleReset();
    setCount(0);
    setFile([]);
    setFilename("");
    setIsSkippedRows(false);
  };

  const handleReset = () => {
    setCount(0);
    setActiveStep(0);
  };

  // for opening modal of table after click on Next button of Stepper
  const handleShowTable = () => {
    setCount(0);
    setShowtable(true);
    setshowStepper(false);
  };

  // close stepper and cancel all the steps
  const handleCancel = () => {
    setCount(0);
    setFile([]);
    setFilename("");
    setshowStepper(false);
    handleReset();
  };

  // for close stepper
  const handleCloseStepper = () => {
    setshowStepper(false);
    setFile([]);
    setCount(0);
    setFilename("");
    handleReset();
  };

  // it opens stepper modal after click on next button after file uploading step
  const handleShowStepper = () => {
    setshowStepper(true);
    setShow(false);
  };

  useEffect(() => {
    if (file.length) setColumns(Object.keys(file[0]));
  }, [file]);

  useEffect(() => {
    if (data.length) setDataCol(Object.keys(data[0]));
  }, [data]);
  const setObject = (e: any, i: number) => {
    setError([]);
    if (!e.target.textContent)
      setColMapfromProp(
        colMapfromProp.map((col) =>
          col.fileCol === columns[i] ? { ...col, fileCol: undefined } : col
        )
      );
    else
      setColMapfromProp(
        colMapfromProp.map((col) =>
          col.label === e.target.textContent
            ? { ...col, fileCol: columns[i] }
            : col.fileCol === columns[i]
            ? { ...col, fileCol: undefined }
            : col
        )
      );
  };

  // clicking on next button of table
  const handleTableNext = () => {
    let errorFlag = false;
    const mappedData = file.map((x) => {
      let obj = {};
      colMapfromProp.map((c: any) => {
        if (c.fileCol) (obj as any)[c.key] = x[c.fileCol];
        if (c.required && !c.fileCol) {
          errorFlag = true;
          setError((prev) =>
            !prev.includes(c.label) ? [...prev, c.label] : prev
          );
        }
      });
      return obj;
    });
    setData(mappedData);
    if (errorFlag === false) setShowtable2(true);
    else setOpenError(true);
  };

  // close modal after click on x button
  const handleClose1 = () => {
    setFilename("");
    setFile([]);
    handleClose();
  };

  const [radioValue, setRadioValue] = useState<any>("");
  // invoke after click next button of second table
  const handleSecondTable = () => {
    if (radioValue === "cancel") handleCloseTable();
    else if (radioValue === "skip") {
      setIsSkippedRows(true);
      let index: number[] = [];
      data &&
        data.map((d: any, i: any) => {
          dataCol &&
            dataCol.map((dc: any) => {
              if (d[dc] === "") index.push(i);
            });
        });
      setData(data && data.filter((d: any, j: any) => !index.includes(j)));
      setSkippedArray(
        data && data.filter((d: any, j: any) => index.includes(j))
      );
      onSubmit(data && data.filter((d: any, j: any) => !index.includes(j)));
    }
  };

  const handleRadioChange = (e: any) => {
    setRadioValue(e.target.value);
  };

  return (
    <>
      <InputfileModal
        handleClose1={handleClose1}
        show={show}
        filename={filename}
        handleShowStepper={handleShowStepper}
        setFilename={setFilename}
        setFile={setFile}
      />

      <StepperModal
        showStepper={showStepper}
        handleCloseStepper={handleCloseStepper}
        count={count}
        setCount={setCount}
        filename={filename}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        handleShowTable={handleShowTable}
        handleCancel={handleCancel}
        handleReset={handleReset}
        file={file}
      />
      <TableModal1
        showtable={showtable}
        handleCloseTable={handleCloseTable}
        columns={columns}
        colMapfromProp={colMapfromProp}
        setObject={setObject}
        file={file}
        instructions={instructions}
        error={error}
        handleTableNext={handleTableNext}
        datasetColumns={datasetColumns}
        openError={openError}
        setOpenError={setOpenError}
        setColMapfromProp={setColMapfromProp}
      />
      <TableModal2
        showtable2={showtable2}
        handleCloseTable={handleCloseTable}
        columns={columns}
        dataCol={dataCol}
        colMapfromProp={colMapfromProp}
        data={data}
        handleRadioChange={handleRadioChange}
        handleSecondTable={handleSecondTable}
        isSkippedRows={isSkippedRows}
        setIsSkippedRows={setIsSkippedRows}
        skippedArray={skippedArray}
      />
    </>
  );
}
