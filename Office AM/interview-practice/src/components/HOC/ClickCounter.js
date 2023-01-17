import React, { useState } from "react";
import Counter from "./Counter";

function ClickCounter({ handler, count }) {
  return (
    <div>
      <button onClick={handler}>Click {count} times</button>
    </div>
  );
}

export default Counter(ClickCounter);
