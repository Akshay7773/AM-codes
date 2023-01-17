import React from "react";
import { useSelector } from "react-redux";
function Form() {
  const values = useSelector((state) => state.form);
  console.log(values);
  return (
    <div>
      <h1>formdata</h1>
      {values &&
        values.map((values) => (
          <div>
            <h3>name: {values.name}</h3>
            <h3>id: {values.id}</h3>
            <h3>marks: {values.marks}</h3>
          </div>
        ))}
    </div>
  );
}

export default Form;
