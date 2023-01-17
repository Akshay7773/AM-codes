import React, { useCallback, useMemo, useState } from "react";
import Child from "./Child";

function Parent() {
  const [count, setCount] = useState(0);

  const [newcount, setNewcount] = useState(0);
  const increament = useCallback(() => {
    setNewcount((prev) => prev + 1);
  }, [newcount]);
  const expensiveCalculation = (num) => {
    console.log("Calculating...");
    for (let i = 0; i < 1000000000; i++) {
      num += 1;
    }
    return num;
  };
  const [count2, setCount2] = useState(0);
  const calculation = useMemo(() => expensiveCalculation(count), [count]);

  return (
    <div>
      {console.log("hello parent component")}
      <h1>Parent Component</h1>
      {count}
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>

      {count2}
      <button onClick={() => setCount2((prev) => prev + 1)}>inc count 2</button>
      <Child newcount={newcount} increament={increament} x />
      <h2>Expensive Calculation</h2>
      {calculation}
    </div>
  );
}

export default Parent;
