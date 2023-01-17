import React, { useState } from "react";
import { postAdded } from "./features/formSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function AddFormValues() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [marks, setMarks] = useState(0);
  const [id, setId] = useState(0);
  const savedata = () => {
    if (name && marks !== 0 && id !== 0) {
      dispatch(
        postAdded({
          name: name,
          id: id,
          marks: marks,
        })
      );
    }
    setName("");
    setId(0);
    setMarks(0);
  };

  const gotoForm = () => {
    // console.log("first");
    navigate("/Form");
  };
  return (
    <div>
      <label>name: </label>
      <input onChange={(e) => setName(e.target.value)} />
      <label>id: </label>
      <input onChange={(e) => setId(e.target.value)} />
      <label>marks: </label>
      <input onChange={(e) => setMarks(e.target.value)} />
      <br />
      <button onClick={() => savedata()}>save form data</button>
      <button onClick={() => gotoForm()}>check form values</button>
    </div>
  );
}

export default AddFormValues;
