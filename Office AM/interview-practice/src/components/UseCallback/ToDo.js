import React, { useState } from "react";
import { memo } from "react";
function ToDo({ todos, addToDo }) {
  const [state, setState] = useState("");
  console.log("todo");
  return (
    <div>
      <input type="text" onChange={(e) => setState(e.target.value)} />
      <button onClick={() => addToDo(state)}>Add TO-Do</button>
    </div>
  );
}

export default memo(ToDo);
