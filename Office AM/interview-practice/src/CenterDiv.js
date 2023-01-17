import React, { useEffect, useState } from "react";

function CenterDiv() {
  const [state, setState] = useState("");
  const debounce = (cb, delay) => {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };
  useEffect(() => {});
  const changeHandler = debounce((e) => {
    console.log(e.target.value);
    setState(e.target.value);
  }, 1000);
  const ob = {
    display() {
      console.log(this);
    },
  };
  function display() {
    console.log(this);
  }
  display();
  ob.display();

  return (
    <>
      <body>
        <input type={"text"} onChange={changeHandler} />
      </body>
    </>
  );
}

export default CenterDiv;
