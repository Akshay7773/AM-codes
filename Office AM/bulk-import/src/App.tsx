import { BulkImport } from "./components";
import { Button } from "react-bootstrap";
import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";

const App = () => {
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [data, setData] = useState([]);
  console.log(data);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <BulkImport
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        size="md"
        header="Bulk import"
        datasetColumns={[
          {
            label: "First name",
            key: "first_name",
            required: true,
          },
          {
            label: "Last name",
            key: "last_name",
            required: false,
          },
          {
            label: "Email",
            key: "email",
            required: true,
          },
          {
            label: "Age",
            key: "age",
            required: false,
          },
        ]}
        onSubmit={(mappedOutput: any) => {
          setData(mappedOutput);
        }}
        instructions={[
          "Only first 10 rows are displayed in the preview",
          "Some header names and data types have been mapped automatically",
          "You must map one column to the key field in the dataset",
        ]}
      />
    </div>
  );
};

export default App;
