import React, { useCallback, useState } from "react";
import ToDo from "./ToDo";

function UseCallback() {
  const [count, setCount] = useState(0);
  const [todos, setToDos] = useState([]);

  const incrementCnt = () => {
    setCount((prev) => prev + 1);
  };
  const addToDo = useCallback(
    (input) => {
      setToDos([...todos, input]);
    },
    [todos]
  );

  console.log("useCallback");
  return (
    <div>
      <ToDo todos={todos} addToDo={addToDo} />
      Count : {count}
      <button onClick={incrementCnt}>Increment</button>
    </div>
  );
}

export default UseCallback;
