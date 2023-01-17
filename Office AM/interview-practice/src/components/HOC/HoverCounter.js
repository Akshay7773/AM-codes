import React, { useState } from "react";
import Counter from "./Counter";

function HoverCounter({ handler, count }) {
  return (
    <div>
      <button onMouseOver={handler}>Hover {count} times</button>
    </div>
  );
}

export default Counter(HoverCounter);
