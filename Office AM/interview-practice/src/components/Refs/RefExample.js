import React, { useRef } from "react";

function RefExample() {
  const temp = useRef();

  const handler = () => {
    console.log(temp.current.value);
  };
  return (
    <div>
      <input type="text" name="name" ref={temp} />

      <button type="submit" onClick={handler}>
        Click
      </button>
    </div>
  );
}

export default RefExample;
